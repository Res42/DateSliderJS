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
            onSliderBoxGrabbed?: (context: DateSliderEventContext) => DateSliderEventContext;
            onSliderBoxReleased?: (context: DateSliderEventContext) => DateSliderEventContext;
            onSliderBoxMoved?: (context: DateSliderEventContext) => DateSliderEventContext;

            onValueChanged?: (context: DateSliderEventContext) => DateSliderEventContext;

            onPopupBeforeOpen?: (context: DateSliderEventContext) => DateSliderEventContext;
            onPopupAfterOpen?: (context: DateSliderEventContext) => DateSliderEventContext;
            onPopupBeforeClose?: (context: DateSliderEventContext) => DateSliderEventContext;
            onPopupAfterClose?: (context: DateSliderEventContext) => DateSliderEventContext;
        };
    }
}
