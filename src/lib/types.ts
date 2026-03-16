// ============================================
// LISTING TYPES
// ============================================

export interface Listing {
  mlsNumber: string;
  listPrice: number;
  soldPrice?: number;
  status: 'A' | 'U' | 'S'; // Active, Under Contract, Sold
  class: string;
  type: string;
  listDate: string;
  soldDate?: string;
  lastUpdate: string;
  address: Address;
  details: ListingDetails;
  photos: string[];
  office: Office;
  agents: Agent[];
  map: MapCoordinates;
  openHouse?: OpenHouse[];
  rooms?: Room[];
  taxes?: Tax;
  history?: PriceHistory[];
  nearby?: NearbySchool[];
}

export interface Address {
  streetNumber: string;
  streetName: string;
  streetSuffix: string;
  unitNumber?: string;
  city: string;
  state: string;
  zip: string;
  neighborhood?: string;
  county?: string;
  area?: string;
}

export interface ListingDetails {
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize?: string;
  yearBuilt?: number;
  garage?: string;
  propertyType: string;
  style?: string;
  stories?: number;
  description: string;
  features?: string[];
  heating?: string;
  cooling?: string;
  basement?: string;
  pool?: string;
  waterfront?: boolean;
  virtualTour?: string;
  daysOnMarket?: number;
}

export interface Office {
  name: string;
  phone?: string;
  email?: string;
  logo?: string;
  brokerageName: string;
}

export interface Agent {
  name: string;
  phone?: string;
  email?: string;
  photo?: string;
  title?: string;
  bio?: string;
  agentId?: string;
}

export interface MapCoordinates {
  latitude: number;
  longitude: number;
}

export interface OpenHouse {
  date: string;
  startTime: string;
  endTime: string;
  comments?: string;
}

export interface Room {
  name: string;
  level?: string;
  dimensions?: string;
  description?: string;
}

export interface Tax {
  amount: number;
  year: number;
  assessedValue?: number;
}

export interface PriceHistory {
  date: string;
  price: number;
  event: string;
  source?: string;
}

export interface NearbySchool {
  name: string;
  type: string;
  district: string;
  rating?: number;
  distance?: number;
}

// ============================================
// SEARCH TYPES
// ============================================

export interface SearchParams {
  city?: string;
  zip?: string;
  neighborhood?: string;
  county?: string;
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  maxBeds?: number;
  minBaths?: number;
  maxBaths?: number;
  minSqft?: number;
  maxSqft?: number;
  propertyType?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
  openHouse?: boolean;
  daysOnMarket?: number;
  yearBuiltMin?: number;
  yearBuiltMax?: number;
  keywords?: string;
  polygon?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  schoolDistrict?: string;
}

export interface SearchResponse {
  listings: Listing[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
  statistics?: SearchStatistics;
}

export interface SearchStatistics {
  averagePrice: number;
  medianPrice: number;
  totalListings: number;
  averageDaysOnMarket: number;
  pricePerSqft: number;
}

// ============================================
// USER TYPES
// ============================================

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'agent' | 'admin';
  createdAt: string;
}

export interface SavedSearch {
  id: string;
  userId: string;
  name: string;
  params: SearchParams;
  emailAlerts: boolean;
  frequency: 'instant' | 'daily' | 'weekly';
  lastNotified?: string;
  createdAt: string;
}

export interface Favorite {
  id: string;
  userId: string;
  mlsNumber: string;
  listing?: Listing;
  notes?: string;
  createdAt: string;
}

// ============================================
// LEAD TYPES
// ============================================

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  mlsNumber?: string;
  source: 'contact_form' | 'showing_request' | 'saved_search' | 'registration';
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  agentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShowingRequest {
  id: string;
  leadId: string;
  mlsNumber: string;
  preferredDate: string;
  preferredTime: string;
  alternateDate?: string;
  alternateTime?: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

// ============================================
// AGENT TYPES
// ============================================

export interface AgentProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  bio?: string;
  title?: string;
  specializations?: string[];
  serviceAreas?: string[];
  languages?: string[];
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  stats?: {
    totalListings: number;
    totalSold: number;
    averageDaysOnMarket: number;
    totalVolume: number;
  };
}

// ============================================
// NEIGHBORHOOD / MARKET TYPES
// ============================================

export interface Neighborhood {
  slug: string;
  name: string;
  city: string;
  state: string;
  description?: string;
  image?: string;
  stats: NeighborhoodStats;
  coordinates: MapCoordinates;
}

export interface NeighborhoodStats {
  totalListings: number;
  averagePrice: number;
  medianPrice: number;
  pricePerSqft: number;
  averageDaysOnMarket: number;
  totalSold30Days: number;
  priceChangePercent: number;
}

export interface MarketReport {
  area: string;
  period: string;
  stats: NeighborhoodStats;
  priceHistory: { month: string; averagePrice: number; totalSold: number }[];
  inventoryHistory: { month: string; totalActive: number }[];
}

// ============================================
// CMA TYPES
// ============================================

export interface CMAReport {
  subjectProperty: {
    address: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    yearBuilt: number;
  };
  comparables: Listing[];
  estimatedValue: {
    low: number;
    mid: number;
    high: number;
  };
  adjustments: {
    mlsNumber: string;
    adjustedPrice: number;
    notes: string;
  }[];
  generatedAt: string;
}

// ============================================
// NOTIFICATION TYPES
// ============================================

export interface Notification {
  id: string;
  userId: string;
  type: 'new_listing' | 'price_change' | 'open_house' | 'showing_confirmed' | 'system';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
