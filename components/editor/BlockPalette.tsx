'use client';

import { useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { blockRegistry } from '@/lib/editor/blockRegistry';
import { registerAllBlocks } from '@/lib/editor/registerBlocks';

// Register blocks immediately on module load
registerAllBlocks();

interface BlockPaletteProps {
  onBlockSelect?: (type: string) => void;
}

function DraggableBlock({ type, label }: { type: string; label: string }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { type, source: 'palette' },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-3 border rounded cursor-move hover:bg-gray-50 transition ${
        isDragging ? 'opacity-20 pointer-events-none' : ''
      }`}
    >
      <div className="text-sm font-medium">{label}</div>
      <div className="text-xs text-gray-500 mt-1">{type}</div>
    </div>
  );
}

export function BlockPalette({ onBlockSelect }: BlockPaletteProps) {
  // Ensure blocks are registered (in case they weren't registered on module load)
  useEffect(() => {
    if (blockRegistry.getAll().length === 0) {
      registerAllBlocks();
    }
  }, []);

  const basicBlocks = blockRegistry.getByCategory('basic');
  const seoBlocks = blockRegistry.getByCategory('seo');

  // Debug: Log if no blocks found
  useEffect(() => {
    if (basicBlocks.length === 0 && seoBlocks.length === 0) {
      console.warn('No blocks registered. Total blocks:', blockRegistry.getAll().length);
    }
  }, [basicBlocks.length, seoBlocks.length]);

  return (
    <div className="w-64 bg-white border-r p-4 overflow-y-auto h-full">
      <h2 className="text-lg font-bold mb-4">Blocks</h2>
      
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Basic</h3>
        <div className="space-y-2">
          {basicBlocks.length > 0 ? (
            basicBlocks.map((block) => (
              <DraggableBlock key={block.type} type={block.type} label={block.label} />
            ))
          ) : (
            <p className="text-xs text-gray-400">No basic blocks available</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">SEO</h3>
        <div className="space-y-2">
          {seoBlocks.length > 0 ? (
            seoBlocks.map((block) => (
              <DraggableBlock key={block.type} type={block.type} label={block.label} />
            ))
          ) : (
            <p className="text-xs text-gray-400">No SEO blocks available</p>
          )}
        </div>
      </div>
    </div>
  );
}

