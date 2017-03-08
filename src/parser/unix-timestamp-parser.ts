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
            if (typeof input !== "number") {
                throw new Error("Cannot parse non-number to unix timestamp.");
            }

            let date = new Date(input * (options.type === "seconds" ? 1000 : 1));
            let model = new InnerModel(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
            return new DateSliderModel(model, input);
        }
    }
}
