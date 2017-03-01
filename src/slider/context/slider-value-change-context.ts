/// <reference path="../../date-slider-event-context.ts" />

module DateSlider.Slider.Context {
    export class SliderValueChangeContext extends DateSliderEventContext {
        constructor(
            public oldValue: number,
            public newValue: number,
        ) {
            super();
        }
    }
}
