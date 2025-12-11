# Contributing to Yacht Club Argentino - Frontend

Thank you for your interest in contributing to the Yacht Club Management System Frontend! This document provides guidelines for contributing to the project.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Angular version)

### Suggesting Features

Feature requests are welcome! Please:
- Check if the feature has already been requested
- Provide a clear use case
- Explain the expected behavior
- Consider implementation complexity

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/yachtclub-frontend-angular.git
   cd yachtclub-frontend-angular
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**
   - Follow the code style guidelines
   - Add tests for new functionality
   - Update documentation as needed

5. **Test your changes**
   ```bash
   npm test
   npm run build
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Open a Pull Request**
   - Provide a clear description
   - Reference any related issues
   - Ensure all tests pass

## 📝 Code Style Guidelines

### TypeScript
- Use TypeScript strict mode
- Implement proper type definitions
- Avoid using `any` type
- Use interfaces for object shapes
- Follow Angular naming conventions

### Angular Components
- Use standalone components
- Keep components focused and small
- Use OnPush change detection when possible
- Implement proper lifecycle hooks
- Unsubscribe from observables

### Templates
- Use Angular's new control flow syntax (`@if`, `@for`)
- Keep templates clean and readable
- Avoid complex logic in templates
- Use async pipe for observables

### Styling
- Use Tailwind CSS utility classes
- Follow the design system color themes
- Ensure responsive design
- Test on multiple screen sizes

### Services
- Keep services focused on single responsibility
- Use dependency injection
- Handle errors appropriately
- Use RxJS operators effectively

## 🎨 Design Guidelines

- Follow the role-based color themes:
  - Partner: Blue (`#3b82f6`)
  - Employee: Green (`#10b981`)
  - Admin: Purple (`#8b5cf6`)
- Maintain consistent spacing and typography
- Ensure accessibility (ARIA labels, keyboard navigation)
- Test UI on different browsers

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### Build Verification
```bash
npm run build
```

### Code Formatting
```bash
npx prettier --write "src/**/*.{ts,html,css}"
```

## 📋 Commit Message Convention

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks
- `ui:` UI/UX improvements

Example:
```
feat: add boat search component
fix: resolve login redirect issue
ui: improve partner dashboard layout
docs: update setup instructions
```

## 🔍 Code Review Process

All submissions require review:

1. Maintainers will review your PR
2. Address any requested changes
3. Ensure CI/CD checks pass
4. Once approved, your PR will be merged

## 📦 Project Structure

When adding new features, follow the existing structure:

```
src/app/
├── pages/          # Feature pages
├── services/       # API services
├── models/         # TypeScript interfaces
├── core/           # Core functionality
└── interceptors/   # HTTP interceptors
```

## ✅ Pull Request Checklist

Before submitting:

- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] Build succeeds without errors
- [ ] Documentation updated
- [ ] Commit messages follow convention
- [ ] No console.log statements
- [ ] Responsive design tested
- [ ] Accessibility considered

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## ❓ Questions?

Feel free to open an issue for any questions or clarifications.

Thank you for contributing! 🎉
