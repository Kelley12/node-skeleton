# Project node-skeleton Architecture

A basic overview of the directory, server, and client architecture.

## General

- Follow the guidelines defined in [the code conventions](./code-conventions.md) and [the typescript styleguide](./typescript-styleguide.md)
- Write code with testability in mind.
- Unless you have a good reason, always unit test your code.

## Directory Architecture

- All source files live in the `src` directory.
- The project is seperated into `client`, `server`, and `shared`
- All files must follow the "hyphen case" naming convention i.e. "my-file"
- Test files go in `src/server/test`, `src/client/test`, or `src/shared/test`
- Typescript Source Directories should follow these rules:
    - Each folder must export all of it's members in an `index.ts`
    - One "hierarchical" concept per folder

        For example. A component folder should only have files relating specifically to that component

## Server

- Drivers:
    - A driver is an adapter that allows us to communicate with an external device
    - Drivers live in their own repo
    - All drivers must strictly adhere to it's coresponding interface.
    - If an interface for your driver does not yet exist one must be agreed upon
- API's
    - A RPC should be registered as a POST method
    - Important events should be registered in the `events.ts` file. These are sent to the client asynchronously over websockets
    - API's should generally be returned from a constructor function that
    clearly defines it's dependencies. For example:

        ```typescript
            export function dataRouter(data: Data): express.Router {
                const router = express.Router();

                router.route("/parts/:id")
                    .get((req, res) => {
                        const part = data.parts[req.params.id];
                        if (!part) return res.sendStatus(404);
                        res.json(part);
                    })
                    .put((req, res) => basicStatus(res, data.putPart(req.body)))
                    .delete((req, res) => {
                        if (!data.parts[req.params.id]) res.sendStatus(404);
                        basicStatus(res, data.delPart(req.params.id));
                    });

                return router;
            }
        ```

## Client

The client is written as web app using HTML/CSS/Typescript. It is built using the help of VueJS and Bulma. The project is designed not to be tangled with any framework or library. It should be straight forward to, for example, phase out VueJS or any future library. node-skeleton should never use a monolithic framework and always use web standards when possible.

- CSS lives in `src/client/assets/css`
- [Bulma](bulma.io) is the client css library. Use it to structure and style your html / view templates.
- Views (html or other template files) live in `src/client/views`
- Components
    - Live in `src/client/components`
    - The client is mostly "component" based
    - Component views can be inlined in the component source, or referenced using `require("views/example.html")`
    - Each component must adhere to the `Component` interface defined in `src/client/definitions/component.ts`
    (Unless its a view library specific component)
    - Components should generally be view library agnostic.

        This means that whatever calls the component should not have to be aware of underlying means of how the component was created.

        The exception to this rule is view library specific components; i.e components that can only be sub components of a component defined with said view library. For example:

        ```typescript
        // This component is only be used in another Vue component
        const vueSubComponent: Vue.Component = {
            template: "<div>Hello!</div>"
        };

        // This component can be used anywhere because it is implemented
        // with vue, it can use the vueSubComponent defined above
        class SayHello implements Component {
            private readonly name: string;
            private readonly vue: Vue;

            // We use the subcomponent in the template string of this.vue
            constructor(name: string) {
                this.name = name;
                this.vue = new Vue({
                    template: `<div><hello-word></hello-word> ${this.name}</div>`
                    components: {
                        "hello-word": vueSubComponent
                    }
                });
            }

            mount(el: string | HTMLElement) {
                this.vue.$mount(el)
            }
        }
        ```

        When View library specific components are reusable, they should be located under the components directory in their own directory labeld with the library name followed by a dash and the word components i.e `src/client/components/vue-components`. If they are just designed to aid a specific component, they can just live in said components folder, but they should never be exported.

- Helper Utilities liive in `src/client/utils`
    - Helpers can be any peice of code that is commonly reused.

## Shared

Any code that can be used on both the client and the server lives in the `src/shared` directory. This is most often interfaces but can also be helper functions etc.

## Testing

Testing is done with [mochajs](https://mochajs.org/). Write your code with testabilty in mind. Always write unit tests for any methods / functions exposed by your module. There are very few exceptions to this rule.
