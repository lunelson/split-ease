module.exports = {
    "env": {
      "node": true,
      "browser": true,
      "commonjs": true,
      "es6": true,
      "jest/globals": true
    },
    "extends": [
      "eslint:recommended",
      "plugin: jest/recommended",
    ],
    "parserOptions": {
      "sourceType": "module"
    },
    "plugins": [
      "jest"
    ]
  };
