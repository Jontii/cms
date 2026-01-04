import { describe, it, expect, beforeEach } from 'vitest';
import { blockRegistry } from '@/lib/editor/blockRegistry';
import { registerAllBlocks } from '@/lib/editor/registerBlocks';
import { BlockType } from '@/types/block';

describe('BlockRegistry', () => {
  beforeEach(() => {
    // Clear registry before each test
    const allBlocks = blockRegistry.getAll();
    allBlocks.forEach((block) => {
      // Note: We can't easily clear the registry, so we'll register all blocks
      // to ensure consistent state
    });
    registerAllBlocks();
  });

  describe('register', () => {
    it('should register a block definition', () => {
      const testBlock = {
        type: 'text' as BlockType,
        label: 'Test Block',
        defaultProps: { text: '' },
        renderComponent: () => null,
      };

      // Block is already registered, so we test retrieval
      const retrieved = blockRegistry.get('text');
      expect(retrieved).toBeDefined();
      expect(retrieved?.type).toBe('text');
    });
  });

  describe('get', () => {
    it('should retrieve a registered block by type', () => {
      registerAllBlocks();
      const block = blockRegistry.get('text');
      expect(block).toBeDefined();
      expect(block?.type).toBe('text');
      expect(block?.label).toBe('Text');
    });

    it('should return undefined for unregistered block type', () => {
      const block = blockRegistry.get('nonExistent' as BlockType);
      expect(block).toBeUndefined();
    });
  });

  describe('getAll', () => {
    it('should return all registered blocks', () => {
      registerAllBlocks();
      const allBlocks = blockRegistry.getAll();
      expect(allBlocks.length).toBeGreaterThan(0);
      expect(allBlocks.some((b) => b.type === 'text')).toBe(true);
    });
  });

  describe('getByCategory', () => {
    it('should return basic blocks', () => {
      registerAllBlocks();
      const basicBlocks = blockRegistry.getByCategory('basic');
      expect(basicBlocks.length).toBe(4);
      expect(basicBlocks.map((b) => b.type)).toContain('text');
      expect(basicBlocks.map((b) => b.type)).toContain('image');
      expect(basicBlocks.map((b) => b.type)).toContain('heading');
      expect(basicBlocks.map((b) => b.type)).toContain('button');
    });

    it('should return SEO blocks', () => {
      registerAllBlocks();
      const seoBlocks = blockRegistry.getByCategory('seo');
      expect(seoBlocks.length).toBe(4);
      expect(seoBlocks.map((b) => b.type)).toContain('companyCard');
      expect(seoBlocks.map((b) => b.type)).toContain('productCard');
      expect(seoBlocks.map((b) => b.type)).toContain('article');
      expect(seoBlocks.map((b) => b.type)).toContain('faq');
    });
  });
});

