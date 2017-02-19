module DateSlider.Parser {
    export class DateParser implements Parser {
        public parse(input: Date): DateSliderModel {
            return new DateSliderModel();
        }
    }
}
