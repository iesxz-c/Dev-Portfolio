"use client";
import { OrbitingCircles } from "./orbiting-circles";
import { Particles } from "./Particles";
import ReIcon from "@/assets/re.svg";
import GitIcon from "@/assets/git.svg";
import PythonIcon from "@/assets/pio.svg";
import NextIcon from "@/assets/next.svg";

export function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      {/* Falling particles background */}
       <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />

      {/* Center Text */}
      <div className="absolute z-10 text-white text-xl font-bold animate-pulse pointer-events-none">
        Stack
      </div>

      {/* Orbits */}
      <OrbitingCircles iconSize={40}>
        {Icons.react()}
        {Icons.gitHub()}
        {Icons.python()}
        {Icons.next()}
      </OrbitingCircles>

      <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
        {Icons.react()}
        {Icons.gitHub()}
        {Icons.python()}
        {Icons.next()}
      </OrbitingCircles>
    </div>
  );
}

const Icons = {
  react: () => <ReIcon className="w-10 h-10 hover:scale-110 transition-transform duration-300" />,
  gitHub: () => <GitIcon className="w-10 h-10 hover:scale-110 transition-transform duration-300" />,
  python: () => <PythonIcon className="w-10 h-10 hover:scale-110 transition-transform duration-300" />,
  next: () => <NextIcon className="w-10 h-10 hover:scale-110 transition-transform duration-300" />,
};
