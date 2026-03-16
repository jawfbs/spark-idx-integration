import Link from 'next/link';
import { IDX_DISCLAIMER, MLS_ATTRIBUTION, SITE_CONFIG } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Search': [
      { href: '/search', label: 'All Listings' },
      { href: '/search?status=S', label: 'Recently Sold' },
      { href: '/search?openHouse=true', label: 'Open Houses' },
      { href: '/map', label: 'Map Search' },
    ],
    'Resources': [
      { href: '/neighborhoods', label: 'Neighborhoods' },
      { href: '/market-reports', label: 'Market Reports' },
      { href: '/mortgage-calculator', label: 'Mortgage Calculator' },
      { href: '/agents', label: 'Our Agents' },
    ],
    'Company': [
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-xl text-white">Spark</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Find your dream home with the most advanced real estate search platform.
            </p>
            <p className="text-sm text-gray-400">
              {SITE_CONFIG.brokerage}
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* IDX Disclaimer */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <p className="text-xs text-gray-500 leading-relaxed mb-3">
            {IDX_DISCLAIMER}
          </p>
          <p className="text-xs text-gray-500 leading-relaxed mb-3">
            {MLS_ATTRIBUTION}
          </p>
          <p className="text-xs text-gray-500">
            Last updated: {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Powered by Spark IDX
          </p>
        </div>
      </div>
    </footer>
  );
}
