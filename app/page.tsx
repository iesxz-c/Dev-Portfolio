import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { AboutSection } from "@/components/About";
import RecentProjects from "@/components/RecentProjects";
import { navItems } from "@/data/index";
import Projects from "@/components/Projects";
import Approach from "@/components/Approach";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
//import GitHubStatsCard from "@/components/GithubStatusCard";
import { OrbitingCirclesDemo } from "@/components/O";


export default function Home() {
  return (
   <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full bg-black-100 ">
        <FloatingNav navItems={navItems}/>
        <Hero/>
        <AboutSection/>
   
        <RecentProjects/>
        <Projects/>
        {/* <GitHubStatsCard/> */}

        <Approach/>
        <OrbitingCirclesDemo/>
        <Contact/>
        <Footer/>
      </div>
    </main>
  );
}
