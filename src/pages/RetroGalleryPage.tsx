import React, { useState } from 'react';
import { motion } from 'motion/react';

import { AnimalGalleryView } from '../components/AnimalGalleryView';

import { PLACES } from '../data/places';

const PixelDecorations = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#1A1A2E]">
    <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMax slice" className="opacity-80">
      {/* Sky Gradient */}
      <rect width="800" height="600" fill="#1A1A2E" />
      <rect width="800" height="400" fill="#2E2E5E" />
      <rect y="300" width="800" height="150" fill="#4B2E5E" />
      <rect y="400" width="800" height="100" fill="#8E442E" />

      {/* Distant Mountains */}
      <path d="M0 450 L100 350 L250 420 L400 300 L550 400 L700 320 L800 450 L800 600 L0 600 Z" fill="#12122B" />
      <path d="M50 450 L150 380 L300 440 L450 350 L600 430 L750 380 L800 450 L800 600 L0 600 Z" fill="#1A1A3D" />

      {/* Sunset Glow & Sun */}
      <circle cx="400" cy="380" r="100" fill="#FFD700" opacity="0.3" />
      <circle cx="400" cy="380" r="60" fill="#FFD700" opacity="0.5" />
      <circle cx="400" cy="380" r="30" fill="#FFFF00" />

      {/* Clouds - Orange/Yellow Layers */}
      <g opacity="0.8">
        <rect x="100" y="150" width="200" height="20" fill="#D35400" />
        <rect x="150" y="140" width="100" height="10" fill="#E67E22" />
        <rect x="450" y="180" width="250" height="30" fill="#D35400" />
        <rect x="500" y="170" width="150" height="150" fill="#E67E22" opacity="0.2" />

        {/* Pixelated Cloud Bits */}
        <rect x="300" y="220" width="40" height="10" fill="#F39C12" />
        <rect x="320" y="210" width="20" height="10" fill="#F1C40F" />
        <rect x="380" y="250" width="60" height="15" fill="#F39C12" />
        <rect x="400" y="240" width="30" height="10" fill="#F1C40F" />
      </g>

      {/* River Winding Through */}
      <path d="M400 450 Q420 500 380 550 T400 600 L420 600 Q400 550 440 500 T420 450 Z" fill="#1A1A3D" />
      {/* River Reflections */}
      <g>
        <rect x="395" y="460" width="10" height="2" fill="#F1C40F" />
        <rect x="405" y="480" width="15" height="2" fill="#F39C12" />
        <rect x="385" y="510" width="20" height="3" fill="#F1C40F" />
        <rect x="390" y="540" width="25" height="3" fill="#F39C12" />
        <rect x="400" y="570" width="30" height="4" fill="#F1C40F" />
      </g>

      {/* Midground Pine Trees (Silhouettes) */}
      <g transform="translate(150, 400) scale(0.8)">
        <path d="M0 50 L15 0 L30 50 Z" fill="#0A0A1A" />
        <path d="M5 30 L15 -10 L25 30 Z" fill="#0A0A1A" />
      </g>
      <g transform="translate(220, 420) scale(0.6)">
        <path d="M0 50 L15 0 L30 50 Z" fill="#0A0A1A" />
      </g>
      <g transform="translate(550, 410) scale(0.9)">
        <path d="M0 50 L15 0 L30 50 Z" fill="#0A0A1A" />
        <path d="M5 25 L15 -15 L25 25 Z" fill="#0A0A1A" />
      </g>
      <g transform="translate(620, 430) scale(0.7)">
        <path d="M0 50 L15 0 L30 50 Z" fill="#0A0A1A" />
      </g>

      {/* Foreground Large Pine Trees (Left) */}
      <g transform="translate(-20, 100)">
        <rect x="40" y="400" width="15" height="100" fill="#050510" />
        {/* Branch Layers */}
        <path d="M0 450 L50 200 L100 450 Z" fill="#050510" />
        <path d="M10 350 L50 150 L90 350 Z" fill="#050510" />
        <path d="M20 250 L50 100 L80 250 Z" fill="#050510" />
        <path d="M30 150 L50 50 L70 150 Z" fill="#050510" />
      </g>

      {/* Foreground Large Pine Trees (Right) */}
      <g transform="translate(680, 50)">
        <rect x="40" y="450" width="20" height="100" fill="#050510" />
        {/* Branch Layers */}
        <path d="M-20 500 L50 250 L120 500 Z" fill="#050510" />
        <path d="M0 400 L50 200 L100 400 Z" fill="#050510" />
        <path d="M15 300 L50 150 L85 300 Z" fill="#050510" />
        <path d="M25 200 L50 100 L75 200 Z" fill="#050510" />
      </g>

      {/* Foreground Rocks & Texture */}
      <path d="M0 550 Q100 530 200 560 T400 540 T600 570 T800 550 L800 600 L0 600 Z" fill="#050510" />

      {/* Pixelated Highlights on Foreground Elements */}
      <g opacity="0.3">
        <rect x="50" y="560" width="10" height="4" fill="#8E442E" />
        <rect x="150" y="570" width="15" height="3" fill="#8E442E" />
        <rect x="650" y="565" width="20" height="5" fill="#8E442E" />
        <rect x="720" y="580" width="10" height="4" fill="#8E442E" />
      </g>

      {/* Static Pixel Grain Overlay */}
      <pattern id="staticPixelGrain" width="4" height="4" patternUnits="userSpaceOnUse">
        <rect width="1" height="1" fill="white" opacity="0.05" />
        <rect x="2" y="2" width="1" height="1" fill="black" opacity="0.05" />
      </pattern>
      <rect width="800" height="600" fill="url(#staticPixelGrain)" />
    </svg>
  </div>
);

