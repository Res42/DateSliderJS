module DateSlider.Parser {
    export class CustomParser implements IParser {
        constructor(
            public parse: (input: any, options: any) => DateSliderModel,
        ) {
        }
    }
}
