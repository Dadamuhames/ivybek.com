import en from "./locales/en.json";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  experimental: {
    appManifest: false,
  },

  modules: ["@nuxt/icon", "@nuxt/image", "@nuxtjs/i18n"],

  app: {
    head: {
      title: en.seo.home.ogTitle,
      titleTemplate: `%s | ${en.common.brandName}`,
      meta: [
        {
          name: "description",
          content: en.seo.home.description,
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "robots", content: "index, follow" },
        { name: "referrer", content: "strict-origin-when-cross-origin" },
        { name: "theme-color", content: "#2955BA" },

        { property: "og:site_name", content: en.common.brandName },
        {
          property: "og:title",
          content: en.seo.home.ogTitle,
        },
        {
          property: "og:description",
          content: en.seo.home.description,
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://ivybek.com" },
        {
          property: "og:image",
          content: "https://ivybek.com/img/og-cover.jpg",
        },

        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: en.seo.home.ogTitle,
        },
        {
          name: "twitter:description",
          content: en.seo.home.description,
        },
        {
          name: "twitter:image",
          content: "https://ivybek.com/img/og-cover.jpg",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap",
        },
      ],
    },
  },

  css: ["@/assets/css/reset.css", "@/assets/css/main.css"],

  i18n: {
    strategy: "prefix",
    defaultLocale: "en",
    baseUrl: "https://ivybek.com",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    locales: [
      { code: "en", iso: "en-US", name: "English" },
      { code: "ru", iso: "ru-RU", name: "Russian" },
      { code: "uz", iso: "uz-UZ", name: "Uzbek" },
    ],
  },

  image: {
    provider: "ipx",
    format: ["avif", "webp"],
    screens: {
      xs: 360,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  nitro: {
    compressPublicAssets: true,
  },
});
