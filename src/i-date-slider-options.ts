module DateSlider {
    export type DateSliderEvent = "onSliderBoxGrabbed" | "onSliderBoxReleased" | "onSliderBoxMoved" | "onValueChanged";

    export interface DateSliderOptions {
        culture?: string;
        sliders?: SliderOptions[];
        parser?: "timestamp" | "string" | "date" | ((input: any, options: any) => DateSliderModel);
        parserOptions?: any;
        formatter?: "timestamp" | "string" | "date" | ((input: DateSliderModel, options: any) => any);
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
        type?: "year" | "month" | "day" | "hour" | "minute" | "second" | "universal" | "universal-date" | "universal-time";
        template?: {
            header?: string;
            footer?: string;
            sliderHandle?: string;
            valueDisplay?: string;
        } | HTMLElement;
        callback?: {
            onValueChanged?: (context: Slider.Context.SliderValueChangeContext) => void;
            onSliderHandleGrabbed?: (context: DateSliderEventContext) => void;
            onSliderHandleReleased?: (context: DateSliderEventContext) => void;
            onSliderHandleMoved?: (context: DateSliderEventContext) => void;
        };
    }
}