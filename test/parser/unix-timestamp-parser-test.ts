module DateSliderTest.Parser {
    describe("Unix timestamp (in seconds) parser.", () => {
        let parser: DateSlider.Parser.UnixTimestampParser;

        beforeEach(() => {
            parser = new DateSlider.Parser.UnixTimestampParser();
        });

        it("Invalid timestamp: input < 0.", () => {
            expect(parser.parse(-1)).toBe(null);
        });

        it("Invalid timestamp: null.", () => {
            expect(parser.parse(null)).toBe(null);
        });

        it("Invalid timestamp: undefined.", () => {
            expect(parser.parse(undefined)).toBe(null);
        });

        it("Invalid timestamp: string.", () => {
            expect(parser.parse("alma")).toBe(null);
        });

        it("Invalid timestamp: empty string.", () => {
            expect(parser.parse("")).toBe(null);
        });

        it("Valid timestamp: 0.", () => {
            expect(parser.parse(0)).toBe(new DateSlider.DateSliderModel(1970, 1, 1, 0, 0, 0));
        });

        it("Valid timestamp: number as a string.", () => {
            expect(parser.parse("100" as any)).toBe(new DateSlider.DateSliderModel(1970, 1, 1, 1, 40, 0));
        });

        it("Valid timestamp: input > 0.", () => {
            expect(parser.parse(100)).toEqual(new DateSlider.DateSliderModel(1970, 1, 1, 1, 40, 0));
        });
    });
}
