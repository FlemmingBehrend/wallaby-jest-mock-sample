module.exports = function(wallaby) {
    return {
        files: ['src/*.js', { pattern: 'src/*.spec.js', ignore: true }, '__mocks__/*.js'],
        tests: ['src/*.spec.js'],
        env: {
            type: 'node',
            runner: 'node',
            params: {
                runner: '--harmony'
            }
        },
        testFramework: 'jest',
        compilers: {
            '**/*.js*': wallaby.compilers.babel({ babelrc: true, presets: ['babel-preset-jest'] })
        }
    };
};
