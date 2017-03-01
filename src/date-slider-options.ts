module DateSlider {
    export interface DateSliderOptions {
        culture?: string;
        sliders?: SliderOptions[];
        appendTo?: DateSliderLocation;
        displayType?: DateSliderDisplayType;
        parser?: DateSliderParserFormat;
        parserOptions?: any;
        formatter?: DateSliderFormatterFormat;
        formatterOptions?: any;
        callback?: {
            onValueChanged?: (context: DateSliderEventContext) => void;
            onPopupBeforeOpen?: (context: DateSliderEventContext) => void;
            onPopupAfterOpen?: (context: DateSliderEventContext) => void;
            onPopupBeforeClose?: (context: DateSliderEventContext) => void;
            onPopupAfterClose?: (context: DateSliderEventContext) => void;
        };
    }

    export interface SliderOptions {
        type?: DateSliderType;
        template?: {
            header?: string;
            footer?: string;
            sliderBox?: string;
            valueDisplay?: string;
        };
        callback?: {
            onValueChanged?: (context: DateSliderEventContext) => void;
            onSliderBoxGrabbed?: (context: DateSliderEventContext) => void;
            onSliderBoxReleased?: (context: DateSliderEventContext) => void;
            onSliderBoxMoved?: (context: DateSliderEventContext) => void;
        };
    }
}
