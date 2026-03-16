'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiX, FiMapPin } from 'react-icons/fi';
import { debounce, getSearchUrl } from '@/lib/utils';

interface SearchBarProps {
  variant?: 'hero' | 'header' | 'page';
  initialValue?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({ variant = 'header', initialValue = '', onSearch }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = debounce(async (q: string) => {
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/autocomplete?query=${encodeURIComponent(q)}`);
      const data = await res.json();
      setSuggestions(data.suggestions || []);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, 300);

  const handleChange = (value: string) => {
    setQuery(value);
    setShowSuggestions(true);
    fetchSuggestions(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);

    if (onSearch) {
      onSearch(query);
    } else {
      router.push(getSearchUrl({ city: query }));
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setQuery(suggestion.label);
    setShowSuggestions(false);

    const params: Record<string, string> = {};
    if (suggestion.type === 'city') params.city = suggestion.value;
    else if (suggestion.type === 'zip') params.zip = suggestion.value;
    else if (suggestion.type === 'neighborhood') params.neighborhood = suggestion.value;
    else params.city = suggestion.value;

    if (onSearch) {
      onSearch(suggestion.value);
    } else {
      router.push(getSearchUrl(params));
    }
  };

  const variantClasses = {
    hero: 'h-14 md:h-16 text-lg rounded-xl shadow-xl',
    header: 'h-10 text-sm rounded-lg',
    page: 'h-12 text-base rounded-lg border border-gray-300',
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder="Search by city, zip, neighborhood, or address..."
          className={`w-full pl-12 pr-12 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 ${variantClasses[variant]}`}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSuggestions([]);
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (suggestions.length > 0 || loading) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 max-h-64 overflow-y-auto">
          {loading ? (
            <div className="px-4 py-3 text-sm text-gray-400">Searching...</div>
          ) : (
            suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-gray-50 text-left transition-colors"
              >
                <FiMapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{suggestion.label}</p>
                  <p className="text-xs text-gray-500 capitalize">{suggestion.type}</p>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
