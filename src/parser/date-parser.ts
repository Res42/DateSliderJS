module DateSlider.Parser {
    export class DateParser implements IParser {
        // TODO?: what to do with timezone info?
        public parse(input: Date): DateSliderModel {
            return new DateSliderModel();
        }
    }
}
