import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginJest from "eslint-plugin-jest";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,vue}", "**/*.test.{js,mjs,cjs}"],
    ignores: ["**/node_modules/**", "**/dist/**", "**/lib/**", "**/build/**", "**/coverage/**", "**/public/**"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jquery,
        ...globals.es2021,
        ...eslintPluginJest.environments.globals.globals,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      js,
      vue: pluginVue.configs["flat/recommended"],
      jest: eslintPluginJest,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": ["error", { doubleQuote: true, printWidth: 120 }],
      ...js.configs.recommended.rules,
      ...eslintPluginJest.configs.recommended.rules,
      ...pluginVue.configs["flat/recommended"].rules,
      "prefer-const": "error",
      "no-var": "error",
      "no-console": "error",
      "no-unused-expressions": "error",
      "no-unused-vars": "error",
      "no-use-before-define": "error",
      "no-useless-constructor": "error",
      semi: ["error", "always"],
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "*",
          next: "return",
        },
      ],
    },
  },
]);
