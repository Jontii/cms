'use client';

import { BlockEditorProps, BlockRenderProps } from '@/types/block';

export function TextBlockEditor({ block, onChange }: BlockEditorProps) {
  const text = block.props.text || '';

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Text</label>
      <textarea
        value={text}
        onChange={(e) => onChange({ text: e.target.value })}
        className="w-full p-2 border rounded"
        rows={4}
        placeholder="Enter text content..."
      />
    </div>
  );
}

export function TextBlockRender({ block }: BlockRenderProps) {
  const text = block.props.text || '';
  
  if (!text) return null;

  return (
    <div className="prose max-w-none">
      <p className="whitespace-pre-wrap">{text}</p>
    </div>
  );
}

