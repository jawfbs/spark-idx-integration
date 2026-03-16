'use client';

import { useState, useCallback, useMemo, useRef } from 'react';
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from 'react-map-gl';
import { Listing } from '@/lib/types';
import { formatPrice, formatAddressShort } from '@/lib/utils';
import { DEFAULT_MAP_CENTER } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapViewProps {
  listings: Listing[];
  center?: { latitude: number; longitude: number };
  zoom?: number;
  onBoundsChange?: (bounds: any) => void;
  height?: string;
  interactive?: boolean;
  singleListing?: boolean;
}

export default function MapView({
  listings,
  center,
  zoom = 11,
  onBoundsChange,
  height = '500px',
  interactive = true,
  singleListing = false,
}: MapViewProps) {
  const mapRef = useRef<any>(null);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const mapCenter = center ||
    (listings.length > 0
      ? { latitude: listings[0].map.latitude, longitude: listings[0].map.longitude }
      : DEFAULT_MAP_CENTER);

  const [viewState, setViewState] = useState({
    latitude: mapCenter.latitude,
    longitude: mapCenter.longitude,
    zoom: singleListing ? 15 : zoom,
  });

  const handleMoveEnd = useCallback(
    (evt: any) => {
      if (onBoundsChange && mapRef.current) {
        const bounds = mapRef.current.getMap().getBounds();
        onBoundsChange(bounds);
      }
    },
    [onBoundsChange]
  );

  const markers = useMemo(
    () =>
      listings
        .filter((l) => l.map.latitude && l.map.longitude)
        .map((listing) => (
          <Marker
            key={listing.mlsNumber}
            latitude={listing.map.latitude}
            longitude={listing.map.longitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedListing(listing);
            }}
          >
            <div
              className={`px-2 py-1 rounded-full text-xs font-bold shadow-lg cursor-pointer transform transition-transform hover:scale-110 ${
                listing.status === 'S'
                  ? 'bg-red-500 text-white'
                  : listing.status === 'U'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-brand-600 text-white'
              }`}
            >
              {formatPrice(listing.listPrice)}
            </div>
          </Marker>
        )),
    [listings]
  );

  return (
    <div style={{ height }} className="rounded-xl overflow-hidden border border-gray-200">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        onMoveEnd={handleMoveEnd}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: '100%', height: '100%' }}
        interactive={interactive}
        onClick={() => setSelectedListing(null)}
      >
        <NavigationControl position="top-right" />
        <GeolocateControl position="top-right" />

        {markers}

        {selectedListing && (
          <Popup
            latitude={selectedListing.map.latitude}
            longitude={selectedListing.map.longitude}
            anchor="bottom"
            onClose={() => setSelectedListing(null)}
            closeButton={true}
            closeOnClick={false}
            offset={25}
          >
            <Link
              href={`/listing/${selectedListing.mlsNumber}`}
              className="block w-64"
            >
              {selectedListing.photos?.[0] && (
                <div className="relative h-32 -mx-[10px] -mt-[10px]">
                  <Image
                    src={selectedListing.photos[0]}
                    alt={formatAddressShort(selectedListing.address)}
                    fill
                    className="object-cover"
                    sizes="256px"
                  />
                </div>
              )}
              <div className="p-2">
                <p className="font-bold text-lg text-gray-900">
                  {formatPrice(selectedListing.listPrice)}
                </p>
                <p className="text-sm text-gray-600 truncate">
                  {formatAddressShort(selectedListing.address)}, {selectedListing.address.city}
                </p>
                <div className="flex gap-3 text-xs text-gray-500 mt-1">
                  {selectedListing.details.bedrooms > 0 && (
                    <span>{selectedListing.details.bedrooms} bed</span>
                  )}
                  {selectedListing.details.bathrooms > 0 && (
                    <span>{selectedListing.details.bathrooms} bath</span>
                  )}
                  {selectedListing.details.sqft > 0 && (
                    <span>{selectedListing.details.sqft.toLocaleString()} sqft</span>
                  )}
                </div>
              </div>
            </Link>
          </Popup>
        )}
      </Map>
    </div>
  );
}
