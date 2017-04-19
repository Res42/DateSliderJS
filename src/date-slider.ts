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
    // test model compare methods
    // demo: out of the box, full customization
    // slider distance of mouse from handle -> slowness of steps
    // ✓ angular integration
    // ✓ expanding slider
    // ✓ when changing years or months, set maximum days to monthly maximum
    // ✓ validation: min, max, custom
    // --> slide, expand with acceleration!
    // --> slide + expand option
    // how to check timezone when comparing models?
    // ✓ angular integration: fix jumping handle.
}
