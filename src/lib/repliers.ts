import { Listing, SearchParams, SearchResponse, SearchStatistics } from './types';
import { DEFAULT_PAGE_SIZE } from './constants';

const API_KEY = process.env.REPLIERS_API_KEY!;
const BASE_URL = process.env.REPLIERS_BASE_URL || 'https://api.repliers.io';

async function repliersRequest(endpoint: string, params?: Record<string, any>) {
  const url = new URL(`${BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      'REPLIERS-API-KEY': API_KEY,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300 }, // ISR: revalidate every 5 minutes
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Repliers API error: ${response.status}`, errorText);
    throw new Error(`Repliers API error: ${response.status}`);
  }

  return response.json();
}

// ============================================
// TRANSFORM FUNCTIONS
// ============================================

function transformListing(raw: any): Listing {
  return {
    mlsNumber: raw.mlsNumber || raw.listingId || '',
    listPrice: raw.listPrice || 0,
    soldPrice: raw.soldPrice || undefined,
    status: raw.status || 'A',
    class: raw.class || '',
    type: raw.type || '',
    listDate: raw.listDate || '',
    soldDate: raw.soldDate || undefined,
    lastUpdate: raw.lastUpdate || raw.updatedOn || '',
    address: {
      streetNumber: raw.address?.streetNumber || '',
      streetName: raw.address?.streetName || '',
      streetSuffix: raw.address?.streetSuffix || '',
      unitNumber: raw.address?.unitNumber || '',
      city: raw.address?.city || '',
      state: raw.address?.state || raw.address?.province || '',
      zip: raw.address?.zip || raw.address?.postalCode || '',
      neighborhood: raw.address?.neighborhood || raw.address?.area || '',
      county: raw.address?.county || '',
      area: raw.address?.area || '',
    },
    details: {
      bedrooms: raw.details?.numBedrooms || raw.bedrooms || 0,
      bathrooms: raw.details?.numBathrooms || raw.bathrooms || 0,
      sqft: raw.details?.sqft || raw.details?.numSquareFeet || 0,
      lotSize: raw.details?.lotSize || raw.lot?.size || '',
      yearBuilt: raw.details?.yearBuilt || undefined,
      garage: raw.details?.garage || '',
      propertyType: raw.details?.propertyType || raw.type || '',
      style: raw.details?.style || '',
      stories: raw.details?.numStories || undefined,
      description: raw.details?.description || raw.remarks || '',
      features: raw.details?.features || [],
      heating: raw.details?.heating || '',
      cooling: raw.details?.cooling || '',
      basement: raw.details?.basement || '',
      pool: raw.details?.pool || '',
      waterfront: raw.details?.waterfront || false,
      virtualTour: raw.details?.virtualTour || raw.virtualTourUrl || '',
      daysOnMarket: raw.details?.daysOnMarket || undefined,
    },
    photos: raw.images || raw.photos || [],
    office: {
      name: raw.office?.name || raw.offices?.[0]?.name || '',
      phone: raw.office?.phone || '',
      email: raw.office?.email || '',
      logo: raw.office?.logo || '',
      brokerageName: raw.office?.brokerageName || raw.office?.name || '',
    },
    agents: (raw.agents || []).map((a: any) => ({
      name: a.name || '',
      phone: a.phone || '',
      email: a.email || '',
      photo: a.photo || '',
      title: a.title || '',
      agentId: a.agentId || '',
    })),
    map: {
      latitude: raw.map?.latitude || raw.address?.latitude || 0,
      longitude: raw.map?.longitude || raw.address?.longitude || 0,
    },
    openHouse: (raw.openHouse || []).map((oh: any) => ({
      date: oh.date || '',
      startTime: oh.startTime || '',
      endTime: oh.endTime || '',
      comments: oh.comments || '',
    })),
    rooms: (raw.rooms || []).map((r: any) => ({
      name: r.name || '',
      level: r.level || '',
      dimensions: r.dimensions || '',
      description: r.description || '',
    })),
    taxes: raw.taxes
      ? {
          amount: raw.taxes.amount || 0,
          year: raw.taxes.year || 0,
          assessedValue: raw.taxes.assessedValue || undefined,
        }
      : undefined,
    history: (raw.history || []).map((h: any) => ({
      date: h.date || '',
      price: h.price || 0,
      event: h.event || '',
      source: h.source || '',
    })),
  };
}

// ============================================
// SEARCH LISTINGS
// ============================================

