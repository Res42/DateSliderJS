module DateSliderTest.Parser {
    describe("Date parser.", () => {
        let parser: DateSlider.Parser.DateParser;
        let utcOptions: DateSlider.Parser.DateParserOptions;

        beforeEach(() => {
            parser = new DateSlider.Parser.DateParser();
            utcOptions = new DateSlider.Parser.DateParserOptions("utc");
        });

        let throws = [
            { input: -1,        description: "Invalid date: negative number." },
            { input: 0,         description: "Invalid date: zero." },
            { input: 1,         description: "Invalid date: number." },
            { input: true,      description: "Invalid date: true." },
            { input: false,     description: "Invalid date: false." },
            { input: null,      description: "Invalid date: null." },
            { input: undefined, description: "Invalid date: undefined." },
            { input: "alma",    description: "Invalid date: string." },
            { input: "",        description: "Invalid date: empty string." },
            { input: {} as any, description: "Invalid date: other object." },
            { input: function(){} as any, description: "Invalid date: function." },
        ];

        throws.forEach((run) => {
            it(run.description, () => {
                expect(() => parser.parse(run.input, utcOptions)).toThrow();
            });
        });

        let runs = [
            { input: new Date(100), output: new DateSlider.InnerModel(1970, 1, 1, 1, 40, 0), description: "Valid date: from timestamp." },
            // JS date-month is [0-11] DateSliderModel-month is [1-12]
            { input: new Date(2000, 0),                output: new DateSlider.InnerModel(2000, 1, 1, 0, 0, 0), description: "Valid date: month is given." },
            { input: new Date(2000, 0, 1),             output: new DateSlider.InnerModel(2000, 1, 1, 0, 0, 0), description: "Valid date: day is given." },
            { input: new Date(2000, 0, 1, 2),          output: new DateSlider.InnerModel(2000, 1, 1, 2, 0, 0), description: "Valid date: hour is given." },
            { input: new Date(2000, 0, 1, 2, 3),       output: new DateSlider.InnerModel(2000, 1, 1, 2, 3, 0), description: "Valid date: minutes is given." },
            { input: new Date(2000, 0, 1, 2, 3, 4),    output: new DateSlider.InnerModel(2000, 1, 1, 2, 3, 4), description: "Valid date: seconds is given." },
            { input: new Date(2000, 0, 1, 2, 3, 4, 5), output: new DateSlider.InnerModel(2000, 1, 1, 2, 3, 4), description: "Valid date: milliseconds is given." },
        ];

        runs.forEach((run) => {
            it(run.description, () => {
                expect(parser.parse(run.input, utcOptions).model).toBe(run.output);
            });
        });
    });
}
