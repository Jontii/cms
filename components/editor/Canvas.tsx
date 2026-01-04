'use client';

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Block } from '@/types/block';
import { BlockEditor } from './BlockEditor';

interface CanvasProps {
  blocks: Block[];
  onBlockChange: (blockId: string, props: Record<string, unknown>) => void;
  onBlockDelete: (blockId: string) => void;
  locale: string;
}

function SortableBlockItem({
  block,
  onBlockChange,
  onBlockDelete,
  locale,
}: {
  block: Block;
  onBlockChange: (blockId: string, props: Record<string, unknown>) => void;
  onBlockDelete: () => void;
  locale: string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-4">
      <div className="flex items-start gap-2">
        <div
          {...attributes}
          {...listeners}
          className="mt-4 cursor-move p-2 hover:bg-gray-100 rounded"
        >
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            />
          </svg>
        </div>
        <div className="flex-1">
          <BlockEditor
            block={block}
            onChange={(props) => onBlockChange(block.id, props)}
            onDelete={onBlockDelete}
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
}

export function Canvas({ blocks, onBlockChange, onBlockDelete, locale }: CanvasProps) {
  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
        {blocks.length === 0 ? (
          <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded p-8">
            <p className="text-lg mb-2">No blocks yet</p>
            <p className="text-sm">Drag blocks from the sidebar to get started</p>
          </div>
        ) : (
          blocks.map((block) => (
            <SortableBlockItem
              key={block.id}
              block={block}
              onBlockChange={onBlockChange}
              onBlockDelete={() => onBlockDelete(block.id)}
              locale={locale}
            />
          ))
        )}
      </SortableContext>
    </div>
  );
}

