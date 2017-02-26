module DateSlider {
    export let defaults: DateSliderOptions = {};

    export function create(element: HTMLElement, options: DateSliderOptions): DateSliderInstance {
        return new DateSliderInstance(element, mergeOptions(options, defaults));
    }

    function mergeOptions(instanceOptions: DateSliderOptions, defaultOptions: DateSliderOptions): DateSliderOptions {
        return instanceOptions;
    }

    // TODO
    //  Date.parse() or write own implementation to parse from formats -> own
    // next week -> create demo page, create DOM elements, hooks
}
