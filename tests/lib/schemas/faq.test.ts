import { describe, it, expect } from 'vitest';
import { generateFAQSchema, FAQProps } from '@/lib/schemas/faq';

describe('FAQ Schema Generator', () => {
  describe('generateFAQSchema', () => {
    it('should generate FAQ schema with questions and answers', () => {
      const props: FAQProps = {
        items: [
          {
            question: 'What is this?',
            answer: 'This is a test FAQ.',
          },
          {
            question: 'How does it work?',
            answer: 'It works by testing.',
          },
        ],
      };

      const schema = generateFAQSchema(props, 'en');

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('FAQPage');
      expect(schema.mainEntity).toBeDefined();
      expect(schema.mainEntity.length).toBe(2);
    });

    it('should format questions correctly', () => {
      const props: FAQProps = {
        items: [
          {
            question: 'Test Question?',
            answer: 'Test Answer.',
          },
        ],
      };

      const schema = generateFAQSchema(props, 'en');

      expect(schema.mainEntity[0]['@type']).toBe('Question');
      expect(schema.mainEntity[0].name).toBe('Test Question?');
    });

    it('should format answers correctly', () => {
      const props: FAQProps = {
        items: [
          {
            question: 'Test Question?',
            answer: 'Test Answer.',
          },
        ],
      };

      const schema = generateFAQSchema(props, 'en');

      expect(schema.mainEntity[0].acceptedAnswer).toBeDefined();
      expect(schema.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
      expect(schema.mainEntity[0].acceptedAnswer.text).toBe('Test Answer.');
    });

    it('should handle empty items array', () => {
      const props: FAQProps = {
        items: [],
      };

      const schema = generateFAQSchema(props, 'en');

      expect(schema.mainEntity).toEqual([]);
    });

    it('should handle multiple items', () => {
      const props: FAQProps = {
        items: [
          { question: 'Q1', answer: 'A1' },
          { question: 'Q2', answer: 'A2' },
          { question: 'Q3', answer: 'A3' },
        ],
      };

      const schema = generateFAQSchema(props, 'en');

      expect(schema.mainEntity.length).toBe(3);
      expect(schema.mainEntity[0].name).toBe('Q1');
      expect(schema.mainEntity[1].name).toBe('Q2');
      expect(schema.mainEntity[2].name).toBe('Q3');
    });
  });
});

