var DateSliderTest;
(function (DateSliderTest) {
    var Parser;
    (function (Parser) {
        describe("Unix timestamp (in seconds) parser.", function () {
            var parser;
            beforeEach(function () {
                parser = new DateSlider.Parser.UnixTimestampParser();
            });
            it("Invalid timestamp: input < 0.", function () {
                expect(parser.parse(-1)).toBe(null);
            });
            it("Invalid timestamp: null.", function () {
                expect(parser.parse(null)).toBe(null);
            });
            it("Invalid timestamp: undefined.", function () {
                expect(parser.parse(undefined)).toBe(null);
            });
            it("Invalid timestamp: string.", function () {
                expect(parser.parse("alma")).toBe(null);
            });
            it("Invalid timestamp: empty string.", function () {
                expect(parser.parse("")).toBe(null);
            });
            it("Valid timestamp: 0.", function () {
                expect(parser.parse(0)).toBe(new DateSlider.DateSliderModel(1970, 1, 1, 0, 0, 0));
            });
            it("Valid timestamp: number as a string.", function () {
                expect(parser.parse("100")).toBe(new DateSlider.DateSliderModel(1970, 1, 1, 1, 40, 0));
            });
            it("Valid timestamp: input > 0.", function () {
                expect(parser.parse(100)).toEqual(new DateSlider.DateSliderModel(1970, 1, 1, 1, 40, 0));
            });
        });
    })(Parser = DateSliderTest.Parser || (DateSliderTest.Parser = {}));
})(DateSliderTest || (DateSliderTest = {}));

//# sourceMappingURL=tests.js.map
