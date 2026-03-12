import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import VideoShowcasePage from "./pages/VideoShowcasePage.jsx";
import "modern-normalize";

const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
const ActivePage = pathname === "/video-showcase" ? VideoShowcasePage : App;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ActivePage />
  </StrictMode>,
);
