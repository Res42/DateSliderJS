module DateSlider {
    export let defaults: DateSliderOptions = {};

    export function create(element: HTMLElement, options: DateSliderOptions): DateSliderInstance {
        return new DateSliderInstance(element, mergeOptions(options, defaults));
    }

    function mergeOptions(instanceOptions: DateSliderOptions, defaultOptions: DateSliderOptions): DateSliderOptions {
        return instanceOptions;
    }

    // TODO
    // should we store the raw value? -> yes
    // return raw value if it is invalid? -> throw
    // date parse/format: utc, local? -> timezone to model
    // use abstractformatter or not? writing own formatter may be a hassle if used -> CustomFormatter/Parser should take the callback as constructor param

    // file: 'unix-timestamp-ms-formatter.ts'
    // severity: 'Error'
    // message: 'A class must be declared after its base class.'
    // at: '2,51'
    // source: 'ts' -> ///<reference ...

    //  Date.parse() or write own implementation to parse from formats -> own

    // next week -> create demo page, create DOM elements, hooks
}
