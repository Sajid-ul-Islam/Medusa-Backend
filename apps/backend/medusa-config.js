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

// CORS configurations
const DEFAULT_ADMIN_CORS =
  process.env.ADMIN_CORS ||
  "http://localhost:7000,http://localhost:7001,http://localhost:9000,http://localhost:3000";
const DEFAULT_STORE_CORS =
  process.env.STORE_CORS ||
  "http://localhost:8000,http://localhost:3000,http://localhost:9000";
const DEFAULT_AUTH_CORS =
  process.env.AUTH_CORS ||
  "http://localhost:7000,http://localhost:7001,http://localhost:9000,http://localhost:3000";
const DEFAULT_DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";
const DEFAULT_REDIS_URL = process.env.REDIS_URL || "";

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
        open: false,
      },
    },
  },
];

// Default module configurations (Redis event bus & cache if REDIS_URL is provided)
const modules = {};
if (process.env.REDIS_URL) {
  modules.eventBus = {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: process.env.REDIS_URL,
    },
  };
  modules.cacheService = {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: process.env.REDIS_URL,
    },
  };
} else {
  modules.eventBus = {
    resolve: "@medusajs/event-bus-local",
  };
  modules.cacheService = {
    resolve: "@medusajs/cache-inmemory",
  };
}

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
