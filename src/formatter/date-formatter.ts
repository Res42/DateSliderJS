module DateSlider.Formatter {
    export class DateFormatter extends AbstractFormatter {
        /**
         * Formats a Date object from a DateSliderModel object.
         */
        public formatInput(input: DateSliderModel): Date | DateSliderInvalidOutput {
            return new Date();
        }
    }
}
