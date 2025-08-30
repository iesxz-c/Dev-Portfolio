"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const followRing = () => {
      if (ringRef.current) {
        ringRef.current.style.left = `${mousePos.current.x}px`;
        ringRef.current.style.top = `${mousePos.current.y}px`;
      }
      requestAnimationFrame(followRing);
    };

    const clickPulse = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = "translate(-50%, -50%) scale(0.8)";
        setTimeout(() => {
          if (ringRef.current) {
            ringRef.current.style.transform = "translate(-50%, -50%) scale(1)";
          }
        }, 100);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", clickPulse);

    followRing(); 

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", clickPulse);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
