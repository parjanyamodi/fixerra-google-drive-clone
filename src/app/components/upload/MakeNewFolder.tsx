import { setRawFileTree } from "@/app/redux/slices/rawFileTree";
import { useAppSelector } from "@/app/redux/store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FolderPlus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
export default function MakeNewFolder() {
  const rawFileTree = useAppSelector((state) => state.rawFileTree);
  const dispatch = useDispatch();

  const currentPosition = useAppSelector((state) => state.currentPosition);

  const newFolderNameRef =
    useRef<HTMLInputElement>() as React.RefObject<HTMLInputElement>;

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <DropdownMenuItem
          className="flex flex-row gap-4 rounded-md"
          onSelect={(e) => e.preventDefault()}
        >
          <FolderPlus size={"20"} />
          New Folder
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
        </DialogHeader>
        <input
          className="p-2 border-2 rounded-md text-sm"
          defaultValue={"Untitled Folder"}
          ref={newFolderNameRef}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
              variant={"ghost"}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            variant={"ghost"}
            onClick={() => {
              let tempRawFileTree = structuredClone(rawFileTree);
              let newTempFileTree = tempRawFileTree;
              for (let i = 0; i < currentPosition.activeDirectory.length; i++) {
                newTempFileTree = newTempFileTree[
                  currentPosition.activeDirectory[i] as string
                ] as FileTree;
              }
              if (
                rawFileTree &&
                Object.keys(newTempFileTree).includes(
                  newFolderNameRef.current?.value as string
                )
              ) {
                toast.error("Folder already exists");
              } else if (newFolderNameRef.current?.value === "") {
                toast.error("Folder name cannot be empty");
              } else {
                newTempFileTree[newFolderNameRef.current?.value as string] = {
                  files: [],
                };
                console.log(tempRawFileTree);
                dispatch(setRawFileTree(tempRawFileTree));

                toast.success("Folder created");
              }
            }}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
