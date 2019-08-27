import { Component } from "../definitions";

export function isComponent(comp: any): comp is Component {
    return comp !== undefined && !!comp.element;
}
