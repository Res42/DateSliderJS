module DateSlider.Parser {
    export interface IParser {
        /**
         * Parses a date/time input by a format and a culture.
         * @argument input
         * @argument format Optional. The format from DateSliderOptions.inputStringFormat.
         * @argument culture Optional. The culture from DateSliderOptions.culture.
         * @returns A DateSliderModel object representing a date/time. If the input is invalid it returns null.
         */
        parse(input: any, format?: string, culture?: string): DateSliderModel;
    }
}
