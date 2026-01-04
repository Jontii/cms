'use client';

import { LocaleConfig } from '@/types/locale';

interface LocaleSwitcherProps {
  locales: LocaleConfig[];
  currentLocale: string;
  onLocaleChange: (locale: string) => void;
}

export function LocaleSwitcher({ locales, currentLocale, onLocaleChange }: LocaleSwitcherProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Locale:</span>
      <select
        value={currentLocale}
        onChange={(e) => onLocaleChange(e.target.value)}
        className="px-3 py-1 border rounded bg-white"
      >
        {locales.map((locale) => (
          <option key={locale.code} value={locale.code}>
            {locale.name} ({locale.code})
          </option>
        ))}
      </select>
    </div>
  );
}

