module DateSliderTest.Parser {
    describe("Unix timestamp parser.", () => {
        let parser: DateSlider.Parser.UnixTimestampParser;
        let msOptions: DateSlider.Parser.UnixTimestampParserOptions;
        let secondOptions: DateSlider.Parser.UnixTimestampParserOptions;

        beforeEach(() => {
            parser = new DateSlider.Parser.UnixTimestampParser();
            msOptions = new DateSlider.Parser.UnixTimestampParserOptions("milliseconds");
            secondOptions = new DateSlider.Parser.UnixTimestampParserOptions("seconds");
        });

        let throws = [
            { input: null,      description: "Invalid timestamp: null." },
            { input: true,      description: "Invalid timestamp: true." },
            { input: false,     description: "Invalid timestamp: false." },
            { input: undefined, description: "Invalid timestamp: undefined." },
            { input: "alma",    description: "Invalid timestamp: string." },
            { input: "",        description: "Invalid timestamp: empty string." },
            { input: {} as any, description: "Invalid timestamp: object." },
            { input: "100",     description: "Invalid timestamp: number as a string." },
            { input: "100000",  description: "Invalid timestamp: number as a string." },
            { input: function() {} as any, description: "Invalid timestamp: function." },
        ];

        throws.forEach((run) => {
            it(run.description, () => {
                expect(() => parser.parse(run.input, secondOptions)).toThrow();
            });

            it(run.description, () => {
                expect(() => parser.parse(run.input, msOptions)).toThrow();
            });
        });

        let secondRuns = [
            { input: -100,  output: new DateSlider.InnerModel(1969, 12, 31, 23, 58, 20), description: "Valid second timestamp: -100." },
            { input: -1,    output: new DateSlider.InnerModel(1969, 12, 31, 23, 59, 59), description: "Valid second timestamp: -1." },
            { input: 0,     output: new DateSlider.InnerModel(1970, 1, 1, 0, 0, 0),      description: "Valid second timestamp: 0." },
            { input: 1,     output: new DateSlider.InnerModel(1970, 1, 1, 0, 0, 1),      description: "Valid second timestamp: 1." },
            { input: 100,   output: new DateSlider.InnerModel(1970, 1, 1, 0, 1, 40),     description: "Valid second timestamp: 100." },
        ];

        secondRuns.forEach((run) => {
            it(run.description, () => {
                expect(parser.parse(run.input, secondOptions).model).toEqual(run.output);
            });
        });

        let msRuns = [
            { input: -100000,   output: new DateSlider.InnerModel(1969, 12, 31, 23, 58, 20), description: "Valid millisecond timestamp: < -1000." },
            { input: -1000,     output: new DateSlider.InnerModel(1969, 12, 31, 23, 59, 59), description: "Valid millisecond timestamp: -1000." },
            { input: -999,      output: new DateSlider.InnerModel(1969, 12, 31, 23, 59, 59), description: "Valid millisecond timestamp: -999." },
            { input: -1,        output: new DateSlider.InnerModel(1969, 12, 31, 23, 59, 59), description: "Valid millisecond timestamp: -1." },
            { input: 0,         output: new DateSlider.InnerModel(1970, 1, 1, 0, 0, 0),      description: "Valid millisecond timestamp: 0." },
            { input: 1,         output: new DateSlider.InnerModel(1970, 1, 1, 0, 0, 0),      description: "Valid millisecond timestamp: 1." },
            { input: 999,       output: new DateSlider.InnerModel(1970, 1, 1, 0, 0, 0),      description: "Valid millisecond timestamp: 999." },
            { input: 1000,      output: new DateSlider.InnerModel(1970, 1, 1, 0, 0, 1),      description: "Valid millisecond timestamp: 1000." },
            { input: 100000,    output: new DateSlider.InnerModel(1970, 1, 1, 0, 1, 40),     description: "Valid millisecond timestamp: > 1000." },
        ];

        msRuns.forEach((run) => {
            it(run.description, () => {
                expect(parser.parse(run.input, msOptions).model).toEqual(run.output);
            });
        });
    });
}
