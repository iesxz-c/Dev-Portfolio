"use client";
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import MyPhilosophyCard from "./MyPhilosophyCard";
import LiveGithubCard from "./LiveGithubCard";
import CoreCompetenciesCard from "./CoreCompetenciesCard";
import WorkflowCard from "./WorkflowCard";


export const AboutSection = () => {
 
  return (

    <div id="about" className="py-16 lg:py-28">
      <div className="container mx-auto">
        <SectionHeader
          title="My Professional Command Center"
          eyebrow="About Me"
          description="A showcase of my skills, workflow, and real-time contributions."
        />
       
        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Column 1 */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <MyPhilosophyCard />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <CoreCompetenciesCard />
            </motion.div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <LiveGithubCard username="iesxz-c" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <WorkflowCard />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};