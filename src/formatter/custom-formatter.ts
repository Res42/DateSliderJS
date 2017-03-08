module DateSlider.Formatter {
    export class CustomFormatter implements IFormatter {
        constructor(
            public format: (input: DateSliderModel, options: any) => any,
        ) {
        }
    }
}
