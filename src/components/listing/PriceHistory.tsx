'use client';

import { PriceHistory as PriceHistoryType } from '@/lib/types';
import { formatPriceFull, formatDate } from '@/lib/utils';
import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';

interface PriceHistoryProps {
  history: PriceHistoryType[];
  currentPrice: number;
}

export default function PriceHistory({ history, currentPrice }: PriceHistoryProps) {
  if (!history || history.length === 0) return null;

  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Price History</h3>

      <div className="space-y-0">
        {/* Current Price */}
        <div className="flex items-center gap-4 py-3 border-b border-gray-100">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <FiMinus className="w-4 h-4 text-green-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">Current Listing</p>
            <p className="text-sm text-gray-500">Today</p>
          </div>
          <span className="font-bold text-gray-900">{formatPriceFull(currentPrice)}</span>
        </div>

        {sortedHistory.map((entry, index) => {
          const nextEntry = sortedHistory[index + 1];
          const priceChange = nextEntry ? entry.price - nextEntry.price : 0;
          const isIncrease = priceChange > 0;

          return (
            <div key={index} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isIncrease
                    ? 'bg-red-100'
                    : priceChange < 0
                    ? 'bg-green-100'
                    : 'bg-gray-100'
                }`}
              >
                {isIncrease ? (
                  <FiTrendingUp className="w-4 h-4 text-red-600" />
                ) : priceChange < 0 ? (
                  <FiTrendingDown className="w-4 h-4 text-green-600" />
                ) : (
                  <FiMinus className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{entry.event}</p>
                <p className="text-sm text-gray-500">{formatDate(entry.date)}</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-gray-900">{formatPriceFull(entry.price)}</span>
                {priceChange !== 0 && (
                  <p
                    className={`text-xs ${isIncrease ? 'text-red-600' : 'text-green-600'}`}
                  >
                    {isIncrease ? '+' : ''}{formatPriceFull(priceChange)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
