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
export default function MakeNewFolder() {
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
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
