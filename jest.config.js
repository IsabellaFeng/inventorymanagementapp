module.exports = {
    clearMocks: true,

    collectCoverage: true,

    coverageDirectory: "coverage",

    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[tj]s?(x)',
    ],

    transformIgnorePatterns: [
        '/node_modules/(?!axios)',
    ],

    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },

    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

    testEnvironment: 'jsdom',

    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
};