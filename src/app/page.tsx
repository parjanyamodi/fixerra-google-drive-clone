import FileBrowser from "./components/filebrowser/FileBrowser";
import SideBar from "./components/sidebar/SideBar";
import UploadArea from "./components/upload/UploadArea";
import UtilityBar from "./components/utilitybar/UtilityBar";

export default function Home() {
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
