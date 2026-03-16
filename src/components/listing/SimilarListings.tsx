'use client';

import { useEffect, useState } from 'react';
import { Listing } from '@/lib/types';
import ListingCard from './ListingCard';

interface SimilarListingsProps {
  mlsNumber: string;
  city: string;
  price: number;
  bedrooms: number;
  propertyType: string;
}

export default function SimilarListings({
  mlsNumber,
  city,
  price,
  bedrooms,
  propertyType,
}: SimilarListingsProps) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSimilar() {
      try {
        const params = new URLSearchParams({
          city,
          minPrice: String(Math.floor(price * 0.8)),
          maxPrice: String(Math.ceil(price * 1.2)),
          minBeds: String(Math.max(1, bedrooms - 1)),
          propertyType,
          pageSize: '6',
          status: 'A',
        });

        const res = await fetch(`/api/search?${params}`);
        const data = await res.json();

        if (data.listings) {
          setListings(data.listings.filter((l: Listing) => l.mlsNumber !== mlsNumber).slice(0, 6));
        }
      } catch (err) {
        console.error('Failed to fetch similar listings:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSimilar();
  }, [mlsNumber, city, price, bedrooms, propertyType]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-[4/3] bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (listings.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing.mlsNumber} listing={listing} />
        ))}
      </div>
    </div>
  );
}
