var DateSliderTest;
(function (DateSliderTest) {
    var Formatter;
    (function (Formatter) {
        describe("Unix timestamp formatter.", function () {
            var formatter;
            var msOptions;
            var secondOptions;
            beforeEach(function () {
                formatter = new DateSlider.Formatter.UnixTimestampFormatter();
                msOptions = new DateSlider.Formatter.UnixTimestampFormatterOptions("milliseconds");
                secondOptions = new DateSlider.Formatter.UnixTimestampFormatterOptions("seconds");
            });
            var runs = [
                { input: new DateSlider.DateSliderModel(new DateSlider.InnerModel(1969, 1, 1, 0, 0, 0), 0), output: -31536000, description: "Valid model: negative timestamp." },
                { input: new DateSlider.DateSliderModel(new DateSlider.InnerModel(1970, 1, 1, 0, 0, 0), 0), output: 0, description: "Valid model." },
                { input: new DateSlider.DateSliderModel(new DateSlider.InnerModel(2000, 1, 1, 0, 0, 0), 0), output: 946684800, description: "Valid model." },
                { input: new DateSlider.DateSliderModel(new DateSlider.InnerModel(2000, 12, 31, 0, 0, 0), 0), output: 978220800, description: "Valid model." },
                { input: new DateSlider.DateSliderModel(new DateSlider.InnerModel(2000, 1, 1, 12, 30, 30), 0), output: 946729830, description: "Valid model." },
                { input: new DateSlider.DateSliderModel(new DateSlider.InnerModel(2000, 1, 1, 23, 59, 59), 0), output: 946771199, description: "Valid model." },
            ];
            runs.forEach(function (run) {
                it(run.description, function () {
                    expect(formatter.format(run.input, secondOptions)).toEqual(run.output);
                });
            });
            runs.forEach(function (run) {
                it(run.description, function () {
                    expect(formatter.format(run.input, msOptions)).toEqual(run.output * 1000);
                });
            });
        });
    })(Formatter = DateSliderTest.Formatter || (DateSliderTest.Formatter = {}));
})(DateSliderTest || (DateSliderTest = {}));
var DateSliderTest;
(function (DateSliderTest) {
    var Integration;
    (function (Integration) {
        var ParseFormat;
        (function (ParseFormat) {
            describe("Unix timestamp in milliseconds parsing and formatting.", function () {
                var parser;
                var formatter;
                var parserOptions;
                var formatterOptions;
                beforeEach(function () {
                    parser = new DateSlider.Parser.UnixTimestampParser();
                    formatter = new DateSlider.Formatter.UnixTimestampFormatter();
                    parserOptions = new DateSlider.Parser.UnixTimestampParserOptions("milliseconds");
                    formatterOptions = new DateSlider.Formatter.UnixTimestampFormatterOptions("milliseconds");
                });
                var runs = [
                    { input: -31536000000, output: -31536000000, description: "Valid timestamp: negative." },
                    { input: 0, output: 0, description: "Valid timestamp." },
                    { input: 946684800000, output: 946684800000, description: "Valid timestamp." },
                    { input: 978220800000, output: 978220800000, description: "Valid timestamp." },
                    { input: 946729830000, output: 946729830000, description: "Valid timestamp." },
                    { input: 946771199000, output: 946771199000, description: "Valid timestamp." },
                    { input: 946771199542, output: 946771199000, description: "Valid timestamp: rounding down milliseconds > 500." },
                    { input: 946771199500, output: 946771199000, description: "Valid timestamp: rounding down milliseconds = 500." },
                    { input: 946771199042, output: 946771199000, description: "Valid timestamp: rounding down milliseconds < 500." },
                ];
                runs.forEach(function (run) {
                    it(run.description, function () {
                        expect(formatter.format(parser.parse(run.input, parserOptions), formatterOptions)).toEqual(run.output);
                    });
                });
            });
        })(ParseFormat = Integration.ParseFormat || (Integration.ParseFormat = {}));
    })(Integration = DateSliderTest.Integration || (DateSliderTest.Integration = {}));
})(DateSliderTest || (DateSliderTest = {}));
var DateSliderTest;
(function (DateSliderTest) {
    var Integration;
    (function (Integration) {
        var ParseFormat;
        (function (ParseFormat) {
            describe("Unix timestamp parsing and formatting.", function () {
                var parser;
                var formatter;
                var parserOptions;
                var formatterOptions;
                beforeEach(function () {
                    parser = new DateSlider.Parser.UnixTimestampParser();
                    formatter = new DateSlider.Formatter.UnixTimestampFormatter();
                    parserOptions = new DateSlider.Parser.UnixTimestampParserOptions("seconds");
                    formatterOptions = new DateSlider.Formatter.UnixTimestampFormatterOptions("seconds");
                });
                var runs = [
                    { input: -31536000, description: "Valid timestamp: negative." },
                    { input: 0, description: "Valid timestamp." },
                    { input: 946684800, description: "Valid timestamp." },
                    { input: 978220800, description: "Valid timestamp." },
                    { input: 946729830, description: "Valid timestamp." },
                    { input: 946771199, description: "Valid timestamp." },
                ];
                runs.forEach(function (run) {
                    it(run.description, function () {
                        expect(formatter.format(parser.parse(run.input, parserOptions), formatterOptions)).toEqual(run.input);
                    });
                });
            });
        })(ParseFormat = Integration.ParseFormat || (Integration.ParseFormat = {}));
    })(Integration = DateSliderTest.Integration || (DateSliderTest.Integration = {}));
})(DateSliderTest || (DateSliderTest = {}));
var DateSliderTest;
(function (DateSliderTest) {
    var Parser;
    (function (Parser) {
        describe("Date parser.", function () {
            var parser;
            var utcOptions;
            beforeEach(function () {
                parser = new DateSlider.Parser.DateParser();
                utcOptions = new DateSlider.Parser.DateParserOptions("utc");
            });
            var throws = [
                { input: -1, description: "Invalid date: negative number." },
                { input: 0, description: "Invalid date: zero." },
                { input: 1, description: "Invalid date: number." },
                { input: true, description: "Invalid date: true." },
                { input: false, description: "Invalid date: false." },
                { input: null, description: "Invalid date: null." },
                { input: undefined, description: "Invalid date: undefined." },
                { input: "alma", description: "Invalid date: string." },
                { input: "", description: "Invalid date: empty string." },
                { input: {}, description: "Invalid date: other object." },
                { input: function () { }, description: "Invalid date: function." },
            ];
            // throws.forEach((run) => {
            //     it(run.description, () => {
            //         expect(() => parser.parse(run.input, utcOptions)).toThrow();
            //     });
            // });
            var runs = [
                { input: new Date(100), output: new DateSlider.InnerModel(1970, 1, 1, 1, 40, 0), description: "Valid date: from timestamp." },
                // JS date-month is [0-11] DateSliderModel-month is [1-12]
                { input: new Date(2000, 0), output: new DateSlider.InnerModel(2000, 1, 1, 0, 0, 0), description: "Valid date: month is given." },
                { input: new Date(2000, 0, 1), output: new DateSlider.InnerModel(2000, 1, 1, 0, 0, 0), description: "Valid date: day is given." },
                { input: new Date(2000, 0, 1, 2), output: new DateSlider.InnerModel(2000, 1, 1, 2, 0, 0), description: "Valid date: hour is given." },
                { input: new Date(2000, 0, 1, 2, 3), output: new DateSlider.InnerModel(2000, 1, 1, 2, 3, 0), description: "Valid date: minutes is given." },
                { input: new Date(2000, 0, 1, 2, 3, 4), output: new DateSlider.InnerModel(2000, 1, 1, 2, 3, 4), description: "Valid date: seconds is given." },
                { input: new Date(2000, 0, 1, 2, 3, 4, 5), output: new DateSlider.InnerModel(2000, 1, 1, 2, 3, 4), description: "Valid date: milliseconds is given." },
            ];
            // runs.forEach((run) => {
            //     it(run.description, () => {
            //         expect(parser.parse(run.input, utcOptions).model).toEqual(run.output);
            //     });
            // });
        });
    })(Parser = DateSliderTest.Parser || (DateSliderTest.Parser = {}));
})(DateSliderTest || (DateSliderTest = {}));
var DateSliderTest;
(function (DateSliderTest) {
    var Parser;
    (function (Parser) {
        describe("String parser.", function () {
            var parser;
            var forInvalidOptions;
            beforeEach(function () {
                parser = new DateSlider.Parser.StringParser();
                forInvalidOptions = new DateSlider.Parser.StringParserOptions("", "");
            });
            var throws = [
                { input: -1, options: forInvalidOptions, description: "Invalid string: number < 0." },
                { input: 0, options: forInvalidOptions, description: "Invalid string: number = 0." },
                { input: -1, options: forInvalidOptions, description: "Invalid string: number > 0." },
                { input: true, options: forInvalidOptions, description: "Invalid string: true." },
                { input: false, options: forInvalidOptions, description: "Invalid string: false." },
                { input: null, options: forInvalidOptions, description: "Invalid string: null." },
                { input: undefined, options: forInvalidOptions, description: "Invalid string: undefined." },
                { input: {}, options: forInvalidOptions, description: "Invalid string: object." },
                { input: function () { }, options: forInvalidOptions, description: "Invalid string: function." },
            ];
            // throws.forEach((run) => {
            //     it(run.description, () => {
            //         expect(() => parser.parse(run.input, run.options).model).toThrow();
            //     });
            // });
            var runs = [
                { input: "2017-01-27", options: new DateSlider.Parser.StringParserOptions("yyyy-MM-dd", ""), output: new DateSlider.InnerModel(2017, 1, 27, 0, 0, 0), description: "Valid string and format: ISO 8601 date only." },
                { input: "2017-01-27 11:15Z", options: new DateSlider.Parser.StringParserOptions("yyyy-MM-dd HH:mmK", ""), output: new DateSlider.InnerModel(2017, 1, 27, 1, 15, 0), description: "Valid string and format: ISO 8601 date and time." },
                { input: "2017-01-27 11:15:21Z", options: new DateSlider.Parser.StringParserOptions("yyyy-MM-dd HH:mmK", ""), output: new DateSlider.InnerModel(2017, 1, 27, 1, 15, 21), description: "Valid string and format: ISO 8601 date and time with seconds." },
                { input: "2017-01-27T11:15Z", options: new DateSlider.Parser.StringParserOptions("yyyy-MM-ddTHH:mmK", ""), output: new DateSlider.InnerModel(2017, 1, 27, 1, 15, 0), description: "Valid timestamp:  ISO 8601 date and time with T." },
            ];
            // runs.forEach((run) => {
            //     it(run.description, () => {
            //         expect(parser.parse(run.input, run.options).model).toEqual(run.output);
            //     });
            // });
        });
    })(Parser = DateSliderTest.Parser || (DateSliderTest.Parser = {}));
})(DateSliderTest || (DateSliderTest = {}));
var DateSliderTest;
(function (DateSliderTest) {
    var Parser;
    (function (Parser) {
        describe("Unix timestamp parser.", function () {
            var parser;
            var msOptions;
            var secondOptions;
            beforeEach(function () {
                parser = new DateSlider.Parser.UnixTimestampParser();
                msOptions = new DateSlider.Parser.UnixTimestampParserOptions("milliseconds");
                secondOptions = new DateSlider.Parser.UnixTimestampParserOptions("seconds");
            });
            var throws = [
                { input: null, description: "Invalid timestamp: null." },
                { input: true, description: "Invalid timestamp: true." },
                { input: false, description: "Invalid timestamp: false." },
                { input: undefined, description: "Invalid timestamp: undefined." },
                { input: "alma", description: "Invalid timestamp: string." },
                { input: "", description: "Invalid timestamp: empty string." },
                { input: {}, description: "Invalid timestamp: object." },
                { input: "100", description: "Invalid timestamp: number as a string." },
                { input: "100000", output: null, description: "Invalid timestamp: number as a string." },
                { input: function () { }, description: "Invalid timestamp: function." },
            ];
            throws.forEach(function (run) {
                it(run.description, function () {
                    expect(function () { return parser.parse(run.input, secondOptions); }).toThrow();
                });
                it(run.description, function () {
                    expect(function () { return parser.parse(run.input, msOptions); }).toThrow();
                });
            });
            var secondRuns = [
                { input: -100, output: new DateSlider.InnerModel(1969, 12, 31, 23, 58, 20), description: "Valid second timestamp: -100." },
                { input: -1, output: new DateSlider.InnerModel(1969, 12, 31, 23, 59, 59), description: "Valid second timestamp: -1." },
                { input: 0, output: new DateSlider.InnerModel(1970, 1, 1, 0, 0, 0), description: "Valid second timestamp: 0." },
                { input: 1, output: new DateSlider.InnerModel(1970, 1, 1, 0, 0, 1), description: "Valid second timestamp: 1." },
                { input: 100, output: new DateSlider.InnerModel(1970, 1, 1, 0, 1, 40), description: "Valid second timestamp: 100." },
            ];
            secondRuns.forEach(function (run) {
                it(run.description, function () {
                    expect(parser.parse(run.input, secondOptions).model).toEqual(run.output);
                });
            });
            var msRuns = [
                { input: -100000, output: new DateSlider.InnerModel(1969, 12, 31, 23, 58, 20), description: "Valid millisecond timestamp: < -1000." },
                { input: -1000, output: new DateSlider.InnerModel(1969, 12, 31, 23, 59, 59), description: "Valid millisecond timestamp: -1000." },
                { input: -999, output: new DateSlider.InnerModel(1969, 12, 31, 23, 59, 59), description: "Valid millisecond timestamp: -999." },
                { input: -1, output: new DateSlider.InnerModel(1969, 12, 31, 23, 59, 59), description: "Valid millisecond timestamp: -1." },
                { input: 0, output: new DateSlider.InnerModel(1970, 1, 1, 0, 0, 0), description: "Valid millisecond timestamp: 0." },
                { input: 1, output: new DateSlider.InnerModel(1970, 1, 1, 0, 0, 0), description: "Valid millisecond timestamp: 1." },
                { input: 999, output: new DateSlider.InnerModel(1970, 1, 1, 0, 0, 0), description: "Valid millisecond timestamp: 999." },
                { input: 1000, output: new DateSlider.InnerModel(1970, 1, 1, 0, 0, 1), description: "Valid millisecond timestamp: 1000." },
                { input: 100000, output: new DateSlider.InnerModel(1970, 1, 1, 0, 1, 40), description: "Valid millisecond timestamp: > 1000." },
            ];
            msRuns.forEach(function (run) {
                it(run.description, function () {
                    expect(parser.parse(run.input, msOptions).model).toEqual(run.output);
                });
            });
        });
    })(Parser = DateSliderTest.Parser || (DateSliderTest.Parser = {}));
})(DateSliderTest || (DateSliderTest = {}));

//# sourceMappingURL=tests.js.map
