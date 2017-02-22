module DateSliderTest.Parser {
    describe("String parser.", () => {
        let parser: DateSlider.Parser.StringParser;

        beforeEach(() => {
            parser = new DateSlider.Parser.StringParser();
        });

        let runs = [
            // invalid input
            { input: -1,        format: "", culture: "", output: null, description: "Invalid string: number < 0." },
            { input: 0,         format: "", culture: "", output: null, description: "Invalid string: number = 0." },
            { input: -1,        format: "", culture: "", output: null, description: "Invalid string: number > 0." },
            { input: true,      format: "", culture: "", output: null, description: "Invalid string: true." },
            { input: false,     format: "", culture: "", output: null, description: "Invalid string: false." },
            { input: null,      format: "", culture: "", output: null, description: "Invalid string: null." },
            { input: undefined, format: "", culture: "", output: null, description: "Invalid string: undefined." },
            { input: {} as any, format: "", culture: "", output: null, description: "Invalid string: object." },
            { input: function() {} as any, format: "", culture: "", output: null, description: "Invalid string: function." },
            // invalid format, culture?
            // valid
            { input: "2017-01-27",           format: "yyyy-MM-dd",        culture: "", output: new DateSlider.DateSliderModel(2017, 1, 27, 0, 0, 0),   description: "Valid string and format: ISO 8601 date only." },
            { input: "2017-01-27 11:15Z",    format: "yyyy-MM-dd HH:mmK", culture: "", output: new DateSlider.DateSliderModel(2017, 1, 27, 1, 15, 0),  description: "Valid string and format: ISO 8601 date and time." },
            { input: "2017-01-27 11:15:21Z", format: "yyyy-MM-dd HH:mmK", culture: "", output: new DateSlider.DateSliderModel(2017, 1, 27, 1, 15, 21), description: "Valid string and format: ISO 8601 date and time with seconds." },
            { input: "2017-01-27T11:15Z",    format: "yyyy-MM-ddTHH:mmK", culture: "", output: new DateSlider.DateSliderModel(2017, 1, 27, 1, 15, 0),  description: "Valid timestamp:  ISO 8601 date and time with T." },
        ];

        runs.forEach((run) => {
            it(run.description, () => {
                expect(parser.parse(run.input, run.format, run.culture)).toBe(run.output);
            });
        });
    });
}
