"use client";
import React, { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { motion, useInView, useSpring, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const techData = {
  frontend: [
    {
      name: "React",
      icon: "/re.svg",
      level: 90,
      color: "#61DAFB", // React cyan
      description: "Component-based UI library"
    },
    {
      name: "HTML",
      icon: "/cio.svg",
      level: 98,
      color: "#E34F26", // Bright orange
      description: "Markup language for web pages"
    },
    {
      name: "Next.js",
      icon: "/next.svg",
      level: 85,
      color: "#00C7B7", // Aqua teal instead of black
      description: "Full-stack React framework"
    },
    {
      name: "TypeScript",
      icon: "/ts.svg",
      level: 85,
      color: "#3178C6", // Official TypeScript blue
      description: "Type-safe JavaScript"
    },
    {
      name: "Tailwind CSS",
      icon: "/tail.svg",
      level: 98,
      color: "#38BDF8", // Tailwind cyan
      description: "Utility-first CSS framework"
    },
    {
      name: "React Native",
      icon: "/re.svg",
      level: 85,
      color: "#8A2BE2", // Violet to stand apart from React
      description: "Mobile-first React framework"
    },
    {
      name: "JavaScript",
      icon: "/kio.svg",
      level: 90,
      color: "#F7DF1E", // Bright JS yellow
      description: "Dynamic scripting language"
    }
  ],
  backend: [
    {
      name: "Node.js",
      icon: "/node.svg",
      level: 85,
      color: "#539E43", // Fresh green
      description: "JavaScript runtime environment"
    },
    {
      name: "Flask",
      icon: "/jio.svg",
      level: 90,
      color: "#FF6F61", // Coral red
      description: "Python web framework"
    },
    {
      name: "Python",
      icon: "/pio.svg",
      level: 95,
      color: "#FFD43B", // Python yellow
      description: "Versatile programming language"
    },
    {
      name: "MySQL",
      icon: "/sio.svg",
      level: 85,
      color: "#00758F", // MySQL teal
      description: "Relational database"
    },
    {
      name: "Firebase",
      icon: "/base.svg",
      level: 90,
      color: "#FFCA28", // Firebase amber
      description: "Realtime DB & auth platform"
    },
    {
      name: "LangChain",
      icon: "/plm.svg",
      level: 80,
      color: "#FF4081", // Pink accent
      description: "LLM orchestration library"
    },
    {
      name: "AppWrite",
      icon: "/appw.svg",
      level: 90,
      color: "#F02E65", // Bright magenta
      description: "Self-hosted backend server"
    }
  ],
  tools: [
    {
      name: "Git",
      icon: "/g.svg",
      level: 95,
      color: "#F05032", // Git orange
      description: "Version control & collaboration"
    },
    {
      name: "GitHub",
      icon: "/git.svg",
      level: 95,
      color: "#6CC644", // GitHub green (not black)
      description: "Git hosting & code collaboration"
    },
    {
      name: "Vercel",
      icon: "/logo.svg",
      level: 95,
      color: "#FF2D55", // Hot pink instead of black
      description: "Deployment & hosting platform"
    },
    {
      name: "Vite",
      icon: "/vite.svg",
      level: 95,
      color: "#646CFF", // Official purple
      description: "Lightning-fast build tool"
    },
    {
      name: "Linux",
      icon: "/Tux.png",
      level: 80,
      color: "#FFCC33", // Gold yellow (Tux vibe)
      description: "Operating system environment"
    },
    {
      name: "Railway",
      icon: "/icon.jpeg",
      level: 90,
      color: "#FF9800", // Railway orange
      description: "Cloud hosting infrastructure"
    },
    {
      name: "Expo",
      icon: "/expo.svg",
      level: 85,
      color: "#009688", // Bright teal
      description: "React Native development toolchain"
    }
  ]
};

type Category = keyof typeof techData;
type Skill = (typeof techData)[Category][number];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30, 
    scale: 0.95,
    rotateX: -15,
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
      mass: 0.8,
    },
  },
};

