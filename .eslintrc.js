module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
    'plugin:jest-dom/recommended',
    'plugin:testing-library/recommended',
    'plugin:testing-library/react',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
    'jest-dom',
    'testing-library'
  ],
  rules: {
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 0,
    'eslint/no-case-declarations': 0,
    'no-case-declarations': 0,
    'react/display-name': 0,
    'react/no-children-prop': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'no-prototype-builtins': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 'off',
    'import/no-anonymous-default-export': 0
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
