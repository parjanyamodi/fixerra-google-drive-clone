export function flattenFiles(obj: FileTree, result: FileDetails[] = []) {
    if (obj === null || obj === undefined) return result;
    if (obj.files && (obj.files as FileDetails[]).length > 0) {
        result.push(...(obj.files as FileDetails[]));
    }

    for (const key in obj) {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            flattenFiles((obj[key] as FileTree), result);
        }
    }

    return result;
}