import { setRawFileTree } from "@/app/redux/slices/rawFileTree";
import { useAppSelector } from "@/app/redux/store";
import { addFile } from "@/app/utils/db";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FileUp } from "lucide-react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";

export default function UploadFiles() {
  const readFileAsBuffer = (file: File): Promise<Uint8Array> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        resolve(uint8Array);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };
  const currentPosition = useAppSelector((state) => state.currentPosition);
  const rawFileTree = useAppSelector((state) => state.rawFileTree);
  const dispatch = useDispatch();
  const handleAddFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      let tempRawFileTree = structuredClone(rawFileTree);
      let newTempFileTree = tempRawFileTree;

      for (let i = 0; i < currentPosition.activeDirectory.length; i++) {
        newTempFileTree = newTempFileTree[
          currentPosition.activeDirectory[i] as string
        ] as FileTree;
      }

      for (let i = 0; i < files.length; i++) {
        const fileMetaData: FileDetails = {
          uuid: v4(),
          name: files[i].name,
          size: files[i].size,
          type: files[i].type,
          lastModified: files[i].lastModified,
          uploadedAt: Date.now(),
        };
        if (!newTempFileTree["files"]) {
          newTempFileTree["files"] = [];
        }
        (newTempFileTree["files"] as FileDetails[]).push(fileMetaData);
        dispatch(setRawFileTree(tempRawFileTree));
        addFile({
          uuid: fileMetaData.uuid,
          data: await readFileAsBuffer(files[i]),
        });
      }
    }
  };

  return (
    <>
      <DropdownMenuItem
        className="flex flex-row gap-4 rounded-md w-full"
        asChild
      >
        <button
          className="w-full"
          onClick={(e) => {
            e.preventDefault();

            document?.getElementById("file")?.click();
          }}
        >
          <FileUp size={"20"} />
          Upload File
        </button>
      </DropdownMenuItem>
      <input
        type="file"
        className="hidden"
        id="file"
        multiple
        onChange={handleAddFile}
      />
    </>
  );
}
