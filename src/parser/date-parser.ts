module DateSlider.Parser {
    export class DateParser implements IParser {
        public parse(input: Date): DateSliderModel {
            return new DateSliderModel();
        }
    }
}
