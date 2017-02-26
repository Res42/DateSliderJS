module DateSlider.Parser {
    export interface IParser {
        /**
         * Parses a date/time input by a format and a culture.
         * @argument input
         * @argument options
         * @returns A DateSliderModel object representing a date/time. If the input is invalid it returns null.
         */
        parse(input: any, options: any): DateSliderModel;
    }
}
