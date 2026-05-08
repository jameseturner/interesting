import React from 'react';
import { motion } from 'motion/react';
import { Guestbook } from '../components/Guestbook';

interface RetroAboutPageProps {
  onBack: () => void;
  onGallery?: () => void;

  key?: React.Key;
}

export const RetroAboutPage = ({ onBack, onGallery }: RetroAboutPageProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-40 bg-[#FFF6E9] overflow-y-auto pointer-events-auto font-sans text-[#546A41] p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        backgroundImage: `
          radial-gradient(#DDCAB1 1px, transparent 1px),
          radial-gradient(#94A87C 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px, 30px 30px',
        backgroundPosition: '0 0, 15px 15px'
      }}
    >
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
            onClick={onGallery}
            className="text-[#546A41] hover:underline transition-all font-bold text-sm md:text-base"
          >
            [ To Gallery ]
          </button>

        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-widest mb-2 text-[#546A41]">~ HOME ~</h1>
        <div className="overflow-hidden whitespace-nowrap border-t border-[#94A87C] pt-2 mt-2 relative h-6 flex items-center text-[#546A41] font-mono">
          <motion.div
            className="absolute whitespace-nowrap text-sm"
            initial={{ x: "100vw" }}
            animate={{ x: "-100%" }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            This is the about page.
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1800px] mx-auto w-full px-4 md:px-8">
        {/* Left: Chat */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <Guestbook
            colors={{
              border: "#94A87C",
              bg: "#FFF6E9",
              text: "#546A41",
              accent: "#94A87C",
              inputBg: "#FFF6E9"
            }}
          />
        </div>

        {/* Center: Main Info */}
        <div className="lg:col-span-6 border-2 border-[#94A87C] p-6 lg:p-10 bg-[#FFF6E9] shadow-sm">
          <h2 className="text-2xl mb-8 text-center font-bold text-[#546A41] tracking-widest">HOME AND ABOUT</h2>

          <div className="space-y-6 text-[#546A41] leading-relaxed">
            <p>
              Welcome to my website, a lot of things are a work in progress so updates will be made with time to come. Additions will also be made to the site of things that I find interesting, the first being a collection of animal species that I have photographed during travels (if there is any wrong information in the gallery please let me know in the guestbook). Also, you can move around and zoom in and out of the landing page. I am currently a student studying astrophysics so I also find great interest in space and that type of thing.
            </p>

            {/* Spacer for "a bunch of empty space" */}
            <div className="h-64 md:h-96" />
          </div>
        </div>

        {/* Right: Empty spacer to perfectly center the main column */}
        {/* Right column with Visitor Counter */}
        <div className="hidden lg:block lg:col-span-3">
          <div
            className="border-2 p-3 text-center bg-[#FFF6E9] shadow-[2px_2px_0px_rgba(84,106,65,0.2)]"
            style={{ borderColor: "#94A87C", color: "#546A41" }}
          >
            <div className="text-[10px] uppercase tracking-[0.2em] mb-1 opacity-70 font-bold">Visitor Count</div>
            <div className="flex justify-center pt-1 scale-110 translate-y-1">
              <img
                src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fweirdscifi.ratiosemper.com%2Fneocities.php%3Fsitename%3Djimmyt&query=%24.info.views&color=546A41&label=visitors&labelColor=94A87C&style=flat-square"
                alt="Visitor Count"
                className="pixelated h-[22px]"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
