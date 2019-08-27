import Vue from "vue";

export const alert = Vue.extend({
    template: require("views/utils/alert.html"),
    props: ["isActive", "title", "message"],
    methods: {
        close(): void {
            this.$emit("close");
        }
    }
});
