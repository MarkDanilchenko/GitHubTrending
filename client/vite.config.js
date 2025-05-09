import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import dotenv from "dotenv";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const externalEnv =
    dotenv.config({
      path: "./.env.development",
    }) || {};
  const combinedEnv = { ...env, ...externalEnv };
  const clientEnv = Object.keys(combinedEnv).reduce((acc, key) => {
    if (key.startsWith("VITE_")) {
      acc[key] = combinedEnv[key];
    }

    return acc;
  }, {});

  return {
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        "#": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    define: {
      "process.env": clientEnv,
    },
  };
});
