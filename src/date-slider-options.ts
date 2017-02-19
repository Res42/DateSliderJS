module DateSlider {
    export interface DateSliderOptions {
        culture?: string;
        show?: ("year" | "month" | "day" | "hour" | "minute" | "second" | "universal" | "universal-date" | "universal-time")[];
        appendTo?: "body" | "replaceElement" | "afterElement";
        type?: "popup" | "inline";
        inputParseType?: "timestamp" | "timestampMs" | "formattedString" | "date" | "custom";
        inputStringFormat?: string;
        inputCustomParser?: Parser.Parser;
        outputFormatType?: "timestamp" | "timestampMs" | "formattedString" | "date" | "custom";
        outputStringFormat?: string;
        outputCustomFormatter?: Formatter.Formatter;
        outputInvalid?: string | number | null | undefined | Object;
        template?: {
            header?: string;
            footer?: string;
            sliderBox?: string;
            valueDisplay?: string;
        }
        callback?: {
            onSliderBoxGrabbed?: () => void;
            onSliderBoxReleased?: () => void;
            onSliderBoxMoved?: () => void;

            onValueChanged?: () => void;

            onPopupBeforeOpen?: () => void;
            onPopupAfterOpen?: () => void;
            onPopupBeforeClose?: () => void;
            onPopupAfterClose?: () => void;
        }
    }
}
