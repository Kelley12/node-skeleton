import { CustomError } from "../../../dist/shared";

export interface Emitter {
    on(event: "Error", cb: (error: CustomError) => void): this;
    on(event: string, cb: (...args: any[]) => void): this;
    onAny(cb: (event: string | string[], ...args: any[]) => void): this;
}
