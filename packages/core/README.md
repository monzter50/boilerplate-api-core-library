# boilerplate-api-core-library

[![npm version](https://badge.fury.io/js/boilerplate-api-core-library.svg)](https://badge.fury.io/js/boilerplate-api-core-library)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/boilerplate-api-core-library.svg)](https://bundlephobia.com/result?p=boilerplate-api-core-library)

A **flexible** and **type-safe** HTTP client library for both browser and Node.js environments with built-in retry logic, authentication, and comprehensive error handling.

## ✨ Features

- 🌍 **Universal**: Works in both browser and Node.js environments
- 🔒 **Type-Safe**: Full TypeScript support with comprehensive type definitions
- 🔄 **Retry Logic**: Configurable retry mechanism with exponential backoff
- 🔐 **Authentication**: Built-in support for token-based authentication
- ⚡ **Performance**: Optimized for speed and minimal bundle size
- 🛡️ **Error Handling**: Comprehensive error handling with custom error types
- 🎯 **Simple API**: Clean and intuitive API design
- 📦 **Minimal Dependencies**: Only essential production dependencies

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
import { api } from 'boilerplate-api-core-library/client';

// Simple GET request
const { response, status } = await api.get<User[]>({
  url: 'https://api.example.com/users',
  contentType: 'application/json'
});

if (status === 'ok') {
  console.log('Users:', response);
} else {
  console.error('Error:', response);
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

### Available Imports

```typescript
// Browser environment
import { api } from 'boilerplate-api-core-library/client';

// Node.js environment
import { nodeApi } from 'boilerplate-api-core-library/server';

// Universal imports (detects environment)
import { api, nodeApi } from 'boilerplate-api-core-library';

// Types only
import type { ArgsProps, ApiResponse, RetryConfig } from 'boilerplate-api-core-library';
```

### Core Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `get<T>(args)` | Perform GET request | `ArgsProps` |
| `post<T>(args)` | Perform POST request | `ArgsProps` |
| `patch<T>(args)` | Perform PATCH request | `ArgsProps` |
| `delete<T>(args)` | Perform DELETE request | `ArgsProps` |

### Configuration Interface

```typescript
interface ArgsProps {
  url: string;                    // Request URL
  contentType: string;            // Content type header
  body?: FormData | JSONTypes;    // Request body
  mode?: RequestMode;             // CORS mode (browser only)
  defaultErr?: string;            // Default error message
  authentication?: {              // Auth configuration
    token?: string;               // Bearer token
    otpToken?: string;            // OTP token
  };
  opts?: {
    requiredAuth?: boolean;       // Require authentication
    requiredOtp?: boolean;        // Require OTP token
    retry?: RetryConfig;          // Retry configuration
  };
}
```

### Response Interface

```typescript
interface ApiResponse<T = any> {
  status: 'ok' | 'error';
  response: T;                    // Response data or error details
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
  retryOnNetworkError?: boolean; // Retry on network errors (default: true)
}
```

## 🔧 Advanced Usage

### Custom Retry Logic

```typescript
import { api } from 'boilerplate-api-core-library/client';

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

### Authentication & OTP

```typescript
import { nodeApi } from 'boilerplate-api-core-library/server';

const result = await nodeApi.post<CreateOrderResponse>({
  url: 'https://api.example.com/orders',
  contentType: 'application/json',
  body: {
    productId: '123',
    quantity: 2
  },
  authentication: {
    token: process.env.API_TOKEN,
    otpToken: process.env.OTP_TOKEN  // For two-factor authentication
  },
  opts: {
    requiredAuth: true,
    requiredOtp: true
  }
});
```

### Error Handling

```typescript
import { api } from 'boilerplate-api-core-library/client';

const { response, status } = await api.get<User[]>({
  url: 'https://api.example.com/users',
  contentType: 'application/json',
  defaultErr: 'Failed to fetch users'
});

if (status === 'error') {
  // Handle different error types
  if (typeof response === 'string') {
    console.error('Error message:', response);
  } else if (response instanceof Error) {
    console.error('Error object:', response.message);
  } else {
    console.error('API error:', response);
  }
}
```

### FormData Support

```typescript
import { api } from 'boilerplate-api-core-library/client';

const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('description', 'My file');

const result = await api.post({
  url: 'https://api.example.com/upload',
  contentType: 'multipart/form-data',
  body: formData
});
```

## 📊 Bundle Size

| Environment | Minified | Minified + Gzipped |
|-------------|----------|-------------------|
| Browser | ~8KB | ~3KB |
| Node.js | ~10KB | ~4KB |

## 🔒 Security

- **No sensitive data logging**: Tokens and sensitive information are never logged
- **HTTPS enforcement**: Supports secure connections
- **CORS handling**: Proper CORS configuration for browser environments
- **Input validation**: Request parameters are validated before sending

## 🌍 Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

## 📝 Examples

### Real-world API Integration

```typescript
import { nodeApi } from 'boilerplate-api-core-library/server';

class UserService {
  private baseUrl = 'https://api.example.com';
  private token = process.env.API_TOKEN;

  async getUsers(page: number = 1): Promise<User[]> {
    const { response, status } = await nodeApi.get<{ users: User[] }>({
      url: `${this.baseUrl}/users?page=${page}`,
      contentType: 'application/json',
      authentication: { token: this.token },
      opts: {
        requiredAuth: true,
        retry: { maxRetries: 3 }
      }
    });

    if (status === 'error') {
      throw new Error(`Failed to fetch users: ${response}`);
    }

    return response.users;
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    const { response, status } = await nodeApi.post<User>({
      url: `${this.baseUrl}/users`,
      contentType: 'application/json',
      body: userData,
      authentication: { token: this.token },
      opts: { requiredAuth: true }
    });

    if (status === 'error') {
      throw new Error(`Failed to create user: ${response}`);
    }

    return response;
  }
}
```

## 🤝 Contributing

We welcome contributions! Please see the [main repository](../../README.md) for contribution guidelines.

### Development

```bash
# Install dependencies (from monorepo root)
yarn install

# Build the package
yarn build

# Run tests
yarn test

# Run tests with coverage
yarn test:coverage

# Type checking
yarn type-check

# Linting
yarn lint
```

## 📄 License

MIT © [Monster Codes](https://github.com/monzter50)

## 🙏 Acknowledgments

- Inspired by modern HTTP client libraries like Axios and Fetch API
- Built with TypeScript for maximum type safety
- Designed for universal usage across environments

---

**⭐ Star this repo if you find it helpful!**

For more examples and documentation, visit the [main repository](../../README.md).