import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    redisUrl: process.env.REDIS_URL,
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: process.env.NODE_ENV !== "development" ?
       { ssl: { rejectUnauthorized: false }, pool: { min: 0, max: 10 },idle_in_transaction_session_timeout:10000 }:{},

    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: [
    {
      resolve: "./src/modules/sanity",
      options: {
        api_token: process.env.SANITY_API_TOKEN,
        project_id: process.env.SANITY_PROJECT_ID,
        api_version: new Date().toISOString().split("T")[0],
        dataset: "production",
        studio_url: process.env.SANITY_STUDIO_URL || 
          "http://localhost:3000/studio",
        type_map: {
          product: "product",
        },
      },
    },
  ],
})
