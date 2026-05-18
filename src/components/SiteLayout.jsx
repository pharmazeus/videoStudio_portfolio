import { Outlet, useLocation } from "react-router-dom";

import NavBar from "./NavBar";
import SiteFooter from "./SiteFooter";
import ScrollToTop from "./ScrollToTop";

function SiteLayout() {
  const { pathname } = useLocation();
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const isHomePage = normalizedPath === "/";

  return (
    <div className="min-h-dvh bg-black text-white">
      <ScrollToTop />
      <NavBar />
      <main
        key={pathname}
        className={`page-transition-enter ${isHomePage ? "" : "pt-20 md:pt-24"}`}
      >
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

export default SiteLayout;
