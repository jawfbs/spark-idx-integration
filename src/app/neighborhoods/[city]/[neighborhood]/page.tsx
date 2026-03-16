import { Metadata } from 'next';
import { deslugify, formatPrice, getSearchUrl } from '@/lib/utils';
import { searchListings } from '@/lib/repliers';
import ListingGrid from '@/components/listing/ListingGrid';
import MapView from '@/components/map/MapView';
import Link from 'next/link';

export const revalidate = 300;

interface Props {
  params: { city: string; neighborhood: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = deslugify(params.city);
  const neighborhood = deslugify(params.neighborhood);
  return {
    title: `${neighborhood}, ${city} - Homes for Sale`,
    description: `Browse homes for sale in ${neighborhood}, ${city}. View listings, prices, and neighborhood information.`,
  };
}

export default async function NeighborhoodPage({ params }: Props) {
  const city = deslugify(params.city);
  const neighborhood = deslugify(params.neighborhood);

  const [activeResults, soldResults] = await Promise.all([
    searchListings({ city, neighborhood, status: 'A', pageSize: 24 }),
    searchListings({ city, neighborhood, status: 'S', pageSize: 12 }),
  ]);

  const allListings = [...activeResults.listings, ...soldResults.listings];

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/neighborhoods" className="hover:text-brand-600">Neighborhoods</Link>
          <span>/</span>
          <Link href={`/neighborhoods/${params.city}`} className="hover:text-brand-600">{city}</Link>
          <span>/</span>
          <span className="text-gray-900">{neighborhood}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{neighborhood}, {city}</h1>
        <p className="text-gray-500 mt-1">
          {activeResults.count} active listings
        </p>
      </div>

      {/* Stats */}
      {activeResults.statistics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-500">Active Listings</p>
            <p className="text-2xl font-bold text-gray-900">{activeResults.count}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-500">Average Price</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(activeResults.statistics.averagePrice)}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-500">Median Price</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(activeResults.statistics.medianPrice)}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-500">Avg Days on Market</p>
            <p className="text-2xl font-bold text-gray-900">
              {activeResults.statistics.averageDaysOnMarket}
            </p>
          </div>
        </div>
      )}

      {/* Map */}
      {allListings.length > 0 && (
        <div className="mb-8">
          <MapView listings={allListings} height="400px" />
        </div>
      )}

      {/* Active Listings */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Homes for Sale</h2>
        <ListingGrid
          listings={activeResults.listings}
          emptyTitle={`No active listings in ${neighborhood}`}
          emptyDescription="Check back soon for new listings."
        />
      </div>

      {/* Recently Sold */}
      {soldResults.listings.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recently Sold</h2>
          <ListingGrid listings={soldResults.listings} />
        </div>
      )}
    </div>
  );
}
