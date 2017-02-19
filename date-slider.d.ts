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
        show?: ("year" | "month" | "day" | "hour" | "minute" | "second" | "universal" | "universal-date" | "universal-time")[];
        appendTo?: "body" | "replaceElement" | "afterElement";
        type?: "popup" | "inline";
        inputParseType?: "timestamp" | "timestampMs" | "formattedString" | "date" | "custom";
        inputStringFormat?: string;
        inputCustomParser?: Parser.Parser;
        outputFormatType?: "timestamp" | "timestampMs" | "formattedString" | "date" | "custom";
        outputStringFormat?: string;
        outputCustomFormatter?: Formatter.Formatter;
        outputInvalid?: string | number | null | undefined | Object;
        template?: {
            header?: string;
            footer?: string;
            sliderBox?: string;
            valueDisplay?: string;
        };
        callback?: {
            onSliderBoxGrabbed?: () => void;
            onSliderBoxReleased?: () => void;
            onSliderBoxMoved?: () => void;
            onValueChanged?: () => void;
            onPopupBeforeOpen?: () => void;
            onPopupAfterOpen?: () => void;
            onPopupBeforeClose?: () => void;
            onPopupAfterClose?: () => void;
        };
    }
}
declare module DateSlider {
    function create(element: HTMLElement, options: DateSliderOptions): DateSliderInstance;
}
declare module DateSlider.Formatter {
    interface Formatter {
        /**
         * Formats a DateSliderModel by a format and a culture.
         * @argument input
         * @argument format The format from DateSliderOptions.outputStringFormat.
         * @argument culture The culture from DateSliderOptions.culture.
         * @returns A custom thing representing a date/time.
         */
        format(input: DateSliderModel, format?: string, culture?: string): any;
    }
}
declare module DateSlider.Parser {
    class DateParser implements Parser {
        parse(input: Date): DateSliderModel;
    }
}
declare module DateSlider.Parser {
    interface Parser {
        /**
         * Parses a date/time input by a format and a culture.
         * @argument input
         * @argument format Optional. The format from DateSliderOptions.inputStringFormat.
         * @argument culture Optional. The culture from DateSliderOptions.culture.
         * @returns A DateSliderModel object representing a date/time.
         */
        parse(input: any, format?: string, culture?: string): DateSliderModel;
    }
}
declare module DateSlider.Parser {
    class StringParser implements Parser {
        parse(input: string, format: string, culture?: string): DateSliderModel;
    }
}
declare module DateSlider.Parser {
    class UnixTimestampMsParser implements Parser {
        parse(input: number | string): DateSliderModel;
    }
}
declare module DateSlider.Parser {
    class UnixTimestampParser implements Parser {
        /**
         * Parses a unix timestamp (in seconds)
         * from a number or a string which can be parsed as a number.
         */
        parse(input: number | string): DateSliderModel;
    }
}
