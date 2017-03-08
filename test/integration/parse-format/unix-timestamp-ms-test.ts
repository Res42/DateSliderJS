module DateSliderTest.Integration.ParseFormat {
    describe("Unix timestamp in milliseconds parsing and formatting.", () => {
        let parser: DateSlider.Parser.UnixTimestampParser;
        let formatter: DateSlider.Formatter.UnixTimestampFormatter;
        let parserOptions: DateSlider.Parser.UnixTimestampParserOptions;
        let formatterOptions: DateSlider.Formatter.UnixTimestampFormatterOptions;

        beforeEach(() => {
            parser = new DateSlider.Parser.UnixTimestampParser();
            formatter = new DateSlider.Formatter.UnixTimestampFormatter();
            parserOptions = new DateSlider.Parser.UnixTimestampParserOptions("milliseconds");
            formatterOptions = new DateSlider.Formatter.UnixTimestampFormatterOptions("milliseconds");
        });

        let runs = [
            { input: -31536000000, output: -31536000000, description: "Valid timestamp: negative." },
            { input: 0,            output: 0,            description: "Valid timestamp." },
            { input: 946684800000, output: 946684800000, description: "Valid timestamp." },
            { input: 978220800000, output: 978220800000, description: "Valid timestamp." },
            { input: 946729830000, output: 946729830000, description: "Valid timestamp." },
            { input: 946771199000, output: 946771199000, description: "Valid timestamp." },
            { input: 946771199542, output: 946771199000, description: "Valid timestamp: rounding down milliseconds > 500." },
            { input: 946771199500, output: 946771199000, description: "Valid timestamp: rounding down milliseconds = 500." },
            { input: 946771199042, output: 946771199000, description: "Valid timestamp: rounding down milliseconds < 500." },
        ];

        runs.forEach((run) => {
            it(run.description, () => {
                expect(formatter.format(parser.parse(run.input, parserOptions), formatterOptions)).toEqual(run.output);
            });
        });
    });
}
