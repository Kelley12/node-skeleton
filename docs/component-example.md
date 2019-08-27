# Project node-skeleton Component Example

This example component represents a simple part submission form.
It uses vue as a helper view library.

Our form template
```html
<!-- Dir: pr/client/views/part-form.html -->

<!-- Register the onSubmit method as our submit event handler -->
<form v-on:submit.prevent="onSubmit">
    <div class="field">
        <label class="label">Part Name</label>
        <div class="control">
            <!-- Bind the data to partName -->
            <input class="input" type="text" v-model="partName">
        </div>
    </div>
    <div class="field">
        <label class="label">CNC Program</label>
        <div class="control">
            <!-- Bind the data to cncProgram -->
            <input class="input" type="text" v-model="cncProgram">
        </div>
    </div>
    <div class="field">
        <div class="control">
            <!-- Data is bound to jawType -->
            <label class="radio">
                <input type="radio" name="question" value="OD" v-model="jawType">
                OD
            </label>
            <label class="radio">
                <input type="radio" name="question" value="ID" v-model="jawType">
                ID
            </label>
        </div>
    </div>
    <div class="field">
        <div class="control">
            <input class="button is-link" type="submit">
        </div>
    </div>
</form>
```

```typescript
/** Dir: pr/client/components/part-form.ts **/

import Vue from "vue";
import { API } from "../api"
import { Component, Part } from "../definitions"

/**
 * The part form provides an interface for the user to add and edit
 * part configurations.
 */
export class PartForm implements Component {
    private readonly vue: Vue;
    private static readonly vueOpts = {
        // Get the template from views
        template: require("views/part-form.html"),
        // Initialize the data
        data: {
            partName: "".
            cncProgram: "",
            jawType: "OD"
        },
    };

    // The constructor is passed an element and our API
    constructor(el: string | HTMLElement, api: API) {
        this.vue = new Vue({
            el, template: PartForm.template, data: PartForm.data,
            methods: {
                // On submit our we send an addPart command through our API
                onSubmit: function(this: Vue) {
                    api.addPart(this.$data as Part);
                }
            }
        })
    }
}
```

Thats all you need to do!

## FAQ

- Why don't we just export the Vue instance directly?

    1. Encapsulation. Hiding the Vue instance allows behind a class helps to ensure
    that we only expose the methods that we absolutley need to. This provides a means
    of preventing unwanted and unruley "coupling" in the future. It's also just
    good OOP

    2. View Library Agnosticism. With the "WebComponents" API spec finalization quickly
    approaching, *Vue* may no longer be neccessary. Creating class components like this
    would mean that in that our future components don't need to be tied to a library.

- Why don't we inline the template?

    1. Better syntax highlighting

    2. Keeps the component.ts file more tidy

    3. We could have! But it was a lot of html for this file

- Why do we import Vue like that?

    Vue used the `export default` export. We don't. But they do. That's just how it works