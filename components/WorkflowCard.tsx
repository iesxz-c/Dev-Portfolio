// file: /components/about-cards/WorkflowCard.tsx

"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "./Card";
import { CardHeader } from "./CardHeader";

// 1. UPDATED DATA: Removed the 'effect' and added 'bgColor' and 'glowColor' for the spotlight
const workflowPhases = [
  {
  phase: "Phase 1",
  title: "Ideate & Explore",
  description: "I start with the idea itself, thinking deeply about how it can work and what makes it interesting. I explore possibilities and consider any new technologies I might need to bring it to life.",
  bgColor: "bg-emerald-900/40",
  glowColor: "shadow-emerald-500/50",
},
{
  phase: "Phase 2",
  title: "Break & Build",
  description: "I break the project into smaller pieces and tackle one component at a time. Step by step, I focus on building each part thoughtfully, learning new tools or techniques along the way if needed.",
  bgColor: "bg-pink-900/40",
  glowColor: "shadow-pink-500/50",
},
{
  phase: "Phase 3",
  title: "Iterate & Refine",
  description: "I continuously refine and improve each version. Small tweaks, polish, and iteration make the project smoother and more complete, while I keep experimenting with ideas and technologies to make it better.",
  bgColor: "bg-sky-600/40",
  glowColor: "shadow-sky-500/50",
},

];

const WorkflowCard = () => {
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);

  return (
    <Card className="flex h-full min-h-[320px] w-full flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/20">
      <CardHeader
        title="My Development Workflow"
        description="A structured approach to building great products."
        className="px-6 py-6"
      />
      {/* Set parent to relative for the absolute spotlight */}
      <div
        className="relative flex flex-grow flex-col justify-around p-6 pt-0"
        onMouseLeave={() => setHoveredPhase(null)} // Reset when mouse leaves the container
      >
        {workflowPhases.map((item, index) => (
          <div
            key={item.title}
            onMouseEnter={() => setHoveredPhase(index)}
            // Make the text container relative to sit on top of the spotlight
            className="relative cursor-pointer rounded-lg p-4 transition-colors"
          >
            {/* The Magic: The Sliding Spotlight background */}
            {hoveredPhase === index && (
              <motion.div
                // This ID tells framer-motion that it's the SAME element, so it animates its layout
                layoutId="spotlight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className={`absolute inset-0 -z-10 rounded-lg blur-md ${item.bgColor}`}
              />
            )}

            <h3 className="relative z-10 font-serif text-base font-semibold text-purple">{item.phase}: <span className='text-white'>{item.title}</span></h3>
            <p className="relative z-10 mt-1 font-mono text-xs text-white/60">{item.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WorkflowCard;