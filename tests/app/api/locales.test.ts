import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '@/app/api/locales/route';
import { LocaleConfig } from '@/types/locale';

describe('Locales API Route', () => {
  describe('GET /api/locales', () => {
    it('should return locales array', async () => {
      const request = new NextRequest('http://localhost:3000/api/locales');
      const response = await GET(request);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it('should always include English as first locale', async () => {
      const request = new NextRequest('http://localhost:3000/api/locales');
      const response = await GET(request);
      
      const data = await response.json();
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].code).toBe('en');
      expect(data[0].isDefault).toBe(true);
    });

    it('should return locale objects with code and name', async () => {
      const request = new NextRequest('http://localhost:3000/api/locales');
      const response = await GET(request);
      
      const data = await response.json();
      data.forEach((locale: LocaleConfig) => {
        expect(locale).toHaveProperty('code');
        expect(locale).toHaveProperty('name');
        expect(typeof locale.code).toBe('string');
        expect(typeof locale.name).toBe('string');
      });
    });
  });
});

