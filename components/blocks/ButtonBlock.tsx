'use client';

import { BlockEditorProps, BlockRenderProps } from '@/types/block';

export function ButtonBlockEditor({ block, onChange }: BlockEditorProps) {
  const text = block.props.text || '';
  const href = block.props.href || '';
  const variant = block.props.variant || 'primary';

  return (
    <div className="space-y-2">
      <div>
        <label className="block text-sm font-medium">Button Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => onChange({ ...block.props, text: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Click me"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Link URL</label>
        <input
          type="text"
          value={href}
          onChange={(e) => onChange({ ...block.props, href: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="https://example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Style</label>
        <select
          value={variant}
          onChange={(e) => onChange({ ...block.props, variant: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="outline">Outline</option>
        </select>
      </div>
    </div>
  );
}

export function ButtonBlockRender({ block }: BlockRenderProps) {
  const text = block.props.text || '';
  const href = block.props.href || '';
  const variant = block.props.variant || 'primary';
  
  if (!text) return null;

  const classes = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  };

  const button = (
    <button className={`px-6 py-2 rounded transition ${classes[variant as keyof typeof classes]}`}>
      {text}
    </button>
  );

  if (href) {
    return (
      <div className="my-4">
        <a href={href} className="inline-block">
          {button}
        </a>
      </div>
    );
  }

  return <div className="my-4">{button}</div>;
}

