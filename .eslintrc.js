module.exports = {
    "env": {
      "node": true,
      "browser": true,
      "commonjs": true,
      "es6": true
    },
    "extends": [
      "eslint:recommended",
    ],
    "parserOptions": {
      "sourceType": "module"
    },
    "rules": {
      // "no-unused-vars": "off",
      "no-console": "off",
      "indent": [
        "error",
        2
      ],
      "linebreak-style": [
        "error",
        "unix"
      ],
      "quotes": [
        "error",
        "single"
      ],
      "semi": [
        "error",
        "always"
      ]
    }
  };
