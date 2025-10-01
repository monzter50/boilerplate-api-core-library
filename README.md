# Boilerplate API Core Library - Monorepo

[![npm version](https://badge.fury.io/js/boilerplate-api-core-library.svg)](https://badge.fury.io/js/boilerplate-api-core-library)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Test Coverage](https://codecov.io/gh/monzter50/boilerplate-api-core-library/branch/main/graph/badge.svg)](https://codecov.io/gh/monzter50/boilerplate-api-core-library)
[![CI](https://github.com/monzter50/boilerplate-api-core-library/workflows/Release/badge.svg)](https://github.com/monzter50/boilerplate-api-core-library/actions)

A comprehensive monorepo containing HTTP client libraries for modern TypeScript applications. This repository includes packages for both browser and Node.js environments with built-in retry logic, authentication, and comprehensive error handling.

## 📦 Packages

This monorepo contains the following packages:

| Package | Version | Description |
|---------|---------|-------------|
| [**boilerplate-api-core-library**](./packages/core) | [![npm](https://img.shields.io/npm/v/boilerplate-api-core-library.svg)](https://npmjs.com/package/boilerplate-api-core-library) | Universal HTTP client library |

## ✨ Features

- 🏗️ **Monorepo Architecture**: Organized using Yarn workspaces and Turbo
- 🌍 **Universal Packages**: Works in both browser and Node.js environments
- 🔒 **Type-Safe**: Full TypeScript support with comprehensive type definitions
- 🔄 **Retry Logic**: Configurable retry mechanism with exponential backoff
- 🔐 **Authentication**: Built-in support for token-based authentication
- ⚡ **Performance**: Optimized for speed and minimal bundle size
- 🛡️ **Error Handling**: Comprehensive error handling with custom error types
- 🎯 **Simple API**: Clean and intuitive API design
- 📦 **Minimal Dependencies**: Optimized production dependencies
- 🚀 **Automated Releases**: CI/CD with Changesets for version management

## 🚀 Quick Start

### Installation

```bash
# npm
npm install boilerplate-api-core-library

# yarn
yarn add boilerplate-api-core-library

# pnpm
pnpm add boilerplate-api-core-library
```

### Basic Usage

```typescript
import { api } from 'boilerplate-api-core-library/client';

// For browser environments
const { response, status } = await api.get({
  url: 'https://api.example.com/users',
  contentType: 'application/json'
});
```

For detailed usage examples, see the [Core Package Documentation](./packages/core/README.md).

## 🏗️ Monorepo Structure

```
├── packages/
│   └── core/                   # Core HTTP client library
│       ├── src/
│       │   ├── client/         # Browser-specific implementations
│       │   ├── server/         # Node.js-specific implementations
│       │   ├── core/           # Shared core functionality
│       │   └── types/          # TypeScript type definitions
│       └── README.md
├── examples/
│   ├── client/                 # Browser usage examples
│   └── server/                 # Node.js usage examples
├── .github/
│   └── workflows/              # CI/CD workflows
│       ├── release.yml         # Automated releases
│       └── pull_request_checks.yml  # PR quality checks
└── docs/                       # Documentation

## 🎯 Examples

Check out the [`examples`](./examples) directory for complete working examples:

- **[Browser Example](./examples/client/)**: Web application usage with HTML/JS
- **[Node.js Example](./examples/server/)**: Server-side usage with TypeScript

### Running Examples

```bash
# Server example
yarn example:server

# Client example (builds and serves)
yarn example:client:build
yarn example:client:serve
```

## 🛠️ Development

### Prerequisites

- Node.js >= 18
- Yarn >= 1.22.1

### Setup

```bash
# Clone the repository
git clone https://github.com/monzter50/boilerplate-api-core-library.git
cd boilerplate-api-core-library

# Install dependencies
yarn install

# Build all packages
yarn build
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `yarn build` | Build all packages |
| `yarn test` | Run tests for all packages |
| `yarn test:coverage` | Run tests with coverage |
| `yarn lint` | Lint all packages |
| `yarn format` | Format code with Prettier |
| `yarn type-check` | Run TypeScript type checking |
| `yarn clean` | Clean build artifacts |
| `yarn dev` | Development mode with watch |

### Release Process

This monorepo uses [Changesets](https://github.com/changesets/changesets) for version management and automated releases:

```bash
# 1. Create a changeset for your changes
yarn changeset

# 2. Version packages (updates CHANGELOG and package.json)
yarn changeset:version

# 3. Commit and push - CI will handle the release
git add .
git commit -m "chore: version packages"
git push
```

### CI/CD

- **Pull Requests**: Automated quality checks (tests, linting, type checking)
- **Main Branch**: Automated releases when changesets are detected
- **Workflows**: Located in `.github/workflows/`

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Setup

1. Fork and clone the repository
2. Install dependencies: `yarn install`
3. Run tests: `yarn test`
4. Build the project: `yarn build`

## 📄 License

MIT © [Monster Codes](https://github.com/monzter50)

## 🙏 Acknowledgments

- Inspired by modern HTTP client libraries
- Built with TypeScript and modern JavaScript features
- Designed for universal usage across environments

---

**Star ⭐ this repo if you find it helpful!**

