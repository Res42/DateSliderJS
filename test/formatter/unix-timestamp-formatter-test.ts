module DateSliderTest.Formatter {
    describe("Unix timestamp formatter.", () => {
        let formatter: DateSlider.Formatter.UnixTimestampFormatter;
        let msOptions: DateSlider.Formatter.UnixTimestampFormatterOptions;
        let secondOptions: DateSlider.Formatter.UnixTimestampFormatterOptions;

        beforeEach(() => {
            formatter = new DateSlider.Formatter.UnixTimestampFormatter();
            msOptions = new DateSlider.Formatter.UnixTimestampFormatterOptions("milliseconds");
            secondOptions = new DateSlider.Formatter.UnixTimestampFormatterOptions("seconds");
        });

        let runs = [
            { input: new DateSlider.DateSliderModel(new DateSlider.InnerModel(1969, 1, 1, 0, 0, 0), 0),    output: -31536000000, description: "Valid model: negative timestamp." },
            { input: new DateSlider.DateSliderModel(new DateSlider.InnerModel(1970, 1, 1, 0, 0, 0), 0),    output: 0,            description: "Valid model." },
            { input: new DateSlider.DateSliderModel(new DateSlider.InnerModel(2000, 1, 1, 0, 0, 0), 0),    output: 946684800000, description: "Valid model." },
            { input: new DateSlider.DateSliderModel(new DateSlider.InnerModel(2000, 12, 31, 0, 0, 0), 0),  output: 978220800000, description: "Valid model." },
            { input: new DateSlider.DateSliderModel(new DateSlider.InnerModel(2000, 1, 1, 12, 30, 30), 0), output: 946729830000, description: "Valid model." },
            { input: new DateSlider.DateSliderModel(new DateSlider.InnerModel(2000, 1, 1, 23, 59, 59), 0), output: 946771199000, description: "Valid model." },
        ];

        // runs.forEach((run) => {
        //     it(run.description, () => {
        //         expect(formatter.format(run.input, secondOptions)).toEqual(run.output);
        //     });
        // });

        // runs.forEach((run) => {
        //     it(run.description, () => {
        //         expect(formatter.format(run.input, msOptions)).toEqual(run.output * 1000);
        //     });
        // });
    });
}
