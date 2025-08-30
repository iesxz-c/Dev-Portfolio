"use client";

import React, { useEffect, useState } from 'react'
import { Spotlight } from './ui/Spotlight'
import { cn } from "@/lib/utils"
import { TextGenerateEffect } from './text-generate-effect'
import MagicButton from './ui/MagicButton'
import { FaLocationArrow } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowDown, FiTerminal } from "react-icons/fi";

const Particle = ({ x, y }: { x: number; y: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
      className="absolute w-1.5 h-1.5 rounded-full bg-white/60"
      style={{ left: x, top: y }}
    />
  );
};

const RotatingRoles = () => {
  const roles = [
    { text: "Full-Stack Developer", color: "from-blue-400 to-cyan-300" },
    { text: "React Native Dev", color: "from-green-400 to-emerald-300" },
    { text: "UI/UX Enthusiast", color: "from-purple-400 to-pink-300" },
    { text: "AI Developer", color: "from-orange-400 to-red-300" }
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="relative h-16 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.25, 0, 1],
            type: "spring",
            stiffness: 100
          }}
          className={cn(
            "text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
            roles[index].color
          )}
        >
          {roles[index].text}
        </motion.div>
      </AnimatePresence>
      
      {/* Floating particles around the role text */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none"
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${50 + 30 * Math.cos((i * 60 * Math.PI) / 180)}%`,
              top: `${50 + 30 * Math.sin((i * 60 * Math.PI) / 180)}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

const FloatingName = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 1.2, 
        ease: [0.25, 0.25, 0, 1],
        delay: 0.5 
      }}
      className="relative"
    >
      {/* Glowing background effect */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 rounded-3xl blur-2xl"
      />
      
      {/* Main name text */}
      <motion.h1
        className="relative text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent tracking-tight"
        whileHover={{ 
          scale: 1.05,
          textShadow: "0 0 30px rgba(168, 85, 247, 0.5)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        AKASH
      </motion.h1>
      
      {/* Decorative elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-4 -right-4 w-8 h-8 border-2 border-purple-400/50 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-2 -left-2 w-6 h-6 border-2 border-blue-400/50 rounded-full"
      />
    </motion.div>
  );
};

const Hero = () => {
  const [spotlights, setSpotlights] = useState<{ x: number; y: number; id: number }[]>([]);
  const [particles, setParticles] = useState<{ x: number; y: number; id: number }[]>([]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setParticles((prev) => [
        ...prev,
        { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, id },
      ]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, 8000);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="pb-20 pt-32 relative " onPointerDown={handlePointer} id='home'>
        {/* Enhanced Spotlights */}
        <div>
          <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
          <Spotlight className="h-[80vh] w-[50vw] top-10 left-full" fill="purple" />
          <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
          <Spotlight className="right-80 bottom-28 h-[60vh] w-[40vw]" fill="cyan" />
        </div>
 
        <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2] absolute top-0 left-0 flex items-center justify-center">
          <div className="absolute inset-0 pointer-events-none z-20">
            {particles.map((p) => (
              <Particle key={p.id} x={p.x} y={p.y} />
            ))}
          </div>
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>
  
        <div className="flex justify-center relative my-20 z-10">
          <div className="max-w-[89vw] md:max-w-4xl lg:max-w-[70vw] flex flex-col items-center justify-center space-y-8">
            
            {/* Greeting with typewriter effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <span className="text-white/70 text-lg md:text-xl font-mono tracking-widest">
                Hey there! 👋 I'm
              </span>
            </motion.div>

            {/* Main name showcase */}
            <FloatingName />

            {/* Rotating roles under the name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <RotatingRoles />
            </motion.div>

            {/* Catchy subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-center max-w-2xl"
            >
              <TextGenerateEffect 
                className="text-center text-lg md:text-xl lg:text-2xl text-white/80"
                words="Curious mind, evolving code, steady learning — and yes, coffee is part of the stack"
              />
            </motion.div>

            {/* Enhanced CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="#about">
                <MagicButton 
                  title="Explore My Universe"
                  icon={<FaLocationArrow/>}
                  position='right'
                />
              </a>
            </motion.div>

            {/* Code snippet tease */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.6 }}
              className="mt-8 p-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <div className="flex items-center gap-2 mb-2">
                <FiTerminal className="text-green-400" size={16} />
                <span className="text-green-400 text-sm font-mono">akash@portfolio:~$</span>
              </div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/70 font-mono text-sm"
              >
                const developer = new Akash();<br/>
                akash.debugLife();<br/>
               {/* akash.pushToProduction("dreams"); */}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
       <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <a href="#about" className="flex flex-col items-center gap-2 cursor-pointer group">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="p-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm group-hover:border-white/40 transition-all duration-300"
            >
              <FiArrowDown size={20} className="text-white/60 group-hover:text-white transition-colors" />
            </motion.div>
            <motion.span 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs text-white/50 font-mono tracking-widest group-hover:text-white transition-colors"
            >
              DISCOVER MORE
            </motion.span>
          </a>
        </motion.div>

        {/* Interactive spotlight effects */}
        {spotlights.map((s) => (
          <motion.div
            key={s.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="pointer-events-none absolute w-40 h-40 rounded-full"
            style={{
              left: s.x - 80,
              top: s.y - 80,
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)'
            }}
          />
        ))}

        {/* Floating orbs around AKASH */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 pointer-events-none z-5"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-60"
              style={{
                left: `${50 + 25 * Math.cos((i * 72 * Math.PI) / 180)}%`,
                top: `${45 + 20 * Math.sin((i * 72 * Math.PI) / 180)}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </>
  )
}

export default Hero