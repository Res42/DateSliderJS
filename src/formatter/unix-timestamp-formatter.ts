module DateSlider.Formatter {
    export class UnixTimestampFormatterOptions {
        constructor(
            public type: "milliseconds" | "seconds",
        ) {
        }
    }

    export class UnixTimestampFormatter implements IFormatter {
        /**
         * Formats a unix timestamp (in seconds) from a DateSliderModel object.
         */
        public format(input: DateSliderModel, options: UnixTimestampFormatterOptions): number {
            return 0;
        }
    }
}
