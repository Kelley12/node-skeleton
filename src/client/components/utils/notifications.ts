import Vue from "vue";
import { BulmaColorModifier } from "../../definitions";

type NotificationOpts = {
    message: string,
    typeStyle: BulmaColorModifier
};

type NotificationOptsWithKey = {
    message: string,
    typeStyle: BulmaColorModifier,
    key: number
};

const notificationComponent = Vue.extend({
    template: require("views/utils/notification.html"),
    props: ["notification"]
});

export const notificationsComponent = Vue.extend({
    template: require("views/utils/notifications.html"),
    components: { notification: notificationComponent },
    data() {
        const notes: NotificationOptsWithKey[] = [];
        return { notes, lastKey: 0 };
    },
    methods: {
        getKey() {
            if (this.lastKey > 2300) {
                this.lastKey = 0;
                return this.lastKey;
            }

            this.lastKey += 1;
            return this.lastKey;
        },

        addNotification(note: NotificationOpts, timeout: number = 10000) {
            const isDuplicated = this.notes.some(n => n.message === note.message);
            if (isDuplicated) return;
            const keyedNote = { ...note, key: this.getKey() };
            this.notes.push(keyedNote);
            if (timeout > 0) this.addTimeoutToNotification(keyedNote, timeout);
        },

        addTimeoutToNotification(note: NotificationOptsWithKey, timeout: number) {
            setTimeout(() => {
                const index = this.notes.indexOf(note);
                if (index < 0) return;
                this.removeNotification(index);
            }, timeout);
        },

        removeNotification(index: number) {
            this.notes.splice(index, 1);
        }
    }
});
