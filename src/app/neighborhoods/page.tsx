import Link from 'next/link';
import { FiArrowRight, FiHome, FiTrendingUp, FiDollarSign } from 'react-icons/fi';
import { slugify } from '@/lib/utils';

export const revalidate = 3600; // 1 hour

// In production, fetch these from your MLS API or database
const neighborhoods = [
  { name: 'Downtown', city: 'Toronto', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600', listings: 245, avgPrice: 850000 },
  { name: 'Midtown', city: 'Toronto', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600', listings: 189, avgPrice: 720000 },
  { name: 'North York', city: 'Toronto', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600', listings: 312, avgPrice: 650000 },
  { name: 'Scarborough', city: 'Toronto', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600', listings: 275, avgPrice: 580000 },
  { name: 'Etobicoke', city: 'Toronto', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=600', listings: 198, avgPrice: 690000 },
  { name: 'Mississauga', city: 'Mississauga', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600', listings: 340, avgPrice: 720000 },
  { name: 'Brampton', city: 'Brampton', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600', listings: 287, avgPrice: 850000 },
  { name: 'Oakville', city: 'Oakville', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600', listings: 156, avgPrice: 1200000 },
];

export default function NeighborhoodsPage() {
  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Explore Neighborhoods</h1>
        <p className="text-gray-500 mt-1">
          Find your perfect neighborhood with local market insights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {neighborhoods.map((neighborhood) => (
          <Link
            key={neighborhood.name}
            href={`/neighborhoods/${slugify(neighborhood.city)}/${slugify(neighborhood.name)}`}
            className="card group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={neighborhood.image}
                alt={neighborhood.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{neighborhood.name}</h3>
                <p className="text-sm text-white/80">{neighborhood.city}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <FiHome className="w-4 h-4" />
                  <span>{neighborhood.listings} listings</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <FiDollarSign className="w-4 h-4" />
                  <span>Avg ${(neighborhood.avgPrice / 1000).toFixed(0)}K</span>
                </div>
                <FiArrowRight className="w-4 h-4 text-brand-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
