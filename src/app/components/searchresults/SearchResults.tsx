"use client";
import { getFile, getFiles } from "@/app/utils/db";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Fragment, useEffect, useState } from "react";

import {
  AlignJustify,
  ArrowDown,
  ArrowDown01,
  ArrowDownAZ,
  ArrowRight,
  ArrowUp,
  ArrowUp10,
  ArrowUpAZ,
  ChevronDown,
  ChevronRight,
  ChevronRightCircle,
  Delete,
  Download,
  File as FileIcon,
  Folder,
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

import { downloadUint8ArrayAsFile, fileDetails } from "@/app/utils/file";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import { convertEpochToIST, convertFileSize } from "@/app/utils/conversions";
import { setSearchedAndSorted } from "@/app/redux/slices/searchedAndSortedSlice";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
function FileMenu({
  file,
  viewType,
}: {
  file: FileDetails;
  viewType: "list" | "grid";
}) {
  return (
    <div className="flex flex-row gap-1 group justify-end items-center">
      {viewType === "list" && (
        <div className="flex flex-row gap-0.5 justify-end items-center">
          <button
            className="aspect-square p-2 hover:bg-gray-300 rounded-full h-fit w-fit invisible group-hover:visible"
            onClick={() => {
              getFile(file.uuid).then((fileData) => {
                downloadUint8ArrayAsFile(fileData.data, file.name, file.type);
              });
            }}
          >
            <Download size={"16"} />
          </button>
          <button className="aspect-square p-2 hover:bg-gray-300 rounded-full h-fit w-fit invisible group-hover:visible">
            <PenLine size={"16"} />
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
          <DropdownMenuItem asChild>
            <button
              className="w-full"
              onClick={() => {
                getFile(file.uuid).then((fileData) => {
                  downloadUint8ArrayAsFile(fileData.data, file.name, file.type);
                });
              }}
            >
              Download
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>Rename</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">File Information</Button>
              </HoverCardTrigger>
              <HoverCardContent
                className="min-w-[500px] w-fit"
                side="left"
                sideOffset={10}
              >
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{file.name}</h4>
                    <div className="flex text-sm gap-2">
                      <Badge variant="default">
                        {convertFileSize(file.size)}
                      </Badge>
                      {file.type && (
                        <Badge variant="secondary">{file.type}</Badge>
                      )}
                    </div>
                    <div className="flex flex-col items-start justify-between pt-2">
                      <span className="text-xs text-muted-foreground">
                        Uploaded At :- {convertEpochToIST(file.uploadedAt)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Last Modified At :-{" "}
                        {convertEpochToIST(file.lastModified)}
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
const fileTypeIconMapping = [
  {
    type: ["image/png", "image/jpeg", "image/jpg"],
    icon: <Image size={"18"} className="shrink-0" />,
  },
  {
    type: ["application/pdf"],
    icon: <FileIcon size={"18"} className="shrink-0" />,
  },
];
function FileCard({ file }: { file: FileDetails }) {
  return (
    <div className="flex-1 shrink-0 w-fit max-w-[300px] border-none shadow-none bg-slate-100 hover:bg-slate-200 rounded-xl">
      <div className="flex flex-row justify-between items-center py-2 px-4 w-[95%]">
        <div className="flex flex-row gap-2 items-center w-full">
          {fileTypeIconMapping.find((mapping) =>
            mapping.type.includes(file.type)
          )?.icon || <FileIcon size={"18"} className="shrink-0" />}
          <p className="text-sm font-normal line-clamp-1 whitespace-break-spaces">
            {file.name}
          </p>
        </div>
        <FileMenu file={file} viewType="grid" />
      </div>
    </div>
  );
}

function CardView({ fileTree }: { fileTree: FileTree }) {
  return (
    <div className="flex flex-col p-4 gap-2 w-full">
      {fileTree && (fileTree["files"] as FileDetails[])?.length > 0 && (
        <div className="flex flex-wrap flex-row gap-2">
          {(fileTree["files"] as FileDetails[]).map(
            (fileDetails: FileDetails) => (
              <FileCard file={fileDetails} key={fileDetails.uuid} />
            )
          )}
        </div>
      )}
      {!fileTree ||
        ((fileTree["files"] as FileDetails[])?.length === 0 &&
          Object.keys(fileTree)?.filter((keyName) => keyName !== "files")
            ?.length === 0 && (
            <p className="flex flex-row w-full justify-center text-center">
              No files in the folder
            </p>
          ))}
    </div>
  );
}
function ListView({ fileTree }: { fileTree: FileTree }) {
  const dispatch = useDispatch();
  const searchedAndSorted = useAppSelector((state) => state.searchedAndSorted);
  const [nameAsc, setNameAsc] = useState(true);
  const [lastModifiedAsc, setLastModifiedAsc] = useState(true);
  const [fileSizeAsc, setFileSizeAsc] = useState(true);
  return (
    <div className="flex flex-col w-full px-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70%]">
              <button
                className="my-1 whitespace-nowrap flex flex-row items-center text-start gap-1 hover:bg-gray-200 rounded-lg px-2 py-1"
                onClick={() => {
                  dispatch(
                    setSearchedAndSorted(
                      searchedAndSorted.files?.toSorted(
                        (a: FileDetails, b: FileDetails) =>
                          nameAsc
                            ? b.name.toLowerCase() < a.name.toLowerCase()
                              ? -1
                              : 1
                            : b.name.toLowerCase() < a.name.toLowerCase()
                            ? 1
                            : -1
                      )
                    )
                  );
                  setNameAsc(!nameAsc);
                }}
              >
                <span>Name</span>

                {nameAsc ? (
                  <ArrowUp size={"16"} className="shrink-0" />
                ) : (
                  <ArrowDown size={"16"} className="shrink-0" />
                )}
              </button>
            </TableHead>
            <TableHead>
              <button
                className="my-1 whitespace-nowrap flex flex-row items-center text-start gap-1 hover:bg-gray-200 rounded-lg px-2 py-1"
                onClick={() => {
                  dispatch(
                    setSearchedAndSorted(
                      searchedAndSorted.files?.toSorted(
                        (a: FileDetails, b: FileDetails) =>
                          lastModifiedAsc
                            ? b.lastModified - a.lastModified
                            : a.lastModified - b.lastModified
                      )
                    )
                  );
                  setLastModifiedAsc(!lastModifiedAsc);
                }}
              >
                <span>Last Modified</span>

                {lastModifiedAsc ? (
                  <ArrowUp size={"16"} className="shrink-0" />
                ) : (
                  <ArrowDown size={"16"} className="shrink-0" />
                )}
              </button>
            </TableHead>
            <TableHead>
              <button
                className="my-1 whitespace-nowrap flex flex-row items-center text-start gap-1 hover:bg-gray-200 rounded-lg px-2 py-1"
                onClick={() => {
                  dispatch(
                    setSearchedAndSorted(
                      searchedAndSorted.files?.toSorted(
                        (a: FileDetails, b: FileDetails) =>
                          fileSizeAsc
                            ? b.size - a.size
                            : a.size - b.lastModified
                      )
                    )
                  );
                  setFileSizeAsc(!fileSizeAsc);
                }}
              >
                <span>File Size</span>

                {fileSizeAsc ? (
                  <ArrowUp size={"16"} className="shrink-0" />
                ) : (
                  <ArrowDown size={"16"} className="shrink-0" />
                )}
              </button>
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fileTree &&
            (fileTree["files"] as FileDetails[])?.map(
              (fileDetails: FileDetails) => (
                <TableRow key={fileDetails.uuid}>
                  <TableCell className="py-0">
                    <div className="flex flex-row gap-4 items-center">
                      {fileTypeIconMapping.find((mapping) =>
                        mapping.type.includes(fileDetails.type)
                      )?.icon || <FileIcon size={"18"} />}
                      <p className="text-sm font-normal line-clamp-1">
                        {fileDetails.name}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-normal">
                      {convertEpochToIST(fileDetails.lastModified)}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-normal">
                      {convertFileSize(fileDetails.size)}
                    </p>
                  </TableCell>
                  <TableCell className="justify-end p-0">
                    <FileMenu file={fileDetails} viewType="list" />
                  </TableCell>
                </TableRow>
              )
            )}
        </TableBody>
      </Table>
    </div>
  );
}
export default function FileLister() {
  const rawFileTree = useAppSelector((state) => state.rawFileTree);
  const [selectedView, setSelectedView] = useState<"list" | "grid">("list");
  const searchedAndSorted = useAppSelector((state) => state.searchedAndSorted);
  const dispatch = useDispatch();
  return (
    <ScrollArea className="flex flex-col w-full h-content rounded-2xl bg-white overflow-auto ">
      <div className="flex flex-row items-center justify-between p-4">
        <div className="flex flex-row gap-4">
          <div className="flex flex-row items-center">
            <div className="flex flex-row gap-2 items-center"></div>
          </div>
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

      {selectedView === "list" && <ListView fileTree={searchedAndSorted} />}
      {selectedView === "grid" && <CardView fileTree={searchedAndSorted} />}
    </ScrollArea>
  );
}
