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
  props: Record<string, unknown>;
  order: number;
}

export interface BlockDefinition {
  type: BlockType;
  label: string;
  icon?: string;
  defaultProps: Record<string, unknown>;
  editorComponent?: React.ComponentType<BlockEditorProps>;
  renderComponent: React.ComponentType<BlockRenderProps>;
}

export interface BlockEditorProps {
  block: Block;
  onChange: (props: Record<string, unknown>) => void;
  locale: string;
}

export interface BlockRenderProps {
  block: Block;
  locale: string;
}

