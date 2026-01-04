'use client';

import { useState } from 'react';
import { BlockEditorProps, BlockRenderProps } from '@/types/block';
import { FAQProps, FAQItem } from '@/lib/schemas/faq';

export function FAQBlockEditor({ block, onChange }: BlockEditorProps) {
  const props = block.props as FAQProps;
  const items = props.items || [];

  const updateItem = (index: number, field: 'question' | 'answer', value: string) => {
    const newItems = [...items];
    if (!newItems[index]) {
      newItems[index] = { question: '', answer: '' };
    }
    newItems[index][field] = value;
    onChange({ items: newItems });
  };

  const addItem = () => {
    onChange({ items: [...items, { question: '', answer: '' }] });
  };

  const removeItem = (index: number) => {
    onChange({ items: items.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium">FAQ Items</label>
        <button
          onClick={addItem}
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          Add Item
        </button>
      </div>
      {items.map((item, index) => (
        <div key={index} className="p-4 border rounded">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Item {index + 1}</span>
            <button
              onClick={() => removeItem(index)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-medium">Question</label>
              <input
                type="text"
                value={item.question}
                onChange={(e) => updateItem(index, 'question', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Question..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium">Answer</label>
              <textarea
                value={item.answer}
                onChange={(e) => updateItem(index, 'answer', e.target.value)}
                className="w-full p-2 border rounded"
                rows={2}
                placeholder="Answer..."
              />
            </div>
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-sm text-gray-500">No FAQ items yet. Click &quot;Add Item&quot; to get started.</p>
      )}
    </div>
  );
}

export function FAQBlockRender({ block }: BlockRenderProps) {
  const props = block.props as FAQProps;
  const items = props.items || [];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <div className="my-6">
      <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="border rounded">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50"
            >
              <span className="font-medium">{item.question || `Question ${index + 1}`}</span>
              <span className="text-gray-500">{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && item.answer && (
              <div className="px-4 py-3 border-t bg-gray-50">
                <p className="text-gray-700">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

