var DateSliderTest;
(function (DateSliderTest) {
    var Parser;
    (function (Parser) {
        describe("Date parser.", function () {
            var parser;
            beforeEach(function () {
                parser = new DateSlider.Parser.DateParser();
            });
            var runs = [
                { input: -1, output: null, description: "Invalid date: negative number." },
                { input: 0, output: null, description: "Invalid date: zero." },
                { input: 1, output: null, description: "Invalid date: number." },
                { input: true, output: null, description: "Invalid date: true." },
                { input: false, output: null, description: "Invalid date: false." },
                { input: null, output: null, description: "Invalid date: null." },
                { input: undefined, output: null, description: "Invalid date: undefined." },
                { input: "alma", output: null, description: "Invalid date: string." },
                { input: "", output: null, description: "Invalid date: empty string." },
                { input: {}, output: null, description: "Invalid date: other object." },
                { input: function () { }, output: null, description: "Invalid date: function." },
                { input: new Date(100), output: new DateSlider.DateSliderModel(1970, 1, 1, 1, 40, 0), description: "Valid date: from timestamp." },
                // JS date-month is [0-11] DateSliderModel-month is [1-12]
                { input: new Date(2000, 0), output: new DateSlider.DateSliderModel(2000, 1, 1, 0, 0, 0), description: "Valid date: month is given." },
                { input: new Date(2000, 0, 1), output: new DateSlider.DateSliderModel(2000, 1, 1, 0, 0, 0), description: "Valid date: day is given." },
                { input: new Date(2000, 0, 1, 2), output: new DateSlider.DateSliderModel(2000, 1, 1, 2, 0, 0), description: "Valid date: hour is given." },
                { input: new Date(2000, 0, 1, 2, 3), output: new DateSlider.DateSliderModel(2000, 1, 1, 2, 3, 0), description: "Valid date: minutes is given." },
                { input: new Date(2000, 0, 1, 2, 3, 4), output: new DateSlider.DateSliderModel(2000, 1, 1, 2, 3, 4), description: "Valid date: seconds is given." },
                { input: new Date(2000, 0, 1, 2, 3, 4, 5), output: new DateSlider.DateSliderModel(2000, 1, 1, 2, 3, 4), description: "Valid date: milliseconds is given." },
            ];
            runs.forEach(function (run) {
                it(run.description, function () {
                    expect(parser.parse(run.input)).toBe(run.output);
                });
            });
        });
    })(Parser = DateSliderTest.Parser || (DateSliderTest.Parser = {}));
})(DateSliderTest || (DateSliderTest = {}));
var DateSliderTest;
(function (DateSliderTest) {
    var Parser;
    (function (Parser) {
        describe("String parser.", function () {
            var parser;
            beforeEach(function () {
                parser = new DateSlider.Parser.StringParser();
            });
            var runs = [
                // invalid input
                { input: -1, format: "", culture: "", output: null, description: "Invalid string: number < 0." },
                { input: 0, format: "", culture: "", output: null, description: "Invalid string: number = 0." },
                { input: -1, format: "", culture: "", output: null, description: "Invalid string: number > 0." },
                { input: true, format: "", culture: "", output: null, description: "Invalid string: true." },
                { input: false, format: "", culture: "", output: null, description: "Invalid string: false." },
                { input: null, format: "", culture: "", output: null, description: "Invalid string: null." },
                { input: undefined, format: "", culture: "", output: null, description: "Invalid string: undefined." },
                { input: {}, format: "", culture: "", output: null, description: "Invalid string: object." },
                { input: function () { }, format: "", culture: "", output: null, description: "Invalid string: function." },
                // invalid format, culture?
                // { input: "alma", format: "", culture: "", output: null, description: "Invalid string: string." },
                // { input: "alma", format: "", culture: "", output: null, description: "Invalid string: string." },
                { input: "2017-01-27", format: "yyyy-MM-dd", culture: "", output: new DateSlider.DateSliderModel(2017, 1, 27, 0, 0, 0), description: "Valid string and format: ISO 8601 date only." },
                { input: "2017-01-27 11:15Z", format: "yyyy-MM-dd HH:mmK", culture: "", output: new DateSlider.DateSliderModel(2017, 1, 27, 1, 15, 0), description: "Valid string and format: ISO 8601 date and time." },
                { input: "2017-01-27 11:15:21Z", format: "yyyy-MM-dd HH:mmK", culture: "", output: new DateSlider.DateSliderModel(2017, 1, 27, 1, 15, 21), description: "Valid string and format: ISO 8601 date and time with seconds." },
                { input: "2017-01-27T11:15Z", format: "yyyy-MM-ddTHH:mmK", culture: "", output: new DateSlider.DateSliderModel(2017, 1, 27, 1, 15, 0), description: "Valid timestamp:  ISO 8601 date and time with T." },
            ];
            runs.forEach(function (run) {
                it(run.description, function () {
                    expect(parser.parse(run.input, run.format, run.culture)).toBe(run.output);
                });
            });
        });
    })(Parser = DateSliderTest.Parser || (DateSliderTest.Parser = {}));
})(DateSliderTest || (DateSliderTest = {}));
var DateSliderTest;
(function (DateSliderTest) {
    var Parser;
    (function (Parser) {
        describe("Unix timestamp (in milliseconds) parser.", function () {
            var parser;
            beforeEach(function () {
                parser = new DateSlider.Parser.UnixTimestampMsParser();
            });
            var runs = [
                { input: -1, output: null, description: "Invalid timestamp: input < 0." },
                { input: -1000, output: null, description: "Invalid timestamp: input < 0." },
                { input: true, output: null, description: "Invalid timestamp: true." },
                { input: false, output: null, description: "Invalid timestamp: false." },
                { input: null, output: null, description: "Invalid timestamp: null." },
                { input: undefined, output: null, description: "Invalid timestamp: undefined." },
                { input: "alma", output: null, description: "Invalid timestamp: string." },
                { input: "", output: null, description: "Invalid timestamp: empty string." },
                { input: {}, output: null, description: "Invalid timestamp: object." },
                { input: function () { }, output: null, description: "Invalid timestamp: function." },
                { input: 0, output: new DateSlider.DateSliderModel(1970, 1, 1, 0, 0, 0), description: "Valid timestamp: 0." },
                { input: 1, output: new DateSlider.DateSliderModel(1970, 1, 1, 0, 0, 0), description: "Valid timestamp: 1." },
                { input: 999, output: new DateSlider.DateSliderModel(1970, 1, 1, 0, 0, 0), description: "Valid timestamp: 999." },
                { input: 1000, output: new DateSlider.DateSliderModel(1970, 1, 1, 0, 0, 1), description: "Valid timestamp: input = 1000." },
                { input: 100000, output: new DateSlider.DateSliderModel(1970, 1, 1, 1, 40, 0), description: "Valid timestamp: input > 1000." },
                { input: "100000", output: new DateSlider.DateSliderModel(1970, 1, 1, 1, 40, 0), description: "Valid timestamp: number as a string." },
            ];
            runs.forEach(function (run) {
                it(run.description, function () {
                    expect(parser.parse(run.input)).toBe(run.output);
                });
            });
        });
    })(Parser = DateSliderTest.Parser || (DateSliderTest.Parser = {}));
})(DateSliderTest || (DateSliderTest = {}));
var DateSliderTest;
(function (DateSliderTest) {
    var Parser;
    (function (Parser) {
        describe("Unix timestamp (in seconds) parser.", function () {
            var parser;
            beforeEach(function () {
                parser = new DateSlider.Parser.UnixTimestampParser();
            });
            var runs = [
                { input: -1, output: null, description: "Invalid timestamp: input < 0." },
                { input: null, output: null, description: "Invalid timestamp: null." },
                { input: true, output: null, description: "Invalid timestamp: true." },
                { input: false, output: null, description: "Invalid timestamp: false." },
                { input: undefined, output: null, description: "Invalid timestamp: undefined." },
                { input: "alma", output: null, description: "Invalid timestamp: string." },
                { input: "", output: null, description: "Invalid timestamp: empty string." },
                { input: {}, output: null, description: "Invalid timestamp: object." },
                { input: function () { }, output: null, description: "Invalid timestamp: function." },
                { input: 0, output: new DateSlider.DateSliderModel(1970, 1, 1, 0, 0, 0), description: "Valid timestamp: 0." },
                { input: 1, output: new DateSlider.DateSliderModel(1970, 1, 1, 0, 0, 1), description: "Valid timestamp: 1." },
                { input: 100, output: new DateSlider.DateSliderModel(1970, 1, 1, 1, 40, 0), description: "Valid timestamp: input > 1." },
                { input: "100", output: new DateSlider.DateSliderModel(1970, 1, 1, 1, 40, 0), description: "Valid timestamp: number as a string." },
            ];
            runs.forEach(function (run) {
                it(run.description, function () {
                    expect(parser.parse(run.input)).toBe(run.output);
                });
            });
        });
    })(Parser = DateSliderTest.Parser || (DateSliderTest.Parser = {}));
})(DateSliderTest || (DateSliderTest = {}));

//# sourceMappingURL=tests.js.map
