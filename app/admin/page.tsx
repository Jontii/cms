import Link from 'next/link';
import { getAllPages } from '@/lib/storage/pages';

export default async function AdminPagesPage() {
  const pages = await getAllPages();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Pages</h2>
        <Link
          href="/admin/editor/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create New Page
        </Link>
      </div>

      {pages.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">No pages yet</p>
          <p className="text-sm">Create your first page to get started</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {pages.map((page) => (
            <Link
              key={page.id}
              href={`/admin/editor/${page.id}`}
              className="p-4 bg-white border rounded hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">/{page.slug}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Updated: {new Date(page.updatedAt).toLocaleString()}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {Object.keys(page.locales).map((locale) => (
                      <span
                        key={locale}
                        className="px-2 py-1 bg-gray-100 rounded text-xs"
                      >
                        {locale}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

