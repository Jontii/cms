import { describe, it, expect } from 'vitest';
import { generateCompanySchema, CompanyCardProps } from '@/lib/schemas/company';

describe('Company Schema Generator', () => {
  describe('generateCompanySchema', () => {
    it('should generate basic company schema', () => {
      const props: CompanyCardProps = {
        name: 'Test Company',
        description: 'A test company',
      };

      const schema = generateCompanySchema(props, 'en');

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Organization');
      expect(schema.name).toBe('Test Company');
      expect(schema.description).toBe('A test company');
    });

    it('should include URL if provided', () => {
      const props: CompanyCardProps = {
        name: 'Test Company',
        description: 'A test company',
        url: 'https://example.com',
      };

      const schema = generateCompanySchema(props, 'en');

      expect(schema.url).toBe('https://example.com');
    });

    it('should include logo if provided', () => {
      const props: CompanyCardProps = {
        name: 'Test Company',
        description: 'A test company',
        logo: 'https://example.com/logo.png',
      };

      const schema = generateCompanySchema(props, 'en');

      expect(schema.logo).toBe('https://example.com/logo.png');
    });

    it('should include address if provided', () => {
      const props: CompanyCardProps = {
        name: 'Test Company',
        description: 'A test company',
        address: {
          streetAddress: '123 Main St',
          addressLocality: 'Stockholm',
          postalCode: '12345',
          addressCountry: 'SE',
        },
      };

      const schema = generateCompanySchema(props, 'en');

      expect(schema.address).toBeDefined();
      expect(schema.address['@type']).toBe('PostalAddress');
      expect(schema.address.streetAddress).toBe('123 Main St');
      expect(schema.address.addressLocality).toBe('Stockholm');
      expect(schema.address.postalCode).toBe('12345');
      expect(schema.address.addressCountry).toBe('SE');
    });

    it('should include contact point if provided', () => {
      const props: CompanyCardProps = {
        name: 'Test Company',
        description: 'A test company',
        contactPoint: {
          telephone: '+46 123 456 789',
          email: 'info@example.com',
        },
      };

      const schema = generateCompanySchema(props, 'en');

      expect(schema.contactPoint).toBeDefined();
      expect(schema.contactPoint['@type']).toBe('ContactPoint');
      expect(schema.contactPoint.telephone).toBe('+46 123 456 789');
      expect(schema.contactPoint.email).toBe('info@example.com');
    });

    it('should handle partial address fields', () => {
      const props: CompanyCardProps = {
        name: 'Test Company',
        description: 'A test company',
        address: {
          addressLocality: 'Stockholm',
        },
      };

      const schema = generateCompanySchema(props, 'en');

      expect(schema.address).toBeDefined();
      expect(schema.address.addressLocality).toBe('Stockholm');
      expect(schema.address.streetAddress).toBeUndefined();
    });

    it('should generate locale-specific schema', () => {
      const props: CompanyCardProps = {
        name: 'Testföretag',
        description: 'Ett testföretag',
      };

      const schema = generateCompanySchema(props, 'sv');

      expect(schema.name).toBe('Testföretag');
      expect(schema.description).toBe('Ett testföretag');
    });
  });
});

