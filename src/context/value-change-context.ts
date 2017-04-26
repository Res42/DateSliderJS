/// <reference path="../date-slider-event-context.ts" />

module DateSlider.Context {
    export class ValueChangeContext extends DateSliderEventContext {
        constructor(
            public isValid: boolean,
            public start: { oldValue: number, newValue: number},
            public end?: { oldValue: number, newValue: number},
        ) {
            super();
        }
    }
}
