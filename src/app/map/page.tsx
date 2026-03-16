'use client';

import { useState, useEffect } from 'react';
import { Listing } from '@/lib/types';
import MapView from '@/components/map/MapView';
import ListingCard from '@/components/listing/ListingCard';
import SearchFilters from '@/components/search/SearchFilters';
import { ListingCardSkeleton } from '@/components/ui/Skeleton';

export default function MapSearchPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({
    status: 'A' as const,
    pageSize: 100,
    sortBy: 'listDate',
    sortOrder: 'desc' as const,
  });

  useEffect(() => {
    async function fetch_listings() {
      setLoading(true);
      try {
        const queryString = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value) queryString.set(key, String(value));
        });

        const res = await fetch(`/api/search?${queryString}`);
        const data = await res.json();
        setListings(data.listings || []);
      } catch (error) {
        console.error('Map search error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetch_listings();
  }, [params]);

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Filters */}
      <div className="p-4 bg-white border-b">
        <SearchFilters
          params={params as any}
          onChange={(newParams) => setParams({ ...params, ...newParams } as any)}
          onReset={() => setParams({ status: 'A', pageSize: 100, sortBy: 'listDate', sortOrder: 'desc' })}
          resultCount={listings.length}
        />
      </div>

      {/* Map + List */}
      <div className="flex-1 flex">
        {/* Listing Sidebar */}
        <div className="w-96 overflow-y-auto border-r bg-white hidden lg:block">
          <div className="p-4">
            <h2 className="font-semibold text-gray-900 mb-4">{listings.length} Listings</h2>
            <div className="space-y-4">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <ListingCardSkeleton key={i} />)
                : listings.map((listing) => (
                    <ListingCard key={listing.mlsNumber} listing={listing} />
                  ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1">
          <MapView listings={listings} height="100%" />
        </div>
      </div>
    </div>
  );
}
