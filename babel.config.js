module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    '@config': './src/config',
                    '@jobs': './src/jobs',
                    '@services': './src/services',
                    '@models': './src/models',
                    '@utils': './src/utils',
                    '@controllers': './src/controllers',
                    '@middlewares': './src/middlewares'
                }
            }
        ]
    ],
    ignore: ['**/*.spec.ts']
}
