# Contributing to Nausicaa

Thank you for your interest in contributing to Nausicaa! We welcome contributions from the community, especially from African developers and entrepreneurs.

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and follow our Code of Conduct:

- Be respectful and inclusive
- Welcome people of all backgrounds
- Focus on constructive feedback
- Report unacceptable behavior to support@blancostudio.com

## How to Contribute

### 1. Report Bugs

Found a bug? Please report it on [GitHub Issues](https://github.com/blancostudio/nausicaa/issues).

**Before submitting:**
- Check if the bug has already been reported
- Provide a clear description of the issue
- Include steps to reproduce
- Specify your environment (OS, browser, Node version)

### 2. Suggest Features

Have an idea? We'd love to hear it!

**Before submitting:**
- Check if the feature has already been suggested
- Explain the use case and benefits
- Provide examples if possible
- Consider the impact on existing features

### 3. Submit Code Changes

#### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/blancostudio/nausicaa.git
cd nausicaa

# Install dependencies
pnpm install

# Create a feature branch
git checkout -b feature/your-feature-name
```

#### Development Workflow

1. **Make your changes** following our coding standards
2. **Write tests** for new functionality
3. **Run tests** to ensure everything passes:
   ```bash
   pnpm test
   ```
4. **Format code** using Prettier:
   ```bash
   pnpm format
   ```
5. **Check TypeScript**:
   ```bash
   pnpm check
   ```

#### Commit Guidelines

- Use clear, descriptive commit messages
- Reference issues when applicable: `Fix #123: Description`
- Keep commits focused on a single change
- Use present tense: "Add feature" not "Added feature"

#### Push and Create Pull Request

```bash
# Push your branch
git push origin feature/your-feature-name

# Create a pull request on GitHub
# Fill out the PR template completely
```

### 4. Improve Documentation

Documentation improvements are always welcome!

- Fix typos and grammar
- Clarify confusing sections
- Add examples and use cases
- Improve code comments

## Coding Standards

### JavaScript/TypeScript

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful variable/function names
- Add comments for complex logic

### React Components

- Use functional components with hooks
- Keep components focused and reusable
- Use TypeScript for prop types
- Add JSDoc comments for complex components

### Database

- Use Drizzle ORM for queries
- Follow naming conventions (camelCase for columns)
- Add indexes for frequently queried columns
- Write migrations for schema changes

### Testing

- Write tests for new features
- Aim for >80% code coverage
- Test edge cases and error scenarios
- Use descriptive test names

## Pull Request Process

1. **Update documentation** if you changed functionality
2. **Add tests** for new features or bug fixes
3. **Ensure all tests pass**: `pnpm test`
4. **Update CHANGELOG.md** with your changes
5. **Request review** from maintainers
6. **Address feedback** and make requested changes

## Review Process

- We aim to review PRs within 48 hours
- Maintainers may request changes
- Be open to constructive feedback
- Discussions help us build better software

## Recognition

Contributors will be recognized in:
- CHANGELOG.md
- GitHub contributors page
- Project documentation
- Social media announcements

## Questions?

- **Documentation**: Check [docs/](./docs/) folder
- **Discussions**: [GitHub Discussions](https://github.com/blancostudio/nausicaa/discussions)
- **Email**: support@blancostudio.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Nausicaa! Together, we're building better tools for Africa.** ❤️

Built by Blanco Studio | Open Source for Africa
