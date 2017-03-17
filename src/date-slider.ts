module DateSlider {
    export let defaults: DateSliderOptions = {};

    export function create(element: HTMLElement, options: DateSliderOptions): DateSliderInstance {
        if (!element) {
            throw new Error("DateSlider.create(): Given HTML element is invalid.");
        }

        return new DateSliderInstance(element, mergeOptions(options, defaults));
    }

    function mergeOptions(instanceOptions: DateSliderOptions, defaultOptions: DateSliderOptions): DateSliderOptions {
        return instanceOptions;
    }

    // TODO
    // Date.parse() or write own implementation to parse from formats -> own
    // test range
    // demo: out of the box, full customization
    // slider distance of mouse from handle -> slowness of steps
}
