module DateSliderTest.Integration.ParseFormat {
    describe("Unix timestamp parsing and formatting.", () => {
        let parser: DateSlider.Parser.UnixTimestampParser;
        let formatter: DateSlider.Formatter.UnixTimestampFormatter;

        beforeEach(() => {
            parser = new DateSlider.Parser.UnixTimestampParser();
            formatter = new DateSlider.Formatter.UnixTimestampFormatter();
        });

        let runs = [
            { input: null,      output: null, description: "Invalid timestamp: null." },
            { input: true,      output: null, description: "Invalid timestamp: true." },
            { input: false,     output: null, description: "Invalid timestamp: false." },
            { input: undefined, output: null, description: "Invalid timestamp: undefined." },
            { input: "alma",    output: null, description: "Invalid timestamp: string." },
            { input: "",        output: null, description: "Invalid timestamp: empty string." },
            { input: {} as any, output: null, description: "Invalid timestamp: object." },
            { input: function() {} as any, output: null, description: "Invalid timestamp: function." },
            { input: -31536000, output: -31536000, description: "Valid timestamp: negative." },
            { input: 0,         output: 0,         description: "Valid timestamp." },
            { input: 946684800, output: 946684800, description: "Valid timestamp." },
            { input: 978220800, output: 978220800, description: "Valid timestamp." },
            { input: 946729830, output: 946729830, description: "Valid timestamp." },
            { input: 946771199, output: 946771199, description: "Valid timestamp." },
        ];

        runs.forEach((run) => {
            it(run.description, () => {
                expect(formatter.format(parser.parse(run.input), null)).toBe(run.output);
            });
        });
    });
}
