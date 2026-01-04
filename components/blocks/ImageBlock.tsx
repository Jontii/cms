'use client';

import { BlockEditorProps, BlockRenderProps } from '@/types/block';

export function ImageBlockEditor({ block, onChange }: BlockEditorProps) {
  const src = block.props.src || '';
  const alt = block.props.alt || '';

  return (
    <div className="space-y-2">
      <div>
        <label className="block text-sm font-medium">Image URL</label>
        <input
          type="text"
          value={src}
          onChange={(e) => onChange({ ...block.props, src: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="https://example.com/image.jpg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Alt Text</label>
        <input
          type="text"
          value={alt}
          onChange={(e) => onChange({ ...block.props, alt: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Image description"
        />
      </div>
    </div>
  );
}

export function ImageBlockRender({ block }: BlockRenderProps) {
  const src = block.props.src || '';
  const alt = block.props.alt || '';
  
  if (!src) return null;

  return (
    <div className="my-4">
      <img src={src} alt={alt} className="max-w-full h-auto rounded" />
    </div>
  );
}

