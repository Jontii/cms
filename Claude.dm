# Claude Development Memory

## ⚠️ CRITICAL: ALWAYS READ THIS FILE FIRST ⚠️

**Before writing ANY code, you MUST:**
1. Read this entire file (Claude.dm) to understand project requirements
2. Follow TDD methodology (see below)
3. Write tests FIRST, then implement code
4. Run lint and tests before pushing (pre-push hook is configured)

## Development Principles

### Test-Driven Development (TDD) - MANDATORY
- **ALL code must be written using TDD methodology - NO EXCEPTIONS**
- **Workflow: Write tests FIRST (Red), then implement code to pass (Green), then refactor (Refactor)**
- Maintain high test coverage (>80%)
- Tests should be written BEFORE any new feature or bug fix
- Refactor existing code to be testable and add tests for all functionality
- **If you skip writing tests first, you are violating project requirements**

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
- `yarn test` - Run all tests
- `yarn test:watch` - Watch mode
- `yarn test:ui` - UI mode
- `yarn test:coverage` - Coverage report

### Pre-Push Hooks
- **Git pre-push hook is configured** to automatically run:
  1. `yarn lint` - ESLint checks
  2. `yarn test --run` - All tests
- Push will be blocked if lint or tests fail
- **DO NOT push code until the complete TDD cycle is finished (Red-Green-Refactor)**
- Always ensure lint and tests pass before attempting to push
- Commit and push only after completing the full TDD workflow (tests written, implementation complete, refactored if needed)

### Current Test Status
- ✅ 101 tests passing (as of latest run)
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