export async function searchListings(params: SearchParams): Promise<SearchResponse> {
  const queryParams: Record<string, any> = {
    pageNum: params.page || 1,
    resultsPerPage: params.pageSize || DEFAULT_PAGE_SIZE,
    status: params.status || 'A',
    type: params.propertyType || undefined,
    minPrice: params.minPrice || undefined,
    maxPrice: params.maxPrice || undefined,
    minBeds: params.minBeds || undefined,
    maxBeds: params.maxBeds || undefined,
    minBaths: params.minBaths || undefined,
    maxBaths: params.maxBaths || undefined,
    minSqft: params.minSqft || undefined,
    maxSqft: params.maxSqft || undefined,
    city: params.city || undefined,
    zip: params.zip || undefined,
    neighborhood: params.neighborhood || undefined,
    county: params.county || undefined,
    sortBy: params.sortBy || 'listDate',
    sortOrder: params.sortOrder || 'desc',
    openHouse: params.openHouse ? 'true' : undefined,
    keywords: params.keywords || undefined,
    schoolDistrict: params.schoolDistrict || undefined,
  };

  if (params.lat && params.lng && params.radius) {
    queryParams.lat = params.lat;
    queryParams.lng = params.lng;
    queryParams.radius = params.radius;
  }

  if (params.polygon) {
    queryParams.polygon = params.polygon;
  }

  try {
    const data = await repliersRequest('/listings', queryParams);

    const listings = (data.listings || data.results || []).map(transformListing);
    const count = data.count || data.numResults || listings.length;
    const pageSize = params.pageSize || DEFAULT_PAGE_SIZE;

    return {
      listings,
      count,
      page: params.page || 1,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
      statistics: data.statistics || undefined,
    };
  } catch (error) {
    console.error('Search listings error:', error);
    return {
      listings: [],
      count: 0,
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      totalPages: 0,
    };
  }
}

// ============================================
// GET SINGLE LISTING
// ============================================

export async function getListing(mlsNumber: string): Promise<Listing | null> {
  try {
    const data = await repliersRequest(`/listings/${mlsNumber}`);
    return transformListing(data);
  } catch (error) {
    console.error(`Get listing ${mlsNumber} error:`, error);
    return null;
  }
}

// ============================================
// GET SOLD LISTINGS
// ============================================

export async function getSoldListings(params: SearchParams): Promise<SearchResponse> {
  return searchListings({ ...params, status: 'S' });
}

// ============================================
// GET NEIGHBORHOOD LISTINGS
// ============================================

export async function getNeighborhoodListings(
  city: string,
  neighborhood?: string,
  limit: number = 50
): Promise<SearchResponse> {
  return searchListings({
    city,
    neighborhood,
    pageSize: limit,
    status: 'A',
    sortBy: 'listDate',
    sortOrder: 'desc',
  });
}

// ============================================
// GET OPEN HOUSES
// ============================================

export async function getOpenHouses(city?: string): Promise<SearchResponse> {
  return searchListings({
    city,
    openHouse: true,
    pageSize: 50,
    sortBy: 'listDate',
    sortOrder: 'desc',
  });
}

// ============================================
// GET SIMILAR LISTINGS
// ============================================

export async function getSimilarListings(listing: Listing, limit: number = 6): Promise<Listing[]> {
  const priceRange = 0.2; // 20% range
  const result = await searchListings({
    city: listing.address.city,
    minPrice: Math.floor(listing.listPrice * (1 - priceRange)),
    maxPrice: Math.ceil(listing.listPrice * (1 + priceRange)),
    minBeds: Math.max(1, listing.details.bedrooms - 1),
    maxBeds: listing.details.bedrooms + 1,
    propertyType: listing.details.propertyType,
    pageSize: limit + 1, // extra in case we need to filter out the source listing
    status: 'A',
  });

  return result.listings
    .filter(l => l.mlsNumber !== listing.mlsNumber)
    .slice(0, limit);
}

// ============================================
// GET FEATURED / RECENT LISTINGS
// ============================================

export async function getFeaturedListings(limit: number = 12): Promise<Listing[]> {
  const result = await searchListings({
    status: 'A',
    sortBy: 'listPrice',
    sortOrder: 'desc',
    pageSize: limit,
  });
  return result.listings;
}

export async function getRecentListings(limit: number = 12): Promise<Listing[]> {
  const result = await searchListings({
    status: 'A',
    sortBy: 'listDate',
    sortOrder: 'desc',
    pageSize: limit,
  });
  return result.listings;
}

// ============================================
// GET NEIGHBORHOOD STATS
// ============================================

export async function getNeighborhoodStats(city: string): Promise<SearchStatistics | null> {
  try {
    const result = await searchListings({
      city,
      status: 'A',
      pageSize: 1,
    });
    return result.statistics || null;
  } catch {
    return null;
  }
}

// ============================================
// GET AGENT LISTINGS
// ============================================

export async function getAgentListings(agentId: string): Promise<Listing[]> {
  try {
    const data = await repliersRequest('/listings', {
      agentId,
      status: 'A',
      resultsPerPage: 50,
    });
    return (data.listings || []).map(transformListing);
  } catch {
    return [];
  }
}

// ============================================
// GET OFFICE LISTINGS
// ============================================

export async function getOfficeListings(officeName: string): Promise<Listing[]> {
  try {
    const data = await repliersRequest('/listings', {
      officeName,
      status: 'A',
      resultsPerPage: 50,
    });
    return (data.listings || []).map(transformListing);
  } catch {
    return [];
  }
}

// ============================================
// AUTOCOMPLETE
// ============================================

export async function getAutocompleteSuggestions(
  query: string
): Promise<{ type: string; value: string; label: string }[]> {
  try {
    const data = await repliersRequest('/autocomplete', { query });
    return (data.suggestions || []).map((s: any) => ({
      type: s.type || 'city',
      value: s.value || s.text || '',
      label: s.label || s.text || '',
    }));
  } catch {
    return [];
  }
}
