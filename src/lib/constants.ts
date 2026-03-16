export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Spark IDX',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  brokerage: process.env.NEXT_PUBLIC_BROKERAGE_NAME || 'Spark Realty',
  description: 'Find your dream home with the most advanced real estate search.',
  defaultImage: '/og-image.jpg',
};

export const PROPERTY_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'Detached', label: 'Detached' },
  { value: 'Semi-Detached', label: 'Semi-Detached' },
  { value: 'Townhouse', label: 'Townhouse' },
  { value: 'Condo', label: 'Condo' },
  { value: 'Multiplex', label: 'Multiplex' },
  { value: 'Vacant Land', label: 'Vacant Land' },
  { value: 'Farm', label: 'Farm' },
  { value: 'Commercial', label: 'Commercial' },
];

export const PRICE_RANGES = [
  { value: '', label: 'Any Price' },
  { value: '0-200000', label: 'Under $200K' },
  { value: '200000-400000', label: '$200K - $400K' },
  { value: '400000-600000', label: '$400K - $600K' },
  { value: '600000-800000', label: '$600K - $800K' },
  { value: '800000-1000000', label: '$800K - $1M' },
  { value: '1000000-1500000', label: '$1M - $1.5M' },
  { value: '1500000-2000000', label: '$1.5M - $2M' },
  { value: '2000000-999999999', label: '$2M+' },
];

export const BED_OPTIONS = [
  { value: '', label: 'Any Beds' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' },
];

export const BATH_OPTIONS = [
  { value: '', label: 'Any Baths' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
];

export const SORT_OPTIONS = [
  { value: 'listDate-desc', label: 'Newest First' },
  { value: 'listDate-asc', label: 'Oldest First' },
  { value: 'listPrice-asc', label: 'Price: Low to High' },
  { value: 'listPrice-desc', label: 'Price: High to Low' },
  { value: 'sqft-desc', label: 'Sqft: High to Low' },
  { value: 'bedrooms-desc', label: 'Beds: High to Low' },
];

export const STATUS_MAP: Record<string, { label: string; color: string }> = {
  A: { label: 'Active', color: 'bg-green-500' },
  U: { label: 'Under Contract', color: 'bg-yellow-500' },
  S: { label: 'Sold', color: 'bg-red-500' },
};

export const LISTING_STATUS_OPTIONS = [
  { value: 'A', label: 'Active' },
  { value: 'U', label: 'Under Contract' },
  { value: 'S', label: 'Sold' },
];

export const DEFAULT_MAP_CENTER = {
  latitude: 43.6532,
  longitude: -79.3832,
  zoom: 11,
};

export const DEFAULT_PAGE_SIZE = 24;

export const EMAIL_FREQUENCY_OPTIONS = [
  { value: 'instant', label: 'Instant' },
  { value: 'daily', label: 'Daily Digest' },
  { value: 'weekly', label: 'Weekly Summary' },
];

export const LEAD_STATUS_OPTIONS = [
  { value: 'new', label: 'New', color: 'bg-blue-500' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-500' },
  { value: 'qualified', label: 'Qualified', color: 'bg-green-500' },
  { value: 'closed', label: 'Closed', color: 'bg-gray-500' },
];

export const IDX_DISCLAIMER = `The listing data is provided under copyright by the Toronto Regional Real Estate Board. The listing data is deemed reliable but is not guaranteed accurate by the Toronto Regional Real Estate Board. The trademarks REALTOR®, REALTORS®, and the REALTOR® logo are controlled by The Canadian Real Estate Association (CREA) and identify real estate professionals who are members of CREA.`;

export const MLS_ATTRIBUTION = `Data is supplied by Pillar 9™ Technology Inc. Pillar 9™ is the owner of the intellectual property rights to the IDX data.`;
