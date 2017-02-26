module DateSlider {
    export interface DateSliderOptions {
        culture?: string;
        show?: DateSliderType[];
        appendTo?: DateSliderLocation;
        type?: DateSliderDisplayType;
        parser?: DateSliderParserFormat;
        parserOptions?: any;
        formatter?: DateSliderFormatterFormat;
        formatterOptions?: any;
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
