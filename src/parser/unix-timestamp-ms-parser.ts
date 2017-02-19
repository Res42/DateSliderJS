module DateSlider.Parser {
    export class UnixTimestampMsParser implements Parser {
        public parse(input: number | string): DateSliderModel {
            return new DateSliderModel();
        }
    }
}
