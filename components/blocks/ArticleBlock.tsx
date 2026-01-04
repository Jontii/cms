'use client';

import { BlockEditorProps, BlockRenderProps } from '@/types/block';
import { ArticleProps } from '@/lib/schemas/article';

export function ArticleBlockEditor({ block, onChange }: BlockEditorProps) {
  const props = block.props as ArticleProps;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Headline</label>
        <input
          type="text"
          value={props.headline || ''}
          onChange={(e) => onChange({ ...props, headline: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Article headline..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={props.description || ''}
          onChange={(e) => onChange({ ...props, description: e.target.value })}
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Article description..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Image URL</label>
        <input
          type="text"
          value={props.image || ''}
          onChange={(e) => onChange({ ...props, image: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="https://example.com/article.jpg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Author</label>
        <input
          type="text"
          value={props.author || ''}
          onChange={(e) => onChange({ ...props, author: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Author Name"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium">Date Published</label>
          <input
            type="date"
            value={props.datePublished || ''}
            onChange={(e) => onChange({ ...props, datePublished: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Date Modified</label>
          <input
            type="date"
            value={props.dateModified || ''}
            onChange={(e) => onChange({ ...props, dateModified: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
}

export function ArticleBlockRender({ block }: BlockRenderProps) {
  const props = block.props as ArticleProps;

  if (!props.headline) return null;

  return (
    <article className="my-6">
      {props.image && (
        <img src={props.image} alt={props.headline} className="w-full h-64 object-cover rounded mb-4" />
      )}
      <h1 className="text-4xl font-bold mb-4">{props.headline}</h1>
      {props.description && (
        <p className="text-xl text-gray-700 mb-4">{props.description}</p>
      )}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        {props.author && <span>By {props.author}</span>}
        {props.datePublished && (
          <span>Published: {new Date(props.datePublished).toLocaleDateString()}</span>
        )}
        {props.dateModified && props.dateModified !== props.datePublished && (
          <span>Updated: {new Date(props.dateModified).toLocaleDateString()}</span>
        )}
      </div>
    </article>
  );
}

