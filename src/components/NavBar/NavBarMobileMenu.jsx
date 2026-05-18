import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { navLinks } from "../../constants";
import useNavBarGestures from "./useNavBarGestures.js";

const MOBILE_SLIDE_SPACING = 125;

function getActiveNavIndex(pathname) {
  const index = navLinks.findIndex(({ path }) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  });

  return index >= 0 ? index : 0;
}

function NavBarMobileMenu({ isOpen, onClose, onHomeNavLinkClick }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, "") || "/";

  const {
    dragOffsetState,
    isDragging,
    isSnapping,
    suppressClickUntil,
    resetDragOffset,
    handlePointerDown,
    handlePointerMove,
    handlePointerEnd,
    handlePointerCancel,
    handleWheel,
  } = useNavBarGestures({
    isActive: isOpen,
    slidesCount: navLinks.length,
    setActiveSlide,
  });

  useEffect(() => {
    if (!isOpen) return;
    const routeIndex = getActiveNavIndex(pathname);
    if (routeIndex !== -1) {
      setActiveSlide(routeIndex);
    }
  }, [isOpen, pathname]);

  const getOffset = (index) => {
    let offset = index - activeSlide;
    const half = navLinks.length / 2;
    if (offset < -half) offset += navLinks.length;
    if (offset > half) offset -= navLinks.length;
    return offset;
  };

  return (
    <div
      id="mobile-navigation"
      className={`mobile-menu ${isOpen ? "is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className="mobile-menu-backdrop"
        aria-label="Close navigation menu"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
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
                    if (path === "/") onHomeNavLinkClick(event);
                    else onClose();
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
              tabIndex={isOpen ? 0 : -1}
              onClick={() => {
                resetDragOffset();
                setActiveSlide(index);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NavBarMobileMenu;
