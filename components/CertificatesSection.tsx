// file: /components/CertificatesSection.tsx

"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { FaArrowRight, FaTimes, FaCheckCircle } from "react-icons/fa";


// 1. YOUR ACTUAL CERTIFICATES DATA
// I've added an 'issuer' and 'date' field to your data structure for a more complete display.
const certificates = [
  {
    id: 1,
    title: "CS50x 2023",
    issuer: "Harvard University",
    date: "Issued 2023",
    description: "An in-depth, university-level introduction to computer science. Explores foundational topics like algorithms, data structures, memory and web development",
    subDescription: [
      "Designed and implemented algorithms in C, recursion, searching, sorting.",
      "Used Python to solve real-world problems and build interactive applications.",
      "Built dynamic web apps with Flask, HTML, CSS, and SQLite.",
    ],
    href: "https://cs50.harvard.edu/certificates/9af1e77f-9557-43d9-8419-f822e5ad406d",
    image: "/cso.jpg",
    tags: [ { id: "1", name: "C", path: "c" }, { id: "2", name: "Python", path: "python" }, { id: "3", name: "SQL", path: "sqlite" }, { id: "4", name: "HTML", path: "html5" }, { id: "5", name: "Js", path: "javascript" }, { id: "6", name: "Flask", path: "flask" } ],
  },
  {
    id: 2,
    title: "Python (Basic) Certification",
    issuer: "HackerRank",
    date: "Issued 2024",
    description: "Certified by HackerRank for demonstrating foundational proficiency in Python programming.",
    subDescription: [
      "Solved problems covering basic Python syntax, data types, and control structures.",
      "Applied loops, functions, and conditional logic to real-world coding challenges.",
      "Demonstrated understanding of list operations, string manipulation, and basic I/O.",
    ],
    href: "https://www.hackerrank.com/certificates/aed05b9930bb",
    image: "/hkp.png",
    tags: [ { id: "1", name: "Python", path: "python" } ],
  },
  {
    id: 3,
    title: "Front-end Developer (React)",
    issuer: "HackerRank",
    date: "Issued 2024",
    description: "Certified in front-end development with React, showcasing skills in UI logic, state, and component-based design.",
    subDescription: [
      "Built interactive user interfaces using functional React components.",
      "Applied state management and props to handle dynamic data flows.",
      "Utilized React hooks like useState and useEffect effectively.",
      "Wrote clean, maintainable JSX with component modularity in mind.",
    ],
    href: "https://www.hackerrank.com/certificates/4d9e4d19d549",
    image: "/hkr.png",
    tags: [ { id:"1", name: "React", path: "react" } ],
  }
];

type Certificate = typeof certificates[0];

