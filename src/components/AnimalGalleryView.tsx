import React, { useState } from 'react';
import { ANIMALS } from '../data/animals';

interface AnimalGalleryViewProps {
  onBack: () => void;
}

export const AnimalGalleryView = ({ onBack }: AnimalGalleryViewProps) => {
  const [animalIdx, setAnimalIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const nextAnimal = () => {
    setAnimalIdx((prev) => (prev + 1) % ANIMALS.length);
    setSelectedImageIdx(0);
  };

  const prevAnimal = () => {
    setAnimalIdx((prev) => (prev - 1 + ANIMALS.length) % ANIMALS.length);
    setSelectedImageIdx(0);
  };

  return (
    <div className="absolute inset-4 md:inset-12 flex flex-col md:flex-row z-10 shadow-[12px_12px_0px_rgba(0,0,0,0.2)] overflow-hidden">
      {/* Left: Image (Full Left Side) */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full relative bg-black flex flex-col">
        <div className="flex-1 relative overflow-hidden">
          <img
            src={ANIMALS[animalIdx].images[selectedImageIdx]}
            alt={ANIMALS[animalIdx].name}
            className="w-full h-full object-contain sepia-[.3] hue-rotate-[-10deg] contrast-110 opacity-90"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={onBack}
            className="absolute top-4 left-4 md:top-6 md:left-6 font-bold text-[#546A41] hover:underline tracking-widest bg-[#FFF6E9] px-4 py-2 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] z-30 text-xs md:text-sm"
          >
            [ BACK TO MENU ]
          </button>

          <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-black/70 text-[#DDCAB1] font-mono text-xs px-3 py-1.5 border border-[#DDCAB1]/50 backdrop-blur-sm z-30">
            LCTN: {ANIMALS[animalIdx].locations[selectedImageIdx]}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="h-24 bg-[#DDCAB1] flex items-center gap-2 p-2 overflow-x-auto border-t-4 border-[#DDCAB1]">
          {ANIMALS[animalIdx].images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIdx(idx)}
              className={`h-full aspect-square overflow-hidden transition-all bg-black ${selectedImageIdx === idx ? 'ring-4 ring-[#FFF6E9] scale-95' : 'opacity-60 hover:opacity-100'}`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Right: Info */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full bg-[#FFF6E9]/95 backdrop-blur-md overflow-y-auto">
        <div className="min-h-full p-6 md:p-10 lg:p-12 flex flex-col justify-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-normal pb-4 mb-4 md:mb-6 text-[#546A41]">
              {ANIMALS[animalIdx].name}
            </h2>
            <div className="space-y-2 font-mono text-xs md:text-sm lg:text-base bg-[#DDCAB1]/30 p-4 md:p-6 mb-4 md:mb-6">
              <p><strong className="text-[#546A41]">SCIENTIFIC NAME:</strong> {ANIMALS[animalIdx].scientificName}</p>
              <p><strong className="text-[#546A41]">FOUND IN:</strong> {ANIMALS[animalIdx].foundIn}</p>
            </div>
          </div>

          <div className="text-base md:text-lg lg:text-xl leading-relaxed font-medium mb-6 md:mb-8 space-y-4">
            {ANIMALS[animalIdx].description.split('\n\n').filter(p => p.trim()).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {ANIMALS[animalIdx].funFact && (
            <div className="mb-6 md:mb-8 p-6 bg-[#DDCAB1]/20 border-l-4 border-[#546A41] shadow-[4px_4px_0px_rgba(84,106,65,0.1)]">
              <h4 className="text-xs font-black tracking-[0.2em] text-[#546A41] mb-2 uppercase">Did you know?</h4>
              <p className="text-base md:text-lg italic font-medium text-[#546A41]/90 leading-snug">
                "{ANIMALS[animalIdx].funFact}"
              </p>
            </div>
          )}

          <div className="flex items-center justify-between mt-auto pt-6">
            <button
              onClick={prevAnimal}
              className="font-bold text-base md:text-lg lg:text-xl hover:underline tracking-widest bg-[#DDCAB1] px-4 py-2 md:px-6 md:py-3 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none transition-all"
            >
              &lt; PREV
            </button>
            <span className="font-mono font-bold text-lg md:text-xl">
              {animalIdx + 1} / {ANIMALS.length}
            </span>
            <button
              onClick={nextAnimal}
              className="font-bold text-base md:text-lg lg:text-xl hover:underline tracking-widest bg-[#DDCAB1] px-4 py-2 md:px-6 md:py-3 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none transition-all"
            >
              NEXT &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
