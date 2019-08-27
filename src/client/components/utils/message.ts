import Vue from "vue";

export enum MessageType {
    dark = "is-dark",
    primary = "is-primary",
    link = "is-link",
    info = "is-info",
    success = "is-success",
    warning = "is-warning",
    danger = "is-danger",
    none = ""
}

export const message = Vue.extend({
    template: require("views/utils/message.html"),
    // messageStyle can be anything in MessageType
    props: ["typeStyle", "isActive", "title", "message"],
    methods: {
        close() {
            this.$emit("close");
        }
    }
});
