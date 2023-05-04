module.exports = {
    presets: ['@babel/preset-env'],
    plugins: [
        [
            '@babel/plugin-proposal-decorators',
            {
                version: '2022-03',
            },
        ],
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-class-static-block',
        '@babel/plugin-proposal-optional-catch-binding',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-private-methods',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-unicode-property-regex',
        '@babel/plugin-syntax-export-default-from',
        '@babel/plugin-transform-async-to-generator',
    ],
}
