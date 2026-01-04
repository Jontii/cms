import { Block } from './block';

export interface JsonLdSchema {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export interface PageLocale {
  title: string;
  content: Block[];
  seo: {
    title: string;
    description: string;
    jsonSchemas: JsonLdSchema[];
  };
}

export interface Page {
  id: string;
  slug: string;
  locales: {
    [locale: string]: PageLocale;
  };
  createdAt: string;
  updatedAt: string;
}

