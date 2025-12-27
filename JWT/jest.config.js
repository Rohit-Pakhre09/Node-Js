export default {
    testEnvironment: 'node',
    transform: {
        '^.+\.js$': 'babel-jest',
    },
    moduleFileExtensions: ['js'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
};