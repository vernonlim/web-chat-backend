/* eslint-env node */
module.exports = {
    "extends": [
        'eslint:recommended', 
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
    ],
    "parser": '@typescript-eslint/parser',
    "parserOptions": {
        "project": ["tsconfig.json", ".eslintrc.cjs"],
    },
    "rules": {
        "@typescript-eslint/no-unused-vars": 1,
        "@typescript-eslint/no-explicit-any": 1,
        "@typescript-eslint/no-misused-promises": 0,
    },
    "plugins": ['@typescript-eslint'],
    "root": true,
};