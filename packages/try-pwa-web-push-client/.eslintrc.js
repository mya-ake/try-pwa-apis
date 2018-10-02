module.exports = {
  root: true,

  env: {
    node: true,
    serviceworker: true,
  },

  extends: ["plugin:vue/essential", "@vue/prettier"],

  rules: {
    'no-console': 'off',
    'no-debugger': 'off'
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  globals: {
    firebase: true,
  },

  'extends': [
    'plugin:vue/strongly-recommended',
    '@vue/prettier'
  ]
};
