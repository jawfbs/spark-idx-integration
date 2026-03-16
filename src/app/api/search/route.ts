import { NextRequest, NextResponse } from 'next/server';
import { searchListings } from '@/lib/repliers';
import { SearchParams } from '@/lib/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const params: SearchParams = {
    city: searchParams.get('city') || undefined,
    zip: searchParams.get('zip') || undefined,
    neighborhood: searchParams.get('neighborhood') || undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    minBeds: searchParams.get('minBeds') ? Number(searchParams.get('minBeds')) : undefined,
    maxBeds: searchParams.get('maxBeds') ? Number(searchParams.get('maxBeds')) : undefined,
    minBaths: searchParams.get('minBaths') ? Number(searchParams.get('minBaths')) : undefined,
    maxBaths: searchParams.get('maxBaths') ? Number(searchParams.get('maxBaths')) : undefined,
    minSqft: searchParams.get('minSqft') ? Number(searchParams.get('minSqft')) : undefined,
    maxSqft: searchParams.get('maxSqft') ? Number(searchParams.get('maxSqft')) : undefined,
    propertyType: searchParams.get('propertyType') || undefined,
    status: searchParams.get('status') || 'A',
    sortBy: searchParams.get('sortBy') || 'listDate',
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    pageSize: searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : 24,
    openHouse: searchParams.get('openHouse') === 'true' || undefined,
    keywords: searchParams.get('keywords') || undefined,
    polygon: searchParams.get('polygon') || undefined,
    lat: searchParams.get('lat') ? Number(searchParams.get('lat')) : undefined,
    lng: searchParams.get('lng') ? Number(searchParams.get('lng')) : undefined,
    radius: searchParams.get('radius') ? Number(searchParams.get('radius')) : undefined,
    schoolDistrict: searchParams.get('schoolDistrict') || undefined,
    yearBuiltMin: searchParams.get('yearBuiltMin') ? Number(searchParams.get('yearBuiltMin')) : undefined,
    yearBuiltMax: searchParams.get('yearBuiltMax') ? Number(searchParams.get('yearBuiltMax')) : undefined,
  };

  try {
    const results = await searchListings(params);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Search failed', listings: [], count: 0, page: 1, pageSize: 24, totalPages: 0 },
      { status: 500 }
    );
  }
}
