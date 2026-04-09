# Contributing to E-Form K-Link

First off, thank you for considering contributing to E-Form K-Link! It's people like you that make this project better.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if relevant**
- **Include your environment details** (OS, Node.js version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternatives you've considered**

### Your First Code Contribution

Unsure where to begin? You can start by looking through `beginner` and `help-wanted` issues:

- `beginner` - issues that should only require a few lines of code
- `help-wanted` - issues that may be more involved

## 🛠️ Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/e-form-k-link.git
   cd e-form-k-link
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. Make your changes and test them:
   ```bash
   npm run dev
   npm test
   ```

## 📐 Coding Standards

### JavaScript Style Guide

- Use ES6+ features where appropriate
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use async/await instead of callbacks

### Code Formatting

- Indentation: 2 spaces (no tabs)
- Maximum line length: 100 characters
- Use semicolons
- Use single quotes for strings
- Add trailing commas in multi-line objects/arrays

Example:
```javascript
// Good
const user = {
  name: 'John',
  email: 'john@example.com',
  role: 'admin',
};

// Bad
const user = {
  name: "John",
  email: "john@example.com",
  role: "admin"
}
```

### File Organization

- Place backend code in `src/` directory
- Place frontend code in `public/` directory
- Group related functionality together
- Use clear, descriptive file names

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding or correcting tests
- `chore`: Changes to build process or auxiliary tools

### Examples

```
feat(auth): add password reset functionality

Implement password reset feature with email verification.
Users can now request a password reset link via email.

Closes #123
```

```
fix(forms): correct validation error on date fields

Date fields were not properly validating ISO format dates.
Updated validation logic to handle multiple date formats.
```

## 🔄 Pull Request Process

1. **Update documentation** if you've made changes that require it
2. **Add tests** for new features
3. **Ensure all tests pass** before submitting
4. **Update the README.md** with details of changes if applicable
5. **Follow the commit message guidelines**
6. **Reference any related issues** in the PR description

### PR Title Format

```
[Type] Brief description of changes
```

Examples:
- `[Feature] Add document sharing functionality`
- `[Fix] Resolve login authentication issue`
- `[Docs] Update API documentation`

### PR Description Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing tests pass locally
```

## 🧪 Testing

- Write unit tests for new functions
- Write integration tests for API endpoints
- Ensure existing tests still pass
- Aim for high code coverage

## 📚 Additional Notes

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `question` - Further information requested

### Need Help?

Don't hesitate to ask for help:
- Open a discussion on GitHub
- Comment on the relevant issue
- Reach out to the maintainers

## 🎉 Recognition

Contributors will be recognized in our README.md file. Thank you for your contributions!

---

Thank you for contributing to E-Form K-Link! 🚀
