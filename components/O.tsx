"use client";
import { OrbitingCircles } from "./orbiting-circles";

import ReIcon from "@/assets/re.svg";
import GitIcon from "@/assets/git.svg";
import PythonIcon from "@/assets/pio.svg";
import NextIcon from "@/assets/next.svg";

export function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      <OrbitingCircles iconSize={40}>
   <Icons.react />
  <Icons.gitHub />
  <Icons.python />
  <Icons.next />
</OrbitingCircles>
<OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
   <Icons.react />
  <Icons.gitHub />
  <Icons.python />
  <Icons.next />
</OrbitingCircles>
    </div>
  );
}

const Icons = {
  react: () => <ReIcon className="w-10 h-10" />,
  gitHub: () => <GitIcon className="w-10 h-10" />,
  python: () => <PythonIcon className="w-10 h-10" />,
  next: () => <NextIcon className="w-10 h-10" />,
};
