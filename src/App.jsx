import { lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

import SiteLayout from "./components/SiteLayout";
import HomePage from "./pages/HomePage";

const pageModules = {
  AboutPage: () => import("./pages/AboutPage"),
  CaseStudyPage: () => import("./pages/CaseStudyPage"),
  ContactPage: () => import("./pages/ContactPage"),
  PricingPage: () => import("./pages/PricingPage"),
  RecruiterPortfolioPage: () => import("./pages/RecruiterPortfolioPage"),
  ServicesPage: () => import("./pages/ServicesPage"),
  WorkPage: () => import("./pages/WorkPage"),
};

const AboutPage = lazy(pageModules.AboutPage);
const CaseStudyPage = lazy(pageModules.CaseStudyPage);
const ContactPage = lazy(pageModules.ContactPage);
const PricingPage = lazy(pageModules.PricingPage);
const RecruiterPortfolioPage = lazy(pageModules.RecruiterPortfolioPage);
const ServicesPage = lazy(pageModules.ServicesPage);
const WorkPage = lazy(pageModules.WorkPage);

function App() {
  useEffect(() => {
    let idleId;

    const prefetchRoutes = () => {
      Object.values(pageModules).forEach((importFn) => {
        importFn().catch(() => {});
      });
    };

    const prefetchTimer = window.setTimeout(() => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(prefetchRoutes, {
          timeout: 5000,
        });
        return;
      }

      prefetchRoutes();
    }, 8000);

    return () => {
      window.clearTimeout(prefetchTimer);
      if (idleId) window.cancelIdleCallback(idleId);
    };
  }, []);

  return (
    <div className="site-fade-in">
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/recruiters" element={<RecruiterPortfolioPage />} />
          <Route path="/full-stack-portfolio" element={<Navigate to="/recruiters" replace />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
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
