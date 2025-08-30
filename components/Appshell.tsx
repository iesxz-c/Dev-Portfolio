"use client";

import { useState, useEffect } from "react";
import Onekoo from "./Onekoo";
import LoadingScreen from "./Loading";
export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000); 

    return () => clearTimeout(timer);
  }, []);
    if (!hasMounted) return null;


   return (
    <>
      {isLoading ? (
        <LoadingScreen /> // <-- show loader only
      ) : (
        <div>
          <Onekoo />      {/* <-- only render AFTER loading */}
          {children}
        </div>
      )}
    </>
  );
}
