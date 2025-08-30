"use client";
import React, { useState } from 'react';
import { Card } from "./Card";
import { CardHeader } from "./CardHeader";
import { motion, AnimatePresence } from 'framer-motion';

// Import your SVG icons here
import JsIcon from "@/assets/icons/square-js.svg";
import ReactIcon from "@/assets/icons/react.svg";
import PythonIcon from "@/assets/icons/python-brands.svg";
import LinuxIcon from "@/assets/icons/linux-brands.svg";
import GithubIcon from "@/assets/icons/github.svg";
import TailwindCSS from "@/assets/i.svg"
import ts from "@/assets/p.svg"
import py from "@/assets/j.svg"
import nj from "@/assets/n.svg"
import sq from "@/assets/q.svg"
import li from "@/assets/l.svg"
import ve from "@/assets/v.svg"
import gi from "@/assets/g.svg"
import op from "@/assets/fi.svg"

import fl from "@/assets/f.svg"

const skillsData = {
  frontend: [
    { name: "JavaScript", icon: JsIcon, level: "95%" },
    { name: "React", icon: ReactIcon, level: "92%" },
   
    { name: "Next.js", icon: "/next.svg", level: "90%" },
    { name: "TailwindCSS", icon: TailwindCSS, level: "98%" },
    { name: "TypeScript", icon: ts, level: "90%" },
  ],
  backend: [
    { name: "Node.js", icon: nj, level: "88%" },
    { name: "Python", icon: py, level: "85%" },
    { name: "Firebase", icon:op, level: "85%" },
    { name: "Flask", icon: fl, level: "80%" },
    { name: "MySQL", icon: sq, level: "78%" },
  ],
  tools: [
    { name: "Git & GitHub", icon: GithubIcon, level: "96%" },
    { name: "Git", icon: gi, level: "82%" },
    { name: "Linux", icon: li, level: "89%" },
    { name: "Vercel", icon: ve, level: "91%" },
  ],
};

type Category = keyof typeof skillsData;

const CoreCompetenciesCard = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('frontend');

  return (
    <Card className="flex h-full min-h-[320px] w-full flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/20">
      <CardHeader
        title="Core Competencies"
        description="My primary technology stack and tools."
      />
      <div className="flex-grow p-6 pt-0">
        {/* Category Buttons */}
        <div className="mb-6 flex justify-center space-x-2 rounded-lg bg-black-200 p-1">
          {Object.keys(skillsData).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as Category)}
              className={`w-full rounded-md px-3 py-1.5 text-xs font-mono font-semibold transition capitalize
                ${activeCategory === cat ? 'bg-purple/80 text-white' : 'hover:bg-white/10'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Icons Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3"
          >
            {skillsData[activeCategory].map((skill) => (
              <div
                key={skill.name}
                className="relative flex flex-col items-center justify-center space-y-2 rounded-lg bg-white/5 p-4 transition-colors hover:bg-white/10"
              >
                {/* The Skill Icon */}
                {typeof skill.icon === 'string' ? (
                  <img src={skill.icon} alt={skill.name} className="h-8 w-8" />
                ) : (
                  <skill.icon className="h-8 w-8" />
                )}
                <span className="text-xs font-mono text-center text-white/70">{skill.name}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default CoreCompetenciesCard;
