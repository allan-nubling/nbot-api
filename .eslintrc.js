module.exports = {
    env: {
        node: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module'
    },
    extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'prettier'],
    plugins: ['@typescript-eslint', 'prettier', 'eslint-plugin-import-helpers'],
    rules: {
        'no-new': 'off',
        'no-prototype-builtins': 'off',
        'no-restricted-syntax': 'off',
        'max-classes-per-file': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        'no-console': 'warn',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '_'
            }
        ],
        'no-useless-constructor': 'off',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'interface',
                format: ['PascalCase'],
                custom: {
                    regex: '^I[A-Z]',
                    match: true
                }
            }
        ],
        '@typescript-eslint/explicit-module-boundary-types': [
            'warn',
            {
                allowArgumentsExplicitlyTypedAsAny: true
            }
        ],
        'no-underscore-dangle': 'off',
        '@typescript-eslint/camelcase': 'off',
        'prettier/prettier': 'error',
        'class-methods-use-this': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                ts: 'never'
            }
        ],
        'import-helpers/order-imports': [
            'warn',
            {
                newlinesBetween: 'always',
                groups: ['module', '/^@server/shared/', '/^@/', ['parent', 'sibling', 'index']],
                alphabetize: { order: 'asc', ignoreCase: true }
            }
        ]
    },
    settings: {
        'import/resolver': {
            typescript: {
                project: 'tsconfig.json'
            }
        }
    }
}
