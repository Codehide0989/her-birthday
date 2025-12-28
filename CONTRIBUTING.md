# Contributing to StudySphere

Thank you for your interest in contributing to StudySphere! This document provides guidelines and instructions for contributing to the project.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/studysphere.git
   cd studysphere
   ```
3. **Set up the development environment** following the [QUICKSTART.md](./QUICKSTART.md)
4. **Create a new branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📋 Development Guidelines

### Code Style

#### Backend (Node.js/Express)
- Use CommonJS module syntax (`require`, `module.exports`)
- Use `async/await` for asynchronous operations
- Follow the MVC pattern (Models, Controllers, Routes)
- Use meaningful variable and function names (camelCase)
- Add JSDoc comments for complex functions
- Keep functions small and focused (single responsibility)

**Example:**
```javascript
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const user = await User.create({ name, email, password });
    
    res.status(201).json({
      success: true,
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

#### Frontend (React)
- Use ES6 module syntax (`import`, `export`)
- Write functional components with hooks
- Use PascalCase for component names
- Use camelCase for variables and functions
- Keep components small and reusable
- Use PropTypes or TypeScript for type checking (if adding)
- Follow React best practices

**Example:**
```jsx
const MyComponent = () => {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  return (
    <div className="card-sketch">
      {/* JSX content */}
    </div>
  );
};

export default MyComponent;
```

### Git Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add Google OAuth integration

fix(subscription): resolve payment webhook handling issue

docs(readme): update installation instructions

refactor(api): extract common middleware functions
```

### Branch Naming

Use descriptive branch names with prefixes:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates

**Examples:**
```
feature/add-password-reset
fix/subscription-cancellation-bug
docs/update-api-documentation
refactor/auth-middleware
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

Write tests for:
- API endpoints
- Authentication/authorization
- Business logic in controllers
- Database models

**Example:**
```javascript
describe('Auth Controller', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });
});
```

### Frontend Tests

```bash
cd frontend
npm test
```

Write tests for:
- Component rendering
- User interactions
- API integration
- State management

## 📝 Documentation

- Update README.md if you change functionality
- Update API.md for new endpoints
- Add JSDoc comments for complex functions
- Update QUICKSTART.md if setup changes
- Document environment variables in .env.example

## 🔄 Pull Request Process

1. **Update your fork:**
   ```bash
   git remote add upstream https://github.com/original/studysphere.git
   git fetch upstream
   git rebase upstream/main
   ```

2. **Make your changes:**
   - Write clean, readable code
   - Follow the code style guidelines
   - Add tests for new features
   - Update documentation

3. **Test your changes:**
   ```bash
   # Backend
   cd backend
   npm test
   npm run lint
   
   # Frontend
   cd frontend
   npm test
   npm run lint
   ```

4. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request:**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template
   - Link any related issues

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors/warnings
```

## 🐛 Reporting Bugs

Create an issue with:

1. **Clear title** describing the bug
2. **Steps to reproduce** the issue
3. **Expected behavior**
4. **Actual behavior**
5. **Screenshots** (if applicable)
6. **Environment details:**
   - OS
   - Node version
   - Browser (for frontend issues)
   - Database version

**Example:**
```markdown
## Bug: Login fails with valid credentials

**Steps to reproduce:**
1. Go to /login
2. Enter valid email and password
3. Click "Sign In"

**Expected:** User should be logged in
**Actual:** 500 error returned

**Environment:**
- OS: macOS 13.0
- Node: v18.17.0
- Browser: Chrome 120.0
```

## 💡 Suggesting Features

Create an issue with:

1. **Clear title** of the feature
2. **Problem it solves**
3. **Proposed solution**
4. **Alternative solutions** considered
5. **Additional context** or mockups

## 🔍 Code Review Process

- Maintainers will review your PR
- Address any requested changes
- Once approved, your PR will be merged
- Your contribution will be credited

## 📜 Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Public or private attacks
- Publishing others' private information
- Unprofessional conduct

## 🎯 Areas to Contribute

### Backend
- [ ] Additional authentication providers (GitHub, Facebook)
- [ ] Email verification system
- [ ] Password reset functionality
- [ ] Advanced search and filtering
- [ ] Progress tracking API
- [ ] Quiz/assessment system
- [ ] Certificate generation

### Frontend
- [ ] Dark mode support
- [ ] Mobile app (React Native)
- [ ] Advanced 3D visualizations
- [ ] Interactive code editor
- [ ] Video player with progress tracking
- [ ] Discussion/forum feature
- [ ] Offline mode support

### Infrastructure
- [ ] Improved Docker setup
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Automated testing
- [ ] Performance monitoring
- [ ] Database migrations
- [ ] Backup system
- [ ] Load balancing setup

### Documentation
- [ ] Video tutorials
- [ ] Architecture diagrams
- [ ] API examples
- [ ] Deployment guides
- [ ] Troubleshooting guides

## 📞 Getting Help

- **Documentation:** Start with README.md and QUICKSTART.md
- **Discussions:** Use GitHub Discussions for questions
- **Issues:** Search existing issues before creating new ones
- **Discord/Slack:** Join our community (if applicable)

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in the README

Thank you for contributing to StudySphere! 🎉
