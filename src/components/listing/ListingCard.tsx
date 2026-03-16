'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiMapPin, FiMaximize } from 'react-icons/fi';
import { IoBedOutline } from 'react-icons/io5';
import { LiaBathSolid } from 'react-icons/lia';
import { Listing } from '@/lib/types';
import { formatPrice, formatAddressShort, formatNumber, formatRelativeDate } from '@/lib/utils';
import { STATUS_MAP } from '@/lib/constants';
import { useFavoritesStore } from '@/store';

interface ListingCardProps {
  listing: Listing;
  priority?: boolean;
}

export default function ListingCard({ listing, priority = false }: ListingCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const favorited = isFavorite(listing.mlsNumber);

  const statusInfo = STATUS_MAP[listing.status] || STATUS_MAP['A'];
  const mainPhoto = listing.photos?.[0] || '/placeholder-home.jpg';

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorited) {
      removeFavorite(listing.mlsNumber);
    } else {
      addFavorite(listing.mlsNumber);
    }
  };

  return (
    <Link href={`/listing/${listing.mlsNumber}`} className="listing-card block">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={mainPhoto}
          alt={formatAddressShort(listing.address)}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover listing-card-image transition-transform duration-500"
          priority={priority}
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`badge ${statusInfo.color} text-white`}>
            {statusInfo.label}
          </span>
        </div>

        {/* Photo Count */}
        {listing.photos?.length > 1 && (
          <div className="absolute bottom-3 left-3">
            <span className="badge bg-black/60 text-white">
              📷 {listing.photos.length}
            </span>
          </div>
        )}

        {/* Open House Badge */}
        {listing.openHouse && listing.openHouse.length > 0 && (
          <div className="absolute top-3 right-14">
            <span className="badge bg-orange-500 text-white">
              Open House
            </span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-all"
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FiHeart
            className={`w-5 h-5 transition-colors ${
              favorited ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>

        {/* Virtual Tour Badge */}
        {listing.details.virtualTour && (
          <div className="absolute bottom-3 right-3">
            <span className="badge bg-brand-600 text-white">
              3D Tour
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(listing.soldPrice || listing.listPrice)}
          </span>
          {listing.details.daysOnMarket !== undefined && (
            <span className="text-xs text-gray-500">
              {listing.details.daysOnMarket}d on market
            </span>
          )}
        </div>

        {/* Address */}
        <div className="flex items-center gap-1 text-gray-600 mb-2">
          <FiMapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-sm truncate">
            {formatAddressShort(listing.address)}, {listing.address.city}
          </span>
        </div>

        {/* Details */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {listing.details.bedrooms > 0 && (
            <div className="flex items-center gap-1">
              <IoBedOutline className="w-4 h-4" />
              <span>{listing.details.bedrooms} bed</span>
            </div>
          )}
          {listing.details.bathrooms > 0 && (
            <div className="flex items-center gap-1">
              <LiaBathSolid className="w-4 h-4" />
              <span>{listing.details.bathrooms} bath</span>
            </div>
          )}
          {listing.details.sqft > 0 && (
            <div className="flex items-center gap-1">
              <FiMaximize className="w-4 h-4" />
              <span>{formatNumber(listing.details.sqft)} sqft</span>
            </div>
          )}
        </div>

        {/* Office Attribution */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400 truncate">
            {listing.office.brokerageName || listing.office.name}
          </p>
        </div>
      </div>
    </Link>
  );
}
