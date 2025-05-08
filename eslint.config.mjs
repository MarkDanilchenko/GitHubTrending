import pluginJs from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import eslintPluginJest from "eslint-plugin-jest";
import vueParser from "vue-eslint-parser";

export default [
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  eslintPluginPrettier,
  eslintPluginJest.configs["flat/recommended"],
  {
    files: ["**/*.{js,mjs,cjs,vue}", "**/*.test.{js,mjs,cjs}"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/lib/**", "**/build/**", "**/coverage/**", "**/public/**"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        ...eslintPluginJest.environments.globals.globals,
      },
    },
  },
  {
    rules: {
      "prettier/prettier": ["error", { doubleQuote: true, printWidth: 120 }],
      ...pluginJs.configs.recommended.rules,
      ...eslintPluginJest.configs.recommended.rules,
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
      "vue/multi-word-component-names": "off",
      "vue/require-default-prop": "warn",
      "vue/prop-name-casing": ["error", "camelCase"],
      "vue/attribute-hyphenation": ["error", "always"],
      "vue/v-on-event-hyphenation": ["error", "always"],
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "always",
            component: "always",
          },
        },
      ],
    },
  },
];
