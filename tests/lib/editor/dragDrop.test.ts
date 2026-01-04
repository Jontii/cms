import { describe, it, expect } from 'vitest';
import { createBlockFromType, reorderBlocks } from '@/lib/editor/dragDrop';
import { Block } from '@/types/block';

describe('Drag and Drop Utilities', () => {
  describe('createBlockFromType', () => {
    it('should create a block with correct type', () => {
      const block = createBlockFromType('text', 0);
      
      expect(block.type).toBe('text');
      expect(block.id).toBeDefined();
      expect(block.order).toBe(0);
      expect(block.props).toEqual({});
    });

    it('should create blocks with unique IDs', () => {
      const block1 = createBlockFromType('text', 0);
      const block2 = createBlockFromType('text', 1);
      
      expect(block1.id).not.toBe(block2.id);
    });

    it('should set correct order', () => {
      const block = createBlockFromType('image', 5);
      expect(block.order).toBe(5);
    });
  });

  describe('reorderBlocks', () => {
    it('should reorder blocks correctly', () => {
      const blocks: Block[] = [
        { id: '1', type: 'text', props: {}, order: 0 },
        { id: '2', type: 'image', props: {}, order: 1 },
        { id: '3', type: 'heading', props: {}, order: 2 },
      ];

      const reordered = reorderBlocks(blocks, 0, 2);

      expect(reordered[0].id).toBe('2');
      expect(reordered[1].id).toBe('3');
      expect(reordered[2].id).toBe('1');
    });

    it('should update order values after reordering', () => {
      const blocks: Block[] = [
        { id: '1', type: 'text', props: {}, order: 0 },
        { id: '2', type: 'image', props: {}, order: 1 },
        { id: '3', type: 'heading', props: {}, order: 2 },
      ];

      const reordered = reorderBlocks(blocks, 1, 0);

      expect(reordered[0].order).toBe(0);
      expect(reordered[1].order).toBe(1);
      expect(reordered[2].order).toBe(2);
    });

    it('should handle moving to the end', () => {
      const blocks: Block[] = [
        { id: '1', type: 'text', props: {}, order: 0 },
        { id: '2', type: 'image', props: {}, order: 1 },
        { id: '3', type: 'heading', props: {}, order: 2 },
      ];

      const reordered = reorderBlocks(blocks, 0, 2);

      expect(reordered[2].id).toBe('1');
      expect(reordered[2].order).toBe(2);
    });

    it('should handle empty array', () => {
      const reordered = reorderBlocks([], 0, 0);
      expect(reordered).toEqual([]);
    });

    it('should handle single block', () => {
      const blocks: Block[] = [
        { id: '1', type: 'text', props: {}, order: 0 },
      ];

      const reordered = reorderBlocks(blocks, 0, 0);
      expect(reordered.length).toBe(1);
      expect(reordered[0].order).toBe(0);
    });
  });
});

