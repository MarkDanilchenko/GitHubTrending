import express from "express";
import fs from "fs";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { expressOptions } from "./env.js";
import swaggerUI from "swagger-ui-express";

const server = express();
const absolutePath = path.dirname(fileURLToPath(import.meta.url));

server.use(cors({ origin: "*" }));
server.use(cookieParser(expressOptions.cookieSecret));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/static", express.static(path.join(absolutePath, "/assets")));

const swaggerDocs = fs.readFileSync(path.join(absolutePath, "/docs/swagger-output.json"), "utf-8");
const swaggerUIOptions = {
  explorer: true,
  swaggerOptions: {
    url: "/api/v1/docs/swagger-output.json",
  },
};
server.get("/api/v1/docs/swagger-output.json", (req, res) => {
  /*
		#swagger.ignore = true
	*/
  res.status(200);
  res.json(JSON.parse(swaggerDocs));
  res.end();
});
server.use("/api/v1/docs", swaggerUI.serveFiles(null, swaggerUIOptions), swaggerUI.setup(null, swaggerUIOptions));

server.all("/", (req, res) => {
  /*
		#swagger.ignore = true
	*/
  res.status(302);
  res.redirect("/api/v1");
});

server.get("/test", (req, res) => {
  /*
		#swagger.ignore = true
	*/
  res.status(200);
  res.send(JSON.stringify({ message: "test" }));
  res.end();
});

// server.use("/api/v1"); // TODO add router

server.all(/(.*)/, (req, res) => {
  /*
		#swagger.ignore = true
	*/
  res.status(404);
  res.send(JSON.stringify({ message: "Resource is not Found" }));
  res.end();
});

export default server;
