'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FiGrid, FiMap, FiList } from 'react-icons/fi';
import { Listing, SearchParams as SearchParamsType, SearchResponse } from '@/lib/types';
import SearchBar from '@/components/search/SearchBar';
import SearchFilters from '@/components/search/SearchFilters';
import SaveSearchButton from '@/components/search/SaveSearchButton';
import ListingGrid from '@/components/listing/ListingGrid';
import MapView from '@/components/map/MapView';
import Pagination from '@/components/ui/Pagination';
import { ListingGridSkeleton } from '@/components/ui/Skeleton';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'map' | 'split'>('grid');

  // Parse URL params into search params
  const getParamsFromUrl = useCallback((): SearchParamsType => {
    return {
      city: searchParams.get('city') || undefined,
      zip: searchParams.get('zip') || undefined,
      neighborhood: searchParams.get('neighborhood') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      minBeds: searchParams.get('minBeds') ? Number(searchParams.get('minBeds')) : undefined,
      minBaths: searchParams.get('minBaths') ? Number(searchParams.get('minBaths')) : undefined,
      minSqft: searchParams.get('minSqft') ? Number(searchParams.get('minSqft')) : undefined,
      maxSqft: searchParams.get('maxSqft') ? Number(searchParams.get('maxSqft')) : undefined,
      propertyType: searchParams.get('propertyType') || undefined,
      status: searchParams.get('status') || 'A',
      sortBy: searchParams.get('sortBy') || 'listDate',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      pageSize: 24,
      openHouse: searchParams.get('openHouse') === 'true' || undefined,
      keywords: searchParams.get('keywords') || undefined,
      yearBuiltMin: searchParams.get('yearBuiltMin') ? Number(searchParams.get('yearBuiltMin')) : undefined,
      yearBuiltMax: searchParams.get('yearBuiltMax') ? Number(searchParams.get('yearBuiltMax')) : undefined,
    };
  }, [searchParams]);

  const [currentParams, setCurrentParams] = useState<SearchParamsType>(getParamsFromUrl());

  // Fetch results
  const fetchResults = useCallback(async (params: SearchParamsType) => {
    setLoading(true);
    try {
      const queryString = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryString.set(key, String(value));
        }
      });

      const res = await fetch(`/api/search?${queryString}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const params = getParamsFromUrl();
    setCurrentParams(params);
    fetchResults(params);
  }, [searchParams, fetchResults, getParamsFromUrl]);

  // Update URL and refetch
  const updateSearch = useCallback(
    (newParams: Partial<SearchParamsType>) => {
      const merged = { ...currentParams, ...newParams, page: newParams.page || 1 };
      setCurrentParams(merged);

      const queryString = new URLSearchParams();
      Object.entries(merged).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '' && value !== 'A' && key !== 'pageSize') {
          queryString.set(key, String(value));
        }
      });

      router.push(`/search?${queryString}`, { scroll: false });
    },
    [currentParams, router]
  );

  const resetSearch = () => {
    router.push('/search');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-6">
        {/* Search Bar */}
        <div className="mb-4">
          <SearchBar
            variant="page"
            initialValue={currentParams.city || currentParams.zip || ''}
            onSearch={(query) => updateSearch({ city: query })}
          />
        </div>

        {/* Filters */}
        <div className="mb-4">
          <SearchFilters
            params={currentParams}
            onChange={updateSearch}
            onReset={resetSearch}
            resultCount={results?.count}
          />
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {loading ? 'Searching...' : `${results?.count?.toLocaleString() || 0} Results`}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <SaveSearchButton params={currentParams} />

            {/* View Toggle */}
            <div className="flex bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-brand-50 text-brand-600' : 'text-gray-400'}`}
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 ${viewMode === 'map' ? 'bg-brand-50 text-brand-600' : 'text-gray-400'}`}
              >
                <FiMap className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`p-2 ${viewMode === 'split' ? 'bg-brand-50 text-brand-600' : 'text-gray-400'}`}
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <ListingGridSkeleton />
        ) : viewMode === 'grid' ? (
          <>
            <ListingGrid listings={results?.listings || []} />
            {results && (
              <Pagination
                currentPage={results.page}
                totalPages={results.totalPages}
                onPageChange={(page) => updateSearch({ page })}
              />
            )}
          </>
        ) : viewMode === 'map' ? (
          <MapView
            listings={results?.listings || []}
            height="calc(100vh - 300px)"
          />
        ) : (
          // Split view
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
              {results?.listings?.map((listing) => (
                <div key={listing.mlsNumber} className="listing-card">
                  <div className="flex gap-4 p-4">
                    {listing.photos?.[0] && (
                      <div className="w-32 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={listing.photos[0]}
                          alt=""
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-lg">${listing.listPrice.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">
                        {listing.address.streetNumber} {listing.address.streetName}, {listing.address.city}
                      </p>
                      <p className="text-sm text-gray-500">
                        {listing.details.bedrooms} bed · {listing.details.bathrooms} bath · {listing.details.sqft.toLocaleString()} sqft
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="sticky top-24">
              <MapView
                listings={results?.listings || []}
                height="calc(100vh - 300px)"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
