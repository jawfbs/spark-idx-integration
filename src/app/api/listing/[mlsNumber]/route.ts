import { NextRequest, NextResponse } from 'next/server';
import { getListing } from '@/lib/repliers';

export async function GET(
  request: NextRequest,
  { params }: { params: { mlsNumber: string } }
) {
  try {
    const listing = await getListing(params.mlsNumber);

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.error('Listing API error:', error);
    return NextResponse.json({ error: 'Failed to fetch listing' }, { status: 500 });
  }
}
