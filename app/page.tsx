"use client"
import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { AboutSection } from "@/components/About";
import { navItems } from "@/data/index";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { OrbitingCirclesDemo } from "@/components/O";
import TechArsenal from "@/components/TechArsenal";
import ProjectsSection from "@/components/ProjectsSection";
import CertificatesSection from "@/components/CertificatesSection";
import { Terminal } from "@/components/Term";
import LoadingScreen from "@/components/Loading";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 6000); // Reduced to 4 seconds
  }, []);

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full bg-black-100">
        {/* FloatingNav should always be visible */}
        <FloatingNav navItems={navItems}/>
        
        {isLoading ? (
          <LoadingScreen/>
        ) : (
          <>
            <Hero/>
            <AboutSection/>
            <TechArsenal/>
            <ProjectsSection/>
            <CertificatesSection/>
            <Terminal/>
            <Contact/>
            <Footer/>
          </>
        )}
      </div>
    </main>
  );
}