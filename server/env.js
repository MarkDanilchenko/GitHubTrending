import dotenv from "dotenv";
dotenv.config({ path: "../.env.development" });

const { COOKIE_SECRET, EXPRESS_SERVER_HOST, EXPRESS_SERVER_PORT, MONGO_HOST, MONGO_PORT, AUTO_SYNC_TIME } = process.env;

const expressOptions = {
  host: EXPRESS_SERVER_HOST,
  port: EXPRESS_SERVER_PORT || 3000,
  cookieSecret: COOKIE_SECRET,
  autoSyncTime: AUTO_SYNC_TIME || 3600,
};

const mongoOptions = {
  host: MONGO_HOST,
  port: MONGO_PORT || 27017,
};

export { expressOptions, mongoOptions };
