# boilerplate-api-core-library

[![npm version](https://badge.fury.io/js/boilerplate-api-core-library.svg)](https://badge.fury.io/js/boilerplate-api-core-library)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Test Coverage](https://codecov.io/gh/monzter50/boilerplate-api-core-library/branch/main/graph/badge.svg)](https://codecov.io/gh/monzter50/boilerplate-api-core-library)

A **flexible** and **type-safe** HTTP client library for both browser and Node.js environments with built-in retry logic, authentication, and comprehensive error handling.

## ✨ Features

- 🌍 **Universal**: Works in both browser and Node.js environments
- 🔒 **Type-Safe**: Full TypeScript support with comprehensive type definitions
- 🔄 **Retry Logic**: Configurable retry mechanism with exponential backoff
- 🔐 **Authentication**: Built-in support for token-based authentication
- ⚡ **Performance**: Optimized for speed and minimal bundle size
- 🛡️ **Error Handling**: Comprehensive error handling with custom error types
- 🎯 **Simple API**: Clean and intuitive API design
- 📦 **Zero Dependencies**: Minimal production dependencies

## 📦 Installation

```bash
# npm
npm install boilerplate-api-core-library

# yarn
yarn add boilerplate-api-core-library

# pnpm
pnpm add boilerplate-api-core-library
```

## 🚀 Quick Start

### Browser Usage

```typescript
import { api } from 'boilerplate-api-core-library';

// Simple GET request
const { response, status } = await api.get<User[]>({
  url: 'https://api.example.com/users',
  contentType: 'application/json'
});

if (status === 'ok') {
  console.log('Users:', response);
}
```

### Node.js Usage

```typescript
import { nodeApi } from 'boilerplate-api-core-library/server';

// POST request with authentication
const { response, status } = await nodeApi.post<CreateUserResponse>({
  url: 'https://api.example.com/users',
  contentType: 'application/json',
  body: { name: 'John Doe', email: 'john@example.com' },
  authentication: { token: 'your-auth-token' },
  opts: {
    requiredAuth: true,
    retry: {
      maxRetries: 3,
      retryDelay: 1000
    }
  }
});
```

## 📖 API Reference

### Core Methods

| Method | Description | Parameters |
|--------|-----------|-----------|
| `get<T>()` | Perform GET request | `ArgsProps` |
| `post<T>()` | Perform POST request | `ArgsProps` |
| `patch<T>()` | Perform PATCH request | `ArgsProps` |
| `delete<T>()` | Perform DELETE request | `ArgsProps` |

### Configuration Options

```typescript
interface ArgsProps {
  url: string;                    // Request URL
  contentType: string;            // Content type header
  body?: FormData | JSONTypes;    // Request body
  mode?: RequestMode;             // CORS mode
  authentication?: {              // Auth configuration
    token?: string;
    otpToken?: string;
  };
  opts?: {
    requiredAuth?: boolean;       // Require authentication
    requiredOtp?: boolean;        // Require OTP
    retry?: RetryConfig;          // Retry configuration
  };
}
```

### Retry Configuration

```typescript
interface RetryConfig {
  maxRetries?: number;           // Maximum retry attempts (default: 3)
  retryDelay?: number;           // Initial delay in ms (default: 1000)
  retryDelayMultiplier?: number; // Backoff multiplier (default: 2)
  maxRetryDelay?: number;        // Maximum delay in ms (default: 30000)
  retryOnStatus?: number[];      // HTTP status codes to retry on
  retryOnNetworkError?: boolean; // Retry on network errors
}
```

## 🔧 Advanced Usage

### With Retry Logic

```typescript
import { api } from '@monster-codes/api-core-library';

const result = await api.get<ApiResponse>({
  url: 'https://unreliable-api.example.com/data',
  contentType: 'application/json',
  opts: {
    retry: {
      maxRetries: 5,
      retryDelay: 1000,
      retryDelayMultiplier: 2,
      maxRetryDelay: 10000,
      retryOnStatus: [408, 429, 500, 502, 503, 504],
      retryOnNetworkError: true
    }
  }
});
```

### With Authentication

```typescript
import { nodeApi } from '@monster-codes/api-core-library/server';

const result = await nodeApi.post<CreateOrderResponse>({
  url: 'https://api.example.com/orders',
  contentType: 'application/json',
  body: {
    productId: '123',
    quantity: 2
  },
  authentication: {
    token: process.env.API_TOKEN,
    otpToken: process.env.OTP_TOKEN
  },
  opts: {
    requiredAuth: true,
    requiredOtp: true
  }
});
```

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

## 🧪 Testing

```bash
# Run tests
yarn test

# Run tests with coverage
yarn test:coverage

# Run linting
yarn lint
```

## 📊 Bundle Size

| Environment | Minified | Minified + Gzipped |
|-------------|----------|-------------------|
| Browser | ~8KB | ~3KB |
| Node.js | ~10KB | ~4KB |

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

