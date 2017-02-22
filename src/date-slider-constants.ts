module DateSlider {
    export type DateSliderType = "year" | "month" | "day" | "hour" | "minute" | "second" | "universal" | "universal-date" | "universal-time";
    export type DateSliderLocation = "body" | "replaceElement" | "afterElement";
    export type DateSliderDisplayType = "popup" | "inline";
    export type DateSliderInvalidOutput = string | number | null | undefined | Object;
    export type DateSliderFormat = "timestamp" | "timestampMs" | "formattedString" | "date" | "custom";
    export type DateSliderEvent = "onSliderBoxGrabbed" | "onSliderBoxReleased" | "onSliderBoxMoved" | "onValueChanged" | "onPopupBeforeOpen" |
                                  "onPopupAfterOpen" | "onPopupBeforeClose" | "onPopupAfterClose";
}
