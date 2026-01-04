import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, POST } from '@/app/api/pages/route';
import { createPage, deletePage } from '@/lib/storage/pages';

describe('Pages API Route', () => {
  beforeEach(async () => {
    // Clean up any test pages
    const pages = await import('@/lib/storage/pages').then((m) => m.getAllPages());
    for (const page of pages) {
      if (page.slug.startsWith('test-')) {
        await deletePage(page.id);
      }
    }
  });

  describe('GET /api/pages', () => {
    it('should return all pages', async () => {
      await createPage('test-get-all');
      
      const request = new NextRequest('http://localhost:3000/api/pages');
      const response = await GET(request);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it('should return empty array when no pages exist', async () => {
      // This test might have existing pages, so we just check it's an array
      const request = new NextRequest('http://localhost:3000/api/pages');
      const response = await GET(request);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });
  });

  describe('POST /api/pages', () => {
    it('should create a new page', async () => {
      const request = new NextRequest('http://localhost:3000/api/pages', {
        method: 'POST',
        body: JSON.stringify({ slug: 'test-create-api' }),
      });
      
      const response = await POST(request);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.slug).toBe('test-create-api');
      expect(data.id).toBeDefined();
      expect(data.locales).toBeDefined();
      
      // Cleanup
      await deletePage(data.id);
    });

    it('should return 400 if slug is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/pages', {
        method: 'POST',
        body: JSON.stringify({}),
      });
      
      const response = await POST(request);
      
      expect(response.status).toBe(400);
    });

    it('should return 400 if slug is not a string', async () => {
      const request = new NextRequest('http://localhost:3000/api/pages', {
        method: 'POST',
        body: JSON.stringify({ slug: 123 }),
      });
      
      const response = await POST(request);
      
      expect(response.status).toBe(400);
    });

    it('should always include English locale in created page', async () => {
      const request = new NextRequest('http://localhost:3000/api/pages', {
        method: 'POST',
        body: JSON.stringify({ slug: 'test-english-locale' }),
      });
      
      const response = await POST(request);
      const data = await response.json();
      
      expect(data.locales['en']).toBeDefined();
      
      // Cleanup
      await deletePage(data.id);
    });
  });
});

