import { BlockDefinition, BlockType } from '@/types/block';

class BlockRegistry {
  private blocks: Map<BlockType, BlockDefinition> = new Map();

  register(definition: BlockDefinition): void {
    this.blocks.set(definition.type, definition);
  }

  get(type: BlockType): BlockDefinition | undefined {
    return this.blocks.get(type);
  }

  getAll(): BlockDefinition[] {
    return Array.from(this.blocks.values());
  }

  getByCategory(category: 'basic' | 'seo'): BlockDefinition[] {
    const basicTypes: BlockType[] = ['text', 'image', 'heading', 'button'];
    const seoTypes: BlockType[] = ['companyCard', 'productCard', 'article', 'faq'];
    
    const types = category === 'basic' ? basicTypes : seoTypes;
    return types.map((type) => this.blocks.get(type)).filter(Boolean) as BlockDefinition[];
  }
}

export const blockRegistry = new BlockRegistry();

