'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiMenu, FiX, FiSearch, FiHeart, FiUser, FiBell,
  FiHome, FiMap, FiTrendingUp, FiUsers, FiLogOut
} from 'react-icons/fi';
import { useAuthStore, useFavoritesStore, useUIStore } from '@/store';
import { createClient } from '@/lib/supabase/client';
import SearchBar from '@/components/search/SearchBar';

export default function Header() {
  const pathname = usePathname();
  const { user, setUser, setLoading } = useAuthStore();
  const { favorites } = useFavoritesStore();
  const { mobileMenuOpen, setMobileMenuOpen, setLoginModalOpen } = useUIStore();
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const supabase = createClient();

  // Check auth
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          firstName: data.user.user_metadata?.first_name,
          lastName: data.user.user_metadata?.last_name,
          role: 'user',
          createdAt: data.user.created_at,
        });
      }
      setLoading(false);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          firstName: session.user.user_metadata?.first_name,
          lastName: session.user.user_metadata?.last_name,
          role: 'user',
          createdAt: session.user.created_at,
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowUserMenu(false);
  };

  const navLinks = [
    { href: '/search', label: 'Buy', icon: FiHome },
    { href: '/search?status=S', label: 'Sold', icon: FiTrendingUp },
    { href: '/map', label: 'Map', icon: FiMap },
    { href: '/neighborhoods', label: 'Neighborhoods', icon: FiMap },
    { href: '/agents', label: 'Agents', icon: FiUsers },
  ];

  const isHomePage = pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled || !isHomePage
            ? 'bg-white shadow-sm border-b border-gray-100'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span
                className={`font-bold text-xl ${
                  scrolled || !isHomePage ? 'text-gray-900' : 'text-white'
                }`}
              >
                Spark
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-brand-50 text-brand-700'
                      : scrolled || !isHomePage
                      ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {/* Search Toggle */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className={`p-2 rounded-lg transition-colors ${
                  scrolled || !isHomePage
                    ? 'text-gray-600 hover:bg-gray-100'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <FiSearch className="w-5 h-5" />
              </button>

              {/* Favorites */}
              <Link
                href="/favorites"
                className={`relative p-2 rounded-lg transition-colors ${
                  scrolled || !isHomePage
                    ? 'text-gray-600 hover:bg-gray-100'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <FiHeart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* User */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`p-2 rounded-lg transition-colors ${
                      scrolled || !isHomePage
                        ? 'text-gray-600 hover:bg-gray-100'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <FiUser className="w-5 h-5" />
                  </button>

                  {showUserMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                      <div className="absolute right-0 top-12 z-50 bg-white rounded-xl shadow-xl border border-gray-200 py-2 w-56 animate-slide-down">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="font-medium text-gray-900 text-sm">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-sm">
                          <FiUser className="w-4 h-4" /> Dashboard
                        </Link>
                        <Link href="/favorites" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-sm">
                          <FiHeart className="w-4 h-4" /> Favorites
                        </Link>
                        <Link href="/saved-searches" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-sm">
                          <FiBell className="w-4 h-4" /> Saved Searches
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-50 text-sm text-red-600"
                        >
                          <FiLogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className={`btn-sm rounded-lg font-medium transition-colors ${
                    scrolled || !isHomePage
                      ? 'bg-brand-600 text-white hover:bg-brand-700'
                      : 'bg-white text-brand-700 hover:bg-white/90'
                  }`}
                >
                  Sign In
                </button>
              )}

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  scrolled || !isHomePage
                    ? 'text-gray-600 hover:bg-gray-100'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search Expandable */}
          {showSearch && (
            <div className="pb-4 animate-slide-down">
              <SearchBar variant="header" />
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-16 left-0 right-0 bg-white border-b shadow-xl animate-slide-down">
            <nav className="container-custom py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                    pathname === link.href
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Spacer */}
      {!isHomePage && <div className="h-16" />}
    </>
  );
}
