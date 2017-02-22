module DateSliderTest.Parser {
    describe("Date parser.", () => {
        let parser: DateSlider.Parser.DateParser;

        beforeEach(() => {
            parser = new DateSlider.Parser.DateParser();
        });

        let runs = [
            { input: -1,        output: null, description: "Invalid date: negative number." },
            { input: 0,         output: null, description: "Invalid date: zero." },
            { input: 1,         output: null, description: "Invalid date: number." },
            { input: true,      output: null, description: "Invalid date: true." },
            { input: false,     output: null, description: "Invalid date: false." },
            { input: null,      output: null, description: "Invalid date: null." },
            { input: undefined, output: null, description: "Invalid date: undefined." },
            { input: "alma",    output: null, description: "Invalid date: string." },
            { input: "",        output: null, description: "Invalid date: empty string." },
            { input: {} as any, output: null, description: "Invalid date: other object." },
            { input: function(){} as any, output: null, description: "Invalid date: function." },
            { input: new Date(100), output: new DateSlider.DateSliderModel(1970, 1, 1, 1, 40, 0), description: "Valid date: from timestamp." },
            // JS date-month is [0-11] DateSliderModel-month is [1-12]
            { input: new Date(2000, 0),                output: new DateSlider.DateSliderModel(2000, 1, 1, 0, 0, 0), description: "Valid date: month is given." },
            { input: new Date(2000, 0, 1),             output: new DateSlider.DateSliderModel(2000, 1, 1, 0, 0, 0), description: "Valid date: day is given." },
            { input: new Date(2000, 0, 1, 2),          output: new DateSlider.DateSliderModel(2000, 1, 1, 2, 0, 0), description: "Valid date: hour is given." },
            { input: new Date(2000, 0, 1, 2, 3),       output: new DateSlider.DateSliderModel(2000, 1, 1, 2, 3, 0), description: "Valid date: minutes is given." },
            { input: new Date(2000, 0, 1, 2, 3, 4),    output: new DateSlider.DateSliderModel(2000, 1, 1, 2, 3, 4), description: "Valid date: seconds is given." },
            { input: new Date(2000, 0, 1, 2, 3, 4, 5), output: new DateSlider.DateSliderModel(2000, 1, 1, 2, 3, 4), description: "Valid date: milliseconds is given." },
        ];

        runs.forEach((run) => {
            it(run.description, () => {
                expect(parser.parse(run.input)).toBe(run.output);
            });
        });
    });
}
