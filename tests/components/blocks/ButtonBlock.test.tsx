import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ButtonBlockEditor, ButtonBlockRender } from '@/components/blocks/ButtonBlock';
import { Block } from '@/types/block';

describe('ButtonBlock', () => {
  describe('ButtonBlockEditor', () => {
    it('should render button text input', () => {
      const block: Block = {
        id: '1',
        type: 'button',
        props: { text: 'Click Me', href: '', variant: 'primary' },
        order: 0,
      };

      const onChange = vi.fn();
      render(<ButtonBlockEditor block={block} onChange={onChange} locale="en" />);

      expect(screen.getByPlaceholderText('Click me')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Click Me')).toBeInTheDocument();
    });

    it('should render link URL input', () => {
      const block: Block = {
        id: '1',
        type: 'button',
        props: { text: 'Button', href: 'https://example.com', variant: 'primary' },
        order: 0,
      };

      const onChange = vi.fn();
      render(<ButtonBlockEditor block={block} onChange={onChange} locale="en" />);

      expect(screen.getByPlaceholderText('https://example.com')).toBeInTheDocument();
    });

    it('should render style selector', () => {
      const block: Block = {
        id: '1',
        type: 'button',
        props: { text: 'Button', href: '', variant: 'primary' },
        order: 0,
      };

      const onChange = vi.fn();
      const { container } = render(<ButtonBlockEditor block={block} onChange={onChange} locale="en" />);

      const select = container.querySelector('select');
      expect(select).toBeInTheDocument();
    });
  });

  describe('ButtonBlockRender', () => {
    it('should render button with text', () => {
      const block: Block = {
        id: '1',
        type: 'button',
        props: { text: 'Click Me', href: '', variant: 'primary' },
        order: 0,
      };

      render(<ButtonBlockRender block={block} locale="en" />);

      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('should render as link when href is provided', () => {
      const block: Block = {
        id: '1',
        type: 'button',
        props: { text: 'Click Me', href: 'https://example.com', variant: 'primary' },
        order: 0,
      };

      render(<ButtonBlockRender block={block} locale="en" />);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('should not render when text is empty', () => {
      const block: Block = {
        id: '1',
        type: 'button',
        props: { text: '', href: '', variant: 'primary' },
        order: 0,
      };

      const { container } = render(<ButtonBlockRender block={block} locale="en" />);
      expect(container.firstChild).toBeNull();
    });

    it('should apply correct variant classes', () => {
      const block: Block = {
        id: '1',
        type: 'button',
        props: { text: 'Button', href: '', variant: 'secondary' },
        order: 0,
      };

      const { container } = render(<ButtonBlockRender block={block} locale="en" />);
      const button = container.querySelector('button');
      expect(button?.className).toContain('bg-gray-600');
    });
  });
});

