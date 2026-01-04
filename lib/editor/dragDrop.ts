import { Block } from '@/types/block';
import { v4 as uuidv4 } from 'uuid';

export function createBlockFromType(type: string, order: number): Block {
  return {
    id: uuidv4(),
    type: type as Block['type'],
    props: {},
    order,
  };
}

export function reorderBlocks(blocks: Block[], startIndex: number, endIndex: number): Block[] {
  if (blocks.length === 0) {
    return [];
  }
  
  const result = Array.from(blocks);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  
  // Update order values
  return result.map((block, index) => ({
    ...block,
    order: index,
  }));
}

