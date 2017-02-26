module DateSlider.Parser {
    export class DateParserOptions {
        constructor(
            public type: "local" | "utc",
        ) {
        }
    }

    export class DateParser implements IParser {
        public parse(input: Date, options: DateParserOptions): DateSliderModel {
            return new DateSliderModel(null, input);
        }
    }
}
