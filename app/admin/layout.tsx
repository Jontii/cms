import { registerAllBlocks } from '@/lib/editor/registerBlocks';

// Register all blocks on module load
registerAllBlocks();

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">CMS Admin</h1>
          <a href="/admin" className="text-blue-600 hover:underline">
            Pages
          </a>
        </div>
      </nav>
      {children}
    </div>
  );
}

