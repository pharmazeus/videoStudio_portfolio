import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

import { handleContactRequest } from "./api/contact";
import tailwindcss from "@tailwindcss/vite";

const CONTACT_API_MOCK_RESPONSES = {
  success: { statusCode: 200, payload: { ok: true, mock: true } },
  validation: { statusCode: 400, payload: { ok: false, error: "validation", mock: true } },
  send_failed: { statusCode: 500, payload: { ok: false, error: "send_failed", mock: true } },
  rate_limited: {
    statusCode: 429,
    payload: { ok: false, error: "rate_limited", mock: true },
    headers: { "Retry-After": "60" },
  },
};

function sendJson(res, { statusCode, payload, headers }) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");

  if (headers) {
    for (const [key, value] of Object.entries(headers)) {
      res.setHeader(key, value);
    }
  }

  res.end(JSON.stringify(payload));
}

function getContactApiMockResponse(env, req) {
  const mockMode = String(env.CONTACT_API_MOCK ?? "").trim().toLowerCase();

  if (!mockMode || mockMode === "false" || mockMode === "off") {
    return null;
  }

  if (req.method !== "POST") {
    return {
      statusCode: 405,
      payload: { ok: false, error: "method_not_allowed", mock: true },
    };
  }

  if (mockMode === "true" || mockMode === "1") {
    return CONTACT_API_MOCK_RESPONSES.success;
  }

  return CONTACT_API_MOCK_RESPONSES[mockMode] ?? CONTACT_API_MOCK_RESPONSES.success;
}

function contactApiPlugin(env) {
  const handleContactMiddleware = async (req, res, next) => {
    const requestPath = req.url?.split("?")[0];

    if (requestPath !== "/api/contact") {
      return next();
    }

    const mockResponse = getContactApiMockResponse(env, req);

    if (mockResponse) {
      return sendJson(res, mockResponse);
    }

    return handleContactRequest(req, res, {
      env,
      fetchImpl: fetch,
    });
  };

  return {
    name: "contact-api-local-middleware",
    configureServer(server) {
      server.middlewares.use(handleContactMiddleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleContactMiddleware);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = {
    ...(globalThis.process?.env ?? {}),
    ...loadEnv(mode, globalThis.process?.cwd?.() ?? ".", ""),
  };

  return {
    plugins: [tailwindcss(), react(), contactApiPlugin(env)],
    build: {
      chunkSizeWarningLimit: 900,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) {
              return undefined;
            }
            if (id.includes("/react-router") || id.includes("/react-router-dom")) {
              return "vendor-router";
            }
            if (
              id.includes("/react/") ||
              id.includes("/react-dom/") ||
              id.includes("/scheduler/")
            ) {
              return "vendor-react";
            }
            if (id.includes("/gsap")) {
              return "vendor-gsap";
            }
            if (id.includes("/@vercel/")) {
              return "vendor-vercel";
            }
            return "vendor";
          },
        },
      },
    },
    test: {
      environment: "jsdom",
      setupFiles: "./src/test/setup.js",
    },
  };
});
