import { ServerSystemInfo } from "../components/about";
import { div } from "../tools/html";
import { Page } from "../definitions";

/** The VBXC About Page */
export class About implements Page {
    private readonly element = div({ class: "columns", content: [
        div({ class: "column vertically-spaced", content: [
            new ServerSystemInfo()
        ]})
    ]});

    render() {
        return this.element;
    }

}
