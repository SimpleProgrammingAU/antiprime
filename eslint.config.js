import js from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import prettier from "eslint-config-prettier";
import jsdoc from "eslint-plugin-jsdoc";
import tsdoc from "eslint-plugin-tsdoc";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

const sourceFiles = ["src/**/*.ts"];
const testFiles = ["src/**/*.test.ts", "src/testing/**"];
const publicApiFiles = ["src/classes/**/*.ts", "src/functions/**/*.ts", "src/interfaces/**/*.ts"];

const sentence = "^\\n?([A-Z`\\d_][\\s\\S]*[.?!`]\\s*)?$";
const requiredSentence = { match: "^\\n?[A-Z`\\d_][\\s\\S]*[.?!`]\\s*$", message: "Describe this tag in a sentence." };
// Public API files only export their declarations, so plain node selectors are enough here.
// (`jsdoc/require-tags` ignores selectors that use combinators such as `>`.)
const publicDeclarations = [
  "FunctionDeclaration",
  "ClassDeclaration",
  'MethodDefinition:not([kind="constructor"]):not([key.type="PrivateIdentifier"])',
];

export default defineConfig(
  { ignores: ["dist", "coverage", "api-docs"] },
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: { allowDefaultProject: ["eslint.config.js", "*.config.ts"] },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
    },
  },
  {
    files: sourceFiles,
    ignores: testFiles,
    extends: [jsdoc.configs["flat/recommended-typescript-error"]],
    plugins: { tsdoc },
    rules: {
      "tsdoc/syntax": "error",
      "jsdoc/require-jsdoc": [
        "error",
        {
          require: { FunctionDeclaration: true, MethodDefinition: true, ClassDeclaration: true },
          contexts: [
            "VariableDeclarator > ArrowFunctionExpression",
            "TSInterfaceDeclaration",
            "TSTypeAliasDeclaration",
            "TSPropertySignature",
          ],
          checkConstructors: true,
          checkGetters: true,
          checkSetters: true,
        },
      ],
      "jsdoc/require-description": ["error", { contexts: ["any"] }],
      "jsdoc/require-param-description": "error",
      "jsdoc/require-returns-description": "error",
      "jsdoc/require-throws": "error",
      // TSDoc puts the error type in the description (``@throws `RangeError` If …``); `{Type}` is invalid TSDoc.
      "jsdoc/require-throws-type": "off",
      "jsdoc/require-hyphen-before-param-description": ["error", "always"],
      "jsdoc/match-description": [
        "error",
        {
          contexts: ["any"],
          matchDescription: sentence,
          tags: {
            param: requiredSentence,
            returns: requiredSentence,
            throws: requiredSentence,
            deprecated: requiredSentence,
            since: { match: "^\\d+\\.\\d+\\.\\d+$", message: "@since must be a version such as 1.0.0" },
          },
        },
      ],
      "jsdoc/check-values": "error",
      "jsdoc/check-tag-names": [
        "error",
        { definedTags: ["remarks", "typeParam", "defaultValue", "packageDocumentation", "privateRemarks"] },
      ],
    },
  },
  {
    files: publicApiFiles,
    ignores: testFiles,
    rules: {
      "jsdoc/require-tags": [
        "error",
        {
          tags: [...publicDeclarations, "TSInterfaceDeclaration", "TSTypeAliasDeclaration", "TSPropertySignature"].map(
            (context) => ({ tag: "since", context }),
          ),
        },
      ],
      "jsdoc/require-example": [
        "error",
        { contexts: publicDeclarations, checkConstructors: false, checkGetters: true },
      ],
    },
  },
  {
    files: ["src/index.ts"],
    rules: {
      "jsdoc/require-file-overview": ["error", { tags: { packageDocumentation: { mustExist: true } } }],
    },
  },
  {
    files: testFiles,
    ...vitest.configs.recommended,
  },
  prettier,
);
