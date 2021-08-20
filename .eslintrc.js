module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": ["error", { allow: ["error", "warn", "info"] }],
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        trailingComma: "none"
      }
    ],
    "vue/no-v-html": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "vue/component-tags-order": [
      "error",
      {
        order: ["template", "script", "style"]
      }
    ],
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        registeredComponentsOnly: true,
        ignores: []
      }
    ],

    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-use-before-define": 1,
    "@typescript-eslint/no-unused-vars": 2
  }
};
