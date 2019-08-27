import { homedir } from "os";
import { CustomError } from "../../shared";

export const defaultDataPath = `${homedir()}/.config/node-skeleton`;

export class Data {
    private errorCache: CustomError[] = [];

    clearErrors() { this.errorCache = []; }

    getErrors() { return this.errorCache; }

    putError(err: CustomError) { this.errorCache.push(err); }
}

export const data = new Data();
