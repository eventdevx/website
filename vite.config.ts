import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { execSync } from "child_process";
import { existsSync } from "fs";
import { VitePWA } from "vite-plugin-pwa";

/* ============================================================
   VERSION UPDATE PLUGIN
   ============================================================ */

/*
 * This plugin updates the application version before a
 * production build by running the existing shell script.
 */
function versionUpdatePlugin(): Plugin {
  return {
    name: "version-update",

    buildStart() {
      const scriptPath = path.resolve(
        __dirname,
        "scripts/update-version.sh"
      );

      if (existsSync(scriptPath)) {
        try {
          console.log(
            "📦 Updating APP_VERSION from git tags..."
          );

          execSync(
            `bash "${scriptPath}"`,
            {
              stdio: "inherit",
            }
          );
        } catch (error) {
          console.warn(
            "⚠️ Version update skipped:",
            (error as Error).message
          );
        }
      }
    },
  };
}

/* ============================================================
   VITE CONFIGURATION
   ============================================================ */

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  /* ==========================================================
     DEVELOPMENT SERVER
     ========================================================== */

  server: {
    host: "::",
    port: 9002,
  },

  /* ==========================================================
     VITE PLUGINS
     ========================================================== */

  plugins: [
    /* ----------------------------------------------------------
       React SWC
       ---------------------------------------------------------- */
    react(),

    /* ----------------------------------------------------------
       Lovable component tagger
       ---------------------------------------------------------- */
    mode === "development" &&
      componentTagger(),

    /* ----------------------------------------------------------
       Version updater
       ---------------------------------------------------------- */
    mode === "production" &&
      versionUpdatePlugin(),

    /* ----------------------------------------------------------
       Progressive Web App
       ---------------------------------------------------------- */
    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "favicon.ico",
        "favicon.svg",
        "pwa-192x192.png",
        "pwa-512x512.png",
      ],

      workbox: {
        skipWaiting: true,

        clientsClaim: true,

        cleanupOutdatedCaches: true,

        navigateFallbackDenylist: [
          /^\/~oauth/,
        ],

        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,woff2}",
        ],

        maximumFileSizeToCacheInBytes:
          5 * 1024 * 1024,

        importScripts: [
          "sw-push.js",
        ],
      },

      /* --------------------------------------------------------
         EVENTDEVX PWA MANIFEST
         -------------------------------------------------------- */

      manifest: {
        name: "EventDevX",
        short_name: "EventDevX",
        description:
          "EventDevX event management, community, infrastructure, analytics, project, and certificate platform.",

        theme_color: "#4f46e5",

        background_color: "#edf3f7",

        display: "standalone",

        orientation: "portrait-primary",

        scope: "/",

        start_url: "/",

        icons: [
          {
            src: "favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ].filter(Boolean),

  /* ==========================================================
     PATH ALIASES
     ========================================================== */

  resolve: {
    alias: {
      "@": path.resolve(
        __dirname,
        "./src"
      ),
    },
  },
}));