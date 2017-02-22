module DateSlider {
    export class DateSliderModel {
        constructor(
            public year?: number,
            /** In the range [1, 12]. */
            public month?: number,
            /** In the range of [1, 31]. */
            public day?: number,
            public hour?: number,
            public minute?: number,
            public second?: number,
        ) {
        }
    }
}