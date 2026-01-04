import { JsonLdSchema } from '@/types/page';

export interface ArticleProps {
  headline: string;
  description: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
}

export function generateArticleSchema(props: ArticleProps, locale: string): JsonLdSchema {
  const schema: JsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.headline,
    description: props.description,
  };

  if (props.image) {
    schema.image = props.image;
  }

  if (props.author) {
    schema.author = {
      '@type': 'Person',
      name: props.author,
    };
  }

  if (props.datePublished) {
    schema.datePublished = props.datePublished;
  }

  if (props.dateModified) {
    schema.dateModified = props.dateModified;
  }

  return schema;
}

