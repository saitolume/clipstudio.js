# Release Guide

This document explains how to release new versions of clipstudio.js.

## Automated Release Process

This project uses GitHub Actions for automated releases to npm.

### Prerequisites

1. **npm Token**: Add `NPM_TOKEN` to GitHub repository secrets
   - Go to [npm Access Tokens](https://www.npmjs.com/settings/tokens)
   - Create a new "Automation" token
   - Add it to GitHub repo Settings > Secrets and variables > Actions
   - Name: `NPM_TOKEN`

### Release Steps

1. **Update Version**
   ```bash
   # Update package.json version
   npm version patch|minor|major
   ```

2. **Create Git Tag**
   ```bash
   # Tag the release (GitHub Actions triggers on v* tags)
   git tag v1.0.0
   git push origin v1.0.0
   ```

3. **Automatic Process**
   - GitHub Actions will run tests on Node.js 18, 20, 22
   - If tests pass, package will be built and published to npm
   - Package includes provenance for security

### Manual Release (if needed)

```bash
# Build the package
pnpm run build

# Publish to npm
npm publish --access public
```

## CI/CD Pipeline

- **CI**: Runs on every push/PR to main/master
  - Tests on Ubuntu, Windows, macOS
  - Tests on Node.js 18, 20, 22
  - Linting, type checking, building

- **Release**: Runs on tag push (v*)
  - Tests on Node.js 18, 20, 22 (Ubuntu)
  - Builds and publishes to npm with provenance

## Version Guidelines

- **Patch** (1.0.x): Bug fixes, documentation updates
- **Minor** (1.x.0): New features, non-breaking changes
- **Major** (x.0.0): Breaking API changes

## Security

- Uses npm provenance for package integrity
- Automated tokens with minimal permissions
- Multi-OS testing for compatibility