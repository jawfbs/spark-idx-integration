'use client';

import { Listing } from '@/lib/types';
import ListingCard from './ListingCard';
import EmptyState from '@/components/ui/EmptyState';

interface ListingGridProps {
  listings: Listing[];
  emptyTitle?: string;
  emptyDescription?: string;
}

export default function ListingGrid({
  listings,
  emptyTitle = 'No listings found',
  emptyDescription = 'Try adjusting your search criteria.',
}: ListingGridProps) {
  if (listings.length === 0) {
    return <EmptyState icon="home" title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing, index) => (
        <ListingCard
          key={listing.mlsNumber}
          listing={listing}
          priority={index < 6}
        />
      ))}
    </div>
  );
}
