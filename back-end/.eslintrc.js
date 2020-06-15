module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "plugins": ['eslint-plugin-local-rules'],
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "rules": {
        "local-rules/no-inner-html": 1
    }
};
