import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      }
    },
    rules: {
      'linebreak-style': ['error', 'unix'],
      'no-console': 0,
      'require-yield': 'off'
    }
  },
  {
    files: ["test/**/*.js"],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
      }
    }
  }
];