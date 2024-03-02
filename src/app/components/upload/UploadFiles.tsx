import { addFile } from "@/app/utils/db";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FileUp } from "lucide-react";
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
  const handleAddFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        addFile({
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          uuid: v4(),
          data: await readFileAsBuffer(file),
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
