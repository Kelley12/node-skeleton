import Vue from "vue";
import { Component } from "../../definitions";
import { VueToElement } from "../../tools";

/**
 * System Info component.  Displays system information such as the device serial number,
 * software version number and a copyright notice.
 */
const vueComponent = Vue.extend({
    template: require("views/about/about.html"),
});

/**
 * Displays a list of server info including serial # and system version #
 */
export class ServerSystemInfo implements Component {
    private readonly vue = new vueComponent();
    readonly element: HTMLElement = VueToElement(this.vue);
}
