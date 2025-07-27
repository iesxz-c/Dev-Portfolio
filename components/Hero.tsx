"use client";

import React, { useEffect, useState } from 'react'
import { Spotlight } from './ui/Spotlight'
import { cn } from "@/lib/utils"
import { TextGenerateEffect } from './text-generate-effect'
import MagicButton from './ui/MagicButton'
import { FaLocationArrow } from "react-icons/fa";

const Hero = () => {
  const [spotlights, setSpotlights] = useState<{ x: number; y: number; id: number }[]>([]);

  const handlePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setSpotlights((prev) => [...prev, { x, y, id }]);

    setTimeout(() => {
      setSpotlights((prev) => prev.filter((s) => s.id !== id));
    }, 800);
  };

  return (
    <>
    <div className="pb-20 pt-36 relative" onPointerDown={handlePointer} id='home'>
      {/* Spotlights */}
      <div>
        <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
        <Spotlight className="h-[80vh] w-[50vw] top-10 left-full" fill="purple" />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <TextGenerateEffect className="text-center text-[40px] md:text-5xl lg:text-6xl"
            words="I type. Things happen. Sometimes they even work"
          />
          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            Hi! I&apos;m Akash, a Software Developer based in India.
          </p>

          <a href="#about">
            <MagicButton title="About my work"
            icon={<FaLocationArrow/>}
            position='right'
            />
          </a>
        </div>
      </div>

      {spotlights.map((s) => (
        <div
          key={s.id}
          className="pointer-events-none absolute w-40 h-40 rounded-full bg-white/10 blur-2xl opacity-70 animate-ping"
          style={{
            left: s.x - 80,
            top: s.y - 80,
          }}
        />
      ))}
    </div>

    </>
  )
}

export default Hero
