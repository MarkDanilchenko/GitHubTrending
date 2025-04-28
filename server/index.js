import server from "./server.js";
import { expressOptions, mongoOptions } from "./env.js";
import logger from "./services/loggerConfig.js";
import mongoose from "./models/init.js";
import repositoriesSyncController from "./controllers/repositoriesSync.js";

/**
 * Starts the Express.js server, connects to MongoDB and enable auto synchronization with GitHub.
 *
 * @async
 * @returns {Promise<void>}
 */
async function startServer() {
  try {
    await mongoose.connect(`mongodb://${mongoOptions.host}:${mongoOptions.port}/`, {
      user: mongoOptions.username,
      pass: mongoOptions.password,
      dbName: mongoOptions.database,
    });
    logger.info(`Mongoose is connected on host: ${mongoOptions.host}, port: ${mongoOptions.port}`);

    server.listen(expressOptions.port, expressOptions.host, () => {
      logger.info(`Server is running on http://${expressOptions.host}:${expressOptions.port}`);

      logger.info(`Auto synchronization is enabled. Remaining in ${expressOptions.autoSyncRemaining}s`);
      repositoriesSyncController.autoSync();
    });
  } catch (error) {
    logger.error("Error: " + error.message);
  }
}

await startServer();

process.on("SIGINT", async () => {
  await mongoose.disconnect();

  logger.info("Mongoose disconnected!");
  logger.info("Server stopped!");

  process.exit(0);
});
