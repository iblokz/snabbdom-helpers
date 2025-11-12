# Contributing to iblokz-snabbdom-helpers

First off, thank you for considering contributing to iblokz-snabbdom-helpers! It's people like you that make this library better for everyone.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to see if the problem has already been reported. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** - Include code snippets or test cases
- **Describe the behavior you observed** and what you expected to see
- **Include your environment details** - Node.js version, package versions, OS

### Suggesting Enhancements

Enhancement suggestions are welcome! When suggesting an enhancement:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful** to most users
- **Provide examples** of how the feature would be used

### Pull Requests

1. Fork the repo and create your branch from `master`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/snabbdom-helpers.git
cd snabbdom-helpers

# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Build
pnpm build

# Lint
pnpm lint
```

## Project Structure

```
iblokz-snabbdom-helpers/
├── index.js              # Main entry point (ESM)
├── index.d.ts            # TypeScript definitions
├── util/
│   └── attrs.js          # Attribute parsing utilities
├── test/
│   ├── setup.js          # Test environment setup
│   ├── index.test.js     # Main functionality tests
│   └── util/
│       └── attrs.test.js # Utility tests
├── build.js              # Build script for CJS
└── dist/
    └── index.cjs         # CommonJS build (generated)
```

## Coding Standards

### Code Style

- Use **tabs for indentation** (project convention)
- Follow the existing code style
- Run `pnpm lint` before committing
- Add JSDoc comments for public APIs

### Commit Messages

- Use clear and meaningful commit messages
- Start with a verb in present tense (e.g., "Add", "Fix", "Update")
- Reference issues and pull requests when relevant

Examples:
```
Add support for SVG elements
Fix attribute parsing with special characters
Update documentation for patchStream
```

### Testing

- Write tests for all new features
- Ensure all tests pass before submitting PR
- Aim for high code coverage (>95%)
- Use descriptive test names

Example test structure:
```javascript
describe('feature name', () => {
  it('does something specific', () => {
    // Arrange
    const input = ...;
    
    // Act
    const result = someFunction(input);
    
    // Assert
    expect(result).to.equal(expected);
  });
});
```

## Module Format

The library is published as **ESM-first** with CommonJS compatibility:

- Write code in **ESM** format (import/export)
- Use `.js` extension for all files
- The build script generates CJS bundle automatically
- Test both ESM and CJS imports when adding features

## Documentation

When adding new features:

1. **Update README.md** with usage examples
2. **Add JSDoc comments** to public APIs
3. **Update TypeScript definitions** in `index.d.ts`
4. **Update CHANGELOG.md** under `[Unreleased]`

## Release Process

(For maintainers)

1. Update `CHANGELOG.md` with new version
2. Update version in `package.json`
3. Run `pnpm build` to generate fresh builds
4. Run `pnpm test` to ensure all tests pass
5. Run `pnpm run lint` to check code style
6. Commit changes: `git commit -am "chore(release): v<version>"`
7. Create git tag: `git tag v<version>`
8. Push changes and tags: `git push && git push --tags`
9. Publish to npm: `npm publish`

## Questions?

Feel free to open an issue for any questions or concerns. We're here to help!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

