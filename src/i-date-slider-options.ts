module DateSlider {
    export type DateSliderEvent = "onValueChanged";
    export type SliderEvent = "onSliderBoxGrabbed" | "onSliderBoxReleased" | "onSliderBoxMoved" | "onValueChanged";

    export interface DateSliderOptions {
        sliders?: SliderOptions[];
        interval?: boolean;
        parser?: "timestamp" | "string" | "date" | ((input: any, options: any) => DateSliderModel);
        parserOptions?: any;
        formatter?: "timestamp" | "string" | "date" | ((input: DateSliderModel, options: any) => any);
        formatterOptions?: any;
        callback?: {
            onValueChanged?: (context: Context.ValueChangeContext) => void;
        };
    }

    export interface SliderOptions {
        type: "year" | "month" | "day" | "hour" | "minute" | "second" | "universal" | "universal-date" | "universal-time";
        movement?: "none" | "slide" | "expand";
        displayValueFormatter?: (value: number) => string;
        /** Customize the markers of the slider. */
        markers?: {
            /**
             * @returns An array of class names to append to the marker if the marker should be displayed.
             *          Null if the marker should not be displayed.
             */
            showValueMarker?: (value: number, minimum: number, maximum: number) => string | string[];
            /** Format the displayed value of a marker. */
            displayValueFormatter?: (value: number, minimum: number, maximum: number) => string;
            perpendicularOffset?: number;
        };
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
