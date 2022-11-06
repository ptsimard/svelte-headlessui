import { SvelteComponentTyped } from "svelte";
import type { SupportedAs } from "../../internal/elements";
declare class __sveltets_Render<TAsProp extends SupportedAs> {
    props(): Omit<import("../../types").TRenderProps<{
        active: boolean;
        selected: boolean;
        disabled: boolean;
    }, TAsProp, "li">, import("../../types").TInternalProps | "as" | "static" | "unmount"> & {
        as?: TAsProp | undefined;
    } & {
        /** The option value */
        value: unknown;
        /** Whether the option should be disabled for keyboard navigation and ARIA purposes */
        disabled?: boolean | undefined;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            active: boolean;
            selected: boolean;
            disabled: boolean;
        };
    };
}
export declare type ComboboxOptionProps<TAsProp extends SupportedAs> = ReturnType<__sveltets_Render<TAsProp>['props']>;
export declare type ComboboxOptionEvents<TAsProp extends SupportedAs> = ReturnType<__sveltets_Render<TAsProp>['events']>;
export declare type ComboboxOptionSlots<TAsProp extends SupportedAs> = ReturnType<__sveltets_Render<TAsProp>['slots']>;
export default class ComboboxOption<TAsProp extends SupportedAs> extends SvelteComponentTyped<ComboboxOptionProps<TAsProp>, ComboboxOptionEvents<TAsProp>, ComboboxOptionSlots<TAsProp>> {
}
export {};
