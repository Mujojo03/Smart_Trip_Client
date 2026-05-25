import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores:[
      "node_modules/**",
      "dist/**",
      "build/**",
    ],
  },

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],

    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  reactPlugin.configs.flat.recommended,

  {
    plugins: {
      "react-hooks": reactHooks,
    },

    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",

      "no-prototype-builtins": "off",
      "no-undef": "off",

      "no-cond-assign": "error",
      "no-fallthrough": "error",

      "no-empty": "warn",
      "react/no-unescaped-entities": "warn",

      // "react-hooks/rules-of-hooks": "error",
      // "react-hooks/exhaustive-deps": "warn",

      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": "warn",

    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);