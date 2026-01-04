import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PublicPage from '@/app/[locale]/[slug]/page';
import { getPageBySlug } from '@/lib/storage/pages';
import { getLocales } from '@/lib/storage/locales';
import { registerAllBlocks } from '@/lib/editor/registerBlocks';
import { Page } from '@/types/page';

// Mock the storage functions
vi.mock('@/lib/storage/pages');
vi.mock('@/lib/storage/locales');
vi.mock('@/lib/editor/registerBlocks');

describe('Public Page [locale]/[slug]', () => {
  const mockPage: Page = {
    id: 'test-page-id',
    slug: 'test-page',
    locales: {
      en: {
        title: 'Test Page',
        content: [],
        seo: {
          title: 'Test Page SEO',
          description: 'Test description',
          jsonSchemas: [],
        },
      },
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  };

  const mockLocales = [
    { code: 'en', name: 'English', isDefault: true },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    registerAllBlocks();
    vi.mocked(getLocales).mockResolvedValue(mockLocales);
  });

  it('should show "Back to Editor" button when editor=true and pageId is present in searchParams', async () => {
    vi.mocked(getPageBySlug).mockResolvedValue(mockPage);

    const params = Promise.resolve({ locale: 'en', slug: 'test-page' });
    const searchParams = Promise.resolve({ editor: 'true', pageId: 'test-page-id' });

    const Component = await PublicPage({ params, searchParams });
    render(Component);

    const backLink = screen.getByRole('link', { name: /back to editor/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/admin/editor/test-page-id');
  });

  it('should NOT show "Back to Editor" button when editor param is not present', async () => {
    vi.mocked(getPageBySlug).mockResolvedValue(mockPage);

    const params = Promise.resolve({ locale: 'en', slug: 'test-page' });
    const searchParams = Promise.resolve({});

    const Component = await PublicPage({ params, searchParams });
    render(Component);

    const backLink = screen.queryByRole('link', { name: /back to editor/i });
    expect(backLink).not.toBeInTheDocument();
  });

  it('should NOT show "Back to Editor" button when editor=true but pageId is missing', async () => {
    vi.mocked(getPageBySlug).mockResolvedValue(mockPage);

    const params = Promise.resolve({ locale: 'en', slug: 'test-page' });
    const searchParams = Promise.resolve({ editor: 'true' });

    const Component = await PublicPage({ params, searchParams });
    render(Component);

    const backLink = screen.queryByRole('link', { name: /back to editor/i });
    expect(backLink).not.toBeInTheDocument();
  });

  it('should render page content normally even when editor preview is active', async () => {
    vi.mocked(getPageBySlug).mockResolvedValue(mockPage);

    const params = Promise.resolve({ locale: 'en', slug: 'test-page' });
    const searchParams = Promise.resolve({ editor: 'true', pageId: 'test-page-id' });

    const Component = await PublicPage({ params, searchParams });
    render(Component);

    // Should still render the page title
    expect(screen.getByText('Test Page')).toBeInTheDocument();
    
    // Should also have the back button
    expect(screen.getByRole('link', { name: /back to editor/i })).toBeInTheDocument();
  });
});

