"use client";
import { getFiles } from "@/app/utils/db";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { File } from "@/app/utils/db";
import {
  AlignJustify,
  Delete,
  Download,
  File as FileIcon,
  GripHorizontal,
  Image,
  MoreVertical,
  PenLine,
  Star,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
function FileMenu({
  file,
  viewType,
}: {
  file: File;
  viewType: "list" | "grid";
}) {
  return (
    <div className="flex flex-row gap-1 group justify-end items-center">
      {viewType === "list" && (
        <div className="flex flex-row gap-0.5 justify-end items-center">
          <button className="aspect-square p-2 hover:bg-gray-300 rounded-full h-fit w-fit invisible group-hover:visible">
            <Download size={"16"} />
          </button>
          <button className="aspect-square p-2 hover:bg-gray-300 rounded-full h-fit w-fit invisible group-hover:visible">
            <PenLine size={"16"} />
          </button>

          <button className="aspect-square p-2 hover:bg-gray-300 rounded-full h-fit w-fit invisible group-hover:visible">
            <Star size={"16"} />
          </button>
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="aspect-square p-1 hover:bg-gray-300 rounded-full h-fit w-fit">
            <MoreVertical size={"18"} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side={viewType === "list" ? "right" : "bottom"}
          sideOffset={10}
        >
          <DropdownMenuItem>Download</DropdownMenuItem>
          <DropdownMenuItem>Rename</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>File Information</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
const fileTypeIconMapping = [
  {
    type: ["image/png", "image/jpeg", "image/jpg"],
    icon: <Image size={"18"} />,
  },
  {
    type: ["application/pdf"],
    icon: <FileIcon size={"18"} />,
  },
];
function FileCard({ file }: { file: File }) {
  return (
    <div className="flex-1 shrink-0 w-fit max-w-[250px] border-none shadow-none bg-slate-100 hover:bg-slate-200 rounded-xl">
      <div className="flex flex-row justify-between items-center py-2 px-4">
        <div className="flex flex-row gap-3 items-center">
          {fileTypeIconMapping.find((mapping) =>
            mapping.type.includes(file.type)
          )?.icon || <FileIcon size={"18"} />}
          <p className="text-sm font-normal line-clamp-1">{file.name}</p>
        </div>
        <FileMenu file={file} viewType="grid" />
      </div>
    </div>
  );
}
function CardView({ files }: { files: File[] }) {
  return (
    <div className="flex flex-wrap flex-row p-4 gap-2">
      {files.map((file) => (
        <FileCard file={file} key={file.uuid} />
      ))}
    </div>
  );
}
function ListView({ files }: { files: File[] }) {
  return (
    <div className="flex flex-col w-full px-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70%]">Name</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead>File Size</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.uuid}>
              <TableCell className="py-0">
                <div className="flex flex-row gap-4 items-center">
                  {fileTypeIconMapping.find((mapping) =>
                    mapping.type.includes(file.type)
                  )?.icon || <FileIcon size={"18"} />}
                  <p className="text-sm font-normal line-clamp-1">
                    {file.name}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <p className="text-sm font-normal">{file.lastModified}</p>
              </TableCell>
              <TableCell>
                <p className="text-sm font-normal">{file.size}</p>
              </TableCell>
              <TableCell className="justify-end p-0">
                <FileMenu file={file} viewType="list" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default function FileBrowser() {
  const [files, setFiles] = useState<File[]>([]);
  useEffect(() => {
    (async () => {
      setFiles(await getFiles());
    })();
  }, []);
  const [selectedView, setSelectedView] = useState<"list" | "grid">("list");
  return (
    <ScrollArea className="flex flex-col w-full h-content rounded-2xl bg-white">
      <div className="flex flex-row items-center justify-between p-4">
        <div className="flex flex-row gap-4">
          <p>Current Folder</p>
        </div>
        <div className="flex flex-row ">
          <button
            className={` px-3 py-1 rounded-l-full border border-r-0 border-black transition-all  ${
              selectedView === "list" ? "bg-blue-200" : "bg-slate-50"
            } `}
            onClick={() => setSelectedView("list")}
          >
            <AlignJustify size={"18"} />
          </button>
          <button
            className={` px-3 py-1 rounded-r-full border border-black transition-all  ${
              selectedView === "grid" ? "bg-blue-200" : "bg-slate-50"
            } `}
            onClick={() => setSelectedView("grid")}
          >
            <GripHorizontal size={"18"} />
          </button>
        </div>
      </div>

      {selectedView === "list" && <ListView files={files} />}
      {selectedView === "grid" && <CardView files={files} />}
    </ScrollArea>
  );
}
