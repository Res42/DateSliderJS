module DateSlider.Formatter {
    export class DateFormatterOptions {
        constructor(
            public type: "local" | "utc",
        ) {
        }
    }

    export class DateFormatter implements IFormatter {
        /**
         * Formats a Date object from a DateSliderModel object.
         */
        public format(input: DateSliderModel, options: DateFormatterOptions): Date {
            return new Date();
        }
    }
}
