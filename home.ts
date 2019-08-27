//import { Actions, HomePageCell, JobsCard, Recovery, ActivityCard } from "../components";
import { div } from "../tools/html";
import { Page } from "../definitions";

/** The Home Page */
export class Home implements Page {
    private readonly element = div({ class: "columns", content: [
        div({ class: "column is-6 vertically-spaced", content: [
            //new Recovery(), new Actions, new JobsCard(), new ActivityCard(),
        ]})
    ]});

    render() {
        return this.element;
    }
}
