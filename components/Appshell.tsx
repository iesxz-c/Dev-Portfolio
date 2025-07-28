"use client";

import { useState, useEffect } from "react";
import Onekoo from "./Onekoo";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      {!hasMounted ? null : (
        <>
          <div >
            <Onekoo/>
            {children}
          </div>
        </>
      )}
    </>
  );
}
