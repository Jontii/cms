import { LocaleConfig, DEFAULT_LOCALES } from '@/types/locale';
import { promises as fs } from 'fs';
import path from 'path';

const LOCALES_FILE = path.join(process.cwd(), 'data', 'locales.json');

export async function getLocales(): Promise<LocaleConfig[]> {
  try {
    const data = await fs.readFile(LOCALES_FILE, 'utf-8');
    const locales = JSON.parse(data) as LocaleConfig[];
    
    // Ensure English is always present and is the default
    const englishLocale = locales.find((l) => l.code === 'en') || {
      code: 'en',
      name: 'English',
      isDefault: true,
    };
    englishLocale.isDefault = true;
    
    // Remove English from array if it exists, then add it first
    const otherLocales = locales.filter((l) => l.code !== 'en');
    return [englishLocale, ...otherLocales];
  } catch {
    // Return defaults if file doesn't exist
    return DEFAULT_LOCALES;
  }
}

export async function saveLocales(locales: LocaleConfig[]): Promise<void> {
  await fs.mkdir(path.dirname(LOCALES_FILE), { recursive: true });
  await fs.writeFile(LOCALES_FILE, JSON.stringify(locales, null, 2));
}

