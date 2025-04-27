import server from "./server.js";
import { expressOptions, mongoOptions } from "./env.js";
import logger from "./services/loggerConfig.js";
import mongoose from "./models/init.js";

/**
 * Starts the Express.js server and connects to MongoDB.
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
    });
  } catch (error) {
    logger.error("Error: " + error.message);
  }
}

await startServer();

// let autoSync = require("./controllers/autosync.js");

//       app.listen(port_server, host_server, () => {
//         if (process.env.SERVER_PORT_OUTER) {
//           console.log(`Server running at http://${host_server}:${process.env.SERVER_PORT_OUTER}/`);
//         } else {
//           console.log(`Server running at http://${host_server}:${port_server}/`);
//         }

//         autoSync.startTimer();

process.on("SIGINT", async () => {
  await mongoose.disconnect();

  logger.info("Mongoose disconnected!");
  logger.info("Server stopped!");

  process.exit(0);
});
