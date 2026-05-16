import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

import { handleContactRequest } from "./api/contact";
import tailwindcss from "@tailwindcss/vite";

function contactApiDevPlugin(env) {
  return {
    name: "contact-api-dev-middleware",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const requestPath = req.url?.split("?")[0];

        if (requestPath !== "/api/contact") {
          return next();
        }

        return handleContactRequest(req, res, {
          env,
          fetchImpl: fetch,
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = {
    ...(globalThis.process?.env ?? {}),
    ...loadEnv(mode, globalThis.process?.cwd?.() ?? ".", ""),
  };

  return {
    plugins: [tailwindcss(), react(), contactApiDevPlugin(env)],
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
