declare module DateSlider {
    class Constants {
        static SliderMarkerValueContainer: string;
        /** 86400 = 24 \* 60 \* 60 */
        static SecondsInDay: number;
        /** 86400000 = 24 \* 60 \* 60 \* 1000 */
        static MillisecondsInDay: number;
    }
    class Helpers {
        static isDefined(value: any): boolean;
        static isSet(value: any): boolean;
        static getDaysinYear(year?: number): number;
        static getDaysInMonth(year: number, month: number): number;
        static getPositionFromEvent(e: MouseEvent | TouchEvent): Vector;
        static findChildWithClass(element: HTMLElement, className: string, required?: boolean): HTMLElement;
        static calculateCenterPosition(element: HTMLElement | ClientRect): Vector;
        /**
         * Registers a listener to the element's destroy.
         * @param element The element whose destroy event should be watched.
         * @param callback A callback method with an optional event parameter.
         * The parameter is an Event, if the 'DOMNodeRemoved' event was caught.
         * The parameter is undefined if a MutationObserver was used to watch the element's destroy event.
         */
        static registerOnDestroy(element: HTMLElement, callback: (event?: Event) => void): void;
        /**
         * Shallow merges objects to a destination object.
         * Use \{\} as the "to" parameter and add the original object to the "from" parameter if you do not want to modify the original object.
         * @param to The destination object.
         * @param from The objects wose properties will overwrite the properties of the destination object.
         * @returns The merged object.
         */
        static shallowMerge<T extends {
            [key: string]: any;
        }, U extends {
            [key: string]: any;
        }>(to: T, ...from: U[]): T & U;
        static deepMerge<T extends {
            [key: string]: any;
        }, U extends {
            [key: string]: any;
        }>(to: T, ...from: U[]): T & U;
    }
}
declare module DateSlider {
    /**
     * Default options for the whole DateSlider.
     */
    let defaults: DateSliderOptions;
    /**
     * Default options for the universal time slider.
     */
    let universalTimeDefaults: SliderOptions;
    let monthDefaults: SliderOptions;
    let universalDateDefaults: SliderOptions;
    let yearDefaults: SliderOptions;
    let dayDefaults: SliderOptions;
    let defaultSilderOptions: {
        [key: string]: SliderOptions;
    };
}
declare module DateSlider {
    class DateSliderEventContext {
        private _isPropagationStopped;
        readonly isPropagationStopped: boolean;
        stopPropagation(): void;
    }
}
declare module DateSlider {
    class DateSliderEventHandler {
        private events;
        register(handler: (context: DateSliderEventContext) => void, index?: number): void;
        remove(handler: (context: DateSliderEventContext) => void): void;
        fire(context: DateSliderEventContext): void;
    }
}
declare module DateSlider {
    class DateSliderInstance {
        element: HTMLElement;
        private options;
        sliders: Slider.SliderInstance[];
        parser: Parser.IParser;
        formatter: Formatter.IFormatter;
        value: DateSliderModel;
        private onValueChangeEvent;
        constructor(element: HTMLElement, options: DateSliderOptions);
        parse(value: any): DateSliderModel;
        format(value: DateSliderModel): any;
        getValue(): any;
        setValue(input: any): void;
        getOptions(): DateSliderOptions;
        updateOptions(options: DateSliderOptions): void;
        replaceOptions(options: DateSliderOptions): void;
        on(eventName: DateSliderEvent, callback: (context: DateSliderEventContext) => void): void;
        updateFromSlider(sliderType: SliderType, newValue: number, oldValue: number): void;
        private createAllSliders();
        private isValid(model);
        private getRangeFromType(sliderOptions);
        private updateDaySliders();
        private updateSliders();
        private bindFormatter();
        private bindParser();
        private bootstrapSliders(sliders);
    }
}
declare module DateSlider {
    class DateSliderModel {
        model: InnerModel | null;
        rawValue: any;
        constructor(model: InnerModel | null, rawValue: any);
        copy(): DateSliderModel;
    }
    class InnerModel {
        year: number;
        /** In the range [1, 12]. */
        month: number;
        /** In the range of [1, 31]. */
        day: number;
        hour: number;
        minute: number;
        second: number;
        timezone: string;
        constructor(year?: number, 
            /** In the range [1, 12]. */
            month?: number, 
            /** In the range of [1, 31]. */
            day?: number, hour?: number, minute?: number, second?: number, timezone?: string);
        setDayOfMonth(): void;
        greaterThan(other: InnerModel): boolean;
        greaterThanOrEqual(other: InnerModel): boolean;
        lessThan(other: InnerModel): boolean;
        lessThanOrEqual(other: InnerModel): boolean;
        equal(other: InnerModel): boolean;
        private compare(other, compareMethod, equalPermitted);
    }
}
declare module DateSlider {
    function create(element: HTMLElement, options?: DateSliderOptions): DateSliderInstance;
}
declare module DateSlider {
    type DateSliderEvent = "onValueChanged";
    type SliderEvent = "onSliderBoxGrabbed" | "onSliderBoxReleased" | "onSliderBoxMoved" | "onValueChanged";
    type SliderType = "year" | "month" | "day" | "hour" | "minute" | "second" | "universal" | "universal-date" | "universal-time";
    type SliderMovement = "none" | "slide" | "expand";
    interface DateSliderOptions {
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
    interface SliderOptions {
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
declare module DateSlider {
    class Vector {
        x: number;
        y: number;
        constructor(x: number, y: number);
        add(vector: Vector): Vector;
        substract(vector: Vector): Vector;
        multiply(scalar: number): Vector;
        divide(scalar: number): Vector;
        dot(vector: Vector): number;
        length(): number;
        normalize(): Vector;
        perpendicularClockwise(): Vector;
        perpendicularCounterClockwise(): Vector;
        floor(): Vector;
        ceil(): Vector;
    }
}
declare module DateSlider.Context {
    class ValueChangeContext extends DateSliderEventContext {
        oldValue: any;
        newValue: any;
        constructor(oldValue: any, newValue: any);
    }
}
declare module DateSlider.Formatter {
    class CustomFormatter implements IFormatter {
        format: (input: DateSliderModel, options: any) => any;
        constructor(format: (input: DateSliderModel, options: any) => any);
    }
}
declare module DateSlider.Formatter {
    class DateFormatterOptions {
        type: "local" | "utc";
        constructor(type: "local" | "utc");
    }
    class DateFormatter implements IFormatter {
        /**
         * Formats a Date object from a DateSliderModel object.
         */
        format(input: DateSliderModel, options: DateFormatterOptions): Date;
    }
}
declare module DateSlider.Formatter {
    interface IFormatter {
        /**
         * Formats a DateSliderModel by a format and a culture.
         * @argument input
         * @argument format The format from DateSliderOptions.outputStringFormat.
         * @argument culture The culture from DateSliderOptions.culture.
         * @returns A custom thing representing a date/time.
         */
        format(input: DateSliderModel, options: any): any;
    }
}
declare module DateSlider.Formatter {
    class StringFormatterOptions {
        format: string;
        culture: string;
        constructor(format: string, culture: string);
    }
    class StringFormatter implements IFormatter {
        /**
         * Formats a string from a DateSliderModel object.
         */
        format(input: DateSliderModel, options: StringFormatterOptions): string;
    }
}
declare module DateSlider.Formatter {
    class UnixTimestampFormatterOptions {
        type: "milliseconds" | "seconds";
        constructor(type: "milliseconds" | "seconds");
    }
    class UnixTimestampFormatter implements IFormatter {
        /**
         * Formats a unix timestamp (in seconds) from a DateSliderModel object.
         */
        format(input: DateSliderModel, options: UnixTimestampFormatterOptions): number;
    }
}
declare module DateSlider.Parser {
    class CustomParser implements IParser {
        parse: (input: any, options: any) => DateSliderModel;
        constructor(parse: (input: any, options: any) => DateSliderModel);
    }
}
declare module DateSlider.Parser {
    class DateParserOptions {
        type: "local" | "utc";
        constructor(type: "local" | "utc");
    }
    class DateParser implements IParser {
        parse(input: Date, options: DateParserOptions): DateSliderModel;
    }
}
declare module DateSlider.Parser {
    interface IParser {
        /**
         * Parses a date/time input by a format and a culture.
         * @argument input
         * @argument options
         * @returns A DateSliderModel object representing a date/time. If the input is invalid it returns null.
         */
        parse(input: any, options: any): DateSliderModel;
    }
}
declare module DateSlider.Parser {
    class StringParserOptions {
        format: string;
        culture: string;
        constructor(format: string, culture: string);
    }
    class StringParser implements IParser {
        parse(input: string, options: StringParserOptions): DateSliderModel;
    }
}
declare module DateSlider.Parser {
    class UnixTimestampParserOptions {
        type: "milliseconds" | "seconds";
        constructor(type: "milliseconds" | "seconds");
    }
    class UnixTimestampParser implements IParser {
        /** Parses a unix timestamp from a number. */
        parse(input: number, options: UnixTimestampParserOptions): DateSliderModel;
    }
}
declare module DateSlider.Slider {
    function create(dateSlider: DateSliderInstance, options: SliderOptions, range: SliderRange): SliderInstance;
    class SliderInstance {
        dateSlider: DateSliderInstance;
        options: SliderOptions;
        range: SliderRange;
        element: HTMLElement;
        protected sliderElement: HTMLElement;
        protected sliderLineStart: HTMLElement;
        protected sliderLineElement?: HTMLDivElement;
        protected sliderLineEnd: HTMLElement;
        protected handleElement: HTMLElement;
        protected valueContainerElement?: HTMLElement;
        protected markerElement?: HTMLElement;
        protected markers: Array<{
            element: HTMLElement;
            valueContainers: NodeListOf<HTMLElement>;
            value: number;
        }>;
        protected toDiscrete: (x: number) => number;
        protected lastPointerPosition: Vector;
        protected isDragging: boolean;
        protected onValueChangeEvent: DateSliderEventHandler;
        protected onSliderHandleGrabEvent: DateSliderEventHandler;
        protected onSliderHandleReleaseEvent: DateSliderEventHandler;
        protected onSliderHandleMoveEvent: DateSliderEventHandler;
        protected events: {
            load: () => void;
            mousedown: (e: MouseEvent) => void;
            mousemove: (e: MouseEvent) => void;
            mouseup: (e: MouseEvent) => void;
            resize: () => void;
            touchend: (e: TouchEvent) => void;
            touchmove: (e: TouchEvent) => void;
            touchstart: (e: TouchEvent) => void;
        };
        constructor(dateSlider: DateSliderInstance, options: SliderOptions, range: SliderRange);
        getValue(): number;
        updateValue(value: number): void;
        updateValueWithMaximum(value: number, maximum: number): void;
        setMininum(minimum: number): void;
        on(eventName: SliderEvent, callback: (context: DateSliderEventContext) => void): void;
        destroy(event?: Event): void;
        protected setValue(value: number): void;
        protected updateAfter(callback: () => void): {
            oldValue: number;
            newValue: number;
        };
        protected createMarkers(): void;
        protected updateMarkerValue(marker: {
            element: HTMLElement;
            valueContainers: NodeListOf<HTMLElement>;
            value: number;
        }): void;
        protected bootstrapSliderToTemplate(): void;
        protected createSliderElement(): void;
        protected registerListeners(): void;
        protected addMovementListeners(): void;
        protected removeMovementListeners(): void;
        protected handleMouseDown: (e: MouseEvent | TouchEvent) => void;
        protected handleMouseUp: (e: MouseEvent | TouchEvent) => void;
        protected handleMouseMove: (e: MouseEvent | TouchEvent) => void;
        protected isHandleReleased(e: MouseEvent | TouchEvent): boolean;
        protected updateMarkersPosition(): void;
        protected updateValueDisplay: () => void;
        protected updateHandlePosition: () => void;
        protected calculateValue(position: Vector): number;
        protected calculateOrthogonalProjectionRatio(position: Vector): {
            ratio: number;
            distance: number;
        };
        protected calculateHandlePosition(): Vector;
    }
    class SlidingSliderInstance extends SliderInstance {
        protected borderCheckIntervalHandle: number;
        constructor(dateSlider: DateSliderInstance, options: SliderOptions, range: SliderRange);
        destroy(event?: Event): void;
        updateValue(value: number): void;
        protected onBorder(direction: number): void;
        protected borderCheck: () => void;
    }
    class ExpandingSliderInstance extends SlidingSliderInstance {
        constructor(dateSlider: DateSliderInstance, options: SliderOptions, range: SliderRange);
        protected onBorder(direction: number): void;
    }
}
declare module DateSlider.Slider {
    class SliderRange {
        private _minimum;
        private _maximum;
        private _value;
        constructor(_minimum: number, _maximum: number, _value?: number);
        readonly ratio: number;
        minimum: number;
        maximum: number;
        value: number;
        increment(by?: number): void;
        decrement(by?: number): void;
        expandMaximum(by?: number): void;
        expandMinimum(by?: number): void;
        slide(by?: number): void;
        slideTo(target: number, mustSlide?: boolean): void;
    }
}
declare module DateSlider.Slider.Context {
    class SliderValueChangeContext extends DateSliderEventContext {
        oldValue: number;
        newValue: number;
        constructor(oldValue: number, newValue: number);
    }
}
