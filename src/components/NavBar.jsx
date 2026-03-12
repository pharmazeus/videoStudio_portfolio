import { useEffect, useState } from "react";
import { navLinks } from "../constants";

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";
  const isVideoPage = pathname === "/video-showcase";

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      setScrolled(y > 10);
    };

    handleScroll(); // set initial state
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <a className="logo" href={isVideoPage ? "/" : "#hero"}>
          Vladyslav Maidanskyi |
        </a>
        <nav className="desktop">
          <ul>
            {isVideoPage ? (
              <li className="group">
                <a href="/">
                  <span>Portfolio</span>
                  <span className="underline" />
                </a>
              </li>
            ) : (
              navLinks.map(({ name, link }) => (
                <li key={name} className="group">
                  <a href={link}>
                    <span>{name}</span>
                    <span className="underline" />
                  </a>
                </li>
              ))
            )}
          </ul>
        </nav>
        {!isVideoPage && (
          <a href="/video-showcase" className="contact-btn group">
            <div className="inner">
              <span>Video Page</span>
            </div>
          </a>
        )}
        <a href={isVideoPage ? "/" : "#contact"} className="contact-btn group">
          <div className="inner">
            <span>{isVideoPage ? "Back Home" : "Contact me"}</span>
          </div>
        </a>
      </div>
    </header>
  );
}

export default NavBar;
