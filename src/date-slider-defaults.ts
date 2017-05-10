module DateSlider {
    /**
     * Default options for the whole DateSlider.
     */
    export let defaults: DateSliderOptions = {
        formatter: "timestamp",
        formatterOptions: { type: "milliseconds" },
        interval: false,
        parser: "timestamp",
        parserOptions: { type: "milliseconds" },
    };

    /**
     * Default options for the universal time slider.
     */
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
        markers: {
            displayValueFormatter: (value: number, minimum: number, maximum: number): string => {
                if (value === maximum) {
                    return "24";
                }
                return (value / 3600).toString();
            },
            perpendicularOffset: 20,
            showValueMarker: (value: number, minimum: number, maximum: number): string | string[] => {
                let show: boolean;
                if (value === maximum) {
                    show = true;
                } else {
                    show = value % 3600 === 0;
                }

                return show ? "" : null;
            },
        },
        type: "universal-time",
    };

    export let monthDefaults: SliderOptions = {
        markers: {
            perpendicularOffset: -13,
            showValueMarker: (value: number, minimum: number, maximum: number): string | string[] => {
                return "inline-mark";
            },
        },
        type: "month",
    };

    export let universalDateDefaults: SliderOptions = {
        // markers: {
        //     perpendicularOffset: 20,
        //     showValueMarker: (value: number, minimum: number, maximum: number): string | string[] => {
        //         return "";
        //     },
        // },
        type: "universal-date",
    };

    export let yearDefaults: SliderOptions = {
        markers: {
            perpendicularOffset: -13,
            showValueMarker: (value: number, minimum: number, maximum: number): string | string[] => {
                return "inline-mark";
            },
        },
        movement: "slide",
        movementSpeed: 100,
        type: "year",
    };

    export let dayDefaults: SliderOptions = {
        markers: {
            perpendicularOffset: -13,
            showValueMarker: (value: number, minimum: number, maximum: number): string | string[] => {
                return "inline-mark";
            },
        },
        type: "day",
    };

    export let defaultSilderOptions: {[key: string]: SliderOptions} = {
        "day": dayDefaults,
        "month": monthDefaults,
        "universal-date": universalDateDefaults,
        "universal-time": universalTimeDefaults,
        "year": yearDefaults,
    };
}
