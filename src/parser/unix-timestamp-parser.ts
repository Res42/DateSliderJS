module DateSlider.Parser {
    export class UnixTimestampParser implements IParser {
        /**
         * Parses a unix timestamp (in seconds)
         * from a number or a string which can be parsed as a number.
         */
        public parse(input: number | string): DateSliderModel {
            return new DateSliderModel();
        }
    }
}
