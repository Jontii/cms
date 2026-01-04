'use client';

import { BlockEditorProps, BlockRenderProps } from '@/types/block';
import { ProductCardProps } from '@/lib/schemas/product';

export function ProductCardBlockEditor({ block, onChange }: BlockEditorProps) {
  const props = block.props as ProductCardProps;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Product Name</label>
        <input
          type="text"
          value={props.name || ''}
          onChange={(e) => onChange({ ...props, name: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Product Name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={props.description || ''}
          onChange={(e) => onChange({ ...props, description: e.target.value })}
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Product description..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Image URL</label>
        <input
          type="text"
          value={props.image || ''}
          onChange={(e) => onChange({ ...props, image: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="https://example.com/product.jpg"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            value={props.price || ''}
            onChange={(e) => onChange({ ...props, price: parseFloat(e.target.value) || 0 })}
            className="w-full p-2 border rounded"
            placeholder="0.00"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Currency</label>
          <input
            type="text"
            value={props.currency || ''}
            onChange={(e) => onChange({ ...props, currency: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="USD"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Availability</label>
        <select
          value={props.availability || ''}
          onChange={(e) => onChange({ ...props, availability: e.target.value as any })}
          className="w-full p-2 border rounded"
        >
          <option value="">Select...</option>
          <option value="InStock">In Stock</option>
          <option value="OutOfStock">Out of Stock</option>
          <option value="PreOrder">Pre-Order</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Brand</label>
        <input
          type="text"
          value={props.brand || ''}
          onChange={(e) => onChange({ ...props, brand: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Brand Name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">SKU</label>
        <input
          type="text"
          value={props.sku || ''}
          onChange={(e) => onChange({ ...props, sku: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="SKU-123"
        />
      </div>
    </div>
  );
}

export function ProductCardBlockRender({ block }: BlockRenderProps) {
  const props = block.props as ProductCardProps;

  if (!props.name) return null;

  return (
    <div className="my-6 p-6 border rounded-lg">
      {props.image && (
        <img src={props.image} alt={props.name} className="w-full h-64 object-cover rounded mb-4" />
      )}
      <h3 className="text-2xl font-bold mb-2">{props.name}</h3>
      {props.description && (
        <p className="text-gray-700 mb-4">{props.description}</p>
      )}
      {props.brand && (
        <p className="text-sm text-gray-600 mb-2">Brand: {props.brand}</p>
      )}
      {props.price !== undefined && props.currency && (
        <p className="text-2xl font-bold mb-2">
          {props.currency} {props.price.toFixed(2)}
        </p>
      )}
      {props.availability && (
        <span className={`inline-block px-3 py-1 rounded text-sm ${
          props.availability === 'InStock' ? 'bg-green-100 text-green-800' :
          props.availability === 'OutOfStock' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {props.availability === 'InStock' ? 'In Stock' :
           props.availability === 'OutOfStock' ? 'Out of Stock' :
           'Pre-Order'}
        </span>
      )}
      {props.sku && (
        <p className="text-xs text-gray-500 mt-2">SKU: {props.sku}</p>
      )}
    </div>
  );
}

