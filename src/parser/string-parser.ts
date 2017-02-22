module DateSlider.Parser {
    export class StringParser implements IParser {
        public parse(input: string, format: string, culture?: string): DateSliderModel {
            return new DateSliderModel();
        }
    }
}
