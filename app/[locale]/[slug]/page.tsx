import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/storage/pages';
import { getLocales } from '@/lib/storage/locales';
import { BlockRenderer } from '@/components/public/BlockRenderer';
import { registerAllBlocks } from '@/lib/editor/registerBlocks';

// Register blocks for rendering
registerAllBlocks();

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page || !page.locales || !page.locales[locale]) {
    return {
      title: 'Page Not Found',
    };
  }

  const localeData = page.locales[locale];
  const jsonLdSchemas = localeData?.seo?.jsonSchemas || [];

  return {
    title: localeData.seo.title || localeData.title || 'Page',
    description: localeData.seo.description || '',
    other: {
      'json-ld': JSON.stringify(jsonLdSchemas),
    },
  };
}

export default async function PublicPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const page = await getPageBySlug(slug);
  const locales = await getLocales();

  if (!page) {
    notFound();
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

  const localeData = page.locales[locale];
  if (!localeData) {
    // Always fallback to English
    const fallbackData = page.locales['en'];
    if (!fallbackData) {
      notFound();
    }
    // Redirect or show fallback - for now, show fallback
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{fallbackData.title}</h1>
          <BlockRenderer blocks={fallbackData.content} locale={defaultLocale} />
        </div>
      </div>
    );
  }

  const jsonLdSchemas = localeData.seo.jsonSchemas || [];

  return (
    <>
      {jsonLdSchemas.length > 0 && (
        <>
          {jsonLdSchemas.map((schema, index) => (
            <script
              key={index}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
          ))}
        </>
      )}
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{localeData.title}</h1>
          <BlockRenderer blocks={localeData.content} locale={locale} />
        </div>
      </div>
    </>
  );
}

