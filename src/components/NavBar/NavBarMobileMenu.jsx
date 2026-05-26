import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { navLinks } from "../../constants";

function getActiveNavIndex(pathname) {
  const index = navLinks.findIndex(({ path }) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  });

  return index >= 0 ? index : 0;
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

function NavBarMobileMenu({ isOpen, onClose, onHomeNavLinkClick }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef(null);
  const slideRefs = useRef([]);
  const scrollFrame = useRef(null);
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, "") || "/";

  const scrollToSlide = useCallback((index, animate = true) => {
    const swiper = swiperRef.current;
    const slide = slideRefs.current[index];
    if (!swiper || !slide) return;

    const targetLeft = slide.offsetLeft - (swiper.clientWidth - slide.offsetWidth) / 2;

    swiper.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: animate && !prefersReducedMotion() ? "smooth" : "auto",
    });
  }, []);

  const syncActiveSlideToScroll = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const swiperCenter = swiper.getBoundingClientRect().left + swiper.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;
      const distance = Math.abs(slideCenter - swiperCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveSlide((current) => (current === nearestIndex ? current : nearestIndex));
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollFrame.current) return;

    scrollFrame.current = window.requestAnimationFrame(() => {
      scrollFrame.current = null;
      syncActiveSlideToScroll();
    });
  }, [syncActiveSlideToScroll]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const routeIndex = getActiveNavIndex(pathname);
    setActiveSlide(routeIndex);

    const frame = window.requestAnimationFrame(() => {
      scrollToSlide(routeIndex, false);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isOpen, pathname, scrollToSlide]);

  useEffect(() => () => {
    if (scrollFrame.current) window.cancelAnimationFrame(scrollFrame.current);
  }, []);

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
          ref={swiperRef}
          className="mobile-menu-swiper"
          onScroll={handleScroll}
        >
          {navLinks.map(({ label, path }, index) => {
            const distanceFromActive = Math.abs(index - activeSlide);
            const isActiveSlide = index === activeSlide;
            const isNearbySlide = distanceFromActive <= 1;
            const cardScale = isActiveSlide ? 1 : isNearbySlide ? 0.86 : 0.78;
            const cardOpacity = isActiveSlide ? 1 : isNearbySlide ? 0.68 : 0.48;

            return (
              <div
                key={path}
                ref={(element) => {
                  slideRefs.current[index] = element;
                }}
                className={`mobile-menu-slide-proxy ${isNearbySlide ? "is-nearby" : ""}`}
                style={{
                  "--mobile-menu-card-scale": cardScale,
                  "--mobile-menu-card-opacity": cardOpacity,
                }}
              >
                <NavLink
                  draggable={false}
                  to={path}
                  className={({ isActive }) =>
                    `mobile-menu-card ${isActive ? "is-route-active" : ""} ${isActiveSlide ? "is-focused" : "is-muted"}`
                  }
                  onClick={(event) => {
                    if (path === "/") onHomeNavLinkClick(event);
                    else onClose();
                  }}
                  tabIndex={isOpen ? 0 : -1}
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
              aria-pressed={index === activeSlide}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => {
                setActiveSlide(index);
                scrollToSlide(index);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NavBarMobileMenu;
