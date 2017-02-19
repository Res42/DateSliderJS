module DateSlider.Parser {
    export interface Parser {
        /**
         * Parses a date/time input by a format and a culture.
         * @argument input
         * @argument format Optional. The format from DateSliderOptions.inputStringFormat.
         * @argument culture Optional. The culture from DateSliderOptions.culture.
         * @returns A DateSliderModel object representing a date/time.
         */
        parse(input: any, format?: string, culture?: string): DateSliderModel;
    }
}
