import Vue from "vue";

export const prompt = Vue.extend({
    template: require("views/utils/prompt.html"),
    props: ["isActive", "title"],
    data() {
        return { response: "" };
    },
    methods: {
        close() {
            this.$emit("response", "");
            this.$emit("close");
            this.$data["response"] = "";
        },
        submit() {
            this.$emit("response", this.$data["response"]);
            this.$emit("close");
            this.$data["response"] = "";
        }
    }
});
