import { describe, it, expect } from 'vitest';
import { generateArticleSchema, ArticleProps } from '@/lib/schemas/article';

describe('Article Schema Generator', () => {
  describe('generateArticleSchema', () => {
    it('should generate basic article schema', () => {
      const props: ArticleProps = {
        headline: 'Test Article',
        description: 'A test article',
      };

      const schema = generateArticleSchema(props, 'en');

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Article');
      expect(schema.headline).toBe('Test Article');
      expect(schema.description).toBe('A test article');
    });

    it('should include image if provided', () => {
      const props: ArticleProps = {
        headline: 'Test Article',
        description: 'A test article',
        image: 'https://example.com/article.jpg',
      };

      const schema = generateArticleSchema(props, 'en');

      expect(schema.image).toBe('https://example.com/article.jpg');
    });

    it('should include author if provided', () => {
      const props: ArticleProps = {
        headline: 'Test Article',
        description: 'A test article',
        author: 'John Doe',
      };

      const schema = generateArticleSchema(props, 'en');

      expect(schema.author).toBeDefined();
      expect(schema.author['@type']).toBe('Person');
      expect(schema.author.name).toBe('John Doe');
    });

    it('should include datePublished if provided', () => {
      const props: ArticleProps = {
        headline: 'Test Article',
        description: 'A test article',
        datePublished: '2024-01-01',
      };

      const schema = generateArticleSchema(props, 'en');

      expect(schema.datePublished).toBe('2024-01-01');
    });

    it('should include dateModified if provided', () => {
      const props: ArticleProps = {
        headline: 'Test Article',
        description: 'A test article',
        dateModified: '2024-01-02',
      };

      const schema = generateArticleSchema(props, 'en');

      expect(schema.dateModified).toBe('2024-01-02');
    });

    it('should include all fields when provided', () => {
      const props: ArticleProps = {
        headline: 'Complete Article',
        description: 'A complete article',
        image: 'https://example.com/image.jpg',
        author: 'Jane Doe',
        datePublished: '2024-01-01',
        dateModified: '2024-01-02',
      };

      const schema = generateArticleSchema(props, 'en');

      expect(schema.headline).toBe('Complete Article');
      expect(schema.description).toBe('A complete article');
      expect(schema.image).toBe('https://example.com/image.jpg');
      expect(schema.author.name).toBe('Jane Doe');
      expect(schema.datePublished).toBe('2024-01-01');
      expect(schema.dateModified).toBe('2024-01-02');
    });
  });
});

