module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/setUpTests.ts'],
  
  // Coverage configuration
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,js}',
    '!src/jest/**',
    '!src/index.ts', // Usually just exports
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'json', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Test configuration
  testMatch: [
    '<rootDir>/src/**/*.test.{ts,js}',
    '<rootDir>/tests/**/*.{ts,js}',
  ],
  
  // Module resolution
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Performance
  maxWorkers: '50%',
  
  // Output formatting
  verbose: true,
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/',
  ],

  // Globals
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
