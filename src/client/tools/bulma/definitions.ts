export interface BulmaTextInputOpts {
    type: "text";
    name: string;
    placeholder?: string;
}

export interface BulmaTextareaOpts {
    type: "textarea";
    name: string;
    placeholder?: string;
}

export interface BulmaNumberInputOpts {
    type: "number";
    name: string;
    min?: string;
    max?: string;
    step?: string;
    placeholder?: string;
}

export interface BulmaRadioOpts {
    type: "radio";
    name: string;
    radios: { value: string, label: string }[];
    default?: number;
}

export interface BulmaSelectOpts {
    type: "select";
    options: { value: string, label: string }[];
    selected?: number;
}

export interface BulmaCheckboxOpts {
    type: "checkbox";
    name: string;
    checked?: boolean;
}

export type BulmaInputOpts = BulmaCheckboxOpts | BulmaSelectOpts | BulmaRadioOpts |
    BulmaNumberInputOpts | BulmaTextareaOpts | BulmaTextInputOpts;
