module DateSlider {
    export function create(element: HTMLElement, options: DateSliderOptions): DateSliderInstance {
        return new DateSliderInstance(element, options);
    }
}
