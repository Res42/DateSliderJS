module DateSlider {
    export let defaults: DateSliderOptions = {};

    export function create(element: HTMLElement, options: DateSliderOptions): DateSliderInstance {
        return new DateSliderInstance(element, mergeOptions(options, defaults));
    }

    function mergeOptions(instanceOptions: DateSliderOptions, defaultOptions: DateSliderOptions): DateSliderOptions {
        return instanceOptions;
    }
}
