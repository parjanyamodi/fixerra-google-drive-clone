"use client";
import { getFile, getFiles } from "@/app/utils/db";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Fragment, useEffect, useState } from "react";

import {
  AlignJustify,
  ArrowDown01,
  ArrowDownAZ,
  ArrowRight,
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
import {
  setActiveDirectory,
  setCurrentFileTree,
} from "@/app/redux/slices/currentPositionSlice";
import { useRouter } from "next/navigation";
import { convertEpochToIST, convertFileSize } from "@/app/utils/conversions";
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
          <DropdownMenuItem>File Information</DropdownMenuItem>
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
function FileCard({ file }: { file: FileDetails }) {
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
function FolderCard({ folderName }: { folderName: string }) {
  const currentPosition = useAppSelector((state) => state.currentPosition);
  const dispatch = useDispatch();

  return (
    <div
      className="flex-1 shrink-0 w-fit max-w-[250px] border-none shadow-none bg-slate-100 hover:bg-slate-200 rounded-xl"
      onClick={() => {
        dispatch(
          setActiveDirectory([...currentPosition.activeDirectory, folderName])
        );
      }}
    >
      <div className="flex flex-row justify-between items-center py-2 px-4">
        <div className="flex flex-row gap-3 items-center">
          <Folder size={"18"} />
          <p className="text-sm font-normal line-clamp-1">{folderName}</p>
        </div>
        {/* <FileMenu file={folder} viewType="grid" /> */}
      </div>
    </div>
  );
}
function CardView({ fileTree }: { fileTree: FileTree }) {
  return (
    <div className="flex flex-col p-4 gap-2 w-full">
      {fileTree &&
        Object.keys(fileTree)?.filter((keyName) => keyName !== "files")
          ?.length > 0 && (
          <>
            <p>Folders</p>
            <div className="flex flex-wrap flex-row gap-2">
              {Object.keys(fileTree)
                .filter((keyName) => keyName !== "files")
                .map((treeKey: string) => (
                  <FolderCard folderName={treeKey} key={treeKey} />
                ))}
            </div>
          </>
        )}
      {fileTree && (fileTree["files"] as FileDetails[])?.length > 0 && (
        <>
          <p>Files</p>
          <div className="flex flex-wrap flex-row gap-2">
            {(fileTree["files"] as FileDetails[]).map(
              (fileDetails: FileDetails) => (
                <FileCard file={fileDetails} key={fileDetails.uuid} />
              )
            )}
          </div>
        </>
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
  const currentPosition = useAppSelector((state) => state.currentPosition);
  const dispatch = useDispatch();
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
          {fileTree &&
            Object.keys(fileTree)
              ?.filter((keyName) => keyName !== "files")
              ?.map((folderName: string) => (
                <TableRow
                  key={folderName}
                  onClick={() => {
                    dispatch(
                      setActiveDirectory([
                        ...currentPosition.activeDirectory,
                        folderName,
                      ])
                    );
                  }}
                >
                  <TableCell className="py-0">
                    <div className="flex flex-row gap-4 items-center">
                      <Folder size={"18"} />
                      <p className="text-sm font-normal line-clamp-1">
                        {folderName}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-normal">{"-"}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-normal">{"-"}</p>
                  </TableCell>
                  <TableCell className="justify-end p-0"></TableCell>
                </TableRow>
              ))}

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

export default function FileBrowser() {
  const rawFileTree = useAppSelector((state) => state.rawFileTree);
  const [selectedView, setSelectedView] = useState<"list" | "grid">("list");
  const currentPosition = useAppSelector((state) => state.currentPosition);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (currentPosition.activeDirectory.length > 0) {
      let tempFileTree = rawFileTree;
      currentPosition.activeDirectory.forEach((directory) => {
        tempFileTree = tempFileTree[directory] as FileTree;
      });
      dispatch(setCurrentFileTree(tempFileTree));
    } else {
      dispatch(setCurrentFileTree(rawFileTree));
    }
    router.push(`/my-drive/${currentPosition.activeDirectory.join("/")}`);
  }, [currentPosition.activeDirectory, rawFileTree]);

  return (
    <ScrollArea className="flex flex-col w-full h-content rounded-2xl bg-white">
      <div className="flex flex-row items-center justify-between p-4">
        <div className="flex flex-row gap-4">
          <div className="flex flex-row items-center">
            {currentPosition.activeDirectory.length > 0 ? (
              <div className="flex flex-row gap-2 items-center">
                <Button
                  variant={"ghost"}
                  className="flex flex-row rounded-xl justify-between gap-1"
                  onClick={() => {
                    dispatch(setActiveDirectory([]));
                  }}
                >
                  <span>My Drive</span>
                </Button>
                <ChevronRight size={"18"} />
                {currentPosition.activeDirectory.map((folderName, i) => {
                  let tempRawFileTree = structuredClone(rawFileTree);
                  let newTempFileTree = tempRawFileTree;
                  for (
                    let i = 0;
                    i < currentPosition.activeDirectory.length;
                    i++
                  ) {
                    newTempFileTree = newTempFileTree[
                      currentPosition.activeDirectory[i] as string
                    ] as FileTree;
                  }
                  return !(i === currentPosition.activeDirectory.length - 1) ||
                    (newTempFileTree &&
                      Object?.keys(newTempFileTree)?.length === 1) ? (
                    <Fragment key={folderName + i}>
                      <Button
                        variant={"ghost"}
                        className="flex flex-row rounded-xl justify-between gap-4"
                        onClick={() => {
                          dispatch(
                            setActiveDirectory([
                              ...currentPosition.activeDirectory.slice(
                                0,
                                i + 1
                              ),
                            ])
                          );
                        }}
                      >
                        <span>{folderName}</span>
                      </Button>{" "}
                      {!(i === currentPosition.activeDirectory.length - 1) && (
                        <ChevronRight size={"18"} />
                      )}
                    </Fragment>
                  ) : (
                    <DropdownMenu key={folderName + i}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className="flex flex-row rounded-xl justify-between gap-4"
                        >
                          <span>{folderName}</span> <ChevronDown size={"18"} />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="rounded-xl">
                        {newTempFileTree &&
                          Object?.keys(newTempFileTree)?.map(
                            (folderName) =>
                              folderName !== "files" && (
                                <DropdownMenuItem
                                  key={folderName}
                                  onClick={() => {
                                    dispatch(
                                      setActiveDirectory([
                                        ...currentPosition.activeDirectory,
                                        folderName,
                                      ])
                                    );
                                  }}
                                  className="px-4 py-2 "
                                >
                                  {folderName}
                                </DropdownMenuItem>
                              )
                          )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                })}
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className="flex flex-row rounded-xl justify-between gap-4"
                  >
                    <span>My Drive</span> <ChevronDown size={"18"} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-xl">
                  {Object.keys(rawFileTree)?.map(
                    (folderName, i) =>
                      folderName !== "files" && (
                        <DropdownMenuItem
                          key={folderName + i}
                          onClick={() => {
                            dispatch(setActiveDirectory([folderName]));
                          }}
                          className="px-4 py-2 "
                        >
                          {folderName}
                        </DropdownMenuItem>
                      )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
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

      {selectedView === "list" && (
        <ListView fileTree={currentPosition.currentFileTree} />
      )}
      {selectedView === "grid" && (
        <CardView fileTree={currentPosition.currentFileTree} />
      )}
    </ScrollArea>
  );
}
