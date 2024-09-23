/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  globals: {
    __DEV__: true
  },
  verbose: true,
  transform: {
    '^.+.tsx?$': ['ts-jest', {}]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles:['<rootDir>/setUpTests.ts'],
}
