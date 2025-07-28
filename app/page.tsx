import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { AboutSection } from "@/components/About";
import RecentProjects from "@/components/RecentProjects";
import { navItems } from "@/data/index";
import Projects from "@/components/Projects";
import Approach from "@/components/Approach";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import NowPlayingCard from "@/components/NowPlaying";
import GitHubStatsCard from "@/components/GithubStatusCard";
export default function Home() {
  return (
   <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full bg-black-100 ">
        <FloatingNav navItems={navItems}/>
        <Hero/>
        <AboutSection/>
        <NowPlayingCard/>
        <GitHubStatsCard/>
        <RecentProjects/>
        <Projects/>
        <Approach/>
        <Contact/>
        <Footer/>
      </div>
    </main>
  );
}
