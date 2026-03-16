'use client';

import { useEffect, useState } from 'react';
import { Listing } from '@/lib/types';
import { useFavoritesStore } from '@/store';
import ListingGrid from '@/components/listing/ListingGrid';
import { ListingGridSkeleton } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import { useRouter } from 'next/navigation';

export default function FavoritesPage() {
  const { favorites } = useFavoritesStore();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchFavorites() {
      if (favorites.length === 0) {
        setListings([]);
        setLoading(false);
        return;
      }

      try {
        const results = await Promise.all(
          favorites.map(async (mlsNumber) => {
            const res = await fetch(`/api/listing/${mlsNumber}`);
            if (res.ok) return res.json();
            return null;
          })
        );

        setListings(results.filter(Boolean));
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, [favorites]);

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
        <p className="text-gray-500 mt-1">
          {favorites.length} saved {favorites.length === 1 ? 'listing' : 'listings'}
        </p>
      </div>

      {loading ? (
        <ListingGridSkeleton count={6} />
      ) : favorites.length === 0 ? (
        <EmptyState
          icon="heart"
          title="No favorites yet"
          description="Heart listings you love to save them here."
          action={{
            label: 'Browse Listings',
            onClick: () => router.push('/search'),
          }}
        />
      ) : (
        <ListingGrid listings={listings} />
      )}
    </div>
  );
}
