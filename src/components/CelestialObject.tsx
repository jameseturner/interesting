import React from 'react';
import { motion } from 'motion/react';

interface CelestialObjectProps {
  x: number;
  y: number;
  name: string;
  type: string;
  distance: string;
  minZoom: number;
  zoom: number;
  key?: React.Key;
}

export const CelestialObject = ({ x, y, name, type, distance, minZoom, zoom }: CelestialObjectProps) => {
  const isVisible = zoom >= minZoom;
  
  return (
    <motion.div
      className="absolute z-10 group cursor-pointer"
      style={{ 
        left: "50%", 
        top: "50%",
        x: x, 
        y: y,
        translateX: "-50%",
        translateY: "-50%"
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.5,
        pointerEvents: isVisible ? "auto" : "none"
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex items-center justify-center">
        {/* Standard Marker */}
        <div className="w-4 h-4 rounded-full border-2 border-tertiary flex items-center justify-center animate-pulse shadow-[0_0_10px_rgba(0,218,243,0.5)]">
          <div className="w-1 h-1 rounded-full bg-tertiary"></div>
        </div>
        
        <div 
          className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 origin-left"
          style={{ transform: `scale(${1 / Math.max(1, zoom)})` }}
        >
          <div className="bg-surface-container-high/90 backdrop-blur-lg p-3 rounded-lg border border-outline-variant/20 min-w-[150px] shadow-2xl">
            <p className="text-[10px] uppercase text-tertiary font-headline font-bold tracking-wider">{type}</p>
            <p className="text-xs text-on-surface font-medium">{name}</p>
            <p className="text-[10px] text-on-surface-variant mt-1">{distance}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
