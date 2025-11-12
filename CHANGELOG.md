# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2025-01-12

### 🚀 Major Release - ESM Modernization

This is a **major breaking release** that modernizes the library to use current best practices and the latest versions of dependencies.

### Added

- **ESM Support**: Full ES Modules support with proper `package.json` exports
- **CJS Build**: CommonJS build using esbuild for backward compatibility
- **TypeScript Definitions**: Complete TypeScript type definitions (`index.d.ts`)
- **RxJS Integration**: Now explicitly includes RxJS as a dependency for `patchStream`
- **Comprehensive Tests**: 17 tests with 98.61% coverage including:
  - Core functionality tests (`h`, `patch`, `patchStream`)
  - All HTML helper functions
  - Attribute selector parsing
  - Reactive stream patching
- **Test Infrastructure**: 
  - Added `test/setup.js` for DOM environment initialization
  - Using JSDOM 24.0.0 for Node.js testing
  - Upgraded to Mocha 10.x and Chai 4.x
  - Using c8 for coverage (replacing nyc)
- **Build System**: Modern build configuration using esbuild
- **Documentation**: Comprehensive README with examples and migration guide

### Changed

- **BREAKING**: Upgraded `snabbdom` from 0.6.5 to 3.6.3
  - New import syntax and API
  - Updated module system
- **BREAKING**: Upgraded `html-tags` from 2.0.0 to 5.1.0
- **BREAKING**: Upgraded `iblokz-data` from 1.1.0 to 1.6.0
- **BREAKING**: Module format changed to ESM-first
  - Use named imports: `import {div, h} from 'iblokz-snabbdom-helpers'`
  - CommonJS still supported via `require()`
- **BREAKING**: Minimum Node.js version now 18.12.0 (was unspecified)
- **BREAKING**: `patchStream` now uses RxJS 7.x pipe operators
- Converted all source files to ES Modules
- Updated ESLint configuration for ESM support
- Improved code documentation with JSDoc comments
- Enhanced `.gitignore` for modern tooling

### Fixed

- Module resolution for both ESM and CJS consumers
- Proper handling of attribute selector parsing with various value types
- Test reliability with proper DOM environment setup

### Developer Experience

- **Better DX**: Full TypeScript IntelliSense support
- **Modern Tooling**: Using pnpm, esbuild, c8
- **Watch Mode**: Added `test:watch` script
- **Build Script**: Automated CommonJS bundle generation
- **Linting**: Updated linter configuration

### Migration from 1.x

See the README.md for detailed migration instructions. Key changes:

1. Update imports to use named exports
2. Ensure Node.js >= 18.12.0
3. Install RxJS if using `patchStream`
4. Update any custom snabbdom module usage to 3.x API

## [1.2.0] - (Previous Version)

### Features
- HTML tag helper functions
- Attribute selector parsing
- Basic snabbdom integration
- patchStream for reactive updates

---

[Unreleased]: https://github.com/iblokz/snabbdom-helpers/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/iblokz/snabbdom-helpers/releases/tag/v2.0.0
[1.2.0]: https://github.com/iblokz/snabbdom-helpers/releases/tag/v1.2.0

