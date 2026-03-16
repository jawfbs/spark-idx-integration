import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiMap, FiHeart, FiBell, FiTrendingUp, FiHome, FiArrowRight } from 'react-icons/fi';
import SearchBar from '@/components/search/SearchBar';
import ListingCard from '@/components/listing/ListingCard';
import { getRecentListings, getFeaturedListings } from '@/lib/repliers';
import { SITE_CONFIG } from '@/lib/constants';

export const revalidate = 300; // ISR: 5 minutes

export default async function HomePage() {
  const [recentListings, featuredListings] = await Promise.all([
    getRecentListings(6),
    getFeaturedListings(6),
  ]);

  const features = [
    {
      icon: FiSearch,
      title: 'Advanced Search',
      description: 'Filter by city, price, beds, baths, property type, and more.',
    },
    {
      icon: FiMap,
      title: 'Interactive Map',
      description: 'Browse listings on an interactive map with instant details.',
    },
    {
      icon: FiHeart,
      title: 'Save Favorites',
      description: 'Heart listings you love and access them anytime.',
    },
    {
      icon: FiBell,
      title: 'Instant Alerts',
      description: 'Get notified when new listings match your criteria.',
    },
    {
      icon: FiTrendingUp,
      title: 'Market Data',
      description: 'Access price history, market reports, and neighborhood stats.',
    },
    {
      icon: FiHome,
      title: 'Virtual Tours',
      description: 'Explore properties with 3D tours and photo galleries.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25px 25px, white 2%, transparent 0%)',
            backgroundSize: '50px 50px',
          }} />
        </div>

        <div className="relative container-custom text-center py-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Find Your Dream Home
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Search thousands of listings with the most advanced real estate search platform.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar variant="hero" />
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/search"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors"
            >
              Browse All Listings
            </Link>
            <Link
              href="/search?status=S"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors"
            >
              Recently Sold
            </Link>
            <Link
              href="/search?openHouse=true"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors"
            >
              Open Houses
            </Link>
            <Link
              href="/map"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors"
            >
              Map Search
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Listings */}
      {recentListings.length > 0 && (
        <section className="section">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">New Listings</h2>
                <p className="text-gray-500 mt-1">Fresh on the market</p>
              </div>
              <Link href="/search" className="btn-secondary flex items-center gap-2">
                View All <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentListings.map((listing, index) => (
                <ListingCard key={listing.mlsNumber} listing={listing} priority={index < 3} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose {SITE_CONFIG.name}?</h2>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
              Everything you need to find and buy your perfect home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      {featuredListings.length > 0 && (
        <section className="section">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
                <p className="text-gray-500 mt-1">Premium listings curated for you</p>
              </div>
              <Link href="/search?sortBy=listPrice&sortOrder=desc" className="btn-secondary flex items-center gap-2">
                View All <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredListings.map((listing) => (
                <ListingCard key={listing.mlsNumber} listing={listing} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-brand-700 py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Home?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Create an account to save your favorites, get instant alerts, and connect with agents.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/search" className="btn bg-white text-brand-700 hover:bg-gray-100 btn-lg">
              Start Searching
            </Link>
            <Link href="/contact" className="btn border-2 border-white text-white hover:bg-white/10 btn-lg">
              Contact an Agent
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
