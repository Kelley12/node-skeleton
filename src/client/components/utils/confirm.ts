import Vue from "vue";

export const confirm = {
    template: require("views/utils/confirm.html"),
    props: ["isActive", "title", "message"],
    methods: {
        close(this: Vue) {
            this.$emit("response", false);
            this.$emit("close");
        },
        yes(this: Vue) {
            this.$emit("response", true);
            this.$emit("close");
        }
    }
};
