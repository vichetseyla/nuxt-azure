import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: false,
  css: ['~/assets/css/main.css'],
  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-auth-utils"
  ],
  vite: {
    plugins: [tailwindcss()],
    build:{
      minify:"terser",
      terserOptions: {
        compress: {
          // High-value optimizations
          drop_console: true,      // Remove console.logs for prod
          drop_debugger: true,     // Remove debugger statements
          pure_funcs: ['Math.floor'], // Example: treat specific functions as side-effect free
          passes: 2,               // Run compression twice for deeper optimization
        },
        mangle: {
          // CRITICAL: Prevents breaking code that relies on specific names
          keep_classnames: true,   // Set to true if you use 'instanceof' or reflection
          keep_fnames: false,      // Usually safe to mangle, unless you use func.name
          reserved: ['MyGlobalVar', 'ImportantFunc'], // Explicitly protect these names
        },
        format: {
          comments: false,         // Strip all comments
        },
      },
    }
  },
  runtimeConfig:{
    session:{
      name: 'sesh',
      password: process.env.NUXT_SESSION_PASSWORD || '',
      cookie: {
        sameSite: 'lax',
        // 60 seconds * 60 minutes * 24 hours * 400 days
        maxAge: 60 * 60 * 24 * 400
      },
      // 60 seconds * 60 minutes * 24 hours * 400 days
      maxAge: 60 * 60 * 24 * 400
    },
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME
  },
  nitro: {
    preset:"iis-node",
    iis: {
      mergeConfig: true,
    },
  },
})