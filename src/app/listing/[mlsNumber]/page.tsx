import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FiMapPin, FiCalendar, FiClock, FiHome, FiMaximize } from 'react-icons/fi';
import { IoBedOutline } from 'react-icons/io5';
import { LiaBathSolid } from 'react-icons/lia';
import { getListing, getSimilarListings } from '@/lib/repliers';
import { formatPriceFull, formatAddress, formatAddressShort, formatNumber, formatDate, formatRelativeDate } from '@/lib/utils';
import { STATUS_MAP, SITE_CONFIG } from '@/lib/constants';
import PhotoGallery from '@/components/listing/PhotoGallery';
import MortgageCalculator from '@/components/listing/MortgageCalculator';
import PriceHistory from '@/components/listing/PriceHistory';
import ShareButton from '@/components/listing/ShareButton';
import VirtualTour from '@/components/listing/VirtualTour';
import SimilarListings from '@/components/listing/SimilarListings';
import ContactForm from '@/components/forms/ContactForm';
import ShowingRequestForm from '@/components/forms/ShowingRequestForm';
import MapView from '@/components/map/MapView';

export const revalidate = 300;

interface Props {
  params: { mlsNumber: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const listing = await getListing(params.mlsNumber);
  if (!listing) return { title: 'Listing Not Found' };

  const address = formatAddress(listing.address);
  const title = `${address} - ${formatPriceFull(listing.listPrice)}`;
  const description = `${listing.details.bedrooms} bed, ${listing.details.bathrooms} bath, ${formatNumber(listing.details.sqft)} sqft. ${listing.details.description?.slice(0, 150)}...`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: listing.photos?.[0] ? [{ url: listing.photos[0] }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: listing.photos?.[0] ? [listing.photos[0]] : [],
    },
  };
}

export default async function ListingDetailPage({ params }: Props) {
  const listing = await getListing(params.mlsNumber);

  if (!listing) notFound();

  const fullAddress = formatAddress(listing.address);
  const statusInfo = STATUS_MAP[listing.status] || STATUS_MAP['A'];

  // Structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: fullAddress,
    description: listing.details.description,
    url: `${SITE_CONFIG.url}/listing/${listing.mlsNumber}`,
    image: listing.photos?.[0],
    price: listing.listPrice,
    priceCurrency: 'USD',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${listing.address.streetNumber} ${listing.address.streetName} ${listing.address.streetSuffix}`,
      addressLocality: listing.address.city,
      addressRegion: listing.address.state,
      postalCode: listing.address.zip,
    },
    numberOfRooms: listing.details.bedrooms,
    numberOfBathroomsTotal: listing.details.bathrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: listing.details.sqft,
      unitCode: 'FTK',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-custom py-6">
        {/* Photo Gallery */}
        <PhotoGallery photos={listing.photos} address={fullAddress} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className={`badge ${statusInfo.color} text-white`}>
                  {statusInfo.label}
                </span>
                <span className="text-sm text-gray-500">MLS# {listing.mlsNumber}</span>
                {listing.details.daysOnMarket !== undefined && (
                  <span className="text-sm text-gray-500">
                    {listing.details.daysOnMarket} days on market
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {formatPriceFull(listing.soldPrice || listing.listPrice)}
                {listing.soldPrice && listing.soldPrice !== listing.listPrice && (
                  <span className="text-lg text-gray-400 line-through ml-3">
                    {formatPriceFull(listing.listPrice)}
                  </span>
                )}
              </h1>

              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <FiMapPin className="w-5 h-5" />
                <span className="text-lg">{fullAddress}</span>
              </div>

              {/* Key Stats */}
              <div className="flex flex-wrap gap-6 text-gray-700">
                {listing.details.bedrooms > 0 && (
                  <div className="flex items-center gap-2">
                    <IoBedOutline className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold">{listing.details.bedrooms}</span>
                    <span className="text-gray-500">Bedrooms</span>
                  </div>
                )}
                {listing.details.bathrooms > 0 && (
                  <div className="flex items-center gap-2">
                    <LiaBathSolid className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold">{listing.details.bathrooms}</span>
                    <span className="text-gray-500">Bathrooms</span>
                  </div>
                )}
                {listing.details.sqft > 0 && (
                  <div className="flex items-center gap-2">
                    <FiMaximize className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold">{formatNumber(listing.details.sqft)}</span>
                    <span className="text-gray-500">Sqft</span>
                  </div>
                )}
                {listing.details.yearBuilt && (
                  <div className="flex items-center gap-2">
                    <FiHome className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold">{listing.details.yearBuilt}</span>
                    <span className="text-gray-500">Year Built</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <ShareButton mlsNumber={listing.mlsNumber} address={fullAddress} />
              </div>
            </div>

            {/* Description */}
            {listing.details.description && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {listing.details.description}
                </p>
              </div>
            )}

            {/* Property Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: 'Property Type', value: listing.details.propertyType },
                  { label: 'Style', value: listing.details.style },
                  { label: 'Stories', value: listing.details.stories },
                  { label: 'Lot Size', value: listing.details.lotSize },
                  { label: 'Garage', value: listing.details.garage },
                  { label: 'Heating', value: listing.details.heating },
                  { label: 'Cooling', value: listing.details.cooling },
                  { label: 'Basement', value: listing.details.basement },
                  { label: 'Pool', value: listing.details.pool },
                  { label: 'Listed', value: listing.listDate ? formatDate(listing.listDate) : null },
                  { label: 'Updated', value: listing.lastUpdate ? formatRelativeDate(listing.lastUpdate) : null },
                  { label: 'Taxes', value: listing.taxes ? `$${formatNumber(listing.taxes.amount)}/yr` : null },
                ].filter(item => item.value).map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</p>
                    <p className="font-medium text-gray-900 mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            {listing.details.features && listing.details.features.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {listing.details.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rooms */}
            {listing.rooms && listing.rooms.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Rooms</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-medium text-gray-500">Room</th>
                        <th className="text-left py-2 font-medium text-gray-500">Level</th>
                        <th className="text-left py-2 font-medium text-gray-500">Dimensions</th>
                        <th className="text-left py-2 font-medium text-gray-500">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listing.rooms.map((room, i) => (
                        <tr key={i} className="border-b border-gray-100">
                          <td className="py-2 font-medium">{room.name}</td>
                          <td className="py-2 text-gray-600">{room.level || '-'}</td>
                          <td className="py-2 text-gray-600">{room.dimensions || '-'}</td>
                          <td className="py-2 text-gray-600">{room.description || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Open Houses */}
            {listing.openHouse && listing.openHouse.length > 0 && (
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiCalendar className="text-orange-500" />
                  Open House
                </h2>
                <div className="space-y-3">
                  {listing.openHouse.map((oh, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white rounded-lg p-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiCalendar className="w-4 h-4" />
                        <span className="font-medium">{formatDate(oh.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiClock className="w-4 h-4" />
                        <span>{oh.startTime} - {oh.endTime}</span>
                      </div>
                      {oh.comments && (
                        <span className="text-sm text-gray-500">{oh.comments}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Virtual Tour */}
            {listing.details.virtualTour && (
              <VirtualTour url={listing.details.virtualTour} />
            )}

            {/* Map */}
            {listing.map.latitude && listing.map.longitude && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
                <MapView
                  listings={[listing]}
                  center={{ latitude: listing.map.latitude, longitude: listing.map.longitude }}
                  zoom={15}
                  singleListing
                  height="400px"
                />
              </div>
            )}

            {/* Price History */}
            <PriceHistory history={listing.history || []} currentPrice={listing.listPrice} />

            {/* Office Attribution */}
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500">
              <p>Listed by: <strong>{listing.office.brokerageName || listing.office.name}</strong></p>
              {listing.agents?.[0] && (
                <p>Agent: {listing.agents[0].name} {listing.agents[0].phone && `· ${listing.agents[0].phone}`}</p>
              )}
              <p className="mt-2 text-xs">
                Data last updated: {listing.lastUpdate ? formatRelativeDate(listing.lastUpdate) : 'N/A'}
              </p>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Contact Form */}
            <div className="sticky top-24">
              <ContactForm
                mlsNumber={listing.mlsNumber}
                agentName={listing.agents?.[0]?.name}
                listingAddress={fullAddress}
              />

              {/* Showing Request */}
              <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule a Showing</h3>
                <ShowingRequestForm
                  mlsNumber={listing.mlsNumber}
                  listingAddress={fullAddress}
                />
              </div>

              {/* Mortgage Calculator */}
              <div className="mt-6">
                <MortgageCalculator listPrice={listing.listPrice} />
              </div>
            </div>
          </div>
        </div>

        {/* Similar Listings */}
        <div className="mt-16">
          <SimilarListings
            mlsNumber={listing.mlsNumber}
            city={listing.address.city}
            price={listing.listPrice}
            bedrooms={listing.details.bedrooms}
            propertyType={listing.details.propertyType}
          />
        </div>
      </div>
    </>
  );
}
