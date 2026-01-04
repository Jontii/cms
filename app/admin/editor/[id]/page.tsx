'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Block, BlockType } from '@/types/block';
import { Page } from '@/types/page';
import { LocaleConfig } from '@/types/locale';
import { Canvas } from '@/components/editor/Canvas';
import { BlockPalette } from '@/components/editor/BlockPalette';
import { LocaleSwitcher } from '@/components/editor/LocaleSwitcher';
import { getLocales } from '@/lib/storage/locales';
import { getPage, updatePageLocale } from '@/lib/storage/pages';
import { generateCompanySchema } from '@/lib/schemas/company';
import { generateProductSchema } from '@/lib/schemas/product';
import { generateArticleSchema } from '@/lib/schemas/article';
import { generateFAQSchema } from '@/lib/schemas/faq';
import { createBlockFromType, reorderBlocks } from '@/lib/editor/dragDrop';
import { blockRegistry } from '@/lib/editor/blockRegistry';
import { DroppableCanvas } from '@/components/editor/DroppableCanvas';

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const pageId = params.id as string;
  const isNew = pageId === 'new';

  const [page, setPage] = useState<Page | null>(null);
  const [locales, setLocales] = useState<LocaleConfig[]>([]);
  const [currentLocale, setCurrentLocale] = useState<string>('en');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [slug, setSlug] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedBlockType, setDraggedBlockType] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    async function loadData() {
      const [localesData, pageData] = await Promise.all([
        fetch('/api/locales').then((r) => r.json()),
        isNew ? null : fetch(`/api/pages/${pageId}`).then((r) => r.json()),
      ]);

      setLocales(localesData);
      // Always default to English
      setCurrentLocale('en');

      if (pageData) {
        // Ensure English locale always exists
        if (!pageData.locales) {
          pageData.locales = {};
        }
        if (!pageData.locales['en']) {
          pageData.locales['en'] = {
            title: '',
            content: [],
            seo: {
              title: '',
              description: '',
              jsonSchemas: [],
            },
          };
        }
        setPage(pageData);
        setSlug(pageData.slug);
      }

      setLoading(false);
    }

    loadData();
  }, [pageId, isNew]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    
    // Check if dragging from palette
    if (event.active.data.current?.source === 'palette') {
      setDraggedBlockType(event.active.data.current.type);
    } else {
      setDraggedBlockType(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    if (!page) return;

    // Handle dropping from palette
    if (active.data.current?.source === 'palette') {
      const blockType = active.data.current.type;
      // Ensure locales exist
      if (!page.locales) {
        page.locales = {};
      }
      if (!page.locales[currentLocale]) {
        page.locales[currentLocale] = {
          title: '',
          content: [],
          seo: { title: '', description: '', jsonSchemas: [] },
        };
      }
      const currentBlocks = page.locales[currentLocale].content || [];
      const newBlock = createBlockFromType(blockType, currentBlocks.length);
      handleBlocksChange([...currentBlocks, newBlock]);
      setActiveId(null);
      return;
    }

    // Handle reordering
    // Ensure locales exist
    if (!page.locales) {
      page.locales = {};
    }
    if (!page.locales[currentLocale]) {
      page.locales[currentLocale] = {
        title: '',
        content: [],
        seo: { title: '', description: '', jsonSchemas: [] },
      };
    }
    const currentBlocks = page.locales[currentLocale].content || [];
    if (active.id !== over.id) {
      const oldIndex = currentBlocks.findIndex((b) => b.id === active.id);
      const newIndex = currentBlocks.findIndex((b) => b.id === over.id);
      const newBlocks = arrayMove(currentBlocks, oldIndex, newIndex);
      // Update order values to match the new positions
      const reordered = newBlocks.map((block, index) => ({
        ...block,
        order: index,
      }));
      handleBlocksChange(reordered);
    }

    setActiveId(null);
    setDraggedBlockType(null);
  };

  const handleBlocksChange = (blocks: Block[]) => {
    if (!page) return;

    // Ensure locales object exists
    if (!page.locales) {
      page.locales = {};
    }

    // Ensure current locale exists
    if (!page.locales[currentLocale]) {
      page.locales[currentLocale] = {
        title: '',
        content: [],
        seo: {
          title: '',
          description: '',
          jsonSchemas: [],
        },
      };
    }

    // Generate JSON-LD schemas for SEO blocks
    const jsonSchemas = blocks
      .map((block) => {
        try {
          switch (block.type) {
            case 'companyCard':
              return generateCompanySchema(block.props, currentLocale);
            case 'productCard':
              return generateProductSchema(block.props, currentLocale);
            case 'article':
              return generateArticleSchema(block.props, currentLocale);
            case 'faq':
              return generateFAQSchema(block.props, currentLocale);
            default:
              return null;
          }
        } catch {
          return null;
        }
      })
      .filter((schema): schema is NonNullable<typeof schema> => schema !== null);

    const updatedPage = {
      ...page,
      locales: {
        ...page.locales,
        [currentLocale]: {
          ...page.locales[currentLocale],
          content: blocks,
          seo: {
            ...page.locales[currentLocale].seo,
            jsonSchemas,
          },
        },
      },
    };

    setPage(updatedPage);
  };

  const handleCreatePage = async () => {
    if (!slug.trim()) {
      alert('Please enter a slug');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: slug.trim() }),
      });

      if (response.ok) {
        const newPage = await response.json();
        router.push(`/admin/editor/${newPage.id}`);
      } else {
        alert('Failed to create page');
      }
    } catch (error) {
      console.error('Failed to create page:', error);
      alert('Failed to create page');
    } finally {
      setSaving(false);
    }
  };

  const handleLocaleChange = (locale: string) => {
    setCurrentLocale(locale);
  };

  const handleSave = async () => {
    if (!page) return;

    // Ensure locales object exists
    if (!page.locales) {
      page.locales = {};
    }

    // Ensure current locale exists
    if (!page.locales[currentLocale]) {
      page.locales[currentLocale] = {
        title: '',
        content: [],
        seo: {
          title: '',
          description: '',
          jsonSchemas: [],
        },
      };
    }

    // Regenerate JSON-LD schemas for SEO blocks before saving
    const currentBlocks = page.locales[currentLocale].content || [];
    const jsonSchemas = currentBlocks
      .map((block) => {
        try {
          switch (block.type) {
            case 'companyCard':
              return generateCompanySchema(block.props, currentLocale);
            case 'productCard':
              return generateProductSchema(block.props, currentLocale);
            case 'article':
              return generateArticleSchema(block.props, currentLocale);
            case 'faq':
              return generateFAQSchema(block.props, currentLocale);
            default:
              return null;
          }
        } catch {
          return null;
        }
      })
      .filter((schema): schema is NonNullable<typeof schema> => schema !== null);

    const pageToSave = {
      ...page,
      locales: {
        ...page.locales,
        [currentLocale]: {
          ...page.locales[currentLocale],
          seo: {
            ...page.locales[currentLocale].seo,
            jsonSchemas,
          },
        },
      },
    };

    setSaving(true);
    try {
      const response = await fetch(`/api/pages/${page.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageToSave),
      });

      if (!response.ok) {
        throw new Error('Failed to save page');
      }

      const savedPage = await response.json();
      setPage(savedPage);
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save page. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleTitleChange = (title: string) => {
    if (!page) return;

    // Ensure locales object exists
    if (!page.locales) {
      page.locales = {};
    }

    // Ensure current locale exists
    if (!page.locales[currentLocale]) {
      page.locales[currentLocale] = {
        title: '',
        content: [],
        seo: {
          title: '',
          description: '',
          jsonSchemas: [],
        },
      };
    }

    const updatedPage = {
      ...page,
      locales: {
        ...page.locales,
        [currentLocale]: {
          ...page.locales[currentLocale],
          title,
        },
      },
    };

    setPage(updatedPage);
  };

  const handleSEOChange = (field: 'title' | 'description', value: string) => {
    if (!page) return;

    // Ensure locales object exists
    if (!page.locales) {
      page.locales = {};
    }

    // Ensure current locale exists
    if (!page.locales[currentLocale]) {
      page.locales[currentLocale] = {
        title: '',
        content: [],
        seo: {
          title: '',
          description: '',
          jsonSchemas: [],
        },
      };
    }

    const updatedPage = {
      ...page,
      locales: {
        ...page.locales,
        [currentLocale]: {
          ...page.locales[currentLocale],
          seo: {
            ...page.locales[currentLocale].seo,
            [field]: value,
          },
        },
      },
    };

    setPage(updatedPage);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (isNew) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create New Page</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Page Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="company-card"
            />
            <p className="text-xs text-gray-500 mt-1">
              This will be the URL path: /[locale]/[slug]
            </p>
          </div>
          <button
            onClick={handleCreatePage}
            disabled={saving || !slug.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Creating...' : 'Create Page'}
          </button>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Page not found</div>
      </div>
    );
  }

  // Ensure locales object exists
  if (!page.locales) {
    page.locales = {};
  }

  // Ensure English always exists
  if (!page.locales['en']) {
    page.locales['en'] = {
      title: '',
      content: [],
      seo: {
        title: '',
        description: '',
        jsonSchemas: [],
      },
    };
  }

  const currentLocaleData = page.locales[currentLocale] || page.locales['en'] || {
    title: '',
    content: [],
    seo: { title: '', description: '', jsonSchemas: [] },
  };

  const handleBlockChange = (blockId: string, props: Record<string, unknown>) => {
    if (!page) return;
    const updated = currentLocaleData.content.map((b) =>
      b.id === blockId ? { ...b, props: { ...b.props, ...props } } : b
    );
    handleBlocksChange(updated);
  };

  const handleBlockDelete = (blockId: string) => {
    if (!page) return;
    const updated = currentLocaleData.content.filter((b) => b.id !== blockId);
    const reordered = reorderBlocks(updated, 0, updated.length);
    handleBlocksChange(reordered);
  };

  const activeBlock = activeId && page && !draggedBlockType
    ? page.locales[currentLocale].content.find((b) => b.id === activeId)
    : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-[calc(100vh-73px)]">
        <BlockPalette />
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <LocaleSwitcher
                locales={locales}
                currentLocale={currentLocale}
                onLocaleChange={handleLocaleChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <a
                href={`/${currentLocale}/${page.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
              >
                Preview
              </a>
              <Link
                href="/admin"
                className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
              >
                Back to Pages
              </Link>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="h-full flex">
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto p-6">
                  <div className="mb-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Page Title</label>
                      <input
                        type="text"
                        value={currentLocaleData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Page Title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">SEO Title</label>
                      <input
                        type="text"
                        value={currentLocaleData.seo.title}
                        onChange={(e) => handleSEOChange('title', e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="SEO Title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">SEO Description</label>
                      <textarea
                        value={currentLocaleData.seo.description}
                        onChange={(e) => handleSEOChange('description', e.target.value)}
                        className="w-full p-2 border rounded"
                        rows={2}
                        placeholder="SEO Description"
                      />
                    </div>
                  </div>
                  <DroppableCanvas id="canvas-drop-zone">
                    <Canvas
                      blocks={currentLocaleData.content}
                      onBlockChange={handleBlockChange}
                      onBlockDelete={handleBlockDelete}
                      locale={currentLocale}
                    />
                  </DroppableCanvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DragOverlay>
        {draggedBlockType ? (
          <div className="p-4 border rounded bg-white shadow-lg opacity-90">
            <div className="text-sm font-medium">
              {blockRegistry.get(draggedBlockType as BlockType)?.label || draggedBlockType}
            </div>
            <div className="text-xs text-gray-500 mt-1">{draggedBlockType}</div>
          </div>
        ) : activeBlock ? (
          <div className="p-4 border rounded bg-white shadow-lg opacity-90">
            <div className="text-sm font-medium">
              {blockRegistry.get(activeBlock.type)?.label || activeBlock.type}
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

