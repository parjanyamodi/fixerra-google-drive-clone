export { }

declare global {
    type FileData = {
        uuid: string;
        data: Uint8Array
    }
    type FileDetails = {
        uuid: string;
        name: string;
        size: number;
        type: string;
        lastModified: number;
        uploadedAt: number;
    }
    type FileTree = {
        [key: string]: FileTree | FileDetails[]
    }

}