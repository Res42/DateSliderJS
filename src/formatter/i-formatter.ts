module DateSlider.Formatter {
    export interface IFormatter {
        /**
         * Formats a DateSliderModel by a format and a culture.
         * @argument input
         * @argument format The format from DateSliderOptions.outputStringFormat.
         * @argument culture The culture from DateSliderOptions.culture.
         * @returns A custom thing representing a date/time.
         */
        format(input: DateSliderModel, options: any): any;
    }
}
