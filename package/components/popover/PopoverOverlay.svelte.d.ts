import { SvelteComponentTyped } from "svelte";
import type { SupportedAs } from "../../internal/elements";
declare class __sveltets_Render<TAsProp extends SupportedAs> {
    props(): Omit<import("../../types").TRenderProps<{
        open: boolean;
    }, TAsProp, "div">, import("../../types").TInternalProps | "as" | "static" | "unmount"> & {
        as?: TAsProp | undefined;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            open: boolean;
        };
    };
}
export declare type PopoverOverlayProps<TAsProp extends SupportedAs> = ReturnType<__sveltets_Render<TAsProp>['props']>;
export declare type PopoverOverlayEvents<TAsProp extends SupportedAs> = ReturnType<__sveltets_Render<TAsProp>['events']>;
export declare type PopoverOverlaySlots<TAsProp extends SupportedAs> = ReturnType<__sveltets_Render<TAsProp>['slots']>;
export default class PopoverOverlay<TAsProp extends SupportedAs> extends SvelteComponentTyped<PopoverOverlayProps<TAsProp>, PopoverOverlayEvents<TAsProp>, PopoverOverlaySlots<TAsProp>> {
}
export {};
