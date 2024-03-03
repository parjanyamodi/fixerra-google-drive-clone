export function fileDetails(file: File) {
    return {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
    }
}

export function downloadUint8ArrayAsFile(uint8Array: Uint8Array, fileName: string, fileType: string) {
    const blob = new Blob([uint8Array], { type: fileType });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}