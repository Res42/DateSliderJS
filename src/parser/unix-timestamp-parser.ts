module DateSlider.Parser {
    export class UnixTimestampParserOptions {
        constructor(
            public type: "milliseconds" | "seconds",
        ) {
        }
    }

    export class UnixTimestampParser implements IParser {
        /** Parses a unix timestamp from a number. */
        public parse(input: number, options: UnixTimestampParserOptions): DateSliderModel {
            return new DateSliderModel(null, input);
        }
    }
}
