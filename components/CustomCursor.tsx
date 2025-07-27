"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      if (dotRef.current && ringRef.current) {
        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top = `${y}px`;

        ringRef.current.animate(
          [
            { transform: ringRef.current.style.transform },
            { transform: `translate(${x - 20}px, ${y - 20}px)` },
          ],
          { duration: 150, fill: "forwards" }
        );
      }
    };

    const clickPulse = () => {
      if (ringRef.current) {
        ringRef.current.style.transform += " scale(0.8)";
        setTimeout(() => {
          ringRef.current!.style.transform = ringRef.current!.style.transform.replace(" scale(0.8)", "");
        }, 100);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", clickPulse);
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
