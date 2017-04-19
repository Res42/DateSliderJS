module DateSlider {
    export type DateSliderEvent = "onValueChanged";
    export type SliderEvent = "onSliderBoxGrabbed" | "onSliderBoxReleased" | "onSliderBoxMoved" | "onValueChanged";
    export type SliderType = "year" | "month" | "day" | "hour" | "minute" | "second" | "universal" | "universal-date" | "universal-time";
    export type SliderMovement = "none" | "slide" | "expand";

    export interface DateSliderOptions {
        value?: any;
        sliders?: SliderOptions[];
        interval?: boolean;
        parser?: "timestamp" | "string" | "date" | ((input: any, options: any) => DateSliderModel);
        parserOptions?: any;
        formatter?: "timestamp" | "string" | "date" | ((input: DateSliderModel, options: any) => any);
        formatterOptions?: any;
        callback?: {
            onValueChanged?: (context: Context.ValueChangeContext) => void;
        };
        validation?: {
            custom?: (value: any) => boolean;
            min?: any;
            max?: any;
        };
    }

    export interface SliderOptions {
        type: SliderType;
        movement?: SliderMovement;
        /** In milliseconds. Sets the interval's execution frequrency. */
        movementSpeed?: number;
        movementStep?: number;
        displayValueFormatter?: (value: number) => string;
        /** Customize the markers of the slider. */
        markers?: {
            /**
             * @returns An array of class names to append to the marker if the marker should be displayed.
             *          Null if the marker should not be displayed.
             */
            showValueMarker?: (value: number, minimum: number, maximum: number) => string | string[];
            /**
             * Optional. Format the displayed value of a marker.
             * If not given, it will fall back to the slider displayValueFormatter.
             * If the slider displayValueFormatter is not given too, it will fall back to value.toString().
             */
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
