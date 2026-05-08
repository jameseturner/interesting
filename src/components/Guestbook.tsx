import React from 'react';

interface GuestbookProps {
  colors: {
    border: string;
    bg: string;
    text: string;
    accent: string;
    inputBg: string;
  };
  className?: string;
}

export const Guestbook = ({ colors, className = "" }: GuestbookProps) => {
  return (
    <div 
      className={`border-2 p-4 flex flex-col shadow-sm h-[500px] lg:h-full ${className}`}
      style={{ borderColor: colors.border, backgroundColor: colors.bg }}
    >
      <h2 
        className="text-xl border-b-2 pb-2 mb-4 text-center font-bold tracking-widest"
        style={{ borderColor: colors.border, color: colors.text }}
      >
        :: GUESTBOOK ::
      </h2>
      <iframe 
        src="https://jimmyt.atabook.org/" 
        className="w-full h-full flex-1"
        style={{ border: 'none' }}
        title="JimmyT's Guestbook"
      />
    </div>
  );
};
