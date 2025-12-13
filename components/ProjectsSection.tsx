

"use client";
import React from 'react';
import { motion, AnimatePresence, useSpring, useAnimation } from 'framer-motion';
import { SectionHeader } from "./SectionHeader";
import { Particles } from './Particles';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

const projects = [
 {
 id: 1,
title: "Collaborative Learning Application",
description: "A collaborative learning platform built with React, Chakra UI, and Flask that enables real-time study sessions, interactive whiteboards, group messaging, and task/flashcard management with analytics visualizations.",
img: "/1.png",
link: "https://github.com/iesxz-c/Collab-Learning-Client",
status: "Completed",
category: "Web App",
color: "#EC4899",
isSpotlight: true,
iconLists: [ "python","flask","vite", "react","sqlite", "javascript", "tailwindcss", "googlegemini" ],
 },
 {
id: 2,
title: "Context-Aware AI Chatbot",
description: "An AI-powered chatbot that leverages retrieval-augmented generation with Next.js, React, Gemini API, and Astra DB to deliver context-aware, domain-adaptable responses by embedding and retrieving relevant content.",
img: "/5.png",
link: "https://github.com/iesxz-c/Context-Aware-AI-Chatbot",
status: "Completed",
category: "AI",
color: "#6D28D9",
isSpotlight: true,
iconLists: [ "nextdotjs","react", "typescript", "css", "astra", "googlegemini", "langchain" ],
 },
 {
id: 3,
title: "PDFs & Docs Processing Suite ",
description: "A document management web application using React, Chakra UI, and Flask that streamlines PDF merging, DOC/PPT conversion, OCR extraction, and multi-step document processing workflows.",
img: "/2.png",
link: "https://github.com/iesxz-c/PDF-Document-Processing-Suite",
status: "Completed",
category: "Web App",
color: "#EC4899",
isSpotlight: false,
iconLists: [  "python","react","vite", "flask","libreoffice"  ],
  },
  {
 id: 4,
 title: "AI-Powered Web Scraper & Q&A System",
 description: "Melion is a web scrapping tool scrapes website content, processes and embeds it using LangChain, and enables natural language question answering powered by Gemini AI.",
 img: "/3.png",
 link: "https://github.com/iesxz-c/TS-Web-Scraper",
 status: "Completed",
 category: "AI",
 color: "#6D28D9",
 isSpotlight: false,
 iconLists: [ "react", "vite", "typescript", "nodedotjs", "langchain", "googlegemini" ],
 },
 {
 id: 5,
 title: "My Portfolio (This Site!)",
 description: "A deep dive into modern frontend development, showcasing advanced animations with Framer Motion, performance optimization with Next.js, and a keen eye for design.",
 img: "/6.png",
 link: "https://github.com/iesxz-c/Dev-Portfolio",
 status: "Completed",
 category: "Web App",
color: "#EC4899",
 isSpotlight: true,
 iconLists: [ "nextdotjs", "react", "typescript", "tailwindcss", "javascript","css" ],
 },
 {
 id: 6,
 title: "Milan - A Simple ChatApp",
 description: "MILAN is a messaging app using websocket implemented using Flask, HTML, CSS, SQLAlchemy, and SocketIO.",
 img: "/4.jpg",
 link: "https://github.com/iesxz-c/Flask-based-chat-app ",
 status: "Completed",
 category: "Web App",
color: "#EC4899",
 isSpotlight: false,
 iconLists: [ "python", "flask", "html5", "css", "sqlalchemy","socketdotio","jinja" ],
 },
 {
 id: 7,
 title: "ML Seat Detection & Wi-Fi Gated Access",
 description: "A React Native & TypeScript app with Flask backend, Firebase Authentication, YOLOv8-based seat occupancy detection, and a personalized recommendation engine, designed to automate library entry, manage book borrowing, and enhance user experience.",
 img: "/11.png",
 link: "https://github.com/iesxz-c/Seat-Based-Wi-Fi-gated-Access",
 status: "Completed",
 category: "Mobile App",
color: "#6D28D9",
 isSpotlight: true,
 iconLists: [ "python", "flask", "typescript", "expo", "firebase","yolo" ],
 },
];
const filters = ["All", "Web App", "Mobile App", "AI"];
type Project = typeof projects[0];

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // --- REFINED COLOR PALETTE ---
  const accentColor = project.color || "#8B5CF6"; // Use project color or default to a subtle purple
  const subtleGlow = `0 0 25px -5px ${accentColor}30`;
  const subtleTextShadow = `0 0 8px ${accentColor}80`;
  const buttonGradient = `linear-gradient(90deg, ${accentColor}40, ${accentColor}80)`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#101018] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        style={{ boxShadow: subtleGlow }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-50">
          <FiX size={24} />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] md:max-h-none">
          <div className="w-full h-48 md:h-full bg-black">
            <img src={project.img} alt={project.title} className="w-full h-full object-cover opacity-90" />
          </div>

          <div className="p-6 md:p-8 flex flex-col overflow-y-auto custom-scrollbar-on-modal">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-3xl font-bold font-mono text-white pr-8" style={{ textShadow: subtleTextShadow }}>
                {project.title}
              </h2>
              <span 
                className="flex-shrink-0 px-3 py-1 text-xs font-semibold rounded-full" 
                style={{ backgroundColor: `${accentColor}20`, color: accentColor, border: `1px solid ${accentColor}40` }}
              >
                {project.status}
              </span>
            </div>

            <p className="text-white/70 font-sans leading-relaxed text-base mb-6 flex-grow">
              {project.description}
            </p>
            
            <div className="mb-6">
              <h3 className="text-sm font-bold text-white/50 tracking-wider font-mono uppercase mb-3">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.iconLists.map(icon => (
                  <div key={icon} className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-md border border-white/10">
                    <img src={`https://cdn.simpleicons.org/${icon}/white`} alt={icon} className="h-5 w-5" />
                    <span className="text-xs text-white/80 capitalize">{icon.replace(/dot/g, '.')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 font-semibold text-white rounded-lg transition-all duration-300 group transform hover:scale-105 border border-transparent"
                style={{
                  background: buttonGradient,
                  borderColor: `${accentColor}50`,
                }}
              >
                {project.link === "#" ? "Explore This Site" : "View Project"}
                <FaExternalLinkAlt size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};


// --- The rest of the component remains the same ---
const ProjectCard = ({ project, isSpotlight, onClick }: { project: Project, isSpotlight: boolean, onClick: () => void }) => {
  const mouseX = useSpring(0, { stiffness: 400, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 400, damping: 20 });
  const themeCardBorder = `rgba(255,255,255,0.1)`;

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" } }
      }}
      onClick={onClick}
      onMouseMove={onMouseMove}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col h-full rounded-2xl cursor-pointer bg-black/20 backdrop-blur-xl border shadow-lg transition-all duration-500 ${isSpotlight ? 'w-80 md:w-96' : ''}`}
      style={{
        borderColor: isSpotlight ? project.color : themeCardBorder,
        boxShadow: isSpotlight ? `0 0 15px ${project.color}30` : "0 0 10px rgba(0,0,0,0.3)",
      }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(300px circle at ${mouseX.get()}px ${mouseY.get()}px, ${project.color}20, transparent 80%)` }}
      />
      <div className="block h-full">
        <div className="relative w-full h-48 md:h-56 overflow-hidden rounded-t-2xl">
          <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" />
          <div className="absolute inset-0 shadow-[inset_0_-20px_20px_-10px_rgba(0,0,0,0.5)]" />
        </div>
        <div className="flex flex-col flex-grow p-6">
          <h3 className="font-mono text-xl font-bold text-white">{project.title}</h3>
          <p className={`font-sans text-sm text-white/80 mt-2 flex-grow ${isSpotlight ? 'line-clamp-3' : 'line-clamp-3'}`}>
            {project.description}
          </p>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center -space-x-2">
              {project.iconLists.slice(0, 5).map((icon) => (
                <img key={icon} src={`https://cdn.simpleicons.org/${icon}/white`} alt={icon} className="h-7 w-7 rounded-full border-2 border-white/20 bg-black/50 p-1" />
              ))}
            </div>
            <div className="text-xs text-white/60 group-hover:text-white transition-colors">
              View Details &rarr;
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


