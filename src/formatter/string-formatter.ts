module DateSlider.Formatter {
    export class StringFormatterOptions {
        constructor(
            public format: string,
            public culture: string,
        ) {
        }
    }

    export class StringFormatter implements IFormatter {
        /**
         * Formats a string from a DateSliderModel object.
         */
        public format(input: DateSliderModel, options: StringFormatterOptions): string {
            return "null";
        }
    }
}
