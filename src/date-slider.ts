module DateSlider {
    export let defaults: DateSliderOptions = {
        formatter: "timestamp",
        formatterOptions: { type: "milliseconds" },
        interval: false,
        parser: "timestamp",
        parserOptions: { type: "milliseconds" },
    };

    export let universalTimeDefaults: SliderOptions = {
        displayValueFormatter: (value: number): string => {
            let pad = (v: number): string => {
                return (0 <= v && v < 10) ? `0${v}` : v.toString();
            };
            let seconds = value % 60;
            let minutes = Math.floor(value / 60) % 60;
            let hours = Math.floor(value / 3600);
            return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        },
        type: "universal-time",
    };

    export function create(element: HTMLElement, options: DateSliderOptions): DateSliderInstance {
        if (!element) {
            throw new Error("DateSlider.create(): Given HTML element is invalid.");
        }

        let opts = Helpers.deepMerge({}, defaults, options);

        for (let i = 0; i < opts.sliders.length; i++) {
            switch (opts.sliders[i].type) {
                case "universal-time":
                    opts.sliders[i] = Helpers.deepMerge({}, universalTimeDefaults, opts.sliders[i]);
                    break;
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
    // mark values next to the slider
}
