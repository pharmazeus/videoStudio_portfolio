import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { navLinks } from "../constants";

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, "") || "/";
  const isHomePage = pathname === "/";
  const isContactPage = pathname === "/contact";
  const isWorkPage = pathname === "/work" || pathname.startsWith("/work/");
  const shouldShowWorkCurrent = isWorkPage;
  const shouldShowContactCurrent = isContactPage;

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
    scrollToHero();
  };

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      setScrolled(y > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <Link
          className="logo"
          to="/"
          onClick={handleHomeHeroClick}
          aria-label="Go to the homepage"
        >
          Vladyslav Maidanskyi |
        </Link>
        <nav className="desktop">
          <ul>
            {navLinks.map(({ label, path }) => (
              <li key={path} className="group">
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
        <div className="actions">
          {shouldShowWorkCurrent ? (
            <div
              className="contact-btn contact-btn-current"
              aria-current="page"
            >
              <div className="button-inner">
                <span>Work</span>
              </div>
            </div>
          ) : (
            <Link to="/work" className="contact-btn contact-btn-secondary">
              <div className="button-inner">
                <span>Work</span>
              </div>
            </Link>
          )}
          {shouldShowContactCurrent ? (
            <div
              className="contact-btn contact-btn-current"
              aria-current="page"
            >
              <div className="button-inner">
                <span className="xl:hidden">Here</span>
                <span className="hidden xl:inline">Contact</span>
              </div>
            </div>
          ) : (
            <Link to="/contact" className="contact-btn">
              <div className="button-inner">
                <span className="xl:hidden">Start</span>
                <span className="hidden xl:inline">
                  Start a Project
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
