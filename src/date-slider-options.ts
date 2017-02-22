module DateSlider {
    export interface DateSliderOptions {
        culture?: string;
        show?: DateSliderType[];
        appendTo?: DateSliderLocation;
        type?: DateSliderDisplayType;
        inputParseType?: DateSliderFormat;
        inputStringFormat?: string;
        inputCustomParser?: Parser.IParser;
        outputFormatType?: DateSliderFormat;
        outputStringFormat?: string;
        outputCustomFormatter?: Formatter.AbstractFormatter;
        outputInvalid?: DateSliderInvalidOutput;
        template?: {
            header?: string;
            footer?: string;
            sliderBox?: string;
            valueDisplay?: string;
        };
        callback?: {
            onSliderBoxGrabbed?: () => void;
            onSliderBoxReleased?: () => void;
            onSliderBoxMoved?: () => void;

            onValueChanged?: () => void;

            onPopupBeforeOpen?: () => void;
            onPopupAfterOpen?: () => void;
            onPopupBeforeClose?: () => void;
            onPopupAfterClose?: () => void;
        };
    }
}
