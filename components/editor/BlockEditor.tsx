'use client';

import { Block } from '@/types/block';
import { blockRegistry } from '@/lib/editor/blockRegistry';

interface BlockEditorProps {
  block: Block;
  onChange: (props: Record<string, any>) => void;
  onDelete: () => void;
  locale: string;
}

export function BlockEditor({ block, onChange, onDelete, locale }: BlockEditorProps) {
  const definition = blockRegistry.get(block.type);

  if (!definition || !definition.editorComponent) {
    return (
      <div className="p-4 border rounded bg-gray-50">
        <p className="text-sm text-gray-500">No editor available for {block.type}</p>
      </div>
    );
  }

  const EditorComponent = definition.editorComponent;

  return (
    <div className="p-4 border rounded bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{definition.label}</h3>
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          Delete
        </button>
      </div>
      <EditorComponent block={block} onChange={onChange} locale={locale} />
    </div>
  );
}

