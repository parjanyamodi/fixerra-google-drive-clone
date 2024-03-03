"use client";
import { ReduxProvider } from "@/app/redux/provider";
import { setRawFileTree } from "@/app/redux/slices/rawFileTree";
import { useAppSelector } from "@/app/redux/store";
import { initDB } from "@/app/utils/db";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

function DBWrapper({ children }: { children: React.ReactNode }) {
  const [isDBReady, setIsDBReady] = useState(false);
  const dispatch = useDispatch();
  const rawFileTree = useAppSelector((state) => state.rawFileTree);
  useEffect(() => {
    if (
      !window.localStorage.getItem("rawFileTree") &&
      Object.keys(rawFileTree).length === 0
    ) {
      window.localStorage.setItem("rawFileTree", "{}");
    } else {
      if (
        Object.keys(rawFileTree).length === 0 &&
        Object.keys(
          JSON.parse(window.localStorage.getItem("rawFileTree") as string)
        ).length > 0
      ) {
        dispatch(
          setRawFileTree(
            JSON.parse(window.localStorage.getItem("rawFileTree") as string)
          )
        );
      } else {
        window.localStorage.setItem("rawFileTree", JSON.stringify(rawFileTree));
      }
    }
  }, [rawFileTree]);
  useEffect(() => {
    if (window.localStorage.getItem("rawFileTree")) {
      dispatch(
        setRawFileTree(
          JSON.parse(window.localStorage.getItem("rawFileTree") as string)
        )
      );
    }
  }, []);
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
  return (
    <ReduxProvider>
      <DBWrapper>{children}</DBWrapper>
    </ReduxProvider>
  );
}
