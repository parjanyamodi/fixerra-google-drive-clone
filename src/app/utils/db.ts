import { toast } from "sonner";

let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;
export interface File {
    uuid: string;
    name: string;
    type: string;
    dateModified: number;
    size: number;
    dateCreated: number;
    data: Blob;
}

export enum FileStores {
    Files = "files",
}

export const initDB = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        request = indexedDB.open("fileDB", version);
        request.onupgradeneeded = (event) => {
            if (!db.objectStoreNames.contains(FileStores.Files)) {
                console.log('Creating Files store')
                db.createObjectStore(FileStores.Files, { keyPath: "uuid" });
            }
        };
        request.onsuccess = (event) => {
            resolve(true);
        };
        request.onerror = (event) => {
            toast.error("Error opening database", {
                description: request.error?.message,
            });
            reject(false);
        };
    });
}

export const addFile = async (fileData: File) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([FileStores.Files], "readwrite");
        const store = transaction.objectStore(FileStores.Files);
        const request = store.add(fileData);
        request.onsuccess = (event) => {
            toast.success("File added successfully", {
                description: fileData.name,

            });
            resolve(true);
        };
        request.onerror = (event) => {
            toast.error("Error adding file", {
                description: fileData.name,
            });
            reject(false);
        };
    });
}