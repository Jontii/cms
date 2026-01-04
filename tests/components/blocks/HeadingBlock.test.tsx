import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeadingBlockEditor, HeadingBlockRender } from '@/components/blocks/HeadingBlock';
import { Block } from '@/types/block';

describe('HeadingBlock', () => {
  describe('HeadingBlockEditor', () => {
    it('should render text input and level selector', () => {
      const block: Block = {
        id: '1',
        type: 'heading',
        props: { text: 'My Heading', level: 'h1' },
        order: 0,
      };

      const onChange = vi.fn();
      const { container } = render(<HeadingBlockEditor block={block} onChange={onChange} locale="en" />);

      expect(screen.getByPlaceholderText('Enter heading...')).toBeInTheDocument();
      const select = container.querySelector('select');
      expect(select).toBeInTheDocument();
      expect(select?.value).toBe('h1');
    });

    it('should call onChange when text changes', async () => {
      const { userEvent } = await import('@testing-library/user-event');
      const block: Block = {
        id: '1',
        type: 'heading',
        props: { text: '', level: 'h1' },
        order: 0,
      };

      const onChange = vi.fn();
      render(<HeadingBlockEditor block={block} onChange={onChange} locale="en" />);

      const input = screen.getByPlaceholderText('Enter heading...');
      await userEvent.type(input, 'New Heading');

      expect(onChange).toHaveBeenCalled();
    });

    it('should call onChange when level changes', async () => {
      const { userEvent } = await import('@testing-library/user-event');
      const block: Block = {
        id: '1',
        type: 'heading',
        props: { text: 'Heading', level: 'h1' },
        order: 0,
      };

      const onChange = vi.fn();
      const { container } = render(<HeadingBlockEditor block={block} onChange={onChange} locale="en" />);

      const select = container.querySelector('select') as HTMLSelectElement;
      await userEvent.selectOptions(select, 'h2');

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('HeadingBlockRender', () => {
    it('should render h1 by default', () => {
      const block: Block = {
        id: '1',
        type: 'heading',
        props: { text: 'Heading', level: 'h1' },
        order: 0,
      };

      render(<HeadingBlockRender block={block} locale="en" />);

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Heading');
    });

    it('should render correct heading level', () => {
      const block: Block = {
        id: '1',
        type: 'heading',
        props: { text: 'Heading', level: 'h2' },
        order: 0,
      };

      render(<HeadingBlockRender block={block} locale="en" />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('should not render when text is empty', () => {
      const block: Block = {
        id: '1',
        type: 'heading',
        props: { text: '', level: 'h1' },
        order: 0,
      };

      const { container } = render(<HeadingBlockRender block={block} locale="en" />);
      expect(container.firstChild).toBeNull();
    });
  });
});

