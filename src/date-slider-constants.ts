module DateSlider {
    export type DateSliderType = "year" | "month" | "day" | "hour" | "minute" | "second" | "universal" | "universal-date" | "universal-time";
    export type DateSliderLocation = "body" | "replaceElement" | "afterElement";
    export type DateSliderDisplayType = "popup" | "inline";
    export type DateSliderParserFormat = "timestamp" | "string" | "date" | ((input: any, format?: string, culture?: string) => DateSliderModel);
    export type DateSliderFormatterFormat = "timestamp" | "string" | "date" | ((input: DateSliderModel, format?: string, culture?: string) => any);
    export type DateSliderEvent = "onSliderBoxGrabbed" | "onSliderBoxReleased" | "onSliderBoxMoved" | "onValueChanged" | "onPopupBeforeOpen" |
                                  "onPopupAfterOpen" | "onPopupBeforeClose" | "onPopupAfterClose";
}
