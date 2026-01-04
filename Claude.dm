# Claude Development Memory

## Development Principles

### Test-Driven Development (TDD)
- **All code must be written using TDD methodology**
- Write tests first (Red), then implement code to pass (Green), then refactor (Refactor)
- Maintain high test coverage (>80%)
- Tests should be written before any new feature or bug fix
- Refactor existing code to be testable and add tests for all functionality

### Code Quality
- Use TypeScript for type safety
- Follow Next.js best practices
- Keep components small and focused
- Separate business logic from UI components

### Project-Specific Notes
- CSS must be in separate CSS files (no inline styles)
- Use ES module import syntax (no require())
- Project uses Yarn Plug'n'Play (PnP) if applicable

## Testing Infrastructure

### Test Framework
- **Vitest** for unit and integration tests
- **@testing-library/react** for component tests
- **@testing-library/user-event** for user interaction tests
- **jsdom** for DOM simulation

### Test Commands
- `npm test` - Run all tests
- `npm run test:watch` - Watch mode
- `npm run test:ui` - UI mode
- `npm run test:coverage` - Coverage report

### Current Test Status
- ✅ 90 tests passing
- ✅ Core business logic covered (storage, schemas, utilities)
- ✅ Component tests (TextBlock, HeadingBlock, ButtonBlock)
- ✅ API route tests (pages, locales)
- ✅ Schema generator tests (Company, Product, Article, FAQ)
- ⏳ More component tests (ImageBlock, SEO blocks)
- ⏳ Integration tests planned

### Test Structure
- `tests/lib/` - Business logic tests
- `tests/components/` - Component tests (to be added)
- `tests/app/` - App route tests (to be added)
- `tests/integration/` - Integration tests (to be added)

See `TEST_PLAN.md` for detailed test strategy.

