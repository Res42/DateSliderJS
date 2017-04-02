module DateSlider {
    export function create(element: HTMLElement, options?: DateSliderOptions): DateSliderInstance {
        if (!element || !(element instanceof HTMLElement)) {
            throw new Error("DateSlider.create(): Given HTML element is invalid.");
        }

        let opts = Helpers.deepMerge({}, defaults, options);

        for (let i = 0; i < opts.sliders.length; i++) {
            let sliderDefaults = defaultSilderOptions[opts.sliders[i].type];
            if (sliderDefaults) {
                opts.sliders[i] = Helpers.deepMerge({}, sliderDefaults, opts.sliders[i]);
            }
        }

        return new DateSliderInstance(element, opts);
    }

    // TODO
    // date parser / formatter + tests
    // string parser / formatter + tests
    // range interval
    // test range
    // demo: out of the box, full customization
    // slider distance of mouse from handle -> slowness of steps
    // jquery, angular integration
    // expanding slider
    // what is better? switch case or dictionary?
}
