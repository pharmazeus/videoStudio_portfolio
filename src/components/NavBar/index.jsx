import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import NavBarHeader from "./NavBarHeader.jsx";
import NavBarMobileMenu from "./NavBarMobileMenu.jsx";

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, "") || "/";
  const isHomePage = pathname === "/";
  const bodyScrollLock = useRef(null);

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

  return (
    <>
      <NavBarHeader
        scrolled={scrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggle={() => setIsMobileMenuOpen((current) => !current)}
        onHomeBrandClick={handleHomeHeroClick}
        onHomeNavLinkClick={handleHomeHeroClick}
      />
      <NavBarMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        onHomeNavLinkClick={handleHomeHeroClick}
      />
    </>
  );
}

export default NavBar;
