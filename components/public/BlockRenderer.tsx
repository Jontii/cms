'use client';

import { Block } from '@/types/block';
import { blockRegistry } from '@/lib/editor/blockRegistry';

interface BlockRendererProps {
  blocks: Block[];
  locale: string;
}

export function BlockRenderer({ blocks, locale }: BlockRendererProps) {
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

