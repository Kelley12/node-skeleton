import { about, home } from "./pages";
import { router } from "./components";

router.route("/", {
    name: "Home",
    render: _ => home.render()
});

router.route("/about", {
    name: "About",
    render: _ => about.render()
});

router.route("/*", {
    name: "404",
    render: _ => home.render(),
});