const SkillCard = ({ skill, isInView, delay = 0 }: { 
  skill: Skill; 
  isInView: boolean; 
  delay?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative rounded-2xl bg-gradient-to-br from-black-200/80 to-black-100/60 
                 border border-white/10 backdrop-blur-sm overflow-hidden cursor-pointer
                 hover:border-purple-400/40 transition-all duration-300"
      style={{ perspective: "1000px" }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${skill.color}15 0%, transparent 70%)`,
        }}
        animate={isHovered ? { 
          background: [
            `radial-gradient(circle at 20% 50%, ${skill.color}15 0%, transparent 70%)`,
            `radial-gradient(circle at 80% 50%, ${skill.color}15 0%, transparent 70%)`,
            `radial-gradient(circle at 50% 20%, ${skill.color}15 0%, transparent 70%)`,
            `radial-gradient(circle at 50% 80%, ${skill.color}15 0%, transparent 70%)`,
          ]
        } : {}}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Glowing border effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-transparent"
        animate={isHovered ? {
          borderColor: [`${skill.color}40`, `${skill.color}60`, `${skill.color}40`],
          boxShadow: [
            `0 0 20px ${skill.color}25`,
            `0 0 30px ${skill.color}35`,
            `0 0 20px ${skill.color}25`,
          ],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <motion.div
            className="relative flex-shrink-0"
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={skill.icon} 
              alt={`${skill.name} logo`} 
              className="h-10 w-10 object-contain filter drop-shadow-sm" 
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={isHovered ? {
                boxShadow: [`0 0 0px ${skill.color}00`, `0 0 20px ${skill.color}60`, `0 0 0px ${skill.color}00`]
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <motion.h3 
              className="font-mono text-lg font-bold text-white truncate group-hover:text-purple-200 transition-colors"
              layoutId={`skill-name-${skill.name}`}
            >
              {skill.name}
            </motion.h3>
            <motion.p 
              className="text-sm text-white/70 mt-1 line-clamp-2 group-hover:text-white/90 transition-colors"
              initial={{ opacity: 0, height: 0 }}
              animate={isHovered ? { opacity: 1, height: "auto" } : { opacity: 0.7, height: "auto" }}
            >
              {skill.description}
            </motion.p>
          </div>
        </div>

        {/* Proficiency section */}
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
              Proficiency
            </span>
            <motion.span 
              className="text-sm font-bold text-white/80 group-hover:text-purple-300 transition-colors"
              key={skill.level}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {skill.level}%
            </motion.span>
          </div>
          
          {/* Progress bar */}
          <div className="relative h-2 rounded-full bg-black-100/60 overflow-hidden">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ 
                background: `linear-gradient(90deg, ${skill.color}60, ${skill.color}, ${skill.color}80)`,
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={isInView ? { 
                width: `${skill.level}%`, 
                opacity: 1,
              } : { width: 0, opacity: 0 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.23, 1, 0.32, 1], 
                delay: delay + 0.3,
              }}
            />
            
            {/* Animated shimmer effect */}
            <motion.div
              className="absolute top-0 left-0 h-full w-8 opacity-40"
              style={{
                background: `linear-gradient(90deg, transparent, white, transparent)`,
              }}
              animate={isInView && isHovered ? {
                x: ['-100%', `${skill.level + 20}%`],
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toString();
      }
    });
    return unsubscribe;
  }, [spring]);

  return <span ref={ref}>0</span>;
};

const StatItem = ({ 
  label, 
  value, 
  unit = "", 
  delay = 0 
}: { 
  label: string; 
  value: number; 
  unit?: string; 
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
    whileHover={{ 
      y: -6, 
      scale: 1.05,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }}
    className="group relative rounded-xl border border-white/10 bg-gradient-to-br from-black-200/80 to-black-100/60 
               backdrop-blur-sm overflow-hidden cursor-pointer hover:border-purple-400/50 transition-all duration-300"
  >
    {/* Background glow effect */}
    <motion.div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.1) 0%, transparent 70%)",
      }}
    />

    <div className="relative z-10 p-6 text-center">
      <motion.div 
        className="text-3xl font-black tracking-tight text-white group-hover:text-purple-300 transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <AnimatedCounter value={value} />
        <span className="text-purple-400">{unit}</span>
      </motion.div>
      <div className="mt-2 text-xs font-semibold text-white/60 uppercase tracking-widest group-hover:text-white/80 transition-colors">
        {label}
      </div>
    </div>
  </motion.div>
);

const TabButton = ({ 
  tab, 
  isActive, 
  onClick 
}: { 
  tab: string; 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    className={`group relative px-8 py-4 text-sm font-medium capitalize transition-all duration-300 ${
      isActive 
        ? "text-white" 
        : "text-white/50 hover:text-white/80"
    }`}
    whileHover={{ y: -1 }}
    whileTap={{ y: 0 }}
    aria-pressed={isActive}
    role="tab"
  >
    <span className="relative z-10 tracking-wide">{tab}</span>

    {/* Animated underline */}
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-px origin-left"
      style={{
        background: isActive 
          ? "linear-gradient(90deg, #a855f7, #ec4899)" 
          : "transparent",
        scaleX: isActive ? 1 : 0,
      }}
      animate={{
        scaleX: isActive ? 1 : 0,
        background: isActive 
          ? ["linear-gradient(90deg, #a855f7, #ec4899)", "linear-gradient(90deg, #ec4899, #a855f7)", "linear-gradient(90deg, #a855f7, #ec4899)"]
          : "transparent"
      }}
      transition={{ 
        scaleX: { type: "spring", stiffness: 400, damping: 30 },
        background: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }}
    />

    {/* Hover underline for inactive tabs */}
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-px bg-white/20 origin-center scale-x-0 
                 group-hover:scale-x-100 transition-transform duration-300"
      style={{ display: isActive ? 'none' : 'block' }}
    />
  </motion.button>
);

const TechArsenal = () => {
  const [activeTab, setActiveTab] = useState<Category>("frontend");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const stats = useMemo(() => {
    const allSkills = Object.values(techData).flat();
    const total = allSkills.length;
    const avg = Math.round(allSkills.reduce((acc, s) => acc + s.level, 0) / total);
    const cats = Object.keys(techData).length;
    return { total, avg, cats };
  }, []);

  const handleTabChange = useCallback((tab: Category) => {
    setActiveTab(tab);
  }, []);

  // Keyboard navigation for tabs
  const handleKeyDown = useCallback((e: React.KeyboardEvent, tab: Category) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTabChange(tab);
    }
  }, [handleTabChange]);

  return (
    <section id="skills" className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
      
      <div className="container mx-auto relative z-10">
        <SectionHeader
          title="My Tech Arsenal"
          eyebrow="Skills & Expertise"
          description="A curated collection of technologies I've mastered, with real proficiency metrics and hands-on experience."
        />

        {/* Minimal, elegant tabs */}
        <motion.div 
          className="relative mt-12 mb-12 flex w-full max-w-sm mx-auto justify-center border-b border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {Object.keys(techData).map((tab, index) => (
            <TabButton
              key={tab}
              tab={tab}
              isActive={activeTab === tab}
              onClick={() => handleTabChange(tab as Category)}
            />
          ))}
        </motion.div>

        {/* Skills Grid with AnimatePresence for smooth transitions */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              exit="hidden"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {techData[activeTab].map((skill, index) => (
                <SkillCard 
                  key={skill.name} 
                  skill={skill} 
                  isInView={isInView}
                  delay={index * 0.1}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          <StatItem label="Technologies" value={stats.total} delay={0.1} />
          <StatItem label="Avg. Proficiency" value={stats.avg} unit="%" delay={0.2} />
          <StatItem label="Categories" value={stats.cats} delay={0.3} />
        </motion.div>
      </div>
    </section>
  );
};

export default TechArsenal;