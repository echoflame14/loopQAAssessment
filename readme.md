# Playwright Task Automation

This repository contains automated tests for the Task Management System using Playwright and TypeScript.

## Project Structure

```
playwright-task-automation/
├── src/                    # Source code for test framework
│   ├── pages/             # Page Object Models
│   ├── components/        # Reusable component objects
│   ├── helpers/           # Test helper functions
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── tests/                 # Test files
│   ├── e2e/              # End-to-end test specs
│   └── fixtures/         # Test data
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```
BASE_URL=https://your-app-url.com
```

## Running Tests

Run all tests:
```bash
npm test
```

Run tests in headed mode:
```bash
npm run test:headed
```

Debug tests:
```bash
npm run test:debug
```

View test report:
```bash
npm run report
```

## Test Architecture

- **Page Objects**: Encapsulate page-specific selectors and actions
- **Component Objects**: Reusable components like TaskCard and Tag
- **Helpers**: Utility functions for navigation and verification
- **Types**: TypeScript interfaces and enums for better type safety

## Adding New Tests

1. Create page objects in `src/pages/`
2. Add test data in `tests/fixtures/`
3. Create test files in `tests/e2e/`

## Best Practices

- Use data-testid attributes for selectors
- Keep page objects focused and maintainable
- Follow TypeScript best practices
- Write descriptive test names
- Use appropriate timeouts and waits