import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { expressOptions } from "./env.js";

const server = express();
const absolutePath = path.dirname(fileURLToPath(import.meta.url));

server.use(cors({ origin: "*" }));
server.use(cookieParser(expressOptions.cookieSecret));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/static", express.static(path.join(absolutePath, "/assets")));

// server.use("/api/v1"); // TODO add router

server.get("/test", (req, res) => {
  /*
		#swagger.ignore = true
	*/
  res.status(200);
  res.send(JSON.stringify({ message: "test" }));
  res.end();
});

server.all(/(.*)/, (req, res) => {
  /*
		#swagger.ignore = true
	*/
  res.status(404);
  res.send(JSON.stringify({ message: "Resource is not Found" }));
  res.end();
});

export default server;