export const RetroGalleryPage = ({
  onBack,
  onHome
}: {
  onBack: () => void;
  onHome?: () => void;

  key?: React.Key
}) => {
  const [view, setView] = useState<"menu" | "animals" | "places" | "place_detail">("menu");
  const [selectedPlace, setSelectedPlace] = useState<typeof PLACES[0] | null>(null);

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-transparent overflow-y-auto pointer-events-auto font-sans text-[#546A41]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <PixelDecorations />

      {view === "animals" ? (
        <AnimalGalleryView onBack={() => setView('menu')} />
      ) : (
        <div className="p-4 md:p-8 relative z-10">
          {/* Header */}
          <div className="border-2 border-[#546A41] p-4 mb-8 text-center relative bg-[#FFF6E9] shadow-[4px_4px_0px_rgba(84,106,65,0.2)]">
            <button
              onClick={onBack}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#546A41] hover:underline transition-all font-bold text-sm md:text-base"
            >
              [ Back to Space ]
            </button>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-4">
              <button
                onClick={onHome}
                className="text-[#546A41] hover:underline transition-all font-bold text-sm md:text-base"
              >
                [ To Home ]
              </button>

            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-normal mb-2 text-[#546A41]">~ GALLERY ~</h1>
            <div className="overflow-hidden whitespace-nowrap border-t border-[#94A87C] pt-2 mt-2 relative h-6 flex items-center text-[#546A41] font-mono">
              <motion.div
                className="absolute whitespace-nowrap text-sm"
                initial={{ x: "100vw" }}
                animate={{ x: "-100%" }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                An organisation of photos I've taken.
              </motion.div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* MENU VIEW */}
            {view === "menu" && (
              <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch min-h-[50vh] max-w-4xl mx-auto py-12">
                <button
                  onClick={() => setView('animals')}
                  className="w-full md:flex-1 border-4 border-[#94A87C] bg-[#FFF6E9] p-12 md:p-16 text-3xl md:text-4xl font-bold tracking-normal group shadow-[8px_8px_0px_rgba(84,106,65,0.2)] flex flex-col items-center justify-start gap-4 text-center"
                >
                  <span className="mt-auto group-hover:underline">[ ANIMALS ]</span>
                  <span className="text-sm md:text-base font-normal tracking-normal font-mono text-[#546A41]/80 mb-auto leading-relaxed">
                    All photos were taken by me on either a phone or my Nikon D80 (apart from the dolphin ones that were taken on a trip I went on)
                  </span>
                </button>
                <button
                  onClick={() => setView('places')}
                  className="w-full md:flex-1 border-4 border-[#94A87C] bg-[#FFF6E9] p-12 md:p-16 text-3xl md:text-4xl font-bold tracking-normal group shadow-[8px_8px_0px_rgba(84,106,65,0.2)] flex flex-col items-center justify-start gap-4 text-center"
                >
                  <span className="mt-auto group-hover:underline">[ PLACES ]</span>
                  <span className="text-sm md:text-base font-normal tracking-normal font-mono text-[#546A41]/80 mb-auto leading-relaxed">
                    Just some photos of places I've been
                  </span>
                </button>
              </div>
            )}

            {/* PLACES LIST VIEW */}
            {view === "places" && (
              <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
                <button
                  onClick={() => setView('menu')}
                  className="mb-6 font-bold text-[#546A41] hover:underline tracking-widest bg-[#FFF6E9] px-2"
                >
                  [ BACK TO MENU ]
                </button>

                <div className="space-y-6">
                  {PLACES.map(place => (
                    <div
                      key={place.id}
                      className="border-4 border-[#94A87C] bg-[#FFF6E9] p-6 cursor-pointer shadow-[6px_6px_0px_rgba(84,106,65,0.2)] group hover:border-[#546A41]"
                      onClick={() => {
                        setSelectedPlace(place);
                        setView('place_detail');
                      }}
                    >
                      <div className="flex justify-between items-center border-b-2 border-[#94A87C] pb-2 mb-4">
                        <h3 className="text-2xl font-black tracking-normal text-[#546A41] group-hover:underline">
                          {place.name}
                        </h3>
                        <span className="font-mono text-[#94A87C] group-hover:text-[#546A41] font-bold">
                          [ VIEW IMAGES ]
                        </span>
                      </div>
                      <p className="font-mono text-base text-[#546A41]">
                        {place.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PLACE DETAIL VIEW */}
            {view === "place_detail" && selectedPlace && (
              <div className="animate-in fade-in duration-500">
                <button
                  onClick={() => setView('places')}
                  className="mb-6 font-bold text-[#546A41] hover:underline tracking-widest bg-[#FFF6E9] px-2"
                >
                  [ BACK TO LOCATIONS ]
                </button>

                <div className="bg-[#FFF6E9] p-6 md:p-10 shadow-[8px_8px_0px_rgba(0,0,0,0.1)]">
                  <h2 className="text-3xl md:text-5xl font-black tracking-normal mb-4 text-center text-[#546A41]">
                    --- {selectedPlace.name} ---
                  </h2>
                  <p className="text-center font-mono mb-10 max-w-2xl mx-auto text-[#546A41]">
                    {selectedPlace.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedPlace.images.map((img, i) => (
                      <div key={i} className="p-2 bg-[#DDCAB1] shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                        <img
                          src={img}
                          alt={`${selectedPlace.name} view ${i + 1}`}
                          className="w-full h-48 md:h-64 object-cover sepia-[.2] hue-rotate-[10deg] contrast-110"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};
