module DateSliderTest.Parser {
    describe("String parser.", () => {
        let parser: DateSlider.Parser.StringParser;
        let forInvalidOptions: DateSlider.Parser.StringParserOptions;

        beforeEach(() => {
            parser = new DateSlider.Parser.StringParser();
            forInvalidOptions = new DateSlider.Parser.StringParserOptions("", "");
        });

        let throws = [
            { input: -1,        options: forInvalidOptions, description: "Invalid string: number < 0." },
            { input: 0,         options: forInvalidOptions, description: "Invalid string: number = 0." },
            { input: -1,        options: forInvalidOptions, description: "Invalid string: number > 0." },
            { input: true,      options: forInvalidOptions, description: "Invalid string: true." },
            { input: false,     options: forInvalidOptions, description: "Invalid string: false." },
            { input: null,      options: forInvalidOptions, description: "Invalid string: null." },
            { input: undefined, options: forInvalidOptions, description: "Invalid string: undefined." },
            { input: {} as any, options: forInvalidOptions, description: "Invalid string: object." },
            { input: function() {} as any, options: forInvalidOptions, description: "Invalid string: function." },
        ];

        throws.forEach((run) => {
            it(run.description, () => {
                expect(() => parser.parse(run.input, run.options).model).toThrow();
            });
        });

        let runs = [
            { input: "2017-01-27",           options: new DateSlider.Parser.StringParserOptions("yyyy-MM-dd", ""), output: new DateSlider.InnerModel(2017, 1, 27, 0, 0, 0),   description: "Valid string and format: ISO 8601 date only." },
            { input: "2017-01-27 11:15Z",    options: new DateSlider.Parser.StringParserOptions("yyyy-MM-dd HH:mmK", ""), output: new DateSlider.InnerModel(2017, 1, 27, 1, 15, 0),  description: "Valid string and format: ISO 8601 date and time." },
            { input: "2017-01-27 11:15:21Z", options: new DateSlider.Parser.StringParserOptions("yyyy-MM-dd HH:mmK", ""), output: new DateSlider.InnerModel(2017, 1, 27, 1, 15, 21), description: "Valid string and format: ISO 8601 date and time with seconds." },
            { input: "2017-01-27T11:15Z",    options: new DateSlider.Parser.StringParserOptions("yyyy-MM-ddTHH:mmK", ""), output: new DateSlider.InnerModel(2017, 1, 27, 1, 15, 0),  description: "Valid timestamp:  ISO 8601 date and time with T." },
        ];

        runs.forEach((run) => {
            it(run.description, () => {
                expect(parser.parse(run.input, run.options).model).toBe(run.output);
            });
        });
    });
}
