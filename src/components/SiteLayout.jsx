import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";
import SiteFooter from "./SiteFooter";
import ScrollToTop from "./ScrollToTop";

function SiteLayout() {
  return (
    <div className="min-h-dvh bg-black text-white">
      <ScrollToTop />
      <NavBar />
      <main className="pt-20 md:pt-24">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

export default SiteLayout;
