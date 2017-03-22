module DateSlider {
    export class DateSliderModel {
        constructor(
            public model: InnerModel | null,
            public rawValue: any,
        ) {
        }
    }

    export class InnerModel {
        constructor(
            public year = 0,
            /** In the range [1, 12]. */
            public month = 1,
            /** In the range of [1, 31]. */
            public day = 1,
            public hour = 0,
            public minute = 0,
            public second = 0,
            public timezone = "",
        ) {
        }
    }
}
