# Semantic Release Configuration

## Overview

This project uses semantic-release to automatically generate version numbers and releases based on conventional commit messages.

## Commit Message Format

Use conventional commit format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature (triggers minor version bump)
- **fix**: A bug fix (triggers patch version bump)
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

### Breaking Changes

To trigger a major version bump, add `BREAKING CHANGE:` in the footer or use `!` after the type:

```
feat!: remove deprecated API endpoint

BREAKING CHANGE: The /old-api endpoint has been removed.
```

## Branch Configuration

- **main**: Production releases (e.g., 1.0.0, 1.1.0, 2.0.0)
- **develop**: Beta pre-releases (e.g., 1.1.0-beta.1, 1.1.0-beta.2)

## Release Process

1. Make commits with conventional format
2. Push to `main` or `develop` branch
3. GitHub Actions will:
   - Run tests and build
   - Analyze commits since last release
   - Generate new version number
   - Update package.json
   - Create Docker image with version tag
   - Deploy to appropriate environment

## Examples

### Feature Release
```bash
git commit -m "feat: add contact form validation"
# This will create version 1.1.0 (if current is 1.0.0)
```

### Bug Fix
```bash
git commit -m "fix: resolve email sending issue"
# This will create version 1.0.1 (if current is 1.0.0)
```

### Breaking Change
```bash
git commit -m "feat!: redesign contact form API

BREAKING CHANGE: Contact form now requires company field"
# This will create version 2.0.0 (if current is 1.x.x)
```

### Beta Release (develop branch)
```bash
git commit -m "feat: add new email template"
git push origin develop
# This will create version 1.1.0-beta.1
```

## Configuration Files

- `.releaserc.json`: Semantic-release configuration
- Package version is automatically updated in `package.json`
- No changelog is generated (as configured)

## Docker Tags

- Production releases: `latest`, `1.0.0`, `1.1.0`, etc.
- Beta releases: `staging`, `1.1.0-beta.1`, etc.

## Manual Release

If needed, you can trigger a manual release:

```bash
npm run semantic-release
```

Make sure you have the required environment variables set:
- `GITHUB_TOKEN`: GitHub personal access token with repo permissions
