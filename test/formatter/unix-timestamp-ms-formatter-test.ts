module DateSliderTest.Formatter {
    describe("Unix timestamp (in milliseconds) formatter.", () => {
        let formatter: DateSlider.Formatter.UnixTimestampMsFormatter;

        beforeEach(() => {
            formatter = new DateSlider.Formatter.UnixTimestampMsFormatter();
        });

        let runs = [
            { input: null, output: null, description: "Invalid model: null." },
            { input: new DateSlider.DateSliderModel(1969, 1, 1, 0, 0, 0),    output: -31536000000, description: "Valid model: negative timestamp." },
            { input: new DateSlider.DateSliderModel(1970, 1, 1, 0, 0, 0),    output: 0,            description: "Valid model." },
            { input: new DateSlider.DateSliderModel(2000, 1, 1, 0, 0, 0),    output: 946684800000, description: "Valid model." },
            { input: new DateSlider.DateSliderModel(2000, 12, 31, 0, 0, 0),  output: 978220800000, description: "Valid model." },
            { input: new DateSlider.DateSliderModel(2000, 1, 1, 12, 30, 30), output: 946729830000, description: "Valid model." },
            { input: new DateSlider.DateSliderModel(2000, 1, 1, 23, 59, 59), output: 946771199000, description: "Valid model." },
        ];

        runs.forEach((run) => {
            it(run.description, () => {
                expect(formatter.format(run.input, null)).toBe(run.output);
            });
        });
    });
}
