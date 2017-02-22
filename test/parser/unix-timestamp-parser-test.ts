module DateSliderTest.Parser {
    describe("Unix timestamp (in seconds) parser.", () => {
        let parser: DateSlider.Parser.UnixTimestampParser;

        beforeEach(() => {
            parser = new DateSlider.Parser.UnixTimestampParser();
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
            { input: -100,  output: new DateSlider.DateSliderModel(1969, 12, 31, 23, 58, 20), description: "Valid timestamp: -100." },
            { input: -1,    output: new DateSlider.DateSliderModel(1969, 12, 31, 23, 59, 59), description: "Valid timestamp: -1." },
            { input: 0,     output: new DateSlider.DateSliderModel(1970, 1, 1, 0, 0, 0),      description: "Valid timestamp: 0." },
            { input: 1,     output: new DateSlider.DateSliderModel(1970, 1, 1, 0, 0, 1),      description: "Valid timestamp: 1." },
            { input: 100,   output: new DateSlider.DateSliderModel(1970, 1, 1, 1, 40, 0),     description: "Valid timestamp: 100." },
            { input: "100", output: new DateSlider.DateSliderModel(1970, 1, 1, 1, 40, 0),     description: "Valid timestamp: number as a string." },
        ];

        runs.forEach((run) => {
            it(run.description, () => {
                expect(parser.parse(run.input)).toBe(run.output);
            });
        });
    });
}
