'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { FiX, FiChevronLeft, FiChevronRight, FiGrid, FiMaximize2 } from 'react-icons/fi';

interface PhotoGalleryProps {
  photos: string[];
  address: string;
}

export default function PhotoGallery({ photos, address }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  if (!photos || photos.length === 0) {
    return (
      <div className="aspect-[16/9] bg-gray-200 rounded-xl flex items-center justify-center">
        <p className="text-gray-400">No photos available</p>
      </div>
    );
  }

  const displayPhotos = photos.slice(0, 5);

  return (
    <>
      {/* Gallery Grid */}
      <div className="relative">
        {photos.length === 1 ? (
          <div
            className="aspect-[16/9] relative rounded-xl overflow-hidden cursor-pointer"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={photos[0]}
              alt={address}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        ) : (
          <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-xl overflow-hidden h-[400px] md:h-[500px]">
            {/* Main Photo */}
            <div
              className="col-span-2 row-span-2 relative cursor-pointer"
              onClick={() => openLightbox(0)}
            >
              <Image
                src={photos[0]}
                alt={`${address} - Photo 1`}
                fill
                className="object-cover hover:brightness-90 transition-all"
                priority
                sizes="50vw"
              />
            </div>

            {/* Secondary Photos */}
            {displayPhotos.slice(1).map((photo, index) => (
              <div
                key={index}
                className="relative cursor-pointer"
                onClick={() => openLightbox(index + 1)}
              >
                <Image
                  src={photo}
                  alt={`${address} - Photo ${index + 2}`}
                  fill
                  className="object-cover hover:brightness-90 transition-all"
                  sizes="25vw"
                />
                {/* Overlay for last photo if more exist */}
                {index === 3 && photos.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      +{photos.length - 5} more
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        {photos.length > 1 && (
          <button
            onClick={() => openLightbox(0)}
            className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow font-medium text-sm"
          >
            <FiGrid className="w-4 h-4" />
            View all {photos.length} photos
          </button>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 text-white">
            <span className="text-sm">
              {activeIndex + 1} / {photos.length}
            </span>
            <button
              onClick={closeLightbox}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Image */}
          <div className="flex-1 relative flex items-center justify-center px-16">
            <Image
              src={photos[activeIndex]}
              alt={`${address} - Photo ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />

            {/* Nav Arrows */}
            <button
              onClick={goPrev}
              className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <FiChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <FiChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="p-4 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 justify-center">
              {photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative w-16 h-12 flex-shrink-0 rounded overflow-hidden border-2 transition-all ${
                    activeIndex === index
                      ? 'border-white opacity-100'
                      : 'border-transparent opacity-50 hover:opacity-75'
                  }`}
                >
                  <Image
                    src={photo}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
