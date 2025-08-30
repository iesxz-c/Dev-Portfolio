// components/LiveGithubCard.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { CardHeader } from "./CardHeader";

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  total_stars: number;
  // Add other stats you want here
}

interface CachedData {
  stats: GitHubStats;
  timestamp: number;
  username: string;
}

const CACHE_DURATION = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

const LiveGithubCard = ({ username }: { username: string }) => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCacheKey = (username: string) => `github-stats-${username}`;

  const getCachedData = (username: string): CachedData | null => {
    try {
      const cached = localStorage.getItem(getCacheKey(username));
      if (!cached) return null;
      
      const parsedData: CachedData = JSON.parse(cached);
      const now = Date.now();
      
      // Check if cache is still valid and for the same username
      if (now - parsedData.timestamp < CACHE_DURATION && parsedData.username === username) {
        return parsedData;
      }
      
      // Cache expired or different username, remove it
      localStorage.removeItem(getCacheKey(username));
      return null;
    } catch (error) {
      console.error("Failed to read from localStorage:", error);
      return null;
    }
  };

  const setCachedData = (username: string, stats: GitHubStats) => {
    try {
      const cacheData: CachedData = {
        stats,
        timestamp: Date.now(),
        username
      };
      localStorage.setItem(getCacheKey(username), JSON.stringify(cacheData));
    } catch (error) {
      console.error("Failed to write to localStorage:", error);
    }
  };

  const fetchGitHubStats = async (username: string) => {
    try {
      const res = await fetch(`/api/github-stats?username=${username}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }
      const data = await res.json();
      
      // Cache the new data
      setCachedData(username, data);
      
      return data;
    } catch (error) {
      console.error("Failed to fetch GitHub stats:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadGitHubStats = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // First, try to get cached data
        const cachedData = getCachedData(username);
        
        if (cachedData) {
          console.log(`Using cached GitHub stats for ${username}`);
          setStats(cachedData.stats);
          setIsLoading(false);
        } else {
          console.log(`Fetching fresh GitHub stats for ${username}`);
          const freshData = await fetchGitHubStats(username);
          setStats(freshData);
          setIsLoading(false);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
        setIsLoading(false);
      }
    };

    loadGitHubStats();
  }, [username]);

  // Helper function to get cache age info for debugging/display
  const getCacheInfo = () => {
    const cachedData = getCachedData(username);
    if (!cachedData) return null;
    
    const ageInDays = (Date.now() - cachedData.timestamp) / (24 * 60 * 60 * 1000);
    const remainingDays = Math.max(0, 3 - ageInDays);
    
    return {
      ageInDays: Math.floor(ageInDays * 10) / 10,
      remainingDays: Math.ceil(remainingDays * 10) / 10,
      isExpired: remainingDays <= 0
    };
  };

  const contributionGraphUrl = `https://ghchart.rshah.org/a855f7/${username}`;
  const cacheInfo = getCacheInfo();

  return (
    <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
      <Card className="flex h-full min-h-[320px] w-full flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/20">
        <CardHeader
          title="Live from GitHub"
          description={`@${username}${cacheInfo ? ` • Cache: ${cacheInfo.remainingDays}d left` : ''}`}
        />
        <div className="flex-grow p-6 pt-0 text-white/80">
          {isLoading ? (
            <div className="flex h-full items-center justify-center font-mono text-sm">
              Loading GitHub stats...
            </div>
          ) : error ? (
            <div className="flex h-full items-center justify-center font-mono text-sm text-red-400">
              Error: {error}
            </div>
          ) : (
            <div className="flex h-full flex-col justify-between">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="font-serif text-3xl font-bold text-purple">{stats?.public_repos || 0}</p>
                  <p className="font-mono text-xs">Repos</p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-3xl font-bold text-purple">{stats?.followers || 0}</p>
                  <p className="font-mono text-xs">Followers</p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-3xl font-bold text-purple">{stats?.following || 0}</p>
                  <p className="font-mono text-xs">Following</p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-3xl font-bold text-purple">{stats?.total_stars || 0}</p>
                  <p className="font-mono text-xs">Stars</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="mb-2 font-mono text-xs text-center">Contribution Graph (Last One Year)</p>
                <img
                  src={contributionGraphUrl}
                  alt="GitHub Contribution Graph"
                  className="w-full rounded-md opacity-80"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </Card>
    </a>
  );
};

export default LiveGithubCard;