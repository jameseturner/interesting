import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface BlogPageProps {
  activePage: string;
  onBack: () => void;
}

export const BlogPage = ({ activePage, onBack }: BlogPageProps) => {
  return (
    <motion.div 
      key="page"
      className="fixed inset-0 z-40 bg-[#020202] overflow-y-auto pointer-events-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-3xl mx-auto px-8 py-24">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-on-surface-variant hover:underline transition-colors text-xs uppercase tracking-widest font-headline mb-16"
        >
          <X className="w-4 h-4" />
          Back to Space
        </button>

        <h1 className="text-5xl md:text-7xl font-headline font-bold text-primary capitalize tracking-tight mb-8">
          {activePage}
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-on-surface-variant mb-12 font-mono">
          <span>By Cosmic Observer</span>
          <span>•</span>
          <span>April 4, 2026</span>
          <span>•</span>
          <span className="text-tertiary">5 min read</span>
        </div>

        <img 
          src={`https://picsum.photos/seed/${activePage}space/1200/600`} 
          alt={`${activePage} header`}
          className="w-full h-64 md:h-96 object-cover rounded-2xl mb-16 border border-white/5"
          referrerPolicy="no-referrer"
        />

        <div className="space-y-8 text-lg md:text-xl leading-relaxed text-on-surface/80 font-light">
          <p className="text-2xl text-on-surface font-medium leading-normal">
            Exploring the deep reaches of the {activePage} sector. Our celestial sensors are capturing high-resolution data from distant astrophysical phenomena.
          </p>
          <p>
            The universe is vast and largely empty, but within that emptiness lies the structure of everything we know. When we look into the deep field, we aren't just looking across space; we are looking back in time. The light from these distant galaxies has traveled for billions of years to reach our sensors.
          </p>
          <p>
            Current coordinates: RA 5h 35m 17s | Dec -5° 23′ 28″. Signal strength remains optimal as we continue our survey of the local group and beyond. The data we collect here will help us understand the formation of early galaxies and the distribution of dark matter across the cosmic web.
          </p>
          <div className="my-12 p-8 bg-surface-container-lowest/50 rounded-2xl border border-outline-variant/10 border-l-4 border-l-tertiary">
            <p className="text-tertiary italic text-xl">
              "To look out into the universe is to look back in time. We are the cosmos made conscious, observing itself."
            </p>
          </div>
          <p>
            As we continue to analyze the telemetry from this sector, we expect to find more anomalies. The density of star-forming regions here suggests a recent galactic collision, sparking a wave of new stellar births that illuminate the surrounding nebular gas.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
