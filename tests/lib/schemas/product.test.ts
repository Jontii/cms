import { describe, it, expect } from 'vitest';
import { generateProductSchema, ProductCardProps } from '@/lib/schemas/product';

describe('Product Schema Generator', () => {
  describe('generateProductSchema', () => {
    it('should generate basic product schema', () => {
      const props: ProductCardProps = {
        name: 'Test Product',
        description: 'A test product',
      };

      const schema = generateProductSchema(props, 'en');

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Product');
      expect(schema.name).toBe('Test Product');
      expect(schema.description).toBe('A test product');
    });

    it('should include image if provided', () => {
      const props: ProductCardProps = {
        name: 'Test Product',
        description: 'A test product',
        image: 'https://example.com/product.jpg',
      };

      const schema = generateProductSchema(props, 'en');

      expect(schema.image).toBe('https://example.com/product.jpg');
    });

    it('should include price and currency in offers', () => {
      const props: ProductCardProps = {
        name: 'Test Product',
        description: 'A test product',
        price: 99.99,
        currency: 'USD',
      };

      const schema = generateProductSchema(props, 'en');

      expect(schema.offers).toBeDefined();
      expect(schema.offers['@type']).toBe('Offer');
      expect(schema.offers.price).toBe(99.99);
      expect(schema.offers.priceCurrency).toBe('USD');
    });

    it('should include availability in offers', () => {
      const props: ProductCardProps = {
        name: 'Test Product',
        description: 'A test product',
        price: 99.99,
        currency: 'USD',
        availability: 'InStock',
      };

      const schema = generateProductSchema(props, 'en');

      expect(schema.offers.availability).toBe('https://schema.org/InStock');
    });

    it('should include brand if provided', () => {
      const props: ProductCardProps = {
        name: 'Test Product',
        description: 'A test product',
        brand: 'Test Brand',
      };

      const schema = generateProductSchema(props, 'en');

      expect(schema.brand).toBeDefined();
      expect(schema.brand['@type']).toBe('Brand');
      expect(schema.brand.name).toBe('Test Brand');
    });

    it('should include SKU if provided', () => {
      const props: ProductCardProps = {
        name: 'Test Product',
        description: 'A test product',
        sku: 'SKU-123',
      };

      const schema = generateProductSchema(props, 'en');

      expect(schema.sku).toBe('SKU-123');
    });
  });
});

