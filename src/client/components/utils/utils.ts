import { MessageType } from "./message";
import { BulmaColorModifier, Component } from "../../definitions";
import { VueToElement } from "../../tools";
import { modalsComponent, ModalOpts, ModalType } from "./modals";
import { notificationsComponent } from "./notifications";
import { div } from "../../tools/html";


/**
 * A collection of display utilities that can be used to communicate
 * with the user.
 */
class Utils implements Component {
    private readonly notificationsVue = new notificationsComponent();
    private readonly modalsVue = new modalsComponent();
    private readonly modalQueue: { opts: ModalOpts, beforeShow?(): void }[] = [];
    readonly element = div({ content: [
        VueToElement(this.notificationsVue), VueToElement(this.modalsVue)
    ] });

    constructor() {
        this.listenToChildCloseEvents();
    }

    private listenToChildCloseEvents() {
        this.modalsVue.$on("activeModalChange", () => {
            if (!this.hasActiveModal()) this.nextModal();
        });
    }

    private hasActiveModal(): boolean {
        return (
            this.modalsVue.$data.alertIsActive ||
            this.modalsVue.$data.confirmIsActive ||
            this.modalsVue.$data.messageIsActive ||
            this.modalsVue.$data.promptIsActive
        );
    }

    /**
     * Show a modal. Should not be called directly, meant only for queue functions.
     * If you need to show a modal, call "this.queueModal"
     */
    private showModal(opts: ModalOpts) {
        switch (opts.type) {
            case ModalType.alert:
                this.modalsVue.$data.alertIsActive = true;
                this.modalsVue.$data.alertMessage = opts.message;
                this.modalsVue.$data.alertTitle = opts.title;
                break;
            case ModalType.message:
                this.modalsVue.$data.messageIsActive = true;
                this.modalsVue.$data.messageMessage = opts.message;
                this.modalsVue.$data.messageTitle = opts.title;
                break;
            case ModalType.confirm:
                this.modalsVue.$data.confirmIsActive = true;
                this.modalsVue.$data.confirmTitle = opts.title;
                this.modalsVue.$data.confirmMessage = opts.message;
                break;
            case ModalType.prompt:
                this.modalsVue.$data.promptIsActive = true;
                this.modalsVue.$data.promptTitle = opts.title;
                break;
            default:
                break;
        }
    }

    /**
     * If there is a queued modal, show it. Should only need to be called by
     * listenToChildCloseEvents
     */
    private nextModal() {
        const item = this.modalQueue.pop();
        if (item) {
            if (item.beforeShow) item.beforeShow();
            this.showModal(item.opts);
        }
    }

    /**
     * Queue a modal.
     * @param opts Modal options
     * @param beforeShow Optional function to be called right before the modal is called
     */
    private queueModal(opts: ModalOpts, beforeShow?: () => void) {
        this.modalQueue.unshift({ opts, beforeShow });
        if (!this.hasActiveModal()) this.nextModal();
    }

    /** Show an alert box */
    alert(message: string, title = "Alert!") {
        this.queueModal({
            type: ModalType.alert,
            title, message, style: MessageType.none
        });
    }

    /**
     * Show a message box (Like an alert but has different styles and no "OK button".
     * Designed for lots of text)
     */
    message(message: string, opts: {
        title?: string,
        style?: MessageType
    } = {}) {
        const builtOpts = {
            title: opts.title ? opts.title : "New Message!",
            style: opts.style ? opts.style : MessageType.info
        };

        this.queueModal({ message, ...builtOpts, type: ModalType.message });
    }

    /**
     * Show a confirm.
     * Confirms prompt the user for a yes or a no.
     */
    confirm(message: string, title = "Response Needed."): Promise<boolean> {
        return new Promise((resolve) => {
            this.queueModal({
                type: ModalType.confirm,
                title,
                message,
                style: MessageType.none
            }, () => {
                this.modalsVue.$once("confirmResponse", resolve);
            });
        });
    }

    /**
     * Show a confirm.
     * Confirms prompt the user for a yes or a no.
     */
    prompt(title: string): Promise<string> {
        return new Promise((resolve) => {
            this.queueModal({
                type: ModalType.prompt,
                title,
                message: "",
                style: MessageType.none
            }, () => {
                this.modalsVue.$once("promptResponse", resolve);
            });
        });
    }

    /** Show a growl style notification */
    notification(text: string, opts: {
        colorModifier?: BulmaColorModifier,

        /**
         * Set a timout. If timeout >= 0 the notification
         * requires user dismissal. Defaults to 5000ms
         */
        timeout?: number
    } = {}) {
        const type = opts.colorModifier ? opts.colorModifier : BulmaColorModifier.info;

        this.notificationsVue.addNotification({
            message: text,
            typeStyle: type
        }, opts.timeout);
    }
}

export const utils = new Utils();
export { MessageType } from "./message";
