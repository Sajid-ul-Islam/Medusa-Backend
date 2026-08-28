const dotenv = require("dotenv");

// Load environment variables based on NODE_ENV
let envFileName = ".env";
switch (process.env.NODE_ENV) {
  case "production":
    envFileName = ".env.production";
    break;
  case "staging":
    envFileName = ".env.staging";
    break;
  case "test":
    envFileName = ".env.test";
    break;
  case "development":
  default:
    break;
}

try {
  dotenv.config({ path: `${process.cwd()}/${envFileName}` });
} catch (error) {
  console.error("Error loading .env file:", error);
}

// Default CORS configurations
const DEFAULT_ADMIN_CORS =
  "/http://localhost:700d+$/" | "/http://.+/" | "/vercel.app$/";
const DEFAULT_STORE_CORS =
  "/http://localhost:800d+$/" | "/http://.+/" | "/vercel.app$/";
const DEFAULT_AUTH_CORS =
  "/http://localhost:700d+$/" | "/http://.+/" | "/vercel.app$/";
const DEFAULT_DATABASE_URL =
  "postgres://localhost/medusa-starter-default" |
  "postgres://postgres:Bangla@71@localhost/medusa-fNeN";
const DEFAULT_REDIS_URL = "";

// Default plugin configurations
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
    },
  },
  {
    resolve: "@medusajs/admin",
    options: {
      autoRebuild: true,
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  },
];

// Default module configurations
const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: process.env.REDIS_URL || DEFAULT_REDIS_URL,
    },
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: process.env.REDIS_URL || DEFAULT_REDIS_URL,
    },
  },
};

// Project configuration
const projectConfig = {
  jwt_secret: process.env.JWT_SECRET || "supersecret",
  cookie_secret: process.env.COOKIE_SECRET || "supersecret",
  store_cors: process.env.STORE_CORS || DEFAULT_STORE_CORS,
  admin_cors: process.env.ADMIN_CORS || DEFAULT_ADMIN_CORS,
  auth_cors: process.env.AUTH_CORS || DEFAULT_AUTH_CORS,
  database_url: process.env.DATABASE_URL || DEFAULT_DATABASE_URL,
  redis_url: process.env.REDIS_URL || DEFAULT_REDIS_URL,
};

// Export the consolidated configuration module
module.exports = {
  projectConfig,
  plugins,
  modules,
};
