import React, { useRef, useEffect, useMemo, useCallback } from 'react';

// Types for Canvas rendering
interface StarData {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface GalaxyInstance {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
  protoIndex: number;
}

interface GalaxyData {
  prototypes: HTMLCanvasElement[];
  instances: GalaxyInstance[];
}

export const StarMapCanvas = ({ zoom, panX, panY }: { zoom: number; panX: number; panY: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridSize = 1000;
  
  // Use refs to avoid re-triggering the animation loop effect
  const stateRef = useRef({ zoom, panX, panY });
  useEffect(() => {
    stateRef.current = { zoom, panX, panY };
  }, [zoom, panX, panY]);

  // Generate a massive amount of stars once and organize into a grid
  const starGrid = useMemo(() => {
    const grid: Record<string, StarData[]> = {};
    const colors = ["#ffffff", "#fff4ea", "#f8f8ff", "#e6e6fa", "#fff0f5", "#00daf3", "#d8b9ff", "#ffcc99", "#ffaa88"];
    
    for (let i = 0; i < 200000; i++) {
      const x = Math.random() * 30000 - 15000;
      const y = Math.random() * 30000 - 15000;
      const size = Math.random() * 1.5 + 0.1;
      const star = {
        x, y,
        size,
        opacity: Math.random() * 0.8 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkleSpeed: 0.01 + Math.random() * 0.04,
        twinkleOffset: Math.random() * Math.PI * 2,
        hasSpikes: size > 1.2 && Math.random() > 0.8 // Only largest stars get diffraction spikes
      };
      
      const gx = Math.floor(x / gridSize);
      const gy = Math.floor(y / gridSize);
      const key = `${gx},${gy}`;
      if (!grid[key]) grid[key] = [];
      grid[key].push(star as any);
    }
    return grid;
  }, []);

  // Generate background galaxies and pre-render them
  const galaxyData = useMemo(() => {
    const prototypes: HTMLCanvasElement[] = [];
    // Deep field colors: lots of red-shifted distant galaxies, some bright blue/white foreground ones
    const colors = ["#ff5533", "#ff8855", "#ffaa77", "#ffcc99", "#ffffff", "#d8b9ff", "#99ccff", "#00daf3", "#ff3311"];
    
    // Generate 50 unique galaxy prototypes
    for (let i = 0; i < 50; i++) {
      const typeRand = Math.random();
      let type = "elliptical";
      if (typeRand > 0.7) type = "spiral";
      else if (typeRand > 0.4) type = "edge-on";
      else if (typeRand > 0.2) type = "irregular";

      const size = 100; // Fixed base size for prototypes
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const offCanvas = document.createElement("canvas");
      const padding = 20;
      offCanvas.width = (size + padding) * 2;
      offCanvas.height = (size + padding) * 2;
      const octx = offCanvas.getContext("2d");
      
      if (octx) {
        const cx = offCanvas.width / 2;
        const cy = offCanvas.height / 2;
        
        // Core Glow
        const coreGradient = octx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.25);
        coreGradient.addColorStop(0, "white");
        coreGradient.addColorStop(0.3, color);
        coreGradient.addColorStop(1, "transparent");
        octx.fillStyle = coreGradient;
        octx.beginPath();
        
        if (type === "edge-on") {
          octx.ellipse(cx, cy, size * 0.25, size * 0.06, 0, 0, Math.PI * 2);
        } else {
          octx.arc(cx, cy, size * 0.25, 0, Math.PI * 2);
        }
        octx.fill();

        // Body Glow
        if (type === "spiral") {
          const arms = 2 + Math.floor(Math.random() * 3);
          const armTightness = 0.4 + Math.random() * 0.6;
          for (let a = 0; a < arms; a++) {
            const armAngleOffset = (a * Math.PI * 2) / arms;
            for (let step = 0; step < 80; step++) {
              const t = step / 80;
              const angle = t * Math.PI * 3 * armTightness + armAngleOffset;
              const dist = t * size;
              const sx = cx + Math.cos(angle) * dist;
              const sy = cy + Math.sin(angle) * dist;
              const stepSize = (1 - t) * (size * 0.3) + 2;
              const radialGrad = octx.createRadialGradient(sx, sy, 0, sx, sy, stepSize);
              radialGrad.addColorStop(0, color);
              radialGrad.addColorStop(1, "transparent");
              octx.globalAlpha = (1 - t) * 0.3;
              octx.fillStyle = radialGrad;
              octx.beginPath();
              octx.arc(sx, sy, stepSize, 0, Math.PI * 2);
              octx.fill();
            }
          }
        } else if (type === "edge-on") {
          const bodyGradient = octx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.9);
          bodyGradient.addColorStop(0, color);
          bodyGradient.addColorStop(1, "transparent");
          octx.globalAlpha = 0.5;
          octx.fillStyle = bodyGradient;
          octx.beginPath();
          octx.ellipse(cx, cy, size * 0.9, size * 0.15, 0, 0, Math.PI * 2);
          octx.fill();
        } else {
          // elliptical / irregular
          const bodyGradient = octx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.8);
          bodyGradient.addColorStop(0, color);
          bodyGradient.addColorStop(1, "transparent");
          octx.globalAlpha = 0.3;
          octx.fillStyle = bodyGradient;
          octx.beginPath();
          if (type === "irregular") {
            octx.ellipse(cx, cy, size * 0.8, size * (0.4 + Math.random() * 0.4), Math.random() * Math.PI, 0, Math.PI * 2);
          } else {
            octx.arc(cx, cy, size * 0.8, 0, Math.PI * 2);
          }
          octx.fill();
        }

        // Internal Stars (Massively increased density)
        const starCount = 300 + Math.floor(Math.random() * 700);
        octx.globalAlpha = 0.9;
        for (let j = 0; j < starCount; j++) {
          let sx, sy;
          if (type === "spiral") {
            const angle = Math.random() * Math.PI * 4;
            const dist = (Math.random() * size * 0.9) * (angle / (Math.PI * 4));
            sx = cx + Math.cos(angle) * dist + (Math.random() - 0.5) * (size * 0.2);
            sy = cy + Math.sin(angle) * dist + (Math.random() - 0.5) * (size * 0.2);
          } else if (type === "edge-on") {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.pow(Math.random(), 1.5) * size * 0.8;
            sx = cx + Math.cos(angle) * dist;
            sy = cy + Math.sin(angle) * dist * 0.15;
          } else {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.pow(Math.random(), 1.5) * size * 0.7;
            sx = cx + Math.cos(angle) * dist;
            sy = cy + Math.sin(angle) * dist;
          }
          octx.fillStyle = Math.random() > 0.7 ? color : "white";
          octx.beginPath();
          octx.arc(sx, sy, Math.random() * 1.5 + 0.2, 0, Math.PI * 2);
          octx.fill();
        }
      }
      prototypes.push(offCanvas);
    }

    // Generate 15,000 galaxy instances referencing the prototypes
    const instances: GalaxyInstance[] = [];
    for (let i = 0; i < 15000; i++) {
      instances.push({
        x: Math.random() * 40000 - 20000,
        y: Math.random() * 40000 - 20000,
        // Heavy bias towards very small, distant galaxies to match Deep Field
        scale: Math.pow(Math.random(), 3) * 1.5 + 0.02, 
        rotation: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.7 + 0.3,
        protoIndex: Math.floor(Math.random() * prototypes.length)
      });
    }

    return { prototypes, instances };
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const { zoom: z, panX: px, panY: py } = stateRef.current;
    
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    
    ctx.save();
    ctx.translate(width / 2 + px, height / 2 + py);
    ctx.scale(z, z);

    // Calculate viewport bounds in world coordinates
    const vLeft = (-width / 2 - px) / z;
    const vRight = (width / 2 - px) / z;
    const vTop = (-height / 2 - py) / z;
    const vBottom = (height / 2 - py) / z;

    // Draw Galaxies (with culling)
    galaxyData.instances.forEach(g => {
      const proto = galaxyData.prototypes[g.protoIndex];
      const drawSize = proto.width * g.scale;
      
      if (g.x + drawSize < vLeft || g.x - drawSize > vRight || g.y + drawSize < vTop || g.y - drawSize > vBottom) return;
      
      ctx.save();
      ctx.translate(g.x, g.y);
      ctx.rotate(g.rotation + time * 0.00002);
      ctx.scale(g.scale, g.scale);
      ctx.globalAlpha = g.opacity;
      ctx.drawImage(proto, -proto.width / 2, -proto.height / 2);
      ctx.restore();
    });

    // Draw Stars (with grid-based culling)
    const startGX = Math.floor(vLeft / gridSize);
    const endGX = Math.floor(vRight / gridSize);
    const startGY = Math.floor(vTop / gridSize);
    const endGY = Math.floor(vBottom / gridSize);

    for (let gx = startGX; gx <= endGX; gx++) {
      for (let gy = startGY; gy <= endGY; gy++) {
        const starsInCell = starGrid[`${gx},${gy}`];
        if (starsInCell) {
          // Group stars by color to minimize fillStyle changes
          const starsByColor: Record<string, StarData[]> = {};
          starsInCell.forEach(star => {
            if (star.x < vLeft || star.x > vRight || star.y < vTop || star.y > vBottom) return;
            if (!starsByColor[star.color]) starsByColor[star.color] = [];
            starsByColor[star.color].push(star);
          });

          Object.entries(starsByColor).forEach(([color, stars]) => {
            ctx.fillStyle = color;
            stars.forEach(star => {
              const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.5 + 0.5;
              ctx.globalAlpha = star.opacity * (0.3 + twinkle * 0.7);
              
              ctx.beginPath();
              ctx.arc(star.x, star.y, star.size / z, 0, Math.PI * 2);
              ctx.fill();

              // Draw diffraction spikes for bright stars
              if ((star as any).hasSpikes && z > 0.5) {
                ctx.globalAlpha = star.opacity * twinkle * 0.5;
                const spikeLen = (star.size * 4) / z;
                ctx.fillRect(star.x - spikeLen/2, star.y - 0.5/z, spikeLen, 1/z);
                ctx.fillRect(star.x - 0.5/z, star.y - spikeLen/2, 1/z, spikeLen);
              }
            });
          });
        }
      }
    }

    ctx.restore();
  }, [starGrid, galaxyData]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let startTime = performance.now();

    const render = (time: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      draw(ctx, width, height, time - startTime);
      animationFrameId = requestAnimationFrame(render);
    };

    render(performance.now());
    return () => cancelAnimationFrame(animationFrameId);
  }, [draw]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full"
      style={{ touchAction: "none" }}
    />
  );
};
