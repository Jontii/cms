import { JsonLdSchema } from '@/types/page';

export interface ProductCardProps {
  name: string;
  description: string;
  image?: string;
  price?: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  brand?: string;
  sku?: string;
}

export function generateProductSchema(props: ProductCardProps, locale: string): JsonLdSchema {
  const schema: JsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: props.name,
    description: props.description,
  };

  if (props.image) {
    schema.image = props.image;
  }

  if (props.price !== undefined && props.currency) {
    schema.offers = {
      '@type': 'Offer',
      price: props.price,
      priceCurrency: props.currency,
      ...(props.availability && { availability: `https://schema.org/${props.availability}` }),
    };
  }

  if (props.brand) {
    schema.brand = {
      '@type': 'Brand',
      name: props.brand,
    };
  }

  if (props.sku) {
    schema.sku = props.sku;
  }

  return schema;
}

