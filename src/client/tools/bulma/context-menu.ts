import { a, div, button, ul } from "../html";

/**
 * Create a context menu, resolves with the id of the item pressed.
 * If no item was pressed the function resolves with undefined.
 * Includes a close button (grey circle X) to allow users with touch
 * devices to close the menu manually, since the mouse leave event is not
 * very relevant with touch.
 */
export function contextMenu(opts: {
    position: { x: number, y: number},
    items: { text: string, action(): void; }[]
}) {
    const { position, items } = opts;

    // Remove any existing contextMenu (if exists) since
    // we should only have one context menu up at a time.
    const existingContextMenu = document.querySelector(".vb-contextMenu");
    if (existingContextMenu) existingContextMenu.remove();

    // Bulma grey circle X delete button
    const deleteButton = button({
        class: "delete is-small is-pulled-right",
        attributes: { style: "margin: .2rem" }
    });

    deleteButton.onclick = (e) => {
        e.preventDefault();
        menu.remove();
    };

    // Bulma menu component
    const menuList = ul({ class: "menu-list" });

    const menuContainer = div({ content: menuList, class: "menu" });

    // Parent context menu div
    const menu = div({
        content: [ menuContainer, deleteButton ],
        class: "box is-paddingless vb-contextMenu",
        attributes: {
            style: `
                position: absolute;
                top: ${position.y - 7}px;
                left: ${position.x - 7}px;
                background-color: white;
                min-width: 250px;
                border-radius: 4px;
                overflow: hidden;
                min-width: 125px;
            `
        },
    });

    menu.onmouseleave = () => menu.remove();

    // Add the individual menu items
    items.forEach(item => {
        const element = a({ content: item.text });
        element.onclick = (e) => {
            e.preventDefault();
            item.action();
            menu.remove();
        };
        menuList.appendChild(element);
    });

    document.body.appendChild(menu);
}
