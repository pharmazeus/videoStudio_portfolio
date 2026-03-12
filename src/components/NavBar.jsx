import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { navLinks } from "../constants";

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, "") || "/";
  const isWorkPage = pathname === "/work" || pathname.startsWith("/work/");

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
        <a className="logo" href={isWorkPage ? "/" : "#hero"}>
          Vladyslav Maidanskyi |
        </a>
        <nav className="desktop">
          <ul>
            {isWorkPage ? (
              <li className="group">
                <a href="/">
                  <span>Home</span>
                  <span className="underline" />
                </a>
              </li>
            ) : (
              navLinks.map(({ label, path }) => (
                <li key={path} className="group">
                  <a href={path}>
                    <span>{label}</span>
                    <span className="underline" />
                  </a>
                </li>
              ))
            )}
          </ul>
        </nav>
        <div className="actions">
          {!isWorkPage && (
            <a href="/work" className="contact-btn contact-btn-secondary group">
              <div className="inner">
                <span>Work</span>
              </div>
            </a>
          )}
          <a href={isWorkPage ? "/" : "/contact"} className="contact-btn group">
            <div className="inner">
              <span className="sm:hidden">{isWorkPage ? "Home" : "Start"}</span>
              <span className="hidden sm:inline">
                {isWorkPage ? "Back Home" : "Start a Project"}
              </span>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
