declare module DateSlider {
    class Constants {
        static SliderMarkerValueContainer: string;
    }
    class Helpers {
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
        private value;
        sliders: Slider.SliderInstance[];
        parser: Parser.IParser;
        formatter: Formatter.IFormatter;
        private onValueChangeEvent;
        constructor(element: HTMLElement, options: DateSliderOptions, value?: DateSliderModel);
        getValue(): any;
        setValue(input: any): void;
        getOptions(): DateSliderOptions;
        updateOptions(options: DateSliderOptions): void;
        replaceOptions(options: DateSliderOptions): void;
        on(eventName: DateSliderEvent, callback: (context: DateSliderEventContext) => DateSliderEventContext): void;
        private setOptions();
        private onSliderUpdate;
        private updateSliders();
        private bindFormatter();
        private bindParser();
        private createWrapper(sliders);
    }
}
declare module DateSlider {
    class DateSliderModel {
        model: InnerModel | null;
        rawValue: any;
        constructor(model: InnerModel | null, rawValue: any);
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
    }
}
declare module DateSlider {
    let defaults: DateSliderOptions;
    let universalTimeDefaults: SliderOptions;
    function create(element: HTMLElement, options: DateSliderOptions): DateSliderInstance;
}
declare module DateSlider {
    type DateSliderEvent = "onValueChanged";
    type SliderEvent = "onSliderBoxGrabbed" | "onSliderBoxReleased" | "onSliderBoxMoved" | "onValueChanged";
    interface DateSliderOptions {
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
    interface SliderOptions {
        type: "year" | "month" | "day" | "hour" | "minute" | "second" | "universal" | "universal-date" | "universal-time";
        displayValueFormatter?: (value: number) => string;
        markers?: {
            showValueMarker?: (value: number, minimum: number, maximum: number) => boolean;
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
    class SliderInstance {
        options: SliderOptions;
        private range;
        element: HTMLElement;
        private sliderElement;
        private sliderLineStart;
        private sliderLineElement?;
        private sliderLineEnd;
        private handleElement;
        private valueContainerElement?;
        private markerElement?;
        private markers;
        private toDiscrete;
        private onValueChangeEvent;
        private onSliderHandleGrabEvent;
        private onSliderHandleReleaseEvent;
        private onSliderHandleMoveEvent;
        private events;
        static createAll(options: DateSliderOptions): SliderInstance[];
        private static getRangeFromType(sliderOptions);
        constructor(options: SliderOptions, range: SliderRange);
        getValue(): number;
        setValue(value: number): void;
        on(eventName: SliderEvent, callback: (context: DateSliderEventContext) => void): void;
        destroy: (event?: Event) => void;
        private bootstrapSliderToTemplate();
        private findElementInSlider(className, required?);
        private createSliderElement();
        private registerListeners();
        private addMovementListeners();
        private removeMovementListeners();
        private handleMouseDown;
        private handleMouseUp;
        private handleMouseMove;
        private isHandleReleased(e);
        private createMarkers();
        private updateMarkerValue(marker);
        private updateMarkersPosition();
        private updateValueDisplay;
        private updateHandlePosition;
        private getPositionFromEvent(e);
        private calculateValue(position);
        private calculateOrthogonalProjectionRatio(position);
        private calculateHandlePosition();
        private calculateCenterPosition(element);
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
    }
}
declare module DateSlider.Slider.Context {
    class SliderValueChangeContext extends DateSliderEventContext {
        oldValue: number;
        newValue: number;
        constructor(oldValue: number, newValue: number);
    }
}
