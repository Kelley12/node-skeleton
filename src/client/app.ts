import { div } from "./tools/html";
import { utils, router } from "./components";
import "./routes";
import { api } from "./api";
import "./style";

const layout = div({ content: [
    div({
        content: router,
        class: "container",
        attributes: { style: "margin-top: 70px" }
    }),

    utils
]});

// "Hot reload" client code watcher for development.
// Reloads browser (no cache) if server reports that client source has changed.
// Note: This is turned off in production.
api.on("ClientSourceWatcher.Update", () => window.location.reload(true));

router.start();

document.body.appendChild(layout);
