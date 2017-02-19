module DateSlider.Parser {
    export class StringParser implements Parser {
        public parse(input: string, format: string, culture?: string): DateSliderModel {
            return new DateSliderModel();
        }
    }
}
