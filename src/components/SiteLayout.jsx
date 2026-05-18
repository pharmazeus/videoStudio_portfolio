import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

import NavBar from "./NavBar";
import SiteFooter from "./SiteFooter";
import ScrollToTop from "./ScrollToTop";

function RouteFallback() {
  return (
    <div
      aria-hidden="true"
      className="flex min-h-[60dvh] w-full items-center justify-center"
    >
      <div className="size-10 animate-pulse rounded-full bg-copper-50/20" />
    </div>
  );
}

function SiteLayout() {
  const { pathname } = useLocation();
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const isHomePage = normalizedPath === "/";

  return (
    <div className="min-h-dvh bg-black text-white">
      <ScrollToTop />
      <NavBar />
      <Suspense
        fallback={
          <main
            key={`${pathname}-fallback`}
            className={`page-transition-enter ${isHomePage ? "" : "pt-20 md:pt-24"}`}
          >
            <RouteFallback />
          </main>
        }
      >
        <main
          key={pathname}
          className={`page-transition-enter ${isHomePage ? "" : "pt-20 md:pt-24"}`}
        >
          <Outlet />
        </main>
        <SiteFooter />
      </Suspense>
    </div>
  );
}

export default SiteLayout;
