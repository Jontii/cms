'use client';

import { BlockEditorProps, BlockRenderProps } from '@/types/block';

export function HeadingBlockEditor({ block, onChange }: BlockEditorProps) {
  const text = block.props.text || '';
  const level = block.props.level || 'h1';

  return (
    <div className="space-y-2">
      <div>
        <label className="block text-sm font-medium">Heading Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => onChange({ ...block.props, text: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Enter heading..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Level</label>
        <select
          value={level}
          onChange={(e) => onChange({ ...block.props, level: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
          <option value="h4">H4</option>
        </select>
      </div>
    </div>
  );
}

export function HeadingBlockRender({ block }: BlockRenderProps) {
  const text = block.props.text || '';
  const level = block.props.level || 'h1';
  
  if (!text) return null;

  const HeadingTag = level as 'h1' | 'h2' | 'h3' | 'h4';
  const classes = {
    h1: 'text-4xl font-bold my-4',
    h2: 'text-3xl font-bold my-3',
    h3: 'text-2xl font-semibold my-2',
    h4: 'text-xl font-semibold my-2',
  };

  return <HeadingTag className={classes[HeadingTag]}>{text}</HeadingTag>;
}

