# Contributing to PostifyApp

First off, thank you for considering contributing to PostifyApp! It's people like you that make PostifyApp such a great tool for learning and sharing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Testing Guidelines](#testing-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by a simple principle: **Be respectful and constructive**. By participating, you are expected to uphold this standard.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find that the problem has already been reported. When creating a bug report, include as many details as possible:

**Bug Report Template:**

```markdown
**Description:**
A clear and concise description of the bug.

**To Reproduce:**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior:**
What you expected to happen.

**Actual Behavior:**
What actually happened.

**Screenshots:**
If applicable, add screenshots to help explain your problem.

**Environment:**
- OS: [e.g., iOS 17, Android 14, Windows 11]
- React Native Version: [e.g., 0.74.5]
- Expo Version: [e.g., 51.0.28]
- Node Version: [e.g., 18.17.0]

**Additional Context:**
Any other information about the problem.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

**Enhancement Template:**

```markdown
**Feature Description:**
A clear description of the feature you'd like to see.

**Problem it Solves:**
Explain the problem this feature would solve.

**Proposed Solution:**
Describe how you envision this feature working.

**Alternatives Considered:**
Describe any alternative solutions you've considered.

**Additional Context:**
Any mockups, examples, or references.
```

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Ensure code quality** (no lint errors, proper comments)
6. **Create a Pull Request** with a clear description

## Development Setup

### Prerequisites

- Node.js >= 18.0
- npm or yarn
- Expo CLI
- Git
- A Firebase project configured

### Setup Steps

1. **Fork and clone:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/PostifyApp.git
   cd PostifyApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase:**
   - Create your own Firebase project
   - Update `firebase.js` with your credentials
   - Enable Authentication and Firestore

4. **Run the app:**
   ```bash
   npm run web  # For web testing
   npm run android  # For Android
   npm run ios  # For iOS (macOS only)
   ```

## Coding Standards

### Code Style

We follow standard React Native and JavaScript best practices:

#### 1. **Use Tutorial-Style Comments**

All code should include educational comments explaining the purpose and benefits:

```javascript
// ✅ GOOD: Educational comment explaining why
// Import React hooks for managing state and side effects
import React, { useState, useEffect } from 'react';

// Fetch posts from Firestore with client-side filtering
// This approach avoids composite index requirements in Firebase
const fetchPosts = async () => {
  // Query database for user's posts only
  const postsCollection = query(
    collection(db, 'postify_posts'),
    where('user.userid', '==', poster)
  );
  // ... rest of implementation
};

// ❌ BAD: No explanation of purpose
import React, { useState, useEffect } from 'react';

const fetchPosts = async () => {
  const postsCollection = query(
    collection(db, 'postify_posts'),
    where('user.userid', '==', poster)
  );
};
```

#### 2. **Component Structure**

Follow this structure for React components:

```javascript
// 1. Imports (grouped logically)
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { auth, db } from './firebase';

// 2. Component definition
const MyComponent = () => {
  // 3. State declarations
  const [data, setData] = useState([]);
  
  // 4. Helper functions
  const fetchData = async () => {
    // Implementation with comments
  };
  
  // 5. Effects
  useEffect(() => {
    fetchData();
  }, []);
  
  // 6. Return JSX
  return (
    <View>
      {/* Comment explaining UI structure */}
      <Text>Content</Text>
    </View>
  );
};

// 7. Styles
const styles = StyleSheet.create({
  // Style definitions
});

// 8. Export
export default MyComponent;
```

#### 3. **Naming Conventions**

- **Components**: PascalCase (`SignUpScreen`, `PostifyPostsList`)
- **Variables/Functions**: camelCase (`fetchPosts`, `handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (`API_URL`, `MAX_FILE_SIZE`)
- **Files**: Match component name (`SignUpScreen.js`, `useAuthentication.js`)

#### 4. **Error Handling**

Always include comprehensive error handling:

```javascript
// ✅ GOOD: Proper error handling with user feedback
const handleSubmit = async () => {
  try {
    await addDoc(collection(db, 'posts'), postData);
    Alert.alert('Success', 'Post created successfully!');
  } catch (error) {
    console.error('Error creating post:', error);
    Alert.alert('Error', 'Failed to create post. Please try again.');
  }
};

// ❌ BAD: No error handling
const handleSubmit = async () => {
  await addDoc(collection(db, 'posts'), postData);
  Alert.alert('Success', 'Post created!');
};
```

#### 5. **Async/Await Usage**

- Always use `async/await` for asynchronous operations
- Include try/catch blocks for error handling
- Provide loading states for better UX

```javascript
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const data = await getData();
    setData(data);
  } catch (error) {
    console.error('Fetch error:', error);
  } finally {
    setLoading(false);
  }
};
```

### Code Formatting

- **Indentation**: 2 spaces (not tabs)
- **Line Length**: Maximum 100 characters
- **Semicolons**: Use semicolons consistently
- **Quotes**: Single quotes for strings (except JSX attributes)
- **Trailing Commas**: Use in multi-line objects/arrays

## Commit Message Guidelines

We follow the Conventional Commits specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring (no feature/fix)
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build process, dependencies, tooling

### Examples

```bash
# Feature addition
feat(posts): add image upload functionality

Added ability to upload images directly from camera or gallery
instead of only supporting URLs.

# Bug fix
fix(auth): resolve signup email validation error

Fixed issue where valid email addresses with + symbol
were incorrectly rejected during signup.

# Documentation
docs(readme): update Firebase setup instructions

Added step-by-step guide for enabling Firestore security rules
and configuring authentication providers.

# Refactoring
refactor(posts): optimize query performance

Changed from composite index query to client-side filtering
to avoid Firebase index requirements.
```

## Testing Guidelines

### Before Submitting

Ensure your changes pass the following checks:

1. **Manual Testing**
   ```bash
   # Test on web
   npm run web
   
   # Test core flows:
   - Signup new user
   - Login existing user
   - Create public post
   - Create private post
   - View posts list
   - Update profile settings
   ```

2. **Code Quality**
   - No console errors
   - No lint warnings (if linter configured)
   - All imports resolved
   - No unused variables

3. **Documentation**
   - Comments explain complex logic
   - README updated if needed
   - CHANGELOG updated for significant changes

### Test Coverage

When adding new features, consider:

- **Happy Path**: Feature works as expected
- **Error Handling**: Proper error messages for failures
- **Edge Cases**: Empty states, null values, network errors
- **User Feedback**: Loading states, success/error messages

## Pull Request Process

### PR Checklist

Before submitting your PR, verify:

- [ ] Code follows the style guidelines
- [ ] Comments are clear and educational
- [ ] No console errors or warnings
- [ ] Tested on at least one platform (web/iOS/Android)
- [ ] Documentation updated if needed
- [ ] Commit messages follow conventions
- [ ] Branch is up to date with main

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Testing
Describe how you tested these changes

## Screenshots (if applicable)
Add screenshots showing the changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Comments added for complex logic
- [ ] Tested thoroughly
- [ ] Documentation updated
```

### Review Process

1. Maintainer reviews code for quality and standards
2. Feedback provided if changes needed
3. Once approved, PR merged to main
4. Changes included in next release

## Questions?

Feel free to open an issue with the `question` label if you need help or clarification!

## Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort! 🙏

---

**Happy Coding!** 🚀
