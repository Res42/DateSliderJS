/// <reference path="../date-slider-event-context.ts" />

module DateSlider.Context {
    export class ValueChangeContext extends DateSliderEventContext {
        constructor(
            public oldValue: any,
            public newValue: any,
            public isValid: boolean,
        ) {
            super();
        }
    }
}
