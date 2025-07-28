'use client'
import { Card } from "./Card";
import { SectionHeader } from "./SectionHeader";
import Image from "next/image";
import bookImage from "@/assets/images/book-cover.png"
import JsIcon from "@/assets/icons/square-js.svg"
import ReactIcon from "@/assets/icons/react.svg"
import Css from "@/assets/icons/css3.svg"
import Html from "@/assets/icons/html5.svg"
import Github from "@/assets/icons/github.svg"
import Python from "@/assets/icons/python-brands.svg"
import SQL from "@/assets/icons/db.svg"
import Linux from "@/assets/icons/linux-brands.svg"
import { CardHeader } from "./CardHeader";
import { ToolboxItems } from "./ToolboxItems";
import GridGlobe from "./ui/GridGlobe";
import { motion } from "framer-motion";
import { useRef } from "react";
import NowPlayingCard from "@/components/NowPlaying";

const toolboxItems = [
  { title: "JavaScript", iconType: JsIcon },
  { title: "HTML", iconType: Html },
  { title: "CSS", iconType: Css },
  { title: "React", iconType: ReactIcon },
  { title: "Github", iconType: Github },
  { title: "Python", iconType: Python },
  { title: "SQL", iconType: SQL },
  { title: "Linux", iconType: Linux },
];

const hobbies = [
  { title: "Traveling", emoji: "🌍", left: '5%', top: '5%' },
  { title: "Comics", emoji: "🦸‍♂️", left: '50%', top: '5%' },
  { title: "Music", emoji: "🎷", left: '10%', top: '35%' },
  { title: "Movies", emoji: "🎬", left: '35%', top: '40%' },
  { title: "Cricket", emoji: "🏏", left: '70%', top: '45%' },
  { title: "Reading", emoji: "📚", left: '5%', top: '65%' },
  { title: "Coffee", emoji: "☕", left: '25%', top: '15%' },
  { title: "Tennis", emoji: "🎾", left: '60%', top: '20%' },
  { title: "eFootball", emoji: "⚽", left: '15%', top: '50%' },
  { title: "Minecraft", emoji: "🧱", left: '55%', top: '55%' },
  { title: "Manga", emoji: "📖", left: '30%', top: '25%' },
  { title: "Anime", emoji: "🍜", left: '65%', top: '85%' },
];
const hobbie = [
  { title: "Traveling", emoji: "", left: '5%', top: '5%' },
  { title: "Comics", emoji: "", left: '50%', top: '5%' },
  { title: "Music", emoji: "", left: '10%', top: '35%' },
  { title: "Movies", emoji: "", left: '35%', top: '40%' },
  { title: "Cricket", emoji: "", left: '70%', top: '45%' },
  { title: "Reading", emoji: "", left: '5%', top: '65%' },
  { title: "Cooking", emoji: "", left: '45%', top: '70%' },
  { title: "Anime", emoji: "", left: '45%', top: '70%' },
];
export const AboutSection = () => {
  const constraintRef = useRef(null);

  return (
    <div id="about" className="py-16 lg:py-28">
      <div className="container">
        <SectionHeader
          title="A Glimpse Into My World"
          eyebrow="About me"
          description="Learn more about who I am and what inspires me."
        />

        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-8 lg:grid-cols-3">
            <Card className="h-[320px] md:col-span-2 lg:col-span-1">
              <CardHeader
                title="My Reads"
                description="Explore the books shaping my perspectives."
              />
              <div className="w-40 mx-auto mt-2">
                <Image src={bookImage} alt="book" />
              </div>
            </Card>

            <Card className="h-[320px] md:col-span-3 lg:col-span-2">
              <CardHeader
                title="My Toolbox"
                description="Explore the technologies and tools I use to craft."
                className="px-6 pt-6"
              />
              <ToolboxItems
                toolboxItems={toolboxItems}
                className=""
                itemsWrapperClassName="animate-move-left [animation-duration:30s]"
              />
              <ToolboxItems
                toolboxItems={toolboxItems}
                className="mt-4"
                itemsWrapperClassName="animate-move-right [animation-duration:15s]"
              />
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
              <CardHeader
                title="Beyond the Code"
                description="Explore my passions and interests beyond the code."
                className="px-6 py-6"
              />

              {/* Mobile */}
              <div className="sm:hidden px-6 pb-6 grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                {hobbie.map((hobby) => (
                  <div
                    key={hobby.title}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group shadow-inner shadow-purple-500/10 hover:shadow-purple-500/30"
                  >
                    <span className="text-xl animate-bounce group-hover:animate-none">{hobby.emoji}</span>
                    <span className="text-gray-100 font-medium group-hover:text-white transition-colors duration-200">
                      {hobby.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Desktop */}
              <div className="relative flex-1 hidden sm:block" ref={constraintRef}>
                {hobbies.map((hobby) => (
                  <motion.div
                    key={hobby.title}
                    className="absolute px-6 py-2 rounded-full bg-white/10 text-white border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)] backdrop-blur-xl"
                    style={{ left: hobby.left, top: hobby.top }}
                    drag
                    dragConstraints={constraintRef}
                    whileHover={{
                      scale: 1.15,
                      rotate: 2,
                      boxShadow: "0 0 25px rgba(255, 255, 255, 0.3)",
                    }}
                    whileTap={{ scale: 0.95, rotate: -2 }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 18,
                    }}
                  >
                    <div className="flex items-center gap-3 text-sm font-semibold tracking-wide">
                      <span className="text-xl">{hobby.emoji}</span>
                      <span className="text-white">{hobby.title}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card className="h-[320px] p-0 md:col-span-2 lg:col-span-1">
              <CardHeader
                title="Time-Agnostic"
                description="Flexible across regions and time zones."
                className="px-6 py-6"
              />
              <GridGlobe />
            </Card>
          </div>

          {/* Now Playing Bento Card */}
          <div className="grid grid-cols-1">
  <Card className="h-[320px] p-0 backdrop-blur-xl border border-white/10">

    {/* Desktop & tablet header (md and up) */}
    {typeof window === "undefined" ? null : (
      <div className="hidden md:block">
        <CardHeader
          title="Spotify"
          description="Vibes from my recent playlist."
          className="px-6 py-6"
        />
      </div>
    )}

    {/*  */}
    {/* 
    <div className="md:hidden px-6 pt-4">
      <h4 className="text-white font-semibold text-base">Now Playing 🎧</h4>
    </div>
    */}

    <div className="p-6">
      <NowPlayingCard />
    </div>
    
  </Card>
</div>

        </div>
      </div>
    </div>
  );
};