"use client"
import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { AboutSection } from "@/components/About";
import { navItems } from "@/data/index";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import TechArsenal from "@/components/TechArsenal";
import ProjectsSection from "@/components/ProjectsSection";
import CertificatesSection from "@/components/CertificatesSection";
import { Terminal } from "@/components/Term";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full bg-black-100">
        {/* FloatingNav should always be visible */}
        <FloatingNav navItems={navItems} />

        <Hero />
        <AboutSection />
        <TechArsenal />
        <ProjectsSection />
        <CertificatesSection />
        <Terminal />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
