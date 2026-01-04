import { NextResponse } from 'next/server';
import { getLocales } from '@/lib/storage/locales';

export async function GET() {
  try {
    const locales = await getLocales();
    return NextResponse.json(locales);
  } catch (error) {
    console.error('Error fetching locales:', error);
    return NextResponse.json({ error: 'Failed to fetch locales' }, { status: 500 });
  }
}

