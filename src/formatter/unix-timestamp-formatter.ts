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
            let timestampInMs = Date.UTC(input.model.year, input.model.month - 1, input.model.day, input.model.hour, input.model.minute, input.model.second, 0);
            return timestampInMs / (options.type === "seconds" ? 1000 : 1);
        }
    }
}
