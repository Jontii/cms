# Test Plan - Mynt CMS

## Test-Driven Development Strategy

All code must follow TDD principles:
1. **Red**: Write failing tests first
2. **Green**: Write minimal code to pass tests
3. **Refactor**: Improve code while keeping tests green

## Test Coverage Goals

- **Minimum**: 80% code coverage
- **Target**: 90%+ code coverage for critical paths
- **Focus Areas**: Business logic, utilities, API routes, core components

## Test Structure

```
tests/
├── lib/              # Business logic tests
│   ├── storage/      # Storage layer tests
│   ├── schemas/      # Schema generator tests
│   └── editor/       # Editor utility tests
├── components/       # Component tests
│   ├── blocks/       # Block component tests
│   └── editor/       # Editor component tests
├── app/              # App route tests
│   ├── api/          # API route tests
│   └── admin/        # Admin page tests
└── integration/      # Integration tests
```

## Test Categories

### Unit Tests
- ✅ Block registry
- ✅ Storage utilities (pages, locales)
- ✅ Schema generators
- ✅ Drag and drop utilities
- ⏳ Block components
- ⏳ Editor components
- ⏳ API routes

### Integration Tests
- ⏳ Page creation flow
- ⏳ Block editing flow
- ⏳ Multi-locale content management
- ⏳ SEO schema generation and injection

### E2E Tests (Future)
- ⏳ Complete page creation workflow
- ⏳ Drag and drop functionality
- ⏳ Locale switching
- ⏳ Public page rendering

## Current Test Status

### ✅ Completed (90 tests passing)
- Block registry tests (6 tests)
- Page storage tests (14 tests)
- Locale storage tests (4 tests)
- Schema generator tests:
  - Company schema (7 tests)
  - Product schema (6 tests)
  - Article schema (6 tests)
  - FAQ schema (5 tests)
- Drag and drop utility tests (8 tests)
- Component tests:
  - TextBlock (6 tests)
  - HeadingBlock (6 tests)
  - ButtonBlock (4 tests)
- API route tests:
  - Pages API (6 tests)
  - Pages [id] API (6 tests)
  - Locales API (3 tests)

### ⏳ In Progress
- More component tests (ImageBlock, SEO blocks)
- Editor component tests

### 📋 Planned
- Integration tests
- E2E tests
- Performance tests

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Best Practices

1. **Isolation**: Each test should be independent
2. **Clarity**: Test names should describe what they test
3. **Coverage**: Test both happy paths and edge cases
4. **Speed**: Keep tests fast (< 100ms per test when possible)
5. **Maintainability**: Refactor tests when refactoring code

