"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { FiMenu, FiX } from "react-icons/fi";

export const FloatingNav = ({
  navItems,
  className,
  heroSectionId = "hero",
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
  heroSectionId?: string;
}) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [lastScrollY, setLastScrollY] = useState(0);

  // Simplified scroll detection
  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      
      if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) > 10) {
        setScrollDirection(direction);
      }
      setLastScrollY(scrollY > 0 ? scrollY : 0);
    };

    const handleScroll = () => {
      updateScrollDirection();
      
      // Show navbar after scrolling past hero section (simplified)
      const heroElement = document.getElementById(heroSectionId);
      if (heroElement) {
        const heroHeight = heroElement.offsetHeight;
        const shouldShow = window.scrollY > heroHeight * 0.8; // Show when 80% past hero
        setVisible(shouldShow && scrollDirection === "up");
      } else {
        // Fallback if hero section not found
        setVisible(window.scrollY > 300 && scrollDirection === "up");
      }
    };

    // Throttle scroll events
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll);
    
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [scrollDirection, lastScrollY, heroSectionId]);

  // Close mobile menu when clicking nav items
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "fixed top-6 inset-x-0 mx-auto z-50 max-w-fit",
            className
          )}
        >
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center justify-between max-w-2xl mx-auto rounded-full bg-black/20 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/40 p-3">
            {/* Brand */}
            <div className="flex items-center pl-3">
              <span className="font-mono text-lg font-bold text-white">Akash</span>
              <div className="flex items-center ml-4">
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative flex h-2 w-2"
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </motion.span>
                <span className="ml-2 text-xs font-semibold text-emerald-400">Online</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-2 mx-6" onMouseLeave={() => setHoveredItem(null)}>
              {navItems.map((navItem) => (
                <a
                  key={navItem.link}
                  href={navItem.link}
                  onMouseEnter={() => setHoveredItem(navItem.name)}
                  onClick={handleNavClick}
                  className="relative px-4 py-2 rounded-full text-sm font-medium text-white/80 hover:text-white transition-colors duration-300"
                >
                  {hoveredItem === navItem.name && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 z-0 bg-white/10 rounded-full border border-white/20"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {navItem.icon}
                    {navItem.name}
                  </span>
                </a>
              ))}
            </div>

            {/* GitHub CTA */}
            <motion.a
              href="https://github.com/iesxz-c"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full border border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <span>GitHub</span>
              <motion.span 
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent origin-center"
              />
            </motion.a>
          </div>

          {/* Mobile Navigation */}
          <div className="sm:hidden relative mx-4">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiX size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-16 left-0 right-0 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg shadow-black/40 overflow-hidden"
                >
                  <div className="p-4 space-y-2">
                    {/* Brand in mobile */}
                    <div className="flex items-center justify-center pb-4 border-b border-white/10">
                      <span className="font-mono text-lg font-bold text-white">Akash</span>
                      <div className="flex items-center ml-4">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="ml-2 text-xs font-semibold text-emerald-400">Online</span>
                      </div>
                    </div>

                    {/* Mobile nav items */}
                    {navItems.map((navItem, index) => (
                      <motion.a
                        key={navItem.link}
                        href={navItem.link}
                        onClick={handleNavClick}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
                      >
                        {navItem.icon && (
                          <span className="text-purple-400">{navItem.icon}</span>
                        )}
                        <span className="font-medium">{navItem.name}</span>
                      </motion.a>
                    ))}

                    {/* Mobile GitHub link */}
                    <motion.a
                      href="https://github.com/iesxz-c"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleNavClick}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: navItems.length * 0.1 }}
                      className="block w-full mt-4 px-4 py-3 text-center text-white font-medium bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl border border-white/20 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                    >
                      Visit GitHub
                    </motion.a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};