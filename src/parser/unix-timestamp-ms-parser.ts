module DateSlider.Parser {
    export class UnixTimestampMsParser implements IParser {
        public parse(input: number | string): DateSliderModel {
            return new DateSliderModel();
        }
    }
}
