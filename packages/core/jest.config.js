/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  globals: {
    __DEV__: true
  },
  verbose: true,
  transform: {
    '^.+.tsx?$': ['ts-jest', { diagnostics: false }]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles:['<rootDir>/setUpTests.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.test.ts',
    '!<rootDir>/src/jest/**',
    '!<rootDir>/src/server/**',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
}
