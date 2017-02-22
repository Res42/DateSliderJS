module DateSlider.Parser {
    export class StringParser implements IParser {
        // TODO?: Date.parse() or write own implementation to parse from formats
        public parse(input: string, format: string, culture?: string): DateSliderModel {
            return new DateSliderModel();
        }
    }
}
