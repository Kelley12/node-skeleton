import { utils } from "./utils";
import { BulmaColorModifier } from "../definitions";

/** Notify the user a server error occurred */
export function serverError() {
    utils.notification("Error communicating with server", {
        colorModifier: BulmaColorModifier.danger
    });
}
