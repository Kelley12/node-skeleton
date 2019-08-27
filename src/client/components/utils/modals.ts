import Vue from "vue";
import { alert } from "./alert";
import { confirm } from "./confirm";
import { prompt } from "./prompt";
import { message, MessageType } from "./message";

export enum ModalType {
    alert, message, confirm, prompt
}

export type ModalOpts = {
    type: ModalType,
    title: string,
    message: string,
    style: MessageType
};

export const modalsComponent = Vue.extend({
    template: require("views/utils/index.html"),
    components: {
        alert, confirm, message, prompt
    },
    data() {
        return {
            alertIsActive: false,
            alertTitle: "",
            alertMessage: "",
            confirmIsActive: false,
            confirmTitle: "",
            confirmMessage: "",
            messageIsActive: false,
            messageTitle: "",
            messageMessage: "",
            messageTypeStyle: MessageType.dark,
            promptIsActive: false,
            promptTitle: "",
        };
    },
    methods: {
        markNotActive(key: string) {
            this.$data[key] = false;
            this.$emit("activeModalChange");
        }
    }
});
