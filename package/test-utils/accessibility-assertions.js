import { isFocusableElement, FocusableMode } from "../utils/focus-management";
function assertNever(x) {
    throw new Error("Unexpected object: " + x);
}
// ---
export function getMenuButton() {
    return document.querySelector('button,[role="button"],[id^="headlessui-menu-button-"]');
}
export function getMenuButtons() {
    return Array.from(document.querySelectorAll('button,[role="button"]'));
}
export function getMenu() {
    return document.querySelector('[role="menu"]');
}
export function getMenus() {
    return Array.from(document.querySelectorAll('[role="menu"]'));
}
export function getMenuItems() {
    return Array.from(document.querySelectorAll('[role="menuitem"]'));
}
// ---
export var MenuState;
(function (MenuState) {
    /** The menu is visible to the user. */
    MenuState[MenuState["Visible"] = 0] = "Visible";
    /** The menu is **not** visible to the user. It's still in the DOM, but it is hidden. */
    MenuState[MenuState["InvisibleHidden"] = 1] = "InvisibleHidden";
    /** The menu is **not** visible to the user. It's not in the DOM, it is unmounted. */
    MenuState[MenuState["InvisibleUnmounted"] = 2] = "InvisibleUnmounted";
})(MenuState || (MenuState = {}));
export function assertMenuButton(options, button = getMenuButton()) {
    try {
        if (button === null)
            return expect(button).not.toBe(null);
        // Ensure menu button have these properties
        expect(button).toHaveAttribute("id");
        expect(button).toHaveAttribute("aria-haspopup");
        switch (options.state) {
            case MenuState.Visible:
                expect(button).toHaveAttribute("aria-controls");
                expect(button).toHaveAttribute("aria-expanded", "true");
                break;
            case MenuState.InvisibleHidden:
                expect(button).toHaveAttribute("aria-controls");
                if (button.hasAttribute("disabled")) {
                    expect(button).not.toHaveAttribute("aria-expanded");
                }
                else {
                    expect(button).toHaveAttribute("aria-expanded", "false");
                }
                break;
            case MenuState.InvisibleUnmounted:
                expect(button).not.toHaveAttribute("aria-controls");
                if (button.hasAttribute("disabled")) {
                    expect(button).not.toHaveAttribute("aria-expanded");
                }
                else {
                    expect(button).toHaveAttribute("aria-expanded", "false");
                }
                break;
            default:
                assertNever(options.state);
        }
        if (options.textContent) {
            expect(button).toHaveTextContent(options.textContent);
        }
        // Ensure menu button has the following attributes
        for (let attributeName in options.attributes) {
            expect(button).toHaveAttribute(attributeName, options.attributes[attributeName]);
        }
    }
    catch (err) {
        Error.captureStackTrace(err, assertMenuButton);
        throw err;
    }
}
export function assertMenuButtonLinkedWithMenu(button = getMenuButton(), menu = getMenu()) {
    try {
        if (button === null)
            return expect(button).not.toBe(null);
        if (menu === null)
            return expect(menu).not.toBe(null);
        // Ensure link between button & menu is correct
        expect(button).toHaveAttribute("aria-controls", menu.getAttribute("id"));
        expect(menu).toHaveAttribute("aria-labelledby", button.getAttribute("id"));
    }
    catch (err) {
        Error.captureStackTrace(err, assertMenuButtonLinkedWithMenu);
        throw err;
    }
}
export function assertMenuLinkedWithMenuItem(item, menu = getMenu()) {
    try {
        if (menu === null)
            return expect(menu).not.toBe(null);
        if (item === null)
            return expect(item).not.toBe(null);
        // Ensure link between menu & menu item is correct
        expect(menu).toHaveAttribute("aria-activedescendant", item.getAttribute("id"));
    }
    catch (err) {
        Error.captureStackTrace(err, assertMenuLinkedWithMenuItem);
        throw err;
    }
}
export function assertNoActiveMenuItem(menu = getMenu()) {
    try {
        if (menu === null)
            return expect(menu).not.toBe(null);
        // Ensure we don't have an active menu
        expect(menu).not.toHaveAttribute("aria-activedescendant");
    }
    catch (err) {
        Error.captureStackTrace(err, assertNoActiveMenuItem);
        throw err;
    }
}
export function assertMenu(options, menu = getMenu()) {
    try {
        switch (options.state) {
            case MenuState.InvisibleHidden:
                if (menu === null)
                    return expect(menu).not.toBe(null);
                assertHidden(menu);
                expect(menu).toHaveAttribute("aria-labelledby");
                expect(menu).toHaveAttribute("role", "menu");
                if (options.textContent)
                    expect(menu).toHaveTextContent(options.textContent);
                for (let attributeName in options.attributes) {
                    expect(menu).toHaveAttribute(attributeName, options.attributes[attributeName]);
                }
                break;
            case MenuState.Visible:
                if (menu === null)
                    return expect(menu).not.toBe(null);
                assertVisible(menu);
                expect(menu).toHaveAttribute("aria-labelledby");
                expect(menu).toHaveAttribute("role", "menu");
                if (options.textContent)
                    expect(menu).toHaveTextContent(options.textContent);
                for (let attributeName in options.attributes) {
                    expect(menu).toHaveAttribute(attributeName, options.attributes[attributeName]);
                }
                break;
            case MenuState.InvisibleUnmounted:
                expect(menu).toBe(null);
                break;
            default:
                assertNever(options.state);
        }
    }
    catch (err) {
        Error.captureStackTrace(err, assertMenu);
        throw err;
    }
}
export function assertMenuItem(item, options) {
    try {
        if (item === null)
            return expect(item).not.toBe(null);
        // Check that some attributes exists, doesn't really matter what the values are at this point in
        // time, we just require them.
        expect(item).toHaveAttribute("id");
        // Check that we have the correct values for certain attributes
        expect(item).toHaveAttribute("role", "menuitem");
        if (!item.getAttribute("aria-disabled"))
            expect(item).toHaveAttribute("tabindex", "-1");
        // Ensure menu button has the following attributes
        if (options) {
            for (let attributeName in options.attributes) {
                expect(item).toHaveAttribute(attributeName, options.attributes[attributeName]);
            }
            if (options.tag) {
                expect(item.tagName.toLowerCase()).toBe(options.tag);
            }
        }
    }
    catch (err) {
        Error.captureStackTrace(err, assertMenuItem);
        throw err;
    }
}
// ---
export function getListboxLabel() {
    return document.querySelector('label,[id^="headlessui-listbox-label"]');
}
export function getListboxButton() {
    return document.querySelector('button,[role="button"],[id^="headlessui-listbox-button-"]');
}
export function getListboxButtons() {
    return Array.from(document.querySelectorAll('button,[role="button"]'));
}
export function getListbox() {
    return document.querySelector('[role="listbox"]');
}
export function getListboxes() {
    return Array.from(document.querySelectorAll('[role="listbox"]'));
}
export function getListboxOptions() {
    return Array.from(document.querySelectorAll('[role="option"]'));
}
// ---
export var ListboxState;
(function (ListboxState) {
    /** The listbox is visible to the user. */
    ListboxState[ListboxState["Visible"] = 0] = "Visible";
    /** The listbox is **not** visible to the user. It's still in the DOM, but it is hidden. */
    ListboxState[ListboxState["InvisibleHidden"] = 1] = "InvisibleHidden";
    /** The listbox is **not** visible to the user. It's not in the DOM, it is unmounted. */
    ListboxState[ListboxState["InvisibleUnmounted"] = 2] = "InvisibleUnmounted";
})(ListboxState || (ListboxState = {}));
export function assertListbox(options, listbox = getListbox()) {
    let { orientation = "vertical" } = options;
    try {
        switch (options.state) {
            case ListboxState.InvisibleHidden:
                if (listbox === null)
                    return expect(listbox).not.toBe(null);
                assertHidden(listbox);
                expect(listbox).toHaveAttribute("aria-labelledby");
                expect(listbox).toHaveAttribute("aria-orientation", orientation);
                expect(listbox).toHaveAttribute("role", "listbox");
                if (options.textContent)
                    expect(listbox).toHaveTextContent(options.textContent);
                for (let attributeName in options.attributes) {
                    expect(listbox).toHaveAttribute(attributeName, options.attributes[attributeName]);
                }
                break;
            case ListboxState.Visible:
                if (listbox === null)
                    return expect(listbox).not.toBe(null);
                assertVisible(listbox);
                expect(listbox).toHaveAttribute("aria-labelledby");
                expect(listbox).toHaveAttribute("aria-orientation", orientation);
                expect(listbox).toHaveAttribute("role", "listbox");
                if (options.textContent)
                    expect(listbox).toHaveTextContent(options.textContent);
                for (let attributeName in options.attributes) {
                    expect(listbox).toHaveAttribute(attributeName, options.attributes[attributeName]);
                }
                break;
            case ListboxState.InvisibleUnmounted:
                expect(listbox).toBe(null);
                break;
            default:
                assertNever(options.state);
        }
    }
    catch (err) {
        Error.captureStackTrace(err, assertListbox);
        throw err;
    }
}
export function assertListboxButton(options, button = getListboxButton()) {
    try {
        if (button === null)
            return expect(button).not.toBe(null);
        // Ensure menu button have these properties
        expect(button).toHaveAttribute("id");
        expect(button).toHaveAttribute("aria-haspopup");
        switch (options.state) {
            case ListboxState.Visible:
                expect(button).toHaveAttribute("aria-controls");
                expect(button).toHaveAttribute("aria-expanded", "true");
                break;
            case ListboxState.InvisibleHidden:
                expect(button).toHaveAttribute("aria-controls");
                if (button.hasAttribute("disabled")) {
                    expect(button).not.toHaveAttribute("aria-expanded");
                }
                else {
                    expect(button).toHaveAttribute("aria-expanded", "false");
                }
                break;
            case ListboxState.InvisibleUnmounted:
                expect(button).not.toHaveAttribute("aria-controls");
                if (button.hasAttribute("disabled")) {
                    expect(button).not.toHaveAttribute("aria-expanded");
                }
                else {
                    expect(button).toHaveAttribute("aria-expanded", "false");
                }
                break;
            default:
                assertNever(options.state);
        }
        if (options.textContent) {
            expect(button).toHaveTextContent(options.textContent);
        }
        // Ensure menu button has the following attributes
        for (let attributeName in options.attributes) {
            expect(button).toHaveAttribute(attributeName, options.attributes[attributeName]);
        }
    }
    catch (err) {
        Error.captureStackTrace(err, assertListboxButton);
        throw err;
    }
}
export function assertListboxLabel(options, label = getListboxLabel()) {
    try {
        if (label === null)
            return expect(label).not.toBe(null);
        // Ensure menu button have these properties
        expect(label).toHaveAttribute("id");
        if (options.textContent) {
            expect(label).toHaveTextContent(options.textContent);
        }
        if (options.tag) {
            expect(label.tagName.toLowerCase()).toBe(options.tag);
        }
        // Ensure menu button has the following attributes
        for (let attributeName in options.attributes) {
            expect(label).toHaveAttribute(attributeName, options.attributes[attributeName]);
        }
    }
    catch (err) {
        Error.captureStackTrace(err, assertListboxLabel);
        throw err;
    }
}
export function assertListboxButtonLinkedWithListbox(button = getListboxButton(), listbox = getListbox()) {
    try {
        if (button === null)
            return expect(button).not.toBe(null);
        if (listbox === null)
            return expect(listbox).not.toBe(null);
        // Ensure link between button & listbox is correct
        expect(button).toHaveAttribute("aria-controls", listbox.getAttribute("id"));
        expect(listbox).toHaveAttribute("aria-labelledby", button.getAttribute("id"));
    }
    catch (err) {
        Error.captureStackTrace(err, assertListboxButtonLinkedWithListbox);
        throw err;
    }
}
export function assertListboxLabelLinkedWithListbox(label = getListboxLabel(), listbox = getListbox()) {
    try {
        if (label === null)
            return expect(label).not.toBe(null);
        if (listbox === null)
            return expect(listbox).not.toBe(null);
        expect(listbox).toHaveAttribute("aria-labelledby", label.getAttribute("id"));
    }
    catch (err) {
        Error.captureStackTrace(err, assertListboxLabelLinkedWithListbox);
        throw err;
    }
}
export function assertListboxButtonLinkedWithListboxLabel(button = getListboxButton(), label = getListboxLabel()) {
    try {
        if (button === null)
            return expect(button).not.toBe(null);
        if (label === null)
            return expect(label).not.toBe(null);
        // Ensure link between button & label is correct
        expect(button).toHaveAttribute("aria-labelledby", `${label.id} ${button.id}`);
    }
    catch (err) {
        Error.captureStackTrace(err, assertListboxButtonLinkedWithListboxLabel);
        throw err;
    }
}
export function assertActiveListboxOption(item, listbox = getListbox()) {
    try {
        if (listbox === null)
            return expect(listbox).not.toBe(null);
        if (item === null)
            return expect(item).not.toBe(null);
        // Ensure link between listbox & listbox item is correct
        expect(listbox).toHaveAttribute("aria-activedescendant", item.getAttribute("id"));
    }
    catch (err) {
        Error.captureStackTrace(err, assertActiveListboxOption);
        throw err;
    }
}
export function assertNoActiveListboxOption(listbox = getListbox()) {
    try {
        if (listbox === null)
            return expect(listbox).not.toBe(null);
        // Ensure we don't have an active listbox
        expect(listbox).not.toHaveAttribute("aria-activedescendant");
    }
    catch (err) {
        Error.captureStackTrace(err, assertNoActiveListboxOption);
        throw err;
    }
}
export function assertNoSelectedListboxOption(items = getListboxOptions()) {
    try {
        for (let item of items)
            expect(item).not.toHaveAttribute("aria-selected");
    }
    catch (err) {
        Error.captureStackTrace(err, assertNoSelectedListboxOption);
        throw err;
    }
}
export function assertListboxOption(item, options) {
    try {
        if (item === null)
            return expect(item).not.toBe(null);
        // Check that some attributes exists, doesn't really matter what the values are at this point in
        // time, we just require them.
        expect(item).toHaveAttribute("id");
        // Check that we have the correct values for certain attributes
        expect(item).toHaveAttribute("role", "option");
        if (!item.getAttribute("aria-disabled"))
            expect(item).toHaveAttribute("tabindex", "-1");
        // Ensure listbox button has the following attributes
        if (!options)
            return;
        for (let attributeName in options.attributes) {
            expect(item).toHaveAttribute(attributeName, options.attributes[attributeName]);
        }
        if (options.tag) {
            expect(item.tagName.toLowerCase()).toBe(options.tag);
        }
        if (options.selected != null) {
            switch (options.selected) {
                case true:
                    return expect(item).toHaveAttribute("aria-selected", "true");
                case false:
                    return expect(item).not.toHaveAttribute("aria-selected");
                default:
                    assertNever(options.selected);
            }
        }
    }
    catch (err) {
        Error.captureStackTrace(err, assertListboxOption);
        throw err;
    }
}
// ---
export function getSwitch() {
    return document.querySelector('[role="switch"]');
}
export function getSwitchLabel() {
    return document.querySelector('label,[id^="headlessui-switch-label"]');
}
// ---
export var SwitchState;
(function (SwitchState) {
    SwitchState[SwitchState["On"] = 0] = "On";
    SwitchState[SwitchState["Off"] = 1] = "Off";
})(SwitchState || (SwitchState = {}));
export function assertSwitch(options, switchElement = getSwitch()) {
    try {
        if (switchElement === null)
            return expect(switchElement).not.toBe(null);
        expect(switchElement).toHaveAttribute("role", "switch");
        expect(switchElement).toHaveAttribute("tabindex", "0");
        if (options.textContent) {
            expect(switchElement).toHaveTextContent(options.textContent);
        }
        if (options.tag) {
            expect(switchElement.tagName.toLowerCase()).toBe(options.tag);
        }
        if (options.label) {
            assertLabelValue(switchElement, options.label);
        }
        if (options.description) {
            assertDescriptionValue(switchElement, options.description);
        }
        switch (options.state) {
            case SwitchState.On:
                expect(switchElement).toHaveAttribute("aria-checked", "true");
                break;
            case SwitchState.Off:
                expect(switchElement).toHaveAttribute("aria-checked", "false");
                break;
            default:
                assertNever(options.state);
        }
    }
    catch (err) {
        Error.captureStackTrace(err, assertSwitch);
        throw err;
    }
}
// ---
export function getDisclosureButton() {
    return document.querySelector('[id^="headlessui-disclosure-button-"]');
}
export function getDisclosurePanel() {
    return document.querySelector('[id^="headlessui-disclosure-panel-"]');
}
// ---
export var DisclosureState;
(function (DisclosureState) {
    /** The disclosure is visible to the user. */
    DisclosureState[DisclosureState["Visible"] = 0] = "Visible";
    /** The disclosure is **not** visible to the user. It's still in the DOM, but it is hidden. */
    DisclosureState[DisclosureState["InvisibleHidden"] = 1] = "InvisibleHidden";
    /** The disclosure is **not** visible to the user. It's not in the DOM, it is unmounted. */
    DisclosureState[DisclosureState["InvisibleUnmounted"] = 2] = "InvisibleUnmounted";
})(DisclosureState || (DisclosureState = {}));
// ---
export function assertDisclosureButton(options, button = getDisclosureButton()) {
    try {
        if (button === null)
            return expect(button).not.toBe(null);
        // Ensure disclosure button have these properties
        expect(button).toHaveAttribute("id");
        switch (options.state) {
            case DisclosureState.Visible:
                expect(button).toHaveAttribute("aria-controls");
                expect(button).toHaveAttribute("aria-expanded", "true");
                break;
            case DisclosureState.InvisibleHidden:
                expect(button).toHaveAttribute("aria-controls");
                if (button.hasAttribute("disabled")) {
                    expect(button).not.toHaveAttribute("aria-expanded");
                }
                else {
                    expect(button).toHaveAttribute("aria-expanded", "false");
                }
                break;
            case DisclosureState.InvisibleUnmounted:
                expect(button).not.toHaveAttribute("aria-controls");
                if (button.hasAttribute("disabled")) {
                    expect(button).not.toHaveAttribute("aria-expanded");
                }
                else {
                    expect(button).toHaveAttribute("aria-expanded", "false");
                }
                break;
            default:
                assertNever(options.state);
        }
        if (options.textContent) {
            expect(button).toHaveTextContent(options.textContent);
        }
        // Ensure disclosure button has the following attributes
        for (let attributeName in options.attributes) {
            expect(button).toHaveAttribute(attributeName, options.attributes[attributeName]);
        }
    }
    catch (err) {
        Error.captureStackTrace(err, assertDisclosureButton);
        throw err;
    }
}
export function assertDisclosurePanel(options, panel = getDisclosurePanel()) {
    try {
        switch (options.state) {
            case DisclosureState.InvisibleHidden:
                if (panel === null)
                    return expect(panel).not.toBe(null);
                assertHidden(panel);
                if (options.textContent)
                    expect(panel).toHaveTextContent(options.textContent);
                for (let attributeName in options.attributes) {
                    expect(panel).toHaveAttribute(attributeName, options.attributes[attributeName]);
                }
                break;
            case DisclosureState.Visible:
                if (panel === null)
                    return expect(panel).not.toBe(null);
                assertVisible(panel);
                if (options.textContent)
                    expect(panel).toHaveTextContent(options.textContent);
                for (let attributeName in options.attributes) {
                    expect(panel).toHaveAttribute(attributeName, options.attributes[attributeName]);
                }
                break;
            case DisclosureState.InvisibleUnmounted:
                expect(panel).toBe(null);
                break;
            default:
                assertNever(options.state);
        }
    }
    catch (err) {
        Error.captureStackTrace(err, assertDisclosurePanel);
        throw err;
    }
}
// ---
export function getPopoverButton() {
    return document.querySelector('[id^="headlessui-popover-button-"]');
}
export function getPopoverPanel() {
    return document.querySelector('[id^="headlessui-popover-panel-"]');
}
export function getPopoverOverlay() {
    return document.querySelector('[id^="headlessui-popover-overlay-"]');
}
// ---
export var PopoverState;
(function (PopoverState) {
    /** The popover is visible to the user. */
    PopoverState[PopoverState["Visible"] = 0] = "Visible";
    /** The popover is **not** visible to the user. It's still in the DOM, but it is hidden. */
    PopoverState[PopoverState["InvisibleHidden"] = 1] = "InvisibleHidden";
    /** The popover is **not** visible to the user. It's not in the DOM, it is unmounted. */
    PopoverState[PopoverState["InvisibleUnmounted"] = 2] = "InvisibleUnmounted";
})(PopoverState || (PopoverState = {}));
// ---
export function assertPopoverButton(options, button = getPopoverButton()) {
    try {
        if (button === null)
            return expect(button).not.toBe(null);
        // Ensure popover button have these properties
        expect(button).toHaveAttribute("id");
        switch (options.state) {
            case PopoverState.Visible:
                expect(button).toHaveAttribute("aria-controls");
                expect(button).toHaveAttribute("aria-expanded", "true");
                break;
            case PopoverState.InvisibleHidden:
                expect(button).toHaveAttribute("aria-controls");
                if (button.hasAttribute("disabled")) {
                    expect(button).not.toHaveAttribute("aria-expanded");
                }
                else {
                    expect(button).toHaveAttribute("aria-expanded", "false");
                }
                break;
            case PopoverState.InvisibleUnmounted:
                expect(button).not.toHaveAttribute("aria-controls");
                if (button.hasAttribute("disabled")) {
                    expect(button).not.toHaveAttribute("aria-expanded");
                }
                else {
                    expect(button).toHaveAttribute("aria-expanded", "false");
                }
                break;
            default:
                assertNever(options.state);
        }
        if (options.textContent) {
            expect(button).toHaveTextContent(options.textContent);
        }
        // Ensure popover button has the following attributes
        for (let attributeName in options.attributes) {
            expect(button).toHaveAttribute(attributeName, options.attributes[attributeName]);
        }
    }
    catch (err) {
        Error.captureStackTrace(err, assertPopoverButton);
        throw err;
    }
}
export function assertPopoverPanel(options, panel = getPopoverPanel()) {
    try {
        switch (options.state) {
            case PopoverState.InvisibleHidden:
                if (panel === null)
                    return expect(panel).not.toBe(null);
                assertHidden(panel);
                if (options.textContent)
                    expect(panel).toHaveTextContent(options.textContent);
                for (let attributeName in options.attributes) {
                    expect(panel).toHaveAttribute(attributeName, options.attributes[attributeName]);
                }
                break;
            case PopoverState.Visible:
                if (panel === null)
                    return expect(panel).not.toBe(null);
                assertVisible(panel);
                if (options.textContent)
                    expect(panel).toHaveTextContent(options.textContent);
                for (let attributeName in options.attributes) {
                    expect(panel).toHaveAttribute(attributeName, options.attributes[attributeName]);
                }
                break;
            case PopoverState.InvisibleUnmounted:
                expect(panel).toBe(null);
                break;
            default:
                assertNever(options.state);
        }
    }
    catch (err) {
        Error.captureStackTrace(err, assertPopoverPanel);
        throw err;
    }
}
// ---
export function assertLabelValue(element, value) {
    if (element === null)
        return expect(element).not.toBe(null);
    if (element.hasAttribute("aria-labelledby")) {
        let ids = element.getAttribute("aria-labelledby").split(" ");
        expect(ids.map((id) => document.getElementById(id)?.textContent).join(" ")).toEqual(value);
        return;
    }
    if (element.hasAttribute("aria-label")) {
        expect(element).toHaveAttribute("aria-label", value);
        return;
    }
    if (element.hasAttribute("id") &&
        document.querySelectorAll(`[for="${element.id}"]`).length > 0) {
        expect(document.querySelector(`[for="${element.id}"]`)).toHaveTextContent(value);
        return;
    }
    expect(element).toHaveTextContent(value);
}
// ---
export function assertDescriptionValue(element, value) {
    if (element === null)
        return expect(element).not.toBe(null);
    let id = element.getAttribute("aria-describedby");
    expect(document.getElementById(id)?.textContent).toEqual(value);
}
// ---
export function getDialog() {
    return document.querySelector('[role="dialog"]');
}
export function getDialogs() {
    return Array.from(document.querySelectorAll('[role="dialog"]'));
}
export function getDialogTitle() {
    return document.querySelector('[id^="headlessui-dialog-title-"]');
}
export function getDialogDescription() {
    return document.querySelector('[id^="headlessui-description-"]');
}
export function getDialogOverlay() {
    return document.querySelector('[id^="headlessui-dialog-overlay-"]');
}
export function getDialogOverlays() {
    return Array.from(document.querySelectorAll('[id^="headlessui-dialog-overlay-"]'));
}
// ---
export var DialogState;
(function (DialogState) {
    /** The dialog is visible to the user. */
    DialogState[DialogState["Visible"] = 0] = "Visible";
    /** The dialog is **not** visible to the user. It's still in the DOM, but it is hidden. */
    DialogState[DialogState["InvisibleHidden"] = 1] = "InvisibleHidden";
    /** The dialog is **not** visible to the user. It's not in the DOM, it is unmounted. */
    DialogState[DialogState["InvisibleUnmounted"] = 2] = "InvisibleUnmounted";
})(DialogState || (DialogState = {}));
// ---
export function assertDialog(options, dialog = getDialog()) {
    try {
        switch (options.state) {
            case DialogState.InvisibleHidden:
                if (dialog === null)
                    return expect(dialog).not.toBe(null);
                assertHidden(dialog);
                expect(dialog).toHaveAttribute("role", "dialog");
                expect(dialog).not.toHaveAttribute("aria-modal", "true");
                if (options.textContent)
                    expect(dialog).toHaveTextContent(options.textContent);
                for (let attributeName in options.attributes) {
                    expect(dialog).toHaveAttribute(attributeName, options.attributes[attributeName]);
                }
                break;
            case DialogState.Visible:
                if (dialog === null)
                    return expect(dialog).not.toBe(null);
                assertVisible(dialog);
                expect(dialog).toHaveAttribute("role", "dialog");
                expect(dialog).toHaveAttribute("aria-modal", "true");
                if (options.textContent)
                    expect(dialog).toHaveTextContent(options.textContent);
                for (let attributeName in options.attributes) {
                    expect(dialog).toHaveAttribute(attributeName, options.attributes[attributeName]);
                }
                break;
            case DialogState.InvisibleUnmounted:
                expect(dialog).toBe(null);
                break;
            default:
                assertNever(options.state);
        }
    }
    catch (err) {
        Error.captureStackTrace(err, assertDialog);
        throw err;
    }
}
export function assertDialogTitle(options, title = getDialogTitle(), dialog = getDialog()) {
    try {
        switch (options.state) {
            case DialogState.InvisibleHidden:
                if (title === null)
                    return expect(title).not.toBe(null);
                if (dialog === null)
                    return expect(dialog).not.toBe(null);
                assertHidden(title);
                expect(title).toHaveAttribute("id");
                expect(dialog).toHaveAttribute("aria-labelledby", title.id);
                if (options.textContent)
                    expect(title).toHaveTextContent(options.textContent);
                for (let attributeName in options.attributes) {
                    expect(title).toHaveAttribute(attributeName, options.attributes[attributeName]);
                }
                break;
            case DialogState.Visible:
                if (title === null)
                    return expect(title).not.toBe(null);
                if (dialog === null)
                    return expect(dialog).not.toBe(null);
                assertVisible(title);
                expect(title).toHaveAttribute("id");
                expect(dialog).toHaveAttribute("aria-labelledby", title.id);
                if (options.textContent)
                    expect(title).toHaveTextContent(options.textContent);
                for (let attributeName in options.attributes) {
                    expect(title).toHaveAttribute(attributeName, options.attributes[attributeName]);
                }
                break;
            case DialogState.InvisibleUnmounted:
                expect(title).toBe(null);
                break;
            default:
                assertNever(options.state);
        }
    }
    catch (err) {
        Error.captureStackTrace(err, assertDialogTitle);
        throw err;
    }
}
export function assertDialogDescription(options, description = getDialogDescription(), dialog = getDialog()) {
    try {
        switch (options.state) {
            case DialogState.InvisibleHidden:
                if (description === null)
                    return expect(description).not.toBe(null);
                if (dialog === null)
                    return expect(dialog).not.toBe(null);
                assertHidden(description);
                expect(description).toHaveAttribute("id");
                expect(dialog).toHaveAttribute("aria-describedby", description.id);
                if (options.textContent)
                    expect(description).toHaveTextContent(options.textContent);
                for (let attributeName in options.attributes) {
                    expect(description).toHaveAttribute(attributeName, options.attributes[attributeName]);
                }
                break;
            case DialogState.Visible:
                if (description === null)
                    return expect(description).not.toBe(null);
                if (dialog === null)
                    return expect(dialog).not.toBe(null);
                assertVisible(description);
                expect(description).toHaveAttribute("id");
                expect(dialog).toHaveAttribute("aria-describedby", description.id);
                if (options.textContent)
                    expect(description).toHaveTextContent(options.textContent);
                for (let attributeName in options.attributes) {
                    expect(description).toHaveAttribute(attributeName, options.attributes[attributeName]);
                }
                break;
            case DialogState.InvisibleUnmounted:
                expect(description).toBe(null);
                break;
            default:
                assertNever(options.state);
        }
    }
    catch (err) {
        Error.captureStackTrace(err, assertDialogDescription);
        throw err;
    }
}
export function assertDialogOverlay(options, overlay = getDialogOverlay()) {
    try {
        switch (options.state) {
            case DialogState.InvisibleHidden:
                if (overlay === null)
                    return expect(overlay).not.toBe(null);
                assertHidden(overlay);
                if (options.textContent)
                    expect(overlay).toHaveTextContent(options.textContent);
                for (let attributeName in options.attributes) {
                    expect(overlay).toHaveAttribute(attributeName, options.attributes[attributeName]);
                }
                break;
            case DialogState.Visible:
                if (overlay === null)
                    return expect(overlay).not.toBe(null);
                assertVisible(overlay);
                if (options.textContent)
                    expect(overlay).toHaveTextContent(options.textContent);
                for (let attributeName in options.attributes) {
                    expect(overlay).toHaveAttribute(attributeName, options.attributes[attributeName]);
                }
                break;
            case DialogState.InvisibleUnmounted:
                expect(overlay).toBe(null);
                break;
            default:
                assertNever(options.state);
        }
    }
    catch (err) {
        Error.captureStackTrace(err, assertDialogOverlay);
        throw err;
    }
}
// ---
export function getRadioGroup() {
    return document.querySelector('[role="radiogroup"]');
}
export function getRadioGroupLabel() {
    return document.querySelector('[id^="headlessui-label-"]');
}
export function getRadioGroupOptions() {
    return Array.from(document.querySelectorAll('[id^="headlessui-radiogroup-option-"]'));
}
// ---
export function assertRadioGroupLabel(options, label = getRadioGroupLabel(), radioGroup = getRadioGroup()) {
    try {
        if (label === null)
            return expect(label).not.toBe(null);
        if (radioGroup === null)
            return expect(radioGroup).not.toBe(null);
        expect(label).toHaveAttribute("id");
        expect(radioGroup).toHaveAttribute("aria-labelledby", label.id);
        if (options.textContent)
            expect(label).toHaveTextContent(options.textContent);
        for (let attributeName in options.attributes) {
            expect(label).toHaveAttribute(attributeName, options.attributes[attributeName]);
        }
    }
    catch (err) {
        Error.captureStackTrace(err, assertRadioGroupLabel);
        throw err;
    }
}
// ---
export function getTabList() {
    return document.querySelector('[role="tablist"]');
}
export function getTabs() {
    return Array.from(document.querySelectorAll('[id^="headlessui-tabs-tab-"]'));
}
export function getPanels() {
    return Array.from(document.querySelectorAll('[id^="headlessui-tabs-panel-"]'));
}
// ---
export function assertTabs({ active, orientation = "horizontal", }, list = getTabList(), tabs = getTabs(), panels = getPanels()) {
    try {
        if (list === null)
            return expect(list).not.toBe(null);
        expect(list).toHaveAttribute("role", "tablist");
        expect(list).toHaveAttribute("aria-orientation", orientation);
        let activeTab = tabs.find((tab) => tab.dataset.headlessuiIndex === "" + active);
        let activePanel = panels.find((panel) => panel.dataset.headlessuiIndex === "" + active);
        for (let tab of tabs) {
            expect(tab).toHaveAttribute("id");
            expect(tab).toHaveAttribute("role", "tab");
            expect(tab).toHaveAttribute("type", "button");
            if (tab === activeTab) {
                expect(tab).toHaveAttribute("aria-selected", "true");
                expect(tab).toHaveAttribute("tabindex", "0");
            }
            else {
                expect(tab).toHaveAttribute("aria-selected", "false");
                expect(tab).toHaveAttribute("tabindex", "-1");
            }
            if (tab.hasAttribute("aria-controls")) {
                let controlsId = tab.getAttribute("aria-controls");
                let panel = document.getElementById(controlsId);
                expect(panel).not.toBe(null);
                expect(panels).toContain(panel);
                expect(panel).toHaveAttribute("aria-labelledby", tab.id);
            }
        }
        for (let panel of panels) {
            expect(panel).toHaveAttribute("id");
            expect(panel).toHaveAttribute("role", "tabpanel");
            let controlledById = panel.getAttribute("aria-labelledby");
            let tab = document.getElementById(controlledById);
            expect(tabs).toContain(tab);
            expect(tab).toHaveAttribute("aria-controls", panel.id);
            if (panel === activePanel) {
                expect(panel).toHaveAttribute("tabindex", "0");
            }
            else {
                expect(panel).toHaveAttribute("tabindex", "-1");
            }
        }
    }
    catch (err) {
        Error.captureStackTrace(err, assertTabs);
        throw err;
    }
}
// ---
export function assertActiveElement(element) {
    try {
        if (element === null)
            return expect(element).not.toBe(null);
        try {
            // Jest has a weird bug:
            //   "Cannot assign to read only property 'Symbol(impl)' of object '[object DOMImplementation]'"
            // when this assertion fails.
            // Therefore we will catch it when something goes wrong, and just look at the outerHTML string.
            expect(document.activeElement).toBe(element);
        }
        catch (err) {
            expect(document.activeElement?.outerHTML).toBe(element.outerHTML);
        }
    }
    catch (err) {
        Error.captureStackTrace(err, assertActiveElement);
        throw err;
    }
}
export function assertContainsActiveElement(element) {
    try {
        if (element === null)
            return expect(element).not.toBe(null);
        expect(element.contains(document.activeElement)).toBe(true);
    }
    catch (err) {
        Error.captureStackTrace(err, assertContainsActiveElement);
        throw err;
    }
}
// ---
export function assertHidden(element) {
    try {
        if (element === null)
            return expect(element).not.toBe(null);
        expect(element).toHaveAttribute("hidden");
        expect(element).toHaveStyle({ display: "none" });
    }
    catch (err) {
        Error.captureStackTrace(err, assertHidden);
        throw err;
    }
}
export function assertVisible(element) {
    try {
        if (element === null)
            return expect(element).not.toBe(null);
        expect(element).not.toHaveAttribute("hidden");
        expect(element).not.toHaveStyle({ display: "none" });
    }
    catch (err) {
        Error.captureStackTrace(err, assertVisible);
        throw err;
    }
}
// ---
export function assertFocusable(element) {
    try {
        if (element === null)
            return expect(element).not.toBe(null);
        expect(isFocusableElement(element, FocusableMode.Strict)).toBe(true);
    }
    catch (err) {
        Error.captureStackTrace(err, assertFocusable);
        throw err;
    }
}
export function assertNotFocusable(element) {
    try {
        if (element === null)
            return expect(element).not.toBe(null);
        expect(isFocusableElement(element, FocusableMode.Strict)).toBe(false);
    }
    catch (err) {
        Error.captureStackTrace(err, assertNotFocusable);
        throw err;
    }
}
// ---
export function getByText(text) {
    let walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, {
        acceptNode(node) {
            if (node.children.length > 0)
                return NodeFilter.FILTER_SKIP;
            return NodeFilter.FILTER_ACCEPT;
        },
    });
    while (walker.nextNode()) {
        if (walker.currentNode.textContent === text)
            return walker.currentNode;
    }
    return null;
}
// ---
export function getComboboxLabel() {
    return document.querySelector('label,[id^="headlessui-combobox-label"]');
}
export function getComboboxButton() {
    return document.querySelector('button,[role="button"],[id^="headlessui-combobox-button-"]');
}
export function getComboboxButtons() {
    return Array.from(document.querySelectorAll('button,[role="button"]'));
}
export function getComboboxInput() {
    return document.querySelector('[role="combobox"]');
}
export function getCombobox() {
    return document.querySelector('[role="listbox"]');
}
export function getComboboxInputs() {
    return Array.from(document.querySelectorAll('[role="combobox"]'));
}
export function getComboboxes() {
    return Array.from(document.querySelectorAll('[role="listbox"]'));
}
export function getComboboxOptions() {
    return Array.from(document.querySelectorAll('[role="option"]'));
}
// ---
export var ComboboxState;
(function (ComboboxState) {
    /** The combobox is visible to the user. */
    ComboboxState[ComboboxState["Visible"] = 0] = "Visible";
    /** The combobox is **not** visible to the user. It's still in the DOM, but it is hidden. */
    ComboboxState[ComboboxState["InvisibleHidden"] = 1] = "InvisibleHidden";
    /** The combobox is **not** visible to the user. It's not in the DOM, it is unmounted. */
    ComboboxState[ComboboxState["InvisibleUnmounted"] = 2] = "InvisibleUnmounted";
})(ComboboxState || (ComboboxState = {}));
export var ComboboxMode;
(function (ComboboxMode) {
    /** The combobox is in the `single` mode. */
    ComboboxMode[ComboboxMode["Single"] = 0] = "Single";
    /** The combobox is in the `multiple` mode. */
    ComboboxMode[ComboboxMode["Multiple"] = 1] = "Multiple";
})(ComboboxMode || (ComboboxMode = {}));
export function assertCombobox(options, combobox = getComboboxInput()) {
    try {
        switch (options.state) {
            case ComboboxState.InvisibleHidden:
                if (combobox === null)
                    return expect(combobox).not.toBe(null);
                assertHidden(combobox);
                expect(combobox).toHaveAttribute('role', 'combobox');
                if (options.textContent)
                    expect(combobox).toHaveTextContent(options.textContent);
                for (let attributeName in options.attributes) {
                    expect(combobox).toHaveAttribute(attributeName, options.attributes[attributeName]);
                }
                break;
            case ComboboxState.Visible:
                if (combobox === null)
                    return expect(combobox).not.toBe(null);
                assertVisible(combobox);
                expect(combobox).toHaveAttribute('role', 'combobox');
                if (options.mode && options.mode === ComboboxMode.Multiple) {
                    expect(combobox).toHaveAttribute('aria-multiselectable', 'true');
                }
                if (options.textContent)
                    expect(combobox).toHaveTextContent(options.textContent);
                for (let attributeName in options.attributes) {
                    expect(combobox).toHaveAttribute(attributeName, options.attributes[attributeName]);
                }
                break;
            case ComboboxState.InvisibleUnmounted:
                expect(combobox).toBe(null);
                break;
            default:
                assertNever(options.state);
        }
    }
    catch (err) {
        if (err instanceof Error)
            Error.captureStackTrace(err, assertCombobox);
        throw err;
    }
}
export function assertComboboxInput(options, input = getComboboxInput()) {
    try {
        if (input === null)
            return expect(input).not.toBe(null);
        // Ensure combobox input has these properties
        expect(input).toHaveAttribute('id');
        switch (options.state) {
            case ComboboxState.Visible:
                expect(input).toHaveAttribute('aria-controls');
                expect(input).toHaveAttribute('aria-expanded', 'true');
                break;
            case ComboboxState.InvisibleHidden:
                expect(input).toHaveAttribute('aria-controls');
                if (input.hasAttribute('disabled')) {
                    expect(input).not.toHaveAttribute('aria-expanded');
                }
                else {
                    expect(input).toHaveAttribute('aria-expanded', 'false');
                }
                break;
            case ComboboxState.InvisibleUnmounted:
                expect(input).not.toHaveAttribute('aria-controls');
                if (input.hasAttribute('disabled')) {
                    expect(input).not.toHaveAttribute('aria-expanded');
                }
                else {
                    expect(input).toHaveAttribute('aria-expanded', 'false');
                }
                break;
            default:
                assertNever(options.state);
        }
        // Ensure combobox input has the following attributes
        for (let attributeName in options.attributes) {
            expect(input).toHaveAttribute(attributeName, options.attributes[attributeName]);
        }
    }
    catch (err) {
        if (err instanceof Error)
            Error.captureStackTrace(err, assertComboboxInput);
        throw err;
    }
}
export function assertComboboxList(options, listbox = getCombobox()) {
    try {
        switch (options.state) {
            case ComboboxState.InvisibleHidden:
                if (listbox === null)
                    return expect(listbox).not.toBe(null);
                assertHidden(listbox);
                expect(listbox).toHaveAttribute('aria-labelledby');
                expect(listbox).toHaveAttribute('role', 'listbox');
                if (options.textContent)
                    expect(listbox).toHaveTextContent(options.textContent);
                for (let attributeName in options.attributes) {
                    expect(listbox).toHaveAttribute(attributeName, options.attributes[attributeName]);
                }
                break;
            case ComboboxState.Visible:
                if (listbox === null)
                    return expect(listbox).not.toBe(null);
                assertVisible(listbox);
                expect(listbox).toHaveAttribute('aria-labelledby');
                expect(listbox).toHaveAttribute('role', 'listbox');
                if (options.textContent)
                    expect(listbox).toHaveTextContent(options.textContent);
                for (let attributeName in options.attributes) {
                    expect(listbox).toHaveAttribute(attributeName, options.attributes[attributeName]);
                }
                break;
            case ComboboxState.InvisibleUnmounted:
                expect(listbox).toBe(null);
                break;
            default:
                assertNever(options.state);
        }
    }
    catch (err) {
        if (err instanceof Error)
            Error.captureStackTrace(err, assertCombobox);
        throw err;
    }
}
export function assertComboboxButton(options, button = getComboboxButton()) {
    try {
        if (button === null)
            return expect(button).not.toBe(null);
        // Ensure menu button have these properties
        expect(button).toHaveAttribute('id');
        expect(button).toHaveAttribute('aria-haspopup');
        switch (options.state) {
            case ComboboxState.Visible:
                expect(button).toHaveAttribute('aria-controls');
                expect(button).toHaveAttribute('aria-expanded', 'true');
                break;
            case ComboboxState.InvisibleHidden:
                expect(button).toHaveAttribute('aria-controls');
                if (button.hasAttribute('disabled')) {
                    expect(button).not.toHaveAttribute('aria-expanded');
                }
                else {
                    expect(button).toHaveAttribute('aria-expanded', 'false');
                }
                break;
            case ComboboxState.InvisibleUnmounted:
                expect(button).not.toHaveAttribute('aria-controls');
                if (button.hasAttribute('disabled')) {
                    expect(button).not.toHaveAttribute('aria-expanded');
                }
                else {
                    expect(button).toHaveAttribute('aria-expanded', 'false');
                }
                break;
            default:
                assertNever(options.state);
        }
        if (options.textContent) {
            expect(button).toHaveTextContent(options.textContent);
        }
        // Ensure menu button has the following attributes
        for (let attributeName in options.attributes) {
            expect(button).toHaveAttribute(attributeName, options.attributes[attributeName]);
        }
    }
    catch (err) {
        if (err instanceof Error)
            Error.captureStackTrace(err, assertComboboxButton);
        throw err;
    }
}
export function assertComboboxLabel(options, label = getComboboxLabel()) {
    try {
        if (label === null)
            return expect(label).not.toBe(null);
        // Ensure menu button have these properties
        expect(label).toHaveAttribute('id');
        if (options.textContent) {
            expect(label).toHaveTextContent(options.textContent);
        }
        if (options.tag) {
            expect(label.tagName.toLowerCase()).toBe(options.tag);
        }
        // Ensure menu button has the following attributes
        for (let attributeName in options.attributes) {
            expect(label).toHaveAttribute(attributeName, options.attributes[attributeName]);
        }
    }
    catch (err) {
        if (err instanceof Error)
            Error.captureStackTrace(err, assertComboboxLabel);
        throw err;
    }
}
export function assertComboboxButtonLinkedWithCombobox(button = getComboboxButton(), combobox = getCombobox()) {
    try {
        if (button === null)
            return expect(button).not.toBe(null);
        if (combobox === null)
            return expect(combobox).not.toBe(null);
        // Ensure link between button & combobox is correct
        expect(button).toHaveAttribute('aria-controls', combobox.getAttribute('id'));
        expect(combobox).toHaveAttribute('aria-labelledby', button.getAttribute('id'));
    }
    catch (err) {
        if (err instanceof Error)
            Error.captureStackTrace(err, assertComboboxButtonLinkedWithCombobox);
        throw err;
    }
}
export function assertComboboxLabelLinkedWithCombobox(label = getComboboxLabel(), combobox = getComboboxInput()) {
    try {
        if (label === null)
            return expect(label).not.toBe(null);
        if (combobox === null)
            return expect(combobox).not.toBe(null);
        expect(combobox).toHaveAttribute('aria-labelledby', label.getAttribute('id'));
    }
    catch (err) {
        if (err instanceof Error)
            Error.captureStackTrace(err, assertComboboxLabelLinkedWithCombobox);
        throw err;
    }
}
export function assertComboboxButtonLinkedWithComboboxLabel(button = getComboboxButton(), label = getComboboxLabel()) {
    try {
        if (button === null)
            return expect(button).not.toBe(null);
        if (label === null)
            return expect(label).not.toBe(null);
        // Ensure link between button & label is correct
        expect(button).toHaveAttribute('aria-labelledby', `${label.id} ${button.id}`);
    }
    catch (err) {
        if (err instanceof Error)
            Error.captureStackTrace(err, assertComboboxButtonLinkedWithComboboxLabel);
        throw err;
    }
}
export function assertActiveComboboxOption(item, combobox = getComboboxInput()) {
    try {
        if (combobox === null)
            return expect(combobox).not.toBe(null);
        if (item === null)
            return expect(item).not.toBe(null);
        // Ensure link between combobox & combobox item is correct
        expect(combobox).toHaveAttribute('aria-activedescendant', item.getAttribute('id'));
    }
    catch (err) {
        if (err instanceof Error)
            Error.captureStackTrace(err, assertActiveComboboxOption);
        throw err;
    }
}
export function assertNotActiveComboboxOption(item, combobox = getComboboxInput()) {
    try {
        if (combobox === null)
            return expect(combobox).not.toBe(null);
        if (item === null)
            return expect(item).not.toBe(null);
        // Ensure link between combobox & combobox item does not exist
        expect(combobox).not.toHaveAttribute('aria-activedescendant', item.getAttribute('id'));
    }
    catch (err) {
        if (err instanceof Error)
            Error.captureStackTrace(err, assertNotActiveComboboxOption);
        throw err;
    }
}
export function assertNoActiveComboboxOption(combobox = getComboboxInput()) {
    try {
        if (combobox === null)
            return expect(combobox).not.toBe(null);
        // Ensure we don't have an active combobox
        expect(combobox).not.toHaveAttribute('aria-activedescendant');
    }
    catch (err) {
        if (err instanceof Error)
            Error.captureStackTrace(err, assertNoActiveComboboxOption);
        throw err;
    }
}
export function assertNoSelectedComboboxOption(items = getComboboxOptions()) {
    try {
        for (let item of items)
            expect(item).toHaveAttribute('aria-selected', 'false');
    }
    catch (err) {
        if (err instanceof Error)
            Error.captureStackTrace(err, assertNoSelectedComboboxOption);
        throw err;
    }
}
export function assertComboboxOption(item, options) {
    try {
        if (item === null)
            return expect(item).not.toBe(null);
        // Check that some attributes exists, doesn't really matter what the values are at this point in
        // time, we just require them.
        expect(item).toHaveAttribute('id');
        // Check that we have the correct values for certain attributes
        expect(item).toHaveAttribute('role', 'option');
        if (!item.getAttribute('aria-disabled'))
            expect(item).toHaveAttribute('tabindex', '-1');
        // Ensure combobox button has the following attributes
        if (!options)
            return;
        for (let attributeName in options.attributes) {
            expect(item).toHaveAttribute(attributeName, options.attributes[attributeName]);
        }
        if (options.tag) {
            expect(item.tagName.toLowerCase()).toBe(options.tag);
        }
        if (options.selected != null) {
            return expect(item).toHaveAttribute('aria-selected', options.selected ? 'true' : 'false');
        }
    }
    catch (err) {
        if (err instanceof Error)
            Error.captureStackTrace(err, assertComboboxOption);
        throw err;
    }
}