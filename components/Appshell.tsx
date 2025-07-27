"use client";

import { useState, useEffect } from "react";
import Onekoo from "./Onekoo";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    // You can add a loading timeout here if needed
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
