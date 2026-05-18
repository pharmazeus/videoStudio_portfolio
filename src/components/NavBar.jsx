import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { navLinks } from "../constants";

function getActiveNavIndex(pathname) {
  const index = navLinks.findIndex(({ path }) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  });

  return index >= 0 ? index : 0;
}

const MOBILE_SLIDE_SPACING = 125;
const MOBILE_MAX_DRAG = 112;
const MOBILE_DRAG_RESISTANCE = 1;
const MOBILE_COMMIT_DISTANCE = 22;
const MOBILE_COMMIT_MIN_DISTANCE = 12;
const MOBILE_COMMIT_VELOCITY = 0.36;
const MOBILE_RELEASE_FALLBACK_DISTANCE = 10;
const MOBILE_WHEEL_MIN_DELTA = 16;
const MOBILE_WHEEL_QUIET_UNLOCK_DELAY = 140;
const MOBILE_WHEEL_MAX_LOCK = 420;
const MOBILE_SNAP_DURATION = 140;

function clampDragOffset(value) {
  return Math.max(-MOBILE_MAX_DRAG, Math.min(MOBILE_MAX_DRAG, value));
}

function releasePointerCapture(element, pointerId) {
  if (!element.hasPointerCapture?.(pointerId)) return;
  element.releasePointerCapture(pointerId);
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [dragOffsetState, setDragOffsetState] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, "") || "/";
  const isHomePage = pathname === "/";
  const activePointerId = useRef(null);
  const dragStartX = useRef(0);
  const dragLastX = useRef(0);
  const dragLastTime = useRef(0);
  const dragVelocity = useRef(0);
  const dragOffset = useRef(0);
  const pendingDragOffset = useRef(0);
  const dragFrame = useRef(null);
  const suppressClickUntil = useRef(0);
  const isDraggingRef = useRef(false);
  const gestureCommitted = useRef(false);
  const wheelGestureLocked = useRef(false);
  const wheelUnlockTimeout = useRef(null);
  const wheelMaxUnlockTimeout = useRef(null);
  const snapTimeout = useRef(null);
  const bodyScrollLock = useRef(null);

  const getOffset = useCallback((index) => {
    let offset = index - activeSlide;
    const half = navLinks.length / 2;
    if (offset < -half) offset += navLinks.length;
    if (offset > half) offset -= navLinks.length;
    return offset;
  }, [activeSlide]);

  const setDragOffset = useCallback((value) => {
    const nextValue = clampDragOffset(value);
    pendingDragOffset.current = nextValue;
    dragOffset.current = nextValue;

    if (dragFrame.current) return;

    dragFrame.current = window.requestAnimationFrame(() => {
      dragFrame.current = null;
      setDragOffsetState(pendingDragOffset.current);
    });
  }, []);

  const resetDragOffset = useCallback(() => {
    if (dragFrame.current) {
      window.cancelAnimationFrame(dragFrame.current);
      dragFrame.current = null;
    }

    pendingDragOffset.current = 0;
    dragOffset.current = 0;
    setDragOffsetState(0);
  }, []);

  const startSnapPhase = useCallback(() => {
    if (snapTimeout.current) clearTimeout(snapTimeout.current);

    setIsSnapping(true);
    snapTimeout.current = window.setTimeout(() => {
      snapTimeout.current = null;
      setIsSnapping(false);
    }, MOBILE_SNAP_DURATION);
  }, []);

  const commitSlide = useCallback((direction, keepPointer = false) => {
    gestureCommitted.current = true;
    isDraggingRef.current = false;
    if (!keepPointer) {
      activePointerId.current = null;
    }
    suppressClickUntil.current = performance.now() + 240;
    setIsDragging(false);
    setActiveSlide((prev) => (
      prev + direction + navLinks.length
    ) % navLinks.length);
    resetDragOffset();
    startSnapPhase();
  }, [resetDragOffset, startSnapPhase]);

  const handlePointerDown = useCallback((event) => {
    if (
      !event.isPrimary ||
      (event.pointerType === "mouse" && event.button !== 0)
    ) {
      return;
    }

    activePointerId.current = event.pointerId;
    if (snapTimeout.current) {
      clearTimeout(snapTimeout.current);
      snapTimeout.current = null;
    }
    setIsSnapping(false);
    dragStartX.current = event.clientX;
    dragLastX.current = event.clientX;
    dragLastTime.current = performance.now();
    dragVelocity.current = 0;
    isDraggingRef.current = true;
    gestureCommitted.current = false;
    setIsDragging(true);
    resetDragOffset();
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }, [resetDragOffset]);

  const handlePointerMove = useCallback((event) => {
    if (
      !isDraggingRef.current ||
      activePointerId.current !== event.pointerId ||
      gestureCommitted.current
    ) {
      return;
    }

    const currentTime = performance.now();
    const delta = event.clientX - dragStartX.current;
    const timeDelta = Math.max(currentTime - dragLastTime.current, 1);

    dragVelocity.current = (event.clientX - dragLastX.current) / timeDelta;
    dragLastX.current = event.clientX;
    dragLastTime.current = currentTime;

    if (Math.abs(delta) > 6) {
      suppressClickUntil.current = currentTime + 220;
    }

    const absDelta = Math.abs(delta);
    const shouldCommitByDistance = absDelta >= MOBILE_COMMIT_DISTANCE;
    const shouldCommitByVelocity =
      absDelta >= MOBILE_COMMIT_MIN_DISTANCE &&
      Math.abs(dragVelocity.current) >= MOBILE_COMMIT_VELOCITY;

    if (shouldCommitByDistance || shouldCommitByVelocity) {
      const movement = shouldCommitByDistance ? delta : dragVelocity.current;
      const direction = movement < 0 ? 1 : -1;
      commitSlide(direction, true);
      return;
    }

    setDragOffset(delta * MOBILE_DRAG_RESISTANCE);
  }, [commitSlide, setDragOffset]);

  const handlePointerEnd = useCallback((event) => {
    if (activePointerId.current !== event.pointerId) return;

    releasePointerCapture(event.currentTarget, event.pointerId);
    if (gestureCommitted.current) {
      suppressClickUntil.current = performance.now() + 260;
      gestureCommitted.current = false;
      isDraggingRef.current = false;
      activePointerId.current = null;
      setIsDragging(false);
      resetDragOffset();
      return;
    }

    if (Math.abs(dragOffset.current) > 6) {
      suppressClickUntil.current = performance.now() + 220;
    }

    const currentOffset = dragOffset.current;
    if (Math.abs(currentOffset) >= MOBILE_RELEASE_FALLBACK_DISTANCE) {
      commitSlide(currentOffset < 0 ? 1 : -1);
      return;
    }

    isDraggingRef.current = false;
    activePointerId.current = null;
    setIsDragging(false);
    resetDragOffset();
  }, [commitSlide, resetDragOffset]);

  const handlePointerCancel = useCallback((event) => {
    if (activePointerId.current !== event.pointerId) return;

    releasePointerCapture(event.currentTarget, event.pointerId);
    isDraggingRef.current = false;
    activePointerId.current = null;
    gestureCommitted.current = false;
    setIsDragging(false);
    resetDragOffset();
  }, [resetDragOffset]);

  const unlockWheelGesture = useCallback(() => {
    wheelGestureLocked.current = false;

    if (wheelUnlockTimeout.current) {
      clearTimeout(wheelUnlockTimeout.current);
      wheelUnlockTimeout.current = null;
    }

    if (wheelMaxUnlockTimeout.current) {
      clearTimeout(wheelMaxUnlockTimeout.current);
      wheelMaxUnlockTimeout.current = null;
    }
  }, []);

  const handleWheel = useCallback((event) => {
    const absDeltaX = Math.abs(event.deltaX);
    if (
      absDeltaX <= Math.abs(event.deltaY) ||
      absDeltaX < MOBILE_WHEEL_MIN_DELTA
    ) {
      return;
    }

    suppressClickUntil.current = performance.now() + 220;

    if (wheelUnlockTimeout.current) clearTimeout(wheelUnlockTimeout.current);
    wheelUnlockTimeout.current = window.setTimeout(() => {
      unlockWheelGesture();
    }, MOBILE_WHEEL_QUIET_UNLOCK_DELAY);

    if (wheelGestureLocked.current) return;

    wheelGestureLocked.current = true;
    if (wheelMaxUnlockTimeout.current) clearTimeout(wheelMaxUnlockTimeout.current);
    wheelMaxUnlockTimeout.current = window.setTimeout(() => {
      unlockWheelGesture();
    }, MOBILE_WHEEL_MAX_LOCK);
    commitSlide(event.deltaX > 0 ? 1 : -1);
  }, [commitSlide, unlockWheelGesture]);

  const scrollToHero = () => {
    const heroSection = document.getElementById("hero");

    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHomeHeroClick = (event) => {
    if (!isHomePage) return;

    event.preventDefault();
    setIsMobileMenuOpen(false);
    scrollToHero();
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const scrollY = window.scrollY;
    const bodyStyle = document.body.style;

    bodyScrollLock.current = {
      scrollY,
      pathname: window.location.pathname.replace(/\/+$/, "") || "/",
      position: bodyStyle.position,
      top: bodyStyle.top,
      left: bodyStyle.left,
      right: bodyStyle.right,
      width: bodyStyle.width,
      overflow: bodyStyle.overflow,
    };

    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.left = "0";
    bodyStyle.right = "0";
    bodyStyle.width = "100%";
    bodyStyle.overflow = "hidden";

    return () => {
      const lock = bodyScrollLock.current;
      if (!lock) return;

      bodyStyle.position = lock.position;
      bodyStyle.top = lock.top;
      bodyStyle.left = lock.left;
      bodyStyle.right = lock.right;
      bodyStyle.width = lock.width;
      bodyStyle.overflow = lock.overflow;
      bodyScrollLock.current = null;

      const currentPathname = window.location.pathname.replace(/\/+$/, "") || "/";
      if (currentPathname === lock.pathname) {
        window.scrollTo(0, lock.scrollY);
      }
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const routeIndex = getActiveNavIndex(pathname);
    if (routeIndex !== -1) {
      setActiveSlide(routeIndex);
    }
  }, [isMobileMenuOpen, pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) return;

    isDraggingRef.current = false;
    activePointerId.current = null;
    gestureCommitted.current = false;
    wheelGestureLocked.current = false;
    if (wheelUnlockTimeout.current) {
      clearTimeout(wheelUnlockTimeout.current);
      wheelUnlockTimeout.current = null;
    }
    if (wheelMaxUnlockTimeout.current) {
      clearTimeout(wheelMaxUnlockTimeout.current);
      wheelMaxUnlockTimeout.current = null;
    }
    setIsDragging(false);
    if (snapTimeout.current) {
      clearTimeout(snapTimeout.current);
      snapTimeout.current = null;
    }
    setIsSnapping(false);
    resetDragOffset();
  }, [isMobileMenuOpen, resetDragOffset]);

  useEffect(() => () => {
    if (dragFrame.current) window.cancelAnimationFrame(dragFrame.current);
    if (wheelUnlockTimeout.current) clearTimeout(wheelUnlockTimeout.current);
    if (wheelMaxUnlockTimeout.current) clearTimeout(wheelMaxUnlockTimeout.current);
    if (snapTimeout.current) clearTimeout(snapTimeout.current);
  }, []);

  return (
    <>
      <header
        className={`navbar ${scrolled ? "scrolled" : "not-scrolled"} ${isMobileMenuOpen ? "menu-open" : ""}`}
      >
        <div className="inner">
          <Link
            className="nav-brand flex items-center gap-3 md:gap-4 bg-[#1c1c21]/80 backdrop-blur-md rounded-[32px] py-1.5 pr-5 pl-1.5 border border-white/5 transition-all duration-300 hover:bg-[#1c1c21] hover:border-white/10"
            to="/"
            onClick={handleHomeHeroClick}
            aria-label="Go to the homepage"
            style={{ textDecoration: 'none' }}
          >
            <div className="flex-shrink-0 w-[42px] h-[42px] rounded-full flex items-center justify-center border border-[#d4865d]/60 text-[#d4865d] text-lg font-medium bg-gradient-to-br from-[#d4865d]/10 to-transparent shadow-[inset_0_0_12px_rgba(212,134,93,0.15)]">
              V
            </div>
            <div className="flex flex-col items-start justify-center">
              <span className="text-white/95 font-medium text-[15px] leading-tight tracking-tight">Vladyslav Maidanskyi</span>
            </div>
          </Link>

          <nav className="desktop" aria-label="Main navigation">
            <ul>
              {navLinks.map(({ label, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "is-active" : ""}`
                    }
                    onClick={path === "/" ? handleHomeHeroClick : undefined}
                  >
                    <span>{label}</span>
                    <span className="underline" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={
              isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
          >
            <span
              className={
                isMobileMenuOpen
                  ? "mobile-menu-bar is-open-first"
                  : "mobile-menu-bar"
              }
            />
            <span
              className={
                isMobileMenuOpen
                  ? "mobile-menu-bar is-open-middle"
                  : "mobile-menu-bar"
              }
            />
            <span
              className={
                isMobileMenuOpen
                  ? "mobile-menu-bar is-open-last"
                  : "mobile-menu-bar"
              }
            />
          </button>
        </div>
      </header>

      <div
        id="mobile-navigation"
        className={`mobile-menu ${isMobileMenuOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!isMobileMenuOpen}
      >
        <button
          type="button"
          className="mobile-menu-backdrop"
          aria-label="Close navigation menu"
          tabIndex={isMobileMenuOpen ? 0 : -1}
          onClick={closeMobileMenu}
        />

        <div className="mobile-menu-panel">
          <div
            className={`mobile-menu-swiper ${isDragging ? "is-dragging" : ""} ${isSnapping ? "is-snapping" : ""}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerCancel}
            onWheel={handleWheel}
          >
            {navLinks.map(({ label, path }, index) => {
              const baseOffset = getOffset(index);
              let visualOffset = baseOffset + (dragOffsetState / MOBILE_SLIDE_SPACING);

              if (visualOffset > navLinks.length / 2) visualOffset -= navLinks.length;
              if (visualOffset < -navLinks.length / 2) visualOffset += navLinks.length;

              const absOffset = Math.abs(visualOffset);
              const isActiveSlide = absOffset < 0.5;
              const isNearbySlide = absOffset <= 1.25;
              const slideOpacity = absOffset > 1.45
                ? 0
                : Math.max(0.58, 1 - absOffset * 0.42);

              return (
                <div
                  key={path}
                  className={`mobile-menu-slide-proxy ${isDragging ? "is-dragging" : ""} ${isSnapping ? "is-snapping" : ""} ${isNearbySlide ? "is-nearby" : ""}`}
                  style={{
                    transform: `translate(-50%, -50%) translateX(${visualOffset * MOBILE_SLIDE_SPACING}px) scale(${Math.max(0.6, 1 - absOffset * 0.25)})`,
                    opacity: slideOpacity,
                    zIndex: 10 - Math.floor(absOffset),
                    pointerEvents: isActiveSlide ? "auto" : "none",
                  }}
                >
                  <NavLink
                    draggable={false}
                    to={path}
                    className={({ isActive }) =>
                      `mobile-menu-card ${isActive ? "is-route-active" : ""} ${isActiveSlide ? "is-focused" : "is-muted"}`
                    }
                    onClick={(event) => {
                      if (performance.now() < suppressClickUntil.current) {
                        event.preventDefault();
                        return;
                      }
                      if (path === "/") handleHomeHeroClick(event);
                      else closeMobileMenu();
                    }}
                  >
                    {label}
                  </NavLink>
                </div>
              );
            })}
          </div>

          <div className="mobile-menu-dots">
            {navLinks.map(({ path }, index) => (
              <button
                key={path}
                type="button"
                className={`mobile-menu-dot ${index === activeSlide ? "is-active" : ""}`}
                aria-label={`Go to ${navLinks[index].label}`}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                onClick={() => {
                  resetDragOffset();
                  setActiveSlide(index);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
