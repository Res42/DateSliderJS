module DateSlider.Formatter {
    export abstract class AbstractFormatter {

        public format(input: DateSliderModel, invalidValueOption: DateSliderInvalidOutput, format?: string, culture?: string): any | DateSliderInvalidOutput {
            if (input === null) {
                return invalidValueOption;
            }

            return this.formatInput(input, format, culture);
        }

        /**
         * Formats a DateSliderModel by a format and a culture.
         * @argument input
         * @argument format The format from DateSliderOptions.outputStringFormat.
         * @argument culture The culture from DateSliderOptions.culture.
         * @returns A custom thing representing a date/time.
         */
        protected abstract formatInput(input: DateSliderModel, format?: string, culture?: string): any;
    }
}
