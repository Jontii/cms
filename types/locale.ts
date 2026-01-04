export interface LocaleConfig {
  code: string;
  name: string;
  domain?: string;
  isDefault?: boolean;
}

export const DEFAULT_LOCALES: LocaleConfig[] = [
  { code: 'en', name: 'English', isDefault: true },
  { code: 'sv', name: 'Swedish' },
  { code: 'no', name: 'Norwegian' },
];

