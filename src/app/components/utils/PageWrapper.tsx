"use client";
import { initDB } from "@/app/utils/db";
import { useState, useEffect } from "react";

function DBWrapper({ children }: { children: React.ReactNode }) {
  const [isDBReady, setIsDBReady] = useState(false);
  useEffect(() => {
    initDB().then((result) => {
      setIsDBReady(result);
    });
  }, []);
  if (!isDBReady) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
}
export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DBWrapper>{children}</DBWrapper>;
}
