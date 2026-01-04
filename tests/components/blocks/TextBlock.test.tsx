import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TextBlockEditor, TextBlockRender } from '@/components/blocks/TextBlock';
import { Block } from '@/types/block';

describe('TextBlock', () => {
  describe('TextBlockEditor', () => {
    it('should render textarea for editing', () => {
      const block: Block = {
        id: '1',
        type: 'text',
        props: { text: 'Test content' },
        order: 0,
      };

      const onChange = vi.fn();
      render(<TextBlockEditor block={block} onChange={onChange} locale="en" />);

      const textarea = screen.getByPlaceholderText('Enter text content...');
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveValue('Test content');
    });

    it('should call onChange when text is modified', async () => {
      const { userEvent } = await import('@testing-library/user-event');
      const block: Block = {
        id: '1',
        type: 'text',
        props: { text: '' },
        order: 0,
      };

      const onChange = vi.fn();
      render(<TextBlockEditor block={block} onChange={onChange} locale="en" />);

      const textarea = screen.getByPlaceholderText('Enter text content...');
      await userEvent.type(textarea, 'New text');

      expect(onChange).toHaveBeenCalled();
    });

    it('should handle empty text', () => {
      const block: Block = {
        id: '1',
        type: 'text',
        props: {},
        order: 0,
      };

      const onChange = vi.fn();
      render(<TextBlockEditor block={block} onChange={onChange} locale="en" />);

      const textarea = screen.getByPlaceholderText('Enter text content...');
      expect(textarea).toHaveValue('');
    });
  });

  describe('TextBlockRender', () => {
    it('should render text content', () => {
      const block: Block = {
        id: '1',
        type: 'text',
        props: { text: 'Hello World' },
        order: 0,
      };

      render(<TextBlockRender block={block} locale="en" />);

      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('should not render when text is empty', () => {
      const block: Block = {
        id: '1',
        type: 'text',
        props: { text: '' },
        order: 0,
      };

      const { container } = render(<TextBlockRender block={block} locale="en" />);
      expect(container.firstChild).toBeNull();
    });

    it('should preserve whitespace and line breaks', () => {
      const block: Block = {
        id: '1',
        type: 'text',
        props: { text: 'Line 1\nLine 2' },
        order: 0,
      };

      const { container } = render(<TextBlockRender block={block} locale="en" />);

      const paragraph = container.querySelector('p');
      expect(paragraph).toBeInTheDocument();
      expect(paragraph?.textContent).toContain('Line 1');
      expect(paragraph?.textContent).toContain('Line 2');
    });
  });
});

