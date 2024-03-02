import Image from "next/image";
import Logo from "@/app/assets/google-drive-logo.jpeg";
import { Search, SlidersHorizontal } from "lucide-react";
import Settings from "./settings/Settings";
export default function UtilityBar() {
  return (
    <div className="flex flex-row items-center w-full h-[60px] gap-4">
      <div className="flex flex-row items-center gap-1 w-72">
        <Image
          src={Logo}
          alt="Logo"
          width={60}
          height={60}
          className="mix-blend-darken"
        />
        <p className="text-xl text-gray-600 font-medium ">Drive</p>
      </div>
      <div className="flex flex-row w-full">
        <div className="flex flex-row gap-0 px-2 bg-slate-200 rounded-full items-center justify-between w-full">
          <button className="aspect-square p-2 hover:bg-gray-300 rounded-full h-fit w-fit">
            <Search className="p-0.5" />
          </button>
          <input
            className="flex flex-row  py-4 px-4 bg-transparent border-none outline-none placeholder:text-current text-sm w-full "
            placeholder="Search in Drive"
          />
          <button className="aspect-square p-2 hover:bg-gray-300 rounded-full h-fit w-fit">
            <SlidersHorizontal className="p-0.5" />
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <Settings />
      </div>
    </div>
  );
}