const CertificateDetailsModal = ({ cert, closeModal }: { cert: Certificate; closeModal: () => void }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const listVariants = {
    visible: { transition: { staggerChildren: 0.07 } },
    hidden: {},
  };

  // --- THIS IS THE FIX ---
  // Added 'as const' to the transition type to satisfy TypeScript
  const itemVariants = {
    visible: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
    hidden: { opacity: 0, x: -20 },
  };

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ ease: "easeOut", duration: 0.2 }}
        className="relative z-10 w-full max-w-3xl h-auto max-h-[90vh] flex flex-col md:flex-row 
                   rounded-2xl bg-gradient-to-br from-[#101018] to-[#181820] border border-white/10 
                   shadow-2xl shadow-[#a855f7]/10 overflow-hidden"
      >
        <div className="relative w-full md:w-1/3 flex-shrink-0 bg-black overflow-hidden">
          <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent" />
          <div 
              className="absolute bottom-0 left-0 w-full h-1/2"
              style={{
                  background: `url(${cert.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'bottom',
                  transform: 'scaleY(-1)',
                  filter: 'blur(20px) opacity(20%)',
              }}
          />
        </div>

        <div className="relative w-full md:w-2/3 flex flex-col">
            <div className="flex-grow p-8 overflow-y-auto custom-scrollbar-on-modal">
              <h3 className="font-mono text-2xl font-bold text-white" style={{ textShadow: '0 0 10px #a855f7' }}>{cert.title}</h3>
              <p className="mt-1 text-sm font-semibold text-[#a855f7]">{cert.issuer} &bull; {cert.date}</p>
              <p className="mt-4 text-white/80">{cert.description}</p>
              
              <motion.ul initial="hidden" animate="visible" variants={listVariants} className="mt-4 space-y-2">
                {cert.subDescription.map((point, index) => (
                  <motion.li key={index} variants={itemVariants} className="flex items-start gap-3">
                    <FaCheckCircle className="text-[#a855f7] mt-1 flex-shrink-0" />
                    <span className="text-white/70">{point}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-6">
                <h4 className="font-mono text-sm font-semibold text-white mb-3">Technologies Covered:</h4>
                <div className="flex flex-wrap gap-3">
                  {cert.tags.map((tag) => (
                    <motion.div 
                        key={tag.id} 
                        whileHover={{ y: -2, scale: 1.05 }}
                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10"
                    >
                      <img src={`https://cdn.simpleicons.org/${tag.path}/white`} alt={tag.name} className="h-4 w-4" />
                      <span className="text-xs text-white font-medium">{tag.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 pt-6 mt-auto flex-shrink-0 border-t border-white/10">
                <a href={cert.href} target="_blank" rel="noopener noreferrer" 
                   className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold 
                              bg-gradient-to-r from-purple-600/50 to-purple-700/50 
                              border border-purple-500 hover:border-purple-400
                              transition-all duration-300"
                >
                    <span className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-75 blur transition-opacity duration-300" />
                    <span className="relative">Verify Credential</span>
                    <FaArrowRight className="relative transition-transform duration-300 group-hover:translate-x-1" />
                </a>
            </div>
        </div>

        <button onClick={closeModal} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-20">
          <FaTimes size={20} />
        </button>
      </motion.div>
    </div>
  );

  return isMounted ? createPortal(modalContent, document.body) : null;
};

// ... The rest of the component remains exactly the same ...
const CertificateRow = ({ cert, setPreview }: { cert: Certificate; setPreview: (image: string | null) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mouseX = useSpring(0, { stiffness: 400, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 400, damping: 30 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <>
      <motion.div
        onMouseMove={onMouseMove}
        onMouseEnter={() => setPreview(cert.image)}
        onMouseLeave={() => setPreview(null)}
        onClick={() => setIsModalOpen(true)}
        className="group relative w-full p-6 cursor-pointer rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 transition-shadow duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(350px circle at ${mouseX.get()}px ${mouseY.get()}px, #8B5CF620, transparent 80%)` }}
        />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={cert.tags[0]?.path ? `https://cdn.simpleicons.org/${cert.tags[0].path}/white` : '/default-icon.svg'} className="h-8 w-8 text-purple-300 flex-shrink-0" />
            <div>
              <h3 className="font-mono text-lg font-semibold text-white">{cert.title}</h3>
              <p className="text-sm text-white/60">{cert.issuer} &bull; {cert.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Details <FaArrowRight />
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {isModalOpen && <CertificateDetailsModal cert={cert} closeModal={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

const CertificatesSection = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });
  const [preview, setPreview] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    x.set(e.clientX + 10);
    y.set(e.clientY + 10);
  };

  return (
    <section id="certificates" className="py-20 lg:py-28" onMouseMove={handleMouseMove}>
      <div className="container mx-auto">
        <SectionHeader
          title="Credentials & Certifications"
          eyebrow="Verified Skills"
          description="A collection of my certifications from industry-leading institutions."
        />
        <div className="mt-12 flex flex-col gap-6">
          {certificates.map((cert) => (
            <CertificateRow key={cert.id} cert={cert} setPreview={setPreview} />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {preview && (
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed top-0 left-0 z-[200] object-contain h-64 rounded-lg shadow-2xl shadow-black/50 pointer-events-none"
            src={preview}
            style={{ x: springX, y: springY }}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificatesSection;