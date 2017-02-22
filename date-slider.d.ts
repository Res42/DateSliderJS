declare module DateSlider {
    type DateSliderType = "year" | "month" | "day" | "hour" | "minute" | "second" | "universal" | "universal-date" | "universal-time";
    type DateSliderLocation = "body" | "replaceElement" | "afterElement";
    type DateSliderDisplayType = "popup" | "inline";
    type DateSliderInvalidOutput = string | number | null | undefined | Object;
    type DateSliderFormat = "timestamp" | "timestampMs" | "formattedString" | "date" | "custom";
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
        year: number;
        /** In the range [1, 12]. */
        month: number;
        /** In the range of [1, 31]. */
        day: number;
        hour: number;
        minute: number;
        second: number;
        constructor(year?: number, 
            /** In the range [1, 12]. */
            month?: number, 
            /** In the range of [1, 31]. */
            day?: number, hour?: number, minute?: number, second?: number);
    }
}
declare module DateSlider {
    interface DateSliderOptions {
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
declare module DateSlider {
    let defaults: DateSliderOptions;
    function create(element: HTMLElement, options: DateSliderOptions): DateSliderInstance;
}
declare module DateSlider.Formatter {
    abstract class AbstractFormatter {
        format(input: DateSliderModel, invalidValueOption: DateSliderInvalidOutput, format?: string, culture?: string): any | DateSliderInvalidOutput;
        /**
         * Formats a DateSliderModel by a format and a culture.
         * @argument input
         * @argument format The format from DateSliderOptions.outputStringFormat.
         * @argument culture The culture from DateSliderOptions.culture.
         * @returns A custom thing representing a date/time.
         */
        protected abstract formatInput(input: DateSliderModel, format?: string, culture?: string): any;
    }
}
declare module DateSlider.Formatter {
    class DateFormatter extends AbstractFormatter {
        /**
         * Formats a Date object from a DateSliderModel object.
         */
        formatInput(input: DateSliderModel): Date | DateSliderInvalidOutput;
    }
}
declare module DateSlider.Formatter {
    class StringFormatter extends AbstractFormatter {
        /**
         * Formats a string from a DateSliderModel object.
         */
        formatInput(input: DateSliderModel, format?: string, culture?: string): string | DateSliderInvalidOutput;
    }
}
declare module DateSlider.Formatter {
    class UnixTimestampFormatter extends AbstractFormatter {
        /**
         * Formats a unix timestamp (in seconds) from a DateSliderModel object.
         */
        formatInput(input: DateSliderModel): number | DateSliderInvalidOutput;
    }
}
declare module DateSlider.Formatter {
    class UnixTimestampMsFormatter extends AbstractFormatter {
        /**
         * Formats a unix timestamp (in seconds) from a DateSliderModel object.
         */
        formatInput(input: DateSliderModel): number | DateSliderInvalidOutput;
    }
}
declare module DateSlider.Parser {
    class DateParser implements IParser {
        parse(input: Date): DateSliderModel;
    }
}
declare module DateSlider.Parser {
    interface IParser {
        /**
         * Parses a date/time input by a format and a culture.
         * @argument input
         * @argument format Optional. The format from DateSliderOptions.inputStringFormat.
         * @argument culture Optional. The culture from DateSliderOptions.culture.
         * @returns A DateSliderModel object representing a date/time. If the input is invalid it returns null.
         */
        parse(input: any, format?: string, culture?: string): DateSliderModel;
    }
}
declare module DateSlider.Parser {
    class StringParser implements IParser {
        parse(input: string, format: string, culture?: string): DateSliderModel;
    }
}
declare module DateSlider.Parser {
    class UnixTimestampMsParser implements IParser {
        parse(input: number | string): DateSliderModel;
    }
}
declare module DateSlider.Parser {
    class UnixTimestampParser implements IParser {
        /**
         * Parses a unix timestamp (in seconds)
         * from a number or a string which can be parsed as a number.
         */
        parse(input: number | string): DateSliderModel;
    }
}
