module DateSlider.Parser {
    export class StringParserOptions {
        constructor(
            public format: string,
            public culture: string,
        ) {
        }
    }

    export class StringParser implements IParser {
        public parse(input: string, options: StringParserOptions): DateSliderModel {
            return new DateSliderModel(null, input);
        }
    }
}
