import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, MotionValue } from "motion/react";
import { Image as ImageIcon, Search, X } from "lucide-react";
import { CelestialObject } from "./components/CelestialObject";
import { StarMapCanvas } from "./components/StarMapCanvas";
import { RetroAboutPage } from "./pages/RetroAboutPage";
import { RetroGalleryPage } from "./pages/RetroGalleryPage";
import { BlogPage } from "./pages/BlogPage";

interface SpaceSceneProps {
  zoomSpring: MotionValue<number>;
  xSpring: MotionValue<number>;
  ySpring: MotionValue<number>;
  celestialObjects: any[];
  bgOpacity: any;
}

const SpaceScene = ({ zoomSpring, xSpring, ySpring, celestialObjects, bgOpacity }: SpaceSceneProps) => {
  const [currentZoom, setCurrentZoom] = useState(zoomSpring.get());
  const [currentX, setCurrentX] = useState(xSpring.get());
  const [currentY, setCurrentY] = useState(ySpring.get());

  useEffect(() => {
    const unsubZoom = zoomSpring.on("change", v => setCurrentZoom(v));
    const unsubX = xSpring.on("change", v => setCurrentX(v));
    const unsubY = ySpring.on("change", v => setCurrentY(v));
    return () => {
      unsubZoom();
      unsubX();
      unsubY();
    };
  }, [zoomSpring, xSpring, ySpring]);

  return (
    <>
      {/* High Performance Star Map Canvas */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ opacity: bgOpacity }}
      >
        <StarMapCanvas zoom={currentZoom} panX={currentX} panY={currentY} />
        <div className="absolute inset-0 nebula-glow pointer-events-none opacity-50"></div>
      </motion.div>

      {/* Interactive Markers Layer */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          scale: zoomSpring,
          x: xSpring,
          y: ySpring,
          opacity: bgOpacity
        }}
      >
        <div className="relative w-full h-full">
          {celestialObjects.map((obj, i) => (
            <CelestialObject 
              key={i} 
              x={obj.x} 
              y={obj.y} 
              name={obj.name} 
              type={obj.type} 
              distance={obj.distance} 
              minZoom={obj.minZoom} 
              zoom={currentZoom} 
            />
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default function App() {
  const zoom = useMotionValue(0.5);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const containerRef = useRef<HTMLDivElement>(null);

  // Silkier spring values
  const springConfig = { damping: 60, stiffness: 120 };
  const zoomSpring = useSpring(zoom, springConfig);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Handle wheel with multiplicative zoom and no React state updates
  const handleWheel = (e: React.WheelEvent) => {
    if (isTransitioning || activePage !== "home") return;
    
    // Use multiplicative factor for smoother zoom
    const factor = Math.pow(0.999, e.deltaY);
    const currentZoom = zoom.get();
    const newZoom = Math.min(Math.max(currentZoom * factor, 0.5), 25);
    
    if (newZoom !== currentZoom) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        
        // World coordinate of mouse
        const ox = rect.width / 2 + x.get();
        const oy = rect.height / 2 + y.get();
        
        const wx = (mx - ox) / currentZoom;
        const wy = (my - oy) / currentZoom;
        
        // New origin to keep world coordinate under mouse
        const newOx = mx - wx * newZoom;
        const newOy = my - wy * newZoom;
        
        x.set(newOx - rect.width / 2);
        y.set(newOy - rect.height / 2);
        zoom.set(newZoom);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTransitioning || activePage !== "home") return;
    if (e.buttons === 1) {
      x.set(x.get() + e.movementX);
      y.set(y.get() + e.movementY);
    }
  };

  const celestialObjects = [
    { x: 1200, y: -800, name: "Pleiades (M45)", type: "Star Cluster", distance: "444 Light Years", minZoom: 1.2 },
    { x: -2500, y: 1200, name: "Andromeda (M31)", type: "Spiral Galaxy", distance: "2.5 Million LY", minZoom: 2.0 },
    { x: 3500, y: 4000, name: "Orion Nebula", type: "Emission Nebula", distance: "1,344 Light Years", minZoom: 1.5 },
    { x: -4500, y: -3000, name: "Sombrero Galaxy", type: "Unbarred Spiral", distance: "29 Million LY", minZoom: 3.0 },
    { x: 1000, y: 6500, name: "Eagle Nebula", type: "Star-forming Region", distance: "7,000 Light Years", minZoom: 2.5 },
    { x: -500, y: -8500, name: "Ring Nebula", type: "Planetary Nebula", distance: "2,300 Light Years", minZoom: 4.0 },
    { x: 8500, y: 2000, name: "Whirlpool Galaxy", type: "Spiral Galaxy", distance: "23 Million LY", minZoom: 5.0 },
    { x: -9000, y: 5500, name: "Crab Nebula", type: "Supernova Remnant", distance: "6,500 Light Years", minZoom: 3.5 },
    { x: 12000, y: -10000, name: "Lagoon Nebula", type: "Giant Interstellar Cloud", distance: "4,100 LY", minZoom: 6.0 },
    { x: -11000, y: -12000, name: "Triangulum Galaxy", type: "Spiral Galaxy", distance: "2.7 Million LY", minZoom: 4.5 },
    { x: 14000, y: 13000, name: "Centaurus A", type: "Radio Galaxy", distance: "11 Million LY", minZoom: 8.0 },
    { x: -13500, y: 14000, name: "Helix Nebula", type: "Planetary Nebula", distance: "650 LY", minZoom: 7.0 },
  ];

  const navigateTo = (page: string) => {
    if (page === activePage) return;
    setIsTransitioning(true);
    
    if (page !== "home") {
      // Zoom into the nearest empty black space
      // We use a more reasonable zoom target to avoid browser rendering jitter
      zoom.set(40);
      x.set(x.get() * 1.5 + 200);
      y.set(y.get() * 1.5 + 200);
      
      setTimeout(() => {
        setActivePage(page);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 600);
      }, 1200); // Wait for the zoom to finish and screen to go black
    } else {
      // Returning home
      // First, let the overlay cover everything before resetting state
      setTimeout(() => {
        setActivePage("home");
        zoom.set(0.5);
        x.set(0);
        y.set(0);
        
        // Wait for zoom reset to be mostly done before hiding overlay
        setTimeout(() => {
          setIsTransitioning(false);
        }, 1200);
      }, 800); // Overlay is mostly opaque by now
    }
  };



  const bgOpacity = useTransform(
    zoomSpring as unknown as MotionValue<number>, 
    [0.1, 0.5, 10, 20], 
    [0, 1, 1, 0]
  );

  return (
    <div 
      className="relative w-full h-screen bg-black overflow-hidden select-none"
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      <SpaceScene 
        zoomSpring={zoomSpring}
        xSpring={xSpring}
        ySpring={ySpring}
        celestialObjects={celestialObjects}
        bgOpacity={bgOpacity}
      />

      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            className="fixed inset-0 bg-black z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      {/* UI Layers */}
      <div className="relative z-20 w-full h-full pointer-events-none flex flex-col items-center justify-center">
        
        <AnimatePresence mode="wait">
          {activePage === "about" && (
            <RetroAboutPage 
              key="about" 
              onBack={() => navigateTo("home")} 
              onGallery={() => navigateTo("gallery")}
            />
          )}

          {activePage === "gallery" && (
            <RetroGalleryPage 
              key="gallery" 
              onBack={() => navigateTo("home")} 
              onHome={() => navigateTo("about")}
            />
          )}



          {activePage !== "home" && activePage !== "about" && activePage !== "gallery" && (
            <BlogPage activePage={activePage} onBack={() => navigateTo("home")} />
          )}
        </AnimatePresence>

        {/* Bottom Navigation */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto">
          <nav className="flex items-center gap-6 px-8 py-4 bg-black/40 backdrop-blur-md rounded-full border border-white/5">
            {[
            { id: "home", label: "Space" },
            { id: "about", label: "Home" },
            { id: "gallery", label: "Gallery" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`font-headline text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 hover:underline
                  ${activePage === item.id || (item.id === "home" && activePage === "home")
                    ? "text-white underline" 
                    : "text-white/40 hover:text-white/80"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>


    </div>
  );
}
