import { toast } from "sonner";

let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;
export interface File {
    uuid: string;
    name: string;
    type: string;
    lastModified: number;
    size: number;
    dateCreated?: number;
    data: Uint8Array;
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
    console.log(fileData);
    return new Promise((resolve, reject) => {
        request = indexedDB.open("fileDB", version);
        request.onsuccess = (event) => {
            db = request.result;
            const transaction = db.transaction("files", "readwrite");
            const store = transaction.objectStore("files");
            const response = store.add(fileData);
            response.onsuccess = (event) => {

                toast.success("File added successfully", {
                    description: fileData.name,

                });
                resolve(true);

            }
        };
        request.onerror = (event) => {
            toast.error("Error adding file", {
                description: fileData.name,
            });
            reject(false);
        };
    });
}

export const getFile = async (uuid: string): Promise<File> => {
    request = indexedDB.open("fileDB", version);
    return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
            try {

                db = request.result;
                const transaction = db.transaction("files", "readonly");
                const store = transaction.objectStore("files");
                const response = store.get(uuid);
                response.onsuccess = (event) => {
                    toast.success("Download will start shortly")
                    resolve(response.result);
                }
            }
            catch (e) {
            }
        };
        request.onerror = (event) => {
            toast.error("Error getting file", {
                description: uuid,
            });
            reject(null);
        };
    });
}

export const getFiles = async (): Promise<File[]> => {
    return new Promise((resolve, reject) => {
        request = indexedDB.open("fileDB", version);
        request.onsuccess = (event) => {
            try {
                db = request.result;
                const transaction = db.transaction("files", "readonly");
                const store = transaction.objectStore("files");
                const response = store.getAll();
                response.onsuccess = (event) => {
                    resolve(response.result);
                }
            }
            catch (e) {
            }
        };
        request.onerror = (event) => {
            toast.error("Error getting files", {
                description: request.error?.message,
            });
            reject([]);
        };
    });
}
