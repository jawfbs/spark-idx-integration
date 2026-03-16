'use client';

import { useState } from 'react';
import { FiPlay, FiMaximize2, FiX } from 'react-icons/fi';

interface VirtualTourProps {
  url: string;
}

export default function VirtualTour({ url }: VirtualTourProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!url) return null;

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-gray-900">Virtual Tour</h3>
          <button
            onClick={() => setIsFullscreen(true)}
            className="btn-ghost btn-sm flex items-center gap-1"
          >
            <FiMaximize2 className="w-4 h-4" />
            Fullscreen
          </button>
        </div>

        <div className="relative aspect-video">
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
              <button
                onClick={() => setLoaded(true)}
                className="p-4 bg-brand-600 text-white rounded-full hover:bg-brand-700 transition-colors"
              >
                <FiPlay className="w-8 h-8" />
              </button>
              <p className="mt-3 text-sm text-gray-500">Click to load virtual tour</p>
            </div>
          )}

          {loaded && (
            <iframe
              src={url}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            />
          )}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <FiX className="w-6 h-6 text-white" />
          </button>
          <iframe
            src={url}
            className="w-full h-full border-0"
            allowFullScreen
          />
        </div>
      )}
    </>
  );
}
