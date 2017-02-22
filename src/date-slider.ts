module DateSlider {
    export let defaults: DateSliderOptions = {};

    export function create(element: HTMLElement, options: DateSliderOptions): DateSliderInstance {
        return new DateSliderInstance(element, mergeOptions(options, defaults));
    }

    function mergeOptions(instanceOptions: DateSliderOptions, defaultOptions: DateSliderOptions): DateSliderOptions {
        return instanceOptions;
    }

    // TODO
    // should we store the raw value?
    // return raw value if it is invalid?
    // date parse/format: utc, local?

    // file: 'unix-timestamp-ms-formatter.ts'
    // severity: 'Error'
    // message: 'A class must be declared after its base class.'
    // at: '2,51'
    // source: 'ts'

    //  Date.parse() or write own implementation to parse from formats
}
