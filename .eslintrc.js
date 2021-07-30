module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  rules: {
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    semi: [2, "always"]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
