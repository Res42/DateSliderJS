module DateSliderTest.Integration.ParseFormat {
    describe("Unix timestamp parsing and formatting.", () => {
        let parser: DateSlider.Parser.UnixTimestampParser;
        let formatter: DateSlider.Formatter.UnixTimestampFormatter;
        let parserOptions: DateSlider.Parser.UnixTimestampParserOptions;
        let formatterOptions: DateSlider.Formatter.UnixTimestampFormatterOptions;

        beforeEach(() => {
            parser = new DateSlider.Parser.UnixTimestampParser();
            formatter = new DateSlider.Formatter.UnixTimestampFormatter();
            parserOptions = new DateSlider.Parser.UnixTimestampParserOptions("seconds");
            formatterOptions = new DateSlider.Formatter.UnixTimestampFormatterOptions("seconds");
        });

        let runs = [
            { input: -31536000, description: "Valid timestamp: negative." },
            { input: 0,         description: "Valid timestamp." },
            { input: 946684800, description: "Valid timestamp." },
            { input: 978220800, description: "Valid timestamp." },
            { input: 946729830, description: "Valid timestamp." },
            { input: 946771199, description: "Valid timestamp." },
        ];

        runs.forEach((run) => {
            it(run.description, () => {
                expect(formatter.format(parser.parse(run.input, parserOptions), formatterOptions)).toEqual(run.input);
            });
        });
    });
}
