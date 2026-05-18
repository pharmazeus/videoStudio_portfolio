import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

import SiteLayout from "./components/SiteLayout";

const pageModules = {
  HomePage: () => import("./pages/HomePage"),
  AboutPage: () => import("./pages/AboutPage"),
  CaseStudyPage: () => import("./pages/CaseStudyPage"),
  ContactPage: () => import("./pages/ContactPage"),
  PricingPage: () => import("./pages/PricingPage"),
  RecruiterPortfolioPage: () => import("./pages/RecruiterPortfolioPage"),
  ServicesPage: () => import("./pages/ServicesPage"),
  WorkPage: () => import("./pages/WorkPage"),
};

const HomePage = lazy(pageModules.HomePage);
const AboutPage = lazy(pageModules.AboutPage);
const CaseStudyPage = lazy(pageModules.CaseStudyPage);
const ContactPage = lazy(pageModules.ContactPage);
const PricingPage = lazy(pageModules.PricingPage);
const RecruiterPortfolioPage = lazy(pageModules.RecruiterPortfolioPage);
const ServicesPage = lazy(pageModules.ServicesPage);
const WorkPage = lazy(pageModules.WorkPage);

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

function App() {
  useEffect(() => {
    // Pre-fetch all routes in background after initial load
    const prefetchTimer = setTimeout(() => {
      Object.values(pageModules).forEach((importFn) => {
        importFn().catch(() => {});
      });
    }, 500);
    return () => clearTimeout(prefetchTimer);
  }, []);

  return (
    <div className="site-fade-in">
      <Routes>
        <Route element={<SiteLayout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<RouteFallback />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/work"
            element={
              <Suspense fallback={<RouteFallback />}>
                <WorkPage />
              </Suspense>
            }
          />
          <Route
            path="/work/:slug"
            element={
              <Suspense fallback={<RouteFallback />}>
                <CaseStudyPage />
              </Suspense>
            }
          />
          <Route
            path="/services"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ServicesPage />
              </Suspense>
            }
          />
          <Route
            path="/pricing"
            element={
              <Suspense fallback={<RouteFallback />}>
                <PricingPage />
              </Suspense>
            }
          />
          <Route
            path="/recruiters"
            element={
              <Suspense fallback={<RouteFallback />}>
                <RecruiterPortfolioPage />
              </Suspense>
            }
          />
          <Route path="/full-stack-portfolio" element={<Navigate to="/recruiters" replace />} />
          <Route
            path="/about"
            element={
              <Suspense fallback={<RouteFallback />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route path="/video-showcase" element={<Navigate to="/work" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export default App;
