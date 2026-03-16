'use client';

import { useState } from 'react';
import { FiFilter, FiChevronDown, FiX } from 'react-icons/fi';
import {
  PROPERTY_TYPES,
  PRICE_RANGES,
  BED_OPTIONS,
  BATH_OPTIONS,
  SORT_OPTIONS,
  LISTING_STATUS_OPTIONS,
} from '@/lib/constants';
import { SearchParams } from '@/lib/types';

interface SearchFiltersProps {
  params: SearchParams;
  onChange: (params: Partial<SearchParams>) => void;
  onReset: () => void;
  resultCount?: number;
}

export default function SearchFilters({ params, onChange, onReset, resultCount }: SearchFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const activeFilterCount = [
    params.propertyType,
    params.minPrice || params.maxPrice,
    params.minBeds,
    params.minBaths,
    params.openHouse,
    params.minSqft,
    params.yearBuiltMin,
    params.keywords,
  ].filter(Boolean).length;

  const handlePriceRange = (value: string) => {
    if (!value) {
      onChange({ minPrice: undefined, maxPrice: undefined });
      return;
    }
    const [min, max] = value.split('-').map(Number);
    onChange({ minPrice: min, maxPrice: max });
  };

  const handleSort = (value: string) => {
    const [sortBy, sortOrder] = value.split('-');
    onChange({ sortBy, sortOrder: sortOrder as 'asc' | 'desc' });
  };

  const currentPriceRange = params.minPrice && params.maxPrice
    ? `${params.minPrice}-${params.maxPrice}`
    : '';

  const currentSort = `${params.sortBy || 'listDate'}-${params.sortOrder || 'desc'}`;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      {/* Main Filters Row */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Property Type */}
        <select
          value={params.propertyType || ''}
          onChange={(e) => onChange({ propertyType: e.target.value || undefined })}
          className="input w-auto min-w-[140px]"
        >
          {PROPERTY_TYPES.map((type) => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>

        {/* Price Range */}
        <select
          value={currentPriceRange}
          onChange={(e) => handlePriceRange(e.target.value)}
          className="input w-auto min-w-[140px]"
        >
          {PRICE_RANGES.map((range) => (
            <option key={range.value} value={range.value}>{range.label}</option>
          ))}
        </select>

        {/* Bedrooms */}
        <select
          value={params.minBeds || ''}
          onChange={(e) => onChange({ minBeds: e.target.value ? Number(e.target.value) : undefined })}
          className="input w-auto min-w-[120px]"
        >
          {BED_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {/* Bathrooms */}
        <select
          value={params.minBaths || ''}
          onChange={(e) => onChange({ minBaths: e.target.value ? Number(e.target.value) : undefined })}
          className="input w-auto min-w-[120px]"
        >
          {BATH_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`btn-secondary flex items-center gap-2 ${activeFilterCount > 0 ? 'ring-2 ring-brand-500' : ''}`}
        >
          <FiFilter className="w-4 h-4" />
          More
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 bg-brand-600 text-white rounded-full text-xs flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Sort */}
        <div className="ml-auto">
          <select
            value={currentSort}
            onChange={(e) => handleSort(e.target.value)}
            className="input w-auto min-w-[160px]"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-gray-200 animate-slide-down">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Status */}
            <div>
              <label className="label">Status</label>
              <select
                value={params.status || 'A'}
                onChange={(e) => onChange({ status: e.target.value })}
                className="input"
              >
                <option value="">All</option>
                {LISTING_STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Min Sqft */}
            <div>
              <label className="label">Min Sqft</label>
              <input
                type="number"
                value={params.minSqft || ''}
                onChange={(e) => onChange({ minSqft: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="Any"
                className="input"
              />
            </div>

            {/* Max Sqft */}
            <div>
              <label className="label">Max Sqft</label>
              <input
                type="number"
                value={params.maxSqft || ''}
                onChange={(e) => onChange({ maxSqft: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="Any"
                className="input"
              />
            </div>

            {/* Year Built Min */}
            <div>
              <label className="label">Year Built From</label>
              <input
                type="number"
                value={params.yearBuiltMin || ''}
                onChange={(e) => onChange({ yearBuiltMin: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="Any"
                className="input"
              />
            </div>

            {/* Year Built Max */}
            <div>
              <label className="label">Year Built To</label>
              <input
                type="number"
                value={params.yearBuiltMax || ''}
                onChange={(e) => onChange({ yearBuiltMax: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="Any"
                className="input"
              />
            </div>

            {/* Keywords */}
            <div>
              <label className="label">Keywords</label>
              <input
                type="text"
                value={params.keywords || ''}
                onChange={(e) => onChange({ keywords: e.target.value || undefined })}
                placeholder="Pool, garage..."
                className="input"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-4 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={params.openHouse || false}
                onChange={(e) => onChange({ openHouse: e.target.checked || undefined })}
                className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
              />
              <span className="text-sm text-gray-700">Open Houses Only</span>
            </label>
          </div>

          {/* Reset */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">
              {resultCount !== undefined && `${resultCount.toLocaleString()} results`}
            </span>
            <button onClick={onReset} className="text-sm text-brand-600 hover:text-brand-700 font-medium">
              Reset all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
