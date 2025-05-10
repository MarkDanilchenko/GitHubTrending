import dotenv from "dotenv";
dotenv.config({ path: "./.env.development" });

const {
  COOKIE_SECRET,
  VITE_EXPRESS_SERVER_HOST,
  VITE_EXPRESS_SERVER_PORT,
  MONGO_HOST,
  MONGO_PORT,
  AUTO_SYNC_REMAINING,
  MONGO_INITDB_DATABASE,
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
} = process.env;

const expressOptions = {
  host: VITE_EXPRESS_SERVER_HOST,
  port: VITE_EXPRESS_SERVER_PORT || 3000,
  cookieSecret: COOKIE_SECRET,
  autoSyncRemaining: AUTO_SYNC_REMAINING || 3600,
};

const mongoOptions = {
  host: MONGO_HOST,
  port: MONGO_PORT || 27017,
  database: MONGO_INITDB_DATABASE,
  username: MONGO_INITDB_ROOT_USERNAME,
  password: MONGO_INITDB_ROOT_PASSWORD,
};

export { expressOptions, mongoOptions };
