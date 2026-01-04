import { JsonLdSchema } from '@/types/page';

export interface CompanyCardProps {
  name: string;
  description: string;
  url?: string;
  logo?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  contactPoint?: {
    telephone?: string;
    email?: string;
  };
}

export function generateCompanySchema(props: CompanyCardProps, locale: string): JsonLdSchema {
  const schema: JsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: props.name,
    description: props.description,
  };

  if (props.url) {
    schema.url = props.url;
  }

  if (props.logo) {
    schema.logo = props.logo;
  }

  if (props.address) {
    schema.address = {
      '@type': 'PostalAddress',
      ...(props.address.streetAddress && { streetAddress: props.address.streetAddress }),
      ...(props.address.addressLocality && { addressLocality: props.address.addressLocality }),
      ...(props.address.postalCode && { postalCode: props.address.postalCode }),
      ...(props.address.addressCountry && { addressCountry: props.address.addressCountry }),
    };
  }

  if (props.contactPoint) {
    schema.contactPoint = {
      '@type': 'ContactPoint',
      ...(props.contactPoint.telephone && { telephone: props.contactPoint.telephone }),
      ...(props.contactPoint.email && { email: props.contactPoint.email }),
    };
  }

  return schema;
}

