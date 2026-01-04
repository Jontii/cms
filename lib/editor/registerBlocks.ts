import { blockRegistry } from './blockRegistry';
import { TextBlockEditor, TextBlockRender } from '@/components/blocks/TextBlock';
import { ImageBlockEditor, ImageBlockRender } from '@/components/blocks/ImageBlock';
import { HeadingBlockEditor, HeadingBlockRender } from '@/components/blocks/HeadingBlock';
import { ButtonBlockEditor, ButtonBlockRender } from '@/components/blocks/ButtonBlock';
import { CompanyCardBlockEditor, CompanyCardBlockRender } from '@/components/blocks/CompanyCardBlock';
import { ProductCardBlockEditor, ProductCardBlockRender } from '@/components/blocks/ProductCardBlock';
import { ArticleBlockEditor, ArticleBlockRender } from '@/components/blocks/ArticleBlock';
import { FAQBlockEditor, FAQBlockRender } from '@/components/blocks/FAQBlock';

let blocksRegistered = false;

export function registerAllBlocks() {
  // Prevent duplicate registration
  if (blocksRegistered) {
    return;
  }
  
  blocksRegistered = true;
  // Basic blocks
  blockRegistry.register({
    type: 'text',
    label: 'Text',
    defaultProps: { text: '' },
    editorComponent: TextBlockEditor,
    renderComponent: TextBlockRender,
  });

  blockRegistry.register({
    type: 'image',
    label: 'Image',
    defaultProps: { src: '', alt: '' },
    editorComponent: ImageBlockEditor,
    renderComponent: ImageBlockRender,
  });

  blockRegistry.register({
    type: 'heading',
    label: 'Heading',
    defaultProps: { text: '', level: 'h1' },
    editorComponent: HeadingBlockEditor,
    renderComponent: HeadingBlockRender,
  });

  blockRegistry.register({
    type: 'button',
    label: 'Button',
    defaultProps: { text: '', href: '', variant: 'primary' },
    editorComponent: ButtonBlockEditor,
    renderComponent: ButtonBlockRender,
  });

  // SEO blocks
  blockRegistry.register({
    type: 'companyCard',
    label: 'Company Card',
    defaultProps: {
      name: '',
      description: '',
      url: '',
      logo: '',
      address: {},
      contactPoint: {},
    },
    editorComponent: CompanyCardBlockEditor,
    renderComponent: CompanyCardBlockRender,
  });

  blockRegistry.register({
    type: 'productCard',
    label: 'Product Card',
    defaultProps: {
      name: '',
      description: '',
      image: '',
      price: 0,
      currency: '',
      availability: 'InStock',
      brand: '',
      sku: '',
    },
    editorComponent: ProductCardBlockEditor,
    renderComponent: ProductCardBlockRender,
  });

  blockRegistry.register({
    type: 'article',
    label: 'Article',
    defaultProps: {
      headline: '',
      description: '',
      image: '',
      author: '',
      datePublished: '',
      dateModified: '',
    },
    editorComponent: ArticleBlockEditor,
    renderComponent: ArticleBlockRender,
  });

  blockRegistry.register({
    type: 'faq',
    label: 'FAQ',
    defaultProps: { items: [] },
    editorComponent: FAQBlockEditor,
    renderComponent: FAQBlockRender,
  });
}

