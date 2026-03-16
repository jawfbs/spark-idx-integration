import { NextRequest, NextResponse } from 'next/server';
import { getAutocompleteSuggestions } from '@/lib/repliers';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query');

  if (!query || query.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const suggestions = await getAutocompleteSuggestions(query
