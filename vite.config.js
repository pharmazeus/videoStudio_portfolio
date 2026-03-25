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
    test: {
      environment: "jsdom",
      setupFiles: "./src/test/setup.js",
    },
  };
});
