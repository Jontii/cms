export type BlockType =
  | 'text'
  | 'image'
  | 'heading'
  | 'button'
  | 'companyCard'
  | 'productCard'
  | 'article'
  | 'faq';

export interface Block {
  id: string;
  type: BlockType;
  props: Record<string, any>;
  order: number;
}

export interface BlockDefinition {
  type: BlockType;
  label: string;
  icon?: string;
  defaultProps: Record<string, any>;
  editorComponent?: React.ComponentType<BlockEditorProps>;
  renderComponent: React.ComponentType<BlockRenderProps>;
}

export interface BlockEditorProps {
  block: Block;
  onChange: (props: Record<string, any>) => void;
  locale: string;
}

export interface BlockRenderProps {
  block: Block;
  locale: string;
}

