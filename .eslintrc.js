module.exports = {
  root: true,
  env: {
    node: true,
    serviceworker: true,
  },
  'extends': [
    'plugin:vue/recommended',
    '@vue/prettier'
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
        'trailingComma': 'all',
      }
    ],
    'no-console': 'off',
    'no-debugger': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    firebase: true,
  },
}