const ProjectsShowcase = () => {
  const [activeFilter, setActiveFilter] = React.useState("All");
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const controls = useAnimation();
  const themeFilterGradient = "linear-gradient(90deg, #8B5CF650, #EC489980)";
  const themeFilterBackground = "bg-black/20";
  const themeFilterBorder = "border-white/10";

  const spotlightProjects = projects.filter(p => p.isSpotlight);
  const duplicatedSpotlightProjects = [...spotlightProjects, ...spotlightProjects];
  
  const archiveProjects = React.useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  const startAnimation = React.useCallback(() => {
    controls.start({
        x: [0, -(384 + 32) * spotlightProjects.length],
        transition: {
            x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" },
        },
    });
  }, [controls, spotlightProjects.length]);

  React.useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  const handleMouseEnter = () => controls.stop();
  const handleMouseLeave = () => startAnimation();
  const handleOpenModal = (project: Project) => setSelectedProject(project);
  const handleCloseModal = () => setSelectedProject(null);

  return (
    <section id="projects" className="relative py-20 lg:py-28">
      <Particles className="absolute inset-0 -z-10" quantity={75} ease={80} color={"#ffffff"} vy={0.1} vx={0.1} />
      <div className="container mx-auto">
        <SectionHeader
          title="Spotlight Projects"
          eyebrow="Featured Work"
          description="A curated selection of my flagship projects."
        />
        
        <div
          className="mt-12 overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div className="flex gap-8" animate={controls} style={{ width: 'fit-content' }}>
            {duplicatedSpotlightProjects.map((project, index) => (
              <div key={`${project.id}-${index}`} className="flex-shrink-0">
                <ProjectCard project={project} isSpotlight={true} onClick={() => handleOpenModal(project)} />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-28">
          <SectionHeader
            title="Project Archive"
            eyebrow="Complete Collection"
            description="A comprehensive list of my work. Filter by category to explore."
          />
          
          <div className="relative mt-12 mb-10 flex w-full max-w-2xl mx-auto justify-center">
            <div className={`relative flex items-center gap-1 p-1 rounded-2xl ${themeFilterBackground} backdrop-blur-xl ${themeFilterBorder} shadow-lg`}>
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative px-6 py-3 text-sm font-medium transition-all duration-300 capitalize rounded-xl group overflow-hidden ${
                    activeFilter === filter ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {activeFilter === filter && (
                    <motion.div
                      layoutId="project-archive-filter-bg"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: themeFilterGradient }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 font-mono tracking-wide">{filter}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {archiveProjects.map((project) => (
                <ProjectCard key={project.id} project={project} isSpotlight={false} onClick={() => handleOpenModal(project)} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsShowcase;