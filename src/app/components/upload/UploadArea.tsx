"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, FolderUp } from "lucide-react";
import MakeNewFolder from "./MakeNewFolder";
import UploadFiles from "./UploadFiles";
export default function UploadArea() {
  return (
    <div className="flex flex-row pt-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex flex-row rounded-2xl px-5 py-5 drop-shadow-md bg-white hover:bg-slate-300 gap-4 transition-all animate-in">
            <Plus />
            New
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 rounded-2xl"
          sideOffset={20}
          side="left"
        >
          <MakeNewFolder />
          <DropdownMenuSeparator />

          <UploadFiles />

          <DropdownMenuItem className="flex flex-row gap-4 rounded-md" asChild>
            <button
              className="w-full"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <FolderUp size={"20"} />
              Upload Folder
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
