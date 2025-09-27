# Contributing to @monster-codes/api-core-library

Thank you for your interest in contributing to the API Core Library! 🎉

This document provides guidelines and information for contributing to this project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Code Style](#code-style)
- [Submitting Changes](#submitting-changes)
- [Release Process](#release-process)

## 📜 Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [maintainer-email].

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Accept responsibility for mistakes

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn or npm
- Git

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR-USERNAME/boilerplate-api-core-library.git
cd boilerplate-api-core-library
```

## 🛠️ Development Setup

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Build the project:**
   ```bash
   yarn build
   ```

3. **Run tests:**
   ```bash
   yarn test
   ```

4. **Run tests with coverage:**
   ```bash
   yarn test:coverage
   ```

5. **Lint code:**
   ```bash
   yarn lint
   ```

## 🏗️ Project Structure

```
src/
├── client/                 # Browser-specific implementations
│   ├── DomFetchProvider.ts  # DOM fetch provider
│   └── index.ts            # Client exports
├── server/                 # Node.js-specific implementations
│   ├── NodeFetchProvider.ts # Node.js fetch provider
│   └── index.ts            # Server exports
├── core/                   # Shared core functionality
│   ├── apiCore.ts          # Main API factory
│   ├── settings.ts         # Configuration handling
│   ├── types.ts           # Type definitions
│   ├── retryUtils.ts      # Retry logic utilities
│   └── validationAuth.ts  # Authentication validation
├── errors/                 # Error handling
│   └── ApiError.ts        # Custom error classes
└── index.ts               # Main library entry point

examples/
├── client/                # Browser example
└── server/                # Node.js example

tests/                     # Test files (mirror src structure)
```

## 🔄 Making Changes

### Branching Strategy

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. Use descriptive branch names:
   - `feature/add-request-interceptors`
   - `fix/retry-logic-timeout`
   - `docs/improve-api-examples`

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat: add request timeout configuration"
git commit -m "fix(retry): handle network errors correctly"
git commit -m "docs: update API reference for authentication"
```

## 🧪 Testing

### Writing Tests

- Write tests for all new features and bug fixes
- Place test files next to source files with `.test.ts` extension
- Use descriptive test names that explain the behavior being tested

```typescript
describe('apiFactory', () => {
  it('should retry failed requests when retry config is provided', async () => {
    // Test implementation
  });
});
```

### Test Categories

1. **Unit Tests**: Test individual functions/classes
2. **Integration Tests**: Test component interactions
3. **End-to-end Tests**: Test complete workflows

### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run specific test file
yarn test src/core/apiCore.test.ts

# Run tests with coverage
yarn test:coverage
```

## 🎨 Code Style

### TypeScript Guidelines

- Use TypeScript for all new code
- Provide proper type annotations
- Use interfaces for object types
- Export types that consumers might need

### Formatting Rules

- Use 2 spaces for indentation
- Use single quotes for strings
- Use semicolons at the end of statements
- Use trailing commas in multiline structures

### ESLint Configuration

The project uses ESLint for code quality. Run:

```bash
yarn lint
yarn lint --fix  # Auto-fix issues
```

### File Naming

- Use PascalCase for classes: `ApiError.ts`
- Use camelCase for functions and variables
- Use kebab-case for file names when not classes

## 📤 Submitting Changes

### Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new functionality
3. **Ensure all tests pass**: `yarn test`
4. **Lint your code**: `yarn lint`
5. **Build successfully**: `yarn build`

### Pull Request Template

When creating a PR, please include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added tests for new functionality
- [ ] Updated documentation

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
```

### Review Process

1. Automated checks must pass
2. At least one maintainer review required
3. All conversations must be resolved
4. Up-to-date with main branch

## 🚢 Release Process

Releases are automated using [Changesets](https://github.com/changesets/changesets):

1. **Add changeset** for your changes:
   ```bash
   yarn changeset
   ```

2. **Follow prompts** to describe your changes

3. **Commit the changeset**:
   ```bash
   git add .changeset/
   git commit -m "chore: add changeset"
   ```

4. **Releases are automated** when PRs are merged to main

## 🐛 Reporting Issues

### Bug Reports

Use the bug report template and include:

- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (Node.js version, browser, etc.)
- Code examples if applicable

### Feature Requests

Use the feature request template and include:

- Clear description of the proposed feature
- Use case and motivation
- Possible implementation approach
- Examples of similar features in other libraries

## 📞 Getting Help

- **GitHub Discussions**: For questions and general discussion
- **GitHub Issues**: For bug reports and feature requests
- **Discord/Slack**: [If you have a community chat]

## 🏆 Recognition

Contributors are recognized in:
- CHANGELOG.md
- README.md acknowledgments
- GitHub contributors page

---

Thank you for contributing to @monster-codes/api-core-library! 🙌
