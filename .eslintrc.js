
module.exports = {
  extends: [
    "eslint:recommended",
  ],
  parser: "babel-eslint",
  plugins: [
    "react"
  ],
  parserOptions: {
    codeFrame: false,
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    "no-console": 0,
    semi: 1,
    eqeqeq: 1,
    "no-unused-vars": 1,
    "no-useless-escape": 1,
    "react/jsx-key": 1,
    "react/jsx-uses-vars": 1,
    "react/no-string-refs": 1,
    "react/react-in-jsx-scope": 1,
    "react/no-unknown-property": 1,
    "react/jsx-uses-react": 1,
  }
};
