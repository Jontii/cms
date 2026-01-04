'use client';

import { useEffect } from 'react';
import { Block } from '@/types/block';
import { blockRegistry } from '@/lib/editor/blockRegistry';
import { registerAllBlocks } from '@/lib/editor/registerBlocks';

// Register blocks immediately on module load
registerAllBlocks();

interface BlockRendererProps {
  blocks: Block[];
  locale: string;
}

export function BlockRenderer({ blocks, locale }: BlockRendererProps) {
  // Ensure blocks are registered (in case they weren't registered on module load)
  useEffect(() => {
    if (blockRegistry.getAll().length === 0) {
      registerAllBlocks();
    }
  }, []);

  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);

  return (
    <div>
      {sortedBlocks.map((block) => {
        const definition = blockRegistry.get(block.type);
        if (!definition) {
          return null;
        }

        const RenderComponent = definition.renderComponent;
        return (
          <div key={block.id}>
            <RenderComponent block={block} locale={locale} />
          </div>
        );
      })}
    </div>
  );
}

