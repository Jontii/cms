import { Page, PageLocale } from '@/types/page';
import { LocaleConfig } from '@/types/locale';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { getLocales } from './locales';

const PAGES_DIR = path.join(process.cwd(), 'data', 'pages');

async function ensurePagesDir(): Promise<void> {
  await fs.mkdir(PAGES_DIR, { recursive: true });
}

function getPagePath(id: string): string {
  return path.join(PAGES_DIR, `${id}.json`);
}

export async function getAllPages(): Promise<Page[]> {
  await ensurePagesDir();
  try {
    const files = await fs.readdir(PAGES_DIR);
    const pages = await Promise.all(
      files
        .filter((file) => file.endsWith('.json'))
        .map(async (file) => {
          const data = await fs.readFile(path.join(PAGES_DIR, file), 'utf-8');
          return JSON.parse(data);
        })
    );
    return pages.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  } catch {
    return [];
  }
}

export async function getPage(id: string): Promise<Page | null> {
  await ensurePagesDir();
  try {
    const data = await fs.readFile(getPagePath(id), 'utf-8');
    const page = JSON.parse(data) as Page;
    
    // Ensure English locale always exists
    if (!page.locales) {
      page.locales = {};
    }
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
    
    return page;
  } catch {
    return null;
  }
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const pages = await getAllPages();
  const page = pages.find((p) => p.slug === slug);
  
  if (page) {
    // Ensure English locale always exists
    if (!page.locales) {
      page.locales = {};
    }
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
  }
  
  return page || null;
}

export async function createPage(slug: string, initialLocale?: string): Promise<Page> {
  await ensurePagesDir();
  const locales = await getLocales();
  const now = new Date().toISOString();
  
  const page: Page = {
    id: uuidv4(),
    slug,
    locales: {},
    createdAt: now,
    updatedAt: now,
  };

  // Always create English first as the default
  const englishLocale = locales.find((l) => l.code === 'en') || {
    code: 'en',
    name: 'English',
    isDefault: true,
  };

  // Create English locale first with empty content
  page.locales['en'] = {
    title: '',
    content: [],
    seo: {
      title: '',
      description: '',
      jsonSchemas: [],
    },
  };

  // Then create other locale versions, copying from English
  for (const locale of locales) {
    if (locale.code === 'en') continue; // Already created
    
    const defaultContent = page.locales['en']; // Always use English as default

    page.locales[locale.code] = {
      title: defaultContent.title,
      content: JSON.parse(JSON.stringify(defaultContent.content)), // Deep copy
      seo: {
        title: defaultContent.seo.title,
        description: defaultContent.seo.description,
        jsonSchemas: JSON.parse(JSON.stringify(defaultContent.seo.jsonSchemas)),
      },
    };
  }

  await savePage(page);
  return page;
}

export async function savePage(page: Page): Promise<void> {
  await ensurePagesDir();
  
  // Ensure English locale always exists
  if (!page.locales) {
    page.locales = {};
  }
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
  
  page.updatedAt = new Date().toISOString();
  await fs.writeFile(getPagePath(page.id), JSON.stringify(page, null, 2));
}

export async function deletePage(id: string): Promise<void> {
  await ensurePagesDir();
  try {
    await fs.unlink(getPagePath(id));
  } catch {
    // File doesn't exist, ignore
  }
}

export async function updatePageLocale(
  pageId: string,
  locale: string,
  localeData: Partial<PageLocale>
): Promise<Page> {
  const page = await getPage(pageId);
  if (!page) {
    throw new Error('Page not found');
  }

  // Ensure English locale exists
  if (!page.locales) {
    page.locales = {};
  }
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

  if (!page.locales[locale]) {
    // Always use English as the default source
    const defaultContent = page.locales['en'];
    page.locales[locale] = {
      title: defaultContent.title,
      content: JSON.parse(JSON.stringify(defaultContent.content)),
      seo: {
        title: defaultContent.seo.title,
        description: defaultContent.seo.description,
        jsonSchemas: JSON.parse(JSON.stringify(defaultContent.seo.jsonSchemas)),
      },
    };
  }

  page.locales[locale] = {
    ...page.locales[locale],
    ...localeData,
  };

  await savePage(page);
  return page;
}

