import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

import SiteLayout from "./components/SiteLayout";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CaseStudyPage = lazy(() => import("./pages/CaseStudyPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const RecruiterPortfolioPage = lazy(() => import("./pages/RecruiterPortfolioPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const WorkPage = lazy(() => import("./pages/WorkPage"));

function RouteFallback() {
  return (
    <div
      aria-hidden="true"
      className="flex min-h-[60dvh] w-full items-center justify-center"
    >
      <div className="size-10 animate-pulse rounded-full bg-copper-50/40" />
    </div>
  );
}

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
