# @monster-codes/boilerplate-api-core-library

Welcome to the `@monster-codes/boilerplate-api-core-library`! This library provides a boilerplate for creating API core functionalities. We appreciate your interest in contributing to this project. This guide will help you get started with contributing to our library.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Setup](#development-setup)
3. [Project Structure](#project-structure)
4. [Making Changes](#making-changes)
5. [Testing](#testing)
6. [Running Examples](#running-examples)
7. [Submitting a Pull Request](#submitting-a-pull-request)
8. [Code Style](#code-style)
9. [Reporting Issues](#reporting-issues)

## Getting Started

First, fork the repository on GitHub and clone your fork locally.

```bash
git clone https://github.com/[YOUR-USERNAME]/boilerplate-api-core-library.git
cd boilerplate-api-core-library
```

## Development Setup

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Build the project:
   ```bash
   yarn build
   ```

3. Run tests:
   ```bash
   yarn test
   ```

## Project Structure

The project is structured as follows:

```
src/
├── client/
│   ├── DomFetchProvider.ts
│   └── index.ts
├── server/
│   ├── NodeFetchProvider.ts
│   └── index.ts
├── core/
│   ├── apiCore.ts
│   ├── settings.ts
│   └── types.ts
└── index.ts
```

- `client/`: Contains client-side specific code
- `server/`: Contains server-side specific code
- `core/`: Contains shared core functionality

## Making Changes

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git commit -m "Description of your changes"
   ```

3. Push your changes to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

## Testing

We use Jest for testing. Please ensure that all new features or bug fixes are covered by tests. To run the tests:

```bash
yarn test
```

## Running Examples

This project includes example implementations for both server-side (Node.js) and client-side (web browser) usage of the library.

### Server Example

To run the server-side example (demonstrates using `nodeApi`):

```bash
yarn example:server
```

**Note:** This example uses a placeholder URL (`http://internal-service.local`). You will likely see an `ENOTFOUND` error. To make it work, you'll need to modify `examples/server/server-example.ts` to point to a valid API endpoint.

### Client Web Example

To run the client-side web example (demonstrates using `api` in a browser):

1.  **Build the example script:** This bundles the example TypeScript code into a JavaScript file the browser can understand.
    ```bash
    yarn example:client:build
    ```

2.  **Serve the example:** This starts a local web server and opens the `index.html` page in your default browser.
    ```bash
    yarn example:client:serve
    ```

    Once the page loads, click the "Fetch Sample Data" button to see the client library interact with the JSONPlaceholder test API.

## Submitting a Pull Request

1. Ensure your code adheres to the existing style.
2. Run the test suite and ensure that all tests pass.
3. Submit a pull request with a clear title and description.

## Code Style

We use TypeScript and follow these general guidelines:

- Use 4 spaces for indentation
- Use single quotes for strings
- Use semicolons at the end of statements
- Follow the existing code style in the project

## Reporting Issues

If you find a bug or have a suggestion for improvement, please open an issue on the GitHub repository. When reporting issues, please include:

- A clear and descriptive title
- A detailed description of the issue or suggestion
- Steps to reproduce the issue (if applicable)
- Any relevant code snippets or error messages

Thank you for contributing to `@monster-codes/boilerplate-api-core-library`! 🎉 We appreciate your help in making this boilerplate better for everyone.

