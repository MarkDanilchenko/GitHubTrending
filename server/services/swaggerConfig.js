import swaggerAutogen from "swagger-autogen";
import { expressOptions } from "../env.js";

const docConfig = {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "GitHub Trending API Documentation (OpenAPIv3)",
    description:
      "This service is to check GitHub API and pull basic information about the most trending repositories using NodeJS(ExpressJS), Vue3 and MongoDB.",
  },
  servers: [
    {
      url: `http://${expressOptions.host}:${expressOptions.port}`,
      description: "API server",
    },
  ],
  tags: [
    {
      name: "Repositories",
      description: "GitHub synchronization and repositories information pulling endpoints",
    },
  ],
  components: {
    // "@schemas": {},
    // parameters: {},
  },
};

const outputFile = "../docs/swagger-output.json";
const endpointsFiles = ["../server.js"];

swaggerAutogen({
  openapi: "3.0.0",
})(outputFile, endpointsFiles, docConfig);
