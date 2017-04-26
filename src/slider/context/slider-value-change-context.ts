/// <reference path="../../date-slider-event-context.ts" />

module DateSlider.Slider.Context {
    export class SliderValueChangeContext extends DateSliderEventContext {
        constructor(
            public start: { oldValue: number, newValue: number},
            public end?: { oldValue: number, newValue: number},
        ) {
            super();
        }
    }
}
