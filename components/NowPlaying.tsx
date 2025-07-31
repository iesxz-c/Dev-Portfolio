"use client";
import { CardHeader } from "./CardHeader";
import { Card } from "./Card";
import { motion } from "framer-motion";

import { useEffect, useState, useRef } from "react";
import { SectionHeader } from "./SectionHeader";

import { Text } from "@/components/retroui/Text";
import Image from "next/image";
import clsx from "clsx";
export const revalidate = 86400; 

interface NowPlaying {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  progressMs?: number;
  durationMs?: number;
  device?: string;
  playedAt?: string;
}

function msToTime(ms: number) {
  const min = Math.floor(ms / 60000);
  const sec = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  return `${min}:${sec}`;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleString();
}

export default function NowPlayingCard() {
  const [track, setTrack] = useState<NowPlaying | null>(null);
  const [progressMs, setProgressMs] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Complete default track with all required fields
  const defaultTrack: NowPlaying = {
    isPlaying: false,
    title: "Seek & Destroy",
    artist: "Metallica",
    album: "Kill 'Em All",
    albumImageUrl: "/k.jpg",
    songUrl: "https://open.spotify.com/track/28WmNsclKsrVmdv3tDmoYU?si=071fc92f85364402",
    progressMs: 0,
    durationMs: 415000, // ~6:55 duration for the song
    device: "Default Device",
    playedAt: new Date().toISOString(),
  };

  useEffect(() => {
    const fetchTrack = () => {
    fetch("/api/now-playing")
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.error) {
          const stored = localStorage.getItem("lastPlayedTrack");
          if (stored) {
            const lastTrack: NowPlaying = JSON.parse(stored);
            setTrack({ ...lastTrack, isPlaying: false });
            setProgressMs(0);
          } else {
            setTrack(defaultTrack);
            setProgressMs(0);
          }
        } else {
          // Merge with defaults to ensure all fields are present
          const trackData = {
            ...defaultTrack,
            ...data,
            albumImageUrl: data.albumImageUrl || defaultTrack.albumImageUrl,
            songUrl: data.songUrl || defaultTrack.songUrl,
          };
          setTrack(trackData);
          setProgressMs(data.progressMs ?? 0);
          localStorage.setItem("lastPlayedTrack", JSON.stringify(trackData));
        }
      })
      .catch(() => {
        const stored = localStorage.getItem("lastPlayedTrack");
        if (stored) {
          const lastTrack: NowPlaying = JSON.parse(stored);
          setTrack({ ...lastTrack, isPlaying: false });
          setProgressMs(0);
        } else {
          setTrack(defaultTrack);
          setProgressMs(0);
        }
      });};
    
    fetchTrack();
     // every 30 seconds

    
  }, []);

  useEffect(() => {
    if (
      track?.isPlaying &&
      track.progressMs !== undefined &&
      track.durationMs !== undefined
    ) {
      setProgressMs(track.progressMs);
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setProgressMs((prev) => {
          if (!track.durationMs) return prev;
          if (prev + 1000 >= track.durationMs) {
            clearInterval(intervalRef.current!);
            return track.durationMs;
          }
          return prev + 1000;
        });
      }, 1000);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [track?.isPlaying, track?.progressMs, track?.durationMs]);

  const progress =
    track?.isPlaying && track.durationMs
      ? Math.min(Math.round((progressMs / track.durationMs) * 100), 100)
      : 0;
   if (!track || !track.isPlaying) return <></>;
  return (
    <>
     <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="grid grid-cols-1"
          >
            <Card className="h-[320px] p-0 backdrop-blur-xl border border-white/10">
              {typeof window === "undefined" ? null : (
                <div className="hidden md:block">
                  <CardHeader
                    title="Spotify"
                    description="Vibes from my recent playlist."
                    className="px-6 py-6"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-4 p-2">
      {/* Album Art */}
      <div className="relative  w-28 h-28 md:w-32 md:h-32 flex-shrink-0 rounded-full overflow-hidden border border-white/30 bg-white/10">
        <div
          className={clsx(
            "w-full h-full rounded-full p-2 flex items-center justify-center",
            track && "animate-spin-slow" 
          )}
        >
          {track?.albumImageUrl ? (
            <Image
              src={track.albumImageUrl}
              alt={track.title || "Album cover"}
              width={96}
              height={96}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-2xl">
              ♪
            </div>
          )}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-black z-10" />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-1 text-center md:text-left">
        <Text
          as="h4"
          className="font-bold text-white text-lg md:text-xl truncate"
        >
          {track?.title ? (
            <a
              href={track.songUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {track.title}
            </a>
          ) : (
            <> 
            Wake Me up When September Ends <span className="text-gray-400 font-light">(Last Played)</span>
    </>
          )}
        </Text>
        <Text className="text-white/90 text-sm truncate">
          {track?.artist || "Green Day"}
        </Text>
        {track?.album && (
          <Text className="text-white/70 text-xs truncate">
            Album: {track.album}
          </Text>
        )}
        {track?.device && (
          <Text className="text-white/70 text-xs truncate">
            Device: {track.device}
          </Text>
        )}
        {!track?.isPlaying && track?.playedAt && (
          <Text className="text-white/50 text-xs truncate mt-1">
            Last played: {formatDate(track.playedAt)}
          </Text>
        )}

        {/* Progress Bar */}
        <div className="mt-2">
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-pink-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          {track?.isPlaying && track.durationMs !== undefined && (
            <div className="flex justify-between text-xs text-white/80 mt-1 font-mono">
              <span>{msToTime(progressMs)}</span>
              <span>{msToTime(track.durationMs)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="hidden md:flex flex-shrink-0 mt-4 md:mt-0 w-full md:w-auto justify-center">
        <span className="inline-block bg-pink-600 text-black font-bold border border-black px-4 py-1 rounded shadow">
          {track?.isPlaying ? "LIVE" : "OFF"}
        </span>
      </div>
      </div>
              </div>
            </Card>
          </motion.div>
    </>
  );
}