import { Link, NavLink } from "react-router-dom";

import { navLinks } from "../../constants";

function NavBarHeader({
  scrolled,
  isMobileMenuOpen,
  onToggle,
  onHomeBrandClick,
  onHomeNavLinkClick,
}) {
  return (
    <header
      className={`navbar ${scrolled ? "scrolled" : "not-scrolled"} ${isMobileMenuOpen ? "menu-open" : ""}`}
    >
      <div className="inner">
        <Link
          className="nav-brand flex items-center gap-3 md:gap-4 bg-[#1c1c21]/80 backdrop-blur-md rounded-[32px] py-1.5 pr-5 pl-1.5 border border-white/5 transition-all duration-300 hover:bg-[#1c1c21] hover:border-white/10"
          to="/"
          onClick={onHomeBrandClick}
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
                  onClick={path === "/" ? onHomeNavLinkClick : undefined}
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
          onClick={onToggle}
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
  );
}

export default NavBarHeader;
