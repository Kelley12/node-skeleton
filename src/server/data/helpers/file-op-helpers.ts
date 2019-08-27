import { dirname } from "path";
import * as fs from "fs-extra";

const beautify = require("json-beautify");

/**
 * Serialized the specified object to JSON and writes the output to the file path.
 * Optional replacer function allows caller to modify the JSON stringification.
 * See JSON.stringify(...) docs
 */
export function writeJSON(path: string, obj: any, replacer?: (k: any, v: any) => any) {
    // tslint:disable-next-line:no-null-keyword
    return fs.writeFile(path, beautify(obj, replacer, 2, 100));
}

export async function beautifyStringifiedJSON(json: string): Promise<string> {
    return beautify(JSON.parse(json), undefined, 2, 100);
}

/**
 * Write an object if its not already written
 * Optional replacer function allows caller to modify the JSON stringification.
 * See JSON.stringify(...) docs
 */
export function writeIfNotThere(obj: any, path: string, replacer?: (k: any, v: any) => any) {
    const isThere = fs.pathExistsSync(path);
    if (!isThere) {
        fs.mkdirpSync(dirname(path));
        // tslint:disable-next-line:no-null-keyword
        fs.writeFileSync(path, beautify(obj, replacer, 2, 100));
    }
}

/**
 * Make the directory path if it doesn't already exist.
 */
export function mkdirIfNotThere(path: string) {
    const isThere = fs.pathExistsSync(path);
    if (!isThere) fs.mkdirpSync(dirname(path));
}
