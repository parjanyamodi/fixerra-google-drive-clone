"use client";
import { useEffect } from "react";
import FileBrowser from "../../components/filebrowser/FileBrowser";
import SideBar from "../../components/sidebar/SideBar";
import UploadArea from "../../components/upload/UploadArea";
import UtilityBar from "../../components/utilitybar/UtilityBar";
import { setActiveDirectory } from "@/app/redux/slices/currentPositionSlice";
import { useDispatch } from "react-redux";

export default function Content({ filePath }: { filePath: string[] }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setActiveDirectory(
        filePath?.map((path) => decodeURIComponent(path)) || []
      )
    );
  }, [filePath?.join("/")]);
  return (
    <main className="flex min-h-screen flex-col px-4 py-2 bg-slate-100 overflow-hidden">
      <UtilityBar />
      <div className="flex flex-row py-2 gap-2">
        <div className="flex flex-col items-start w-72 gap-4">
          <UploadArea />
          <SideBar />
        </div>
        <FileBrowser />
      </div>
    </main>
  );
}
