"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, FolderPlus, FileUp, FolderUp } from "lucide-react";
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
          <DropdownMenuItem
            className="flex flex-row gap-4 rounded-md"
            onClick={() => {
              alert();
            }}
          >
            <FolderPlus size={"20"} />
            New Folder
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex flex-row gap-4 rounded-md">
            <FileUp size={"20"} />
            Upload File
          </DropdownMenuItem>
          <DropdownMenuItem className="flex flex-row gap-4 rounded-md">
            <FolderUp size={"20"} />
            Upload Folder
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
