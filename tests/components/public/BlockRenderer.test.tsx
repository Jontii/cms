import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BlockRenderer } from '@/components/public/BlockRenderer';
import { registerAllBlocks } from '@/lib/editor/registerBlocks';
import { Page } from '@/types/page';
import { Block } from '@/types/block';

describe('BlockRenderer', () => {
  beforeEach(() => {
    // Register all blocks before each test
    registerAllBlocks();
  });

  it('should render page content with text blocks', () => {
    const blocks: Block[] = [
      {
        id: '1',
        type: 'text',
        props: { text: 'Hello World' },
        order: 0,
      },
      {
        id: '2',
        type: 'text',
        props: { text: 'This is a test page' },
        order: 1,
      },
    ];

    render(<BlockRenderer blocks={blocks} locale="en" />);

    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.getByText('This is a test page')).toBeInTheDocument();
  });

  it('should render page content with multiple block types', () => {
    const blocks: Block[] = [
      {
        id: '1',
        type: 'heading',
        props: { text: 'Page Title', level: 'h1' },
        order: 0,
      },
      {
        id: '2',
        type: 'text',
        props: { text: 'This is the page content' },
        order: 1,
      },
      {
        id: '3',
        type: 'button',
        props: { text: 'Click Me', href: 'https://example.com', variant: 'primary' },
        order: 2,
      },
    ];

    render(<BlockRenderer blocks={blocks} locale="en" />);

    expect(screen.getByText('Page Title')).toBeInTheDocument();
    expect(screen.getByText('This is the page content')).toBeInTheDocument();
    expect(screen.getByText('Click Me')).toBeInTheDocument();
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('should render blocks in correct order', () => {
    const blocks: Block[] = [
      {
        id: '3',
        type: 'text',
        props: { text: 'Third block' },
        order: 2,
      },
      {
        id: '1',
        type: 'text',
        props: { text: 'First block' },
        order: 0,
      },
      {
        id: '2',
        type: 'text',
        props: { text: 'Second block' },
        order: 1,
      },
    ];

    const { container } = render(<BlockRenderer blocks={blocks} locale="en" />);

    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(3);
    
    // Check that blocks are rendered in order
    expect(paragraphs[0]).toHaveTextContent('First block');
    expect(paragraphs[1]).toHaveTextContent('Second block');
    expect(paragraphs[2]).toHaveTextContent('Third block');
  });

  it('should render page with empty content array', () => {
    const blocks: Block[] = [];

    const { container } = render(<BlockRenderer blocks={blocks} locale="en" />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.children.length).toBe(0);
  });

  it('should handle page with various block types', () => {
    const page: Page = {
      id: 'test-page-id',
      slug: 'test-page',
      locales: {
        en: {
          title: 'Test Page',
          content: [
            {
              id: '1',
              type: 'heading',
              props: { text: 'Welcome', level: 'h1' },
              order: 0,
            },
            {
              id: '2',
              type: 'text',
              props: { text: 'This is a test page with multiple blocks.' },
              order: 1,
            },
            {
              id: '3',
              type: 'text',
              props: { text: 'Here is some more content.' },
              order: 2,
            },
            {
              id: '4',
              type: 'button',
              props: { text: 'Learn More', href: '/learn-more', variant: 'primary' },
              order: 3,
            },
          ],
          seo: {
            title: 'Test Page',
            description: 'A test page',
            jsonSchemas: [],
          },
        },
      },
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    };

    render(<BlockRenderer blocks={page.locales.en.content} locale="en" />);

    // Verify all content is rendered
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('This is a test page with multiple blocks.')).toBeInTheDocument();
    expect(screen.getByText('Here is some more content.')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
    
    const link = screen.getByRole('link', { name: 'Learn More' });
    expect(link).toHaveAttribute('href', '/learn-more');
  });

  it('should render blocks but empty blocks have no visible content', () => {
    const blocks: Block[] = [
      {
        id: '1',
        type: 'text',
        props: { text: 'Visible text' },
        order: 0,
      },
      {
        id: '2',
        type: 'text',
        props: { text: '' },
        order: 1,
      },
      {
        id: '3',
        type: 'button',
        props: { text: '', href: '', variant: 'primary' },
        order: 2,
      },
    ];

    const { container } = render(<BlockRenderer blocks={blocks} locale="en" />);

    // Verify visible content is rendered
    expect(screen.getByText('Visible text')).toBeInTheDocument();
    
    // Empty blocks are rendered but have no visible text content
    // (Blocks are rendered as divs, but text/button blocks with empty content don't show text)
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.children.length).toBe(3); // All 3 blocks are rendered
  });
});

