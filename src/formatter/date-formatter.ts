module DateSlider.Formatter {
    export class DateFormatter extends AbstractFormatter {
        /**
         * Formats a Date object from a DateSliderModel object.
         */
        public formatInput(input: DateSliderModel): Date | DateSliderInvalidOutput {
            // TODO: utc, local? as
            return new Date();
        }
    }
}
