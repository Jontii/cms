import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, PUT, DELETE } from '@/app/api/pages/[id]/route';
import { createPage, deletePage } from '@/lib/storage/pages';

describe('Pages API Route [id]', () => {
  let testPageId: string;

  beforeEach(async () => {
    const page = await createPage('test-api-id');
    testPageId = page.id;
  });

  afterEach(async () => {
    if (testPageId) {
      try {
        await deletePage(testPageId);
      } catch {
        // Ignore
      }
    }
  });

  describe('GET /api/pages/[id]', () => {
    it('should return a page by id', async () => {
      const request = new NextRequest(`http://localhost:3000/api/pages/${testPageId}`);
      const response = await GET(request, { params: Promise.resolve({ id: testPageId }) });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.id).toBe(testPageId);
      expect(data.slug).toBe('test-api-id');
    });

    it('should return 404 for non-existent page', async () => {
      const request = new NextRequest('http://localhost:3000/api/pages/non-existent');
      const response = await GET(request, { params: Promise.resolve({ id: 'non-existent' }) });
      
      expect(response.status).toBe(404);
    });

    it('should ensure English locale exists in returned page', async () => {
      const request = new NextRequest(`http://localhost:3000/api/pages/${testPageId}`);
      const response = await GET(request, { params: Promise.resolve({ id: testPageId }) });
      
      const data = await response.json();
      expect(data.locales['en']).toBeDefined();
    });
  });

  describe('PUT /api/pages/[id]', () => {
    it('should update a page', async () => {
      const updatedPage = {
        id: testPageId,
        slug: 'test-api-id',
        locales: {
          en: {
            title: 'Updated Title',
            content: [],
            seo: { title: '', description: '', jsonSchemas: [] },
          },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const request = new NextRequest(`http://localhost:3000/api/pages/${testPageId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedPage),
      });
      
      const response = await PUT(request, { params: Promise.resolve({ id: testPageId }) });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.locales.en.title).toBe('Updated Title');
    });

    it('should return 400 if page ID mismatch', async () => {
      const updatedPage = {
        id: 'different-id',
        slug: 'test-api-id',
        locales: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const request = new NextRequest(`http://localhost:3000/api/pages/${testPageId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedPage),
      });
      
      const response = await PUT(request, { params: Promise.resolve({ id: testPageId }) });
      
      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/pages/[id]', () => {
    it('should delete a page', async () => {
      const deletePageId = (await createPage('test-delete-api')).id;
      
      const request = new NextRequest(`http://localhost:3000/api/pages/${deletePageId}`, {
        method: 'DELETE',
      });
      
      const response = await DELETE(request, { params: Promise.resolve({ id: deletePageId }) });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
    });
  });
});

