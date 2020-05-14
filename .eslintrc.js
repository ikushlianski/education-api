module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: ['plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        semi: true,
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 80,
        tabWidth: 2,
      },
    ],
  },
};
