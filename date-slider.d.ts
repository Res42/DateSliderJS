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
        fire(context: DateSliderEventContext): void;
    }
}
declare module DateSlider {
    class DateSliderInstance {
        private element;
        private options;
        private value;
        sliders: Slider.SliderInstance[];
        constructor(element: HTMLElement, options: DateSliderOptions, value?: DateSliderModel);
        getValue(): any;
        setValue(input: any): void;
        getOptions(): DateSliderOptions;
        setOptions(): void;
        on(eventName: DateSliderEvent, callback: (context: DateSliderEventContext) => DateSliderEventContext): void;
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
    type DateSliderEvent = "onSliderBoxGrabbed" | "onSliderBoxReleased" | "onSliderBoxMoved" | "onValueChanged" | "onPopupBeforeOpen" | "onPopupAfterOpen" | "onPopupBeforeClose" | "onPopupAfterClose";
    interface DateSliderOptions {
        culture?: string;
        sliders?: SliderOptions[];
        appendTo?: "body" | "replaceElement" | "afterElement" | "insideElement";
        displayType?: "popup" | "inline";
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
    interface SliderOptions {
        type?: "year" | "month" | "day" | "hour" | "minute" | "second" | "universal" | "universal-date" | "universal-time";
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
declare module DateSlider {
    let defaults: DateSliderOptions;
    function create(element: HTMLElement, options: DateSliderOptions): DateSliderInstance;
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
        private options;
        element: HTMLDivElement;
        private sliderElement;
        private sliderLineElement;
        private handleElement;
        private range;
        private onValueChangeEvent;
        static createAll(options: DateSliderOptions): SliderInstance[];
        constructor(options: SliderOptions);
        getValue(): number;
        setValue(value: number): void;
        private createSliderElement();
        private registerHandleListeners();
        private handleMouseDown;
        private handleMouseUp;
        private handleMouseMove;
        private updateHandlePosition();
        private calculateHandlePosition();
    }
}
declare module DateSlider.Slider {
    class SliderRange {
        private minimum;
        private maximum;
        private value;
        readonly getValue: number;
        readonly getMinimum: number;
        readonly getMaximum: number;
        constructor(minimum: number, maximum: number, value?: number);
        getRatio(): number;
        setValue(value: number): void;
        increment(by?: number): void;
        decrement(by?: number): void;
    }
}
declare module DateSlider.Slider.Context {
    class SliderValueChangeContext extends DateSliderEventContext {
        oldValue: number;
        newValue: number;
        constructor(oldValue: number, newValue: number);
    }
}
