import Link from 'next/link';
import { getLocales } from '@/lib/storage/locales';

export default async function Home() {
  const locales = await getLocales();
  const defaultLocale = locales.find((l) => l.isDefault)?.code || locales[0]?.code || 'en';

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-4">Mynt CMS</h1>
        <p className="text-gray-600 mb-8">Visual CMS with Multi-locale SEO Support</p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/admin"
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Admin
          </Link>
          <Link
            href={`/${defaultLocale}`}
            className="px-6 py-3 border rounded hover:bg-gray-100"
          >
            View Site
          </Link>
        </div>
      </main>
    </div>
  );
}
