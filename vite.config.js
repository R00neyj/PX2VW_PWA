import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ command }) => {
  const isProduction = command === "build";
  const base = isProduction ? "/PX2VW_PWA/" : "/";

  return {
    base,
    plugins: [
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: "auto",
        devOptions: {
          enabled: true,
        },
        includeAssets: ["favicon.ico", "apple-touch-icon.png", "favicon.svg", "pwa-192x192.png", "pwa-512x512.png"],
        manifest: {
          name: "PX2VW Convertor",
          short_name: "PX Conv",
          description: "CSS px to vw 단위 자동 변환 도구",
          theme_color: "#ffffff",
          background_color: "#ffffff",
          display: "standalone",
          start_url: base,
          scope: base,
          id: base,
          lang: "ko-KR",
          orientation: "portrait",
          categories: ["utilities", "developer tools"],
          icons: [
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
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "google-fonts-cache",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "gstatic-fonts-cache",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "jsdelivr-cache",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
      }),
    ],
  };
});
