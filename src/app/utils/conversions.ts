export function convertEpochToIST(epochTime: number) { return (new Date(epochTime)).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }) }

export function convertFileSize(sizeInBytes: number) {
    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;
    const gigabyte = megabyte * 1024;

    if (sizeInBytes >= gigabyte) {
        return (sizeInBytes / gigabyte).toFixed(2) + ' GB';
    } else if (sizeInBytes >= megabyte) {
        return (sizeInBytes / megabyte).toFixed(2) + ' MB';
    } else if (sizeInBytes >= kilobyte) {
        return (sizeInBytes / kilobyte).toFixed(2) + ' KB';
    } else {
        return sizeInBytes + ' Bytes';
    }
}