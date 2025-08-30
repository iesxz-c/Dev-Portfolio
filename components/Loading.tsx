"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p < 100 ? p + 1 : 100));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      {/* Blurry glowing gradient background */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-70"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #06b6d4, transparent 60%), radial-gradient(circle at 70% 70%, #8b5cf6, transparent 60%), radial-gradient(circle at 50% 50%, #ec4899, transparent 60%)",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Loader Content */}
      <div className="relative flex flex-col items-center text-center">
        {/* Quantum Circle */}
        <div className="relative w-28 h-28 mb-8">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-t-cyan-400 border-r-purple-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-6 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-2">
          Initializing Portfolio
        </h2>
        <p className="text-sm text-white/70 mb-6">
          Preparing an extraordinary experience...
        </p>

        {/* Progress bar */}
        <div className="w-64 h-2 rounded-full bg-white/10 overflow-hidden mb-3">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <p className="text-xs text-white/60">{progress}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
