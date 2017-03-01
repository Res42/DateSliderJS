declare module DateSlider {
    type DateSliderType = "year" | "month" | "day" | "hour" | "minute" | "second" | "universal" | "universal-date" | "universal-time";
    type DateSliderLocation = "body" | "replaceElement" | "afterElement";
    type DateSliderDisplayType = "popup" | "inline";
    type DateSliderParserFormat = "timestamp" | "string" | "date" | ((input: any, format?: string, culture?: string) => DateSliderModel);
    type DateSliderFormatterFormat = "timestamp" | "string" | "date" | ((input: DateSliderModel, format?: string, culture?: string) => any);
    type DateSliderEvent = "onSliderBoxGrabbed" | "onSliderBoxReleased" | "onSliderBoxMoved" | "onValueChanged" | "onPopupBeforeOpen" | "onPopupAfterOpen" | "onPopupBeforeClose" | "onPopupAfterClose";
}
declare module DateSlider {
    class DateSliderEventContext {
        private _isPropagationStopped;
        readonly isPropagationStopped: boolean;
        stopPropagation(): void;
    }
}
declare module DateSlider {
    class DateSliderInstance {
        private element;
        private options;
        private value;
        constructor(element: HTMLElement, options: DateSliderOptions, value?: DateSliderModel);
        getValue(): any;
        setValue(input: any): void;
        getOptions(): DateSliderOptions;
        setOptions(): void;
        on(eventName: DateSliderEvent, callback: (context: DateSliderEventContext) => DateSliderEventContext): void;
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
    interface DateSliderOptions {
        culture?: string;
        sliders?: SliderOptions[];
        appendTo?: DateSliderLocation;
        displayType?: DateSliderDisplayType;
        parser?: DateSliderParserFormat;
        parserOptions?: any;
        formatter?: DateSliderFormatterFormat;
        formatterOptions?: any;
        callback?: {
            onValueChanged?: (context: DateSliderEventContext) => DateSliderEventContext;
            onPopupBeforeOpen?: (context: DateSliderEventContext) => DateSliderEventContext;
            onPopupAfterOpen?: (context: DateSliderEventContext) => DateSliderEventContext;
            onPopupBeforeClose?: (context: DateSliderEventContext) => DateSliderEventContext;
            onPopupAfterClose?: (context: DateSliderEventContext) => DateSliderEventContext;
        };
    }
    interface SliderOptions {
        type?: DateSliderType[];
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
        constructor(options: SliderOptions);
    }
}
declare module DateSlider.Slider {
    function create(options: DateSliderOptions): SliderInstance[];
}
