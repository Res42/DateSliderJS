var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
"use strict";
var DateSlider;
(function (DateSlider) {
    var Constants = (function () {
        function Constants() {
        }
        return Constants;
    }());
    Constants.SliderMarkerValueContainer = "marker-value-container";
    /** 86400 = 24 \* 60 \* 60 */
    Constants.SecondsInDay = 86400;
    /** 86400000 = 24 \* 60 \* 60 \* 1000 */
    Constants.MillisecondsInDay = 86400000;
    DateSlider.Constants = Constants;
    var Helpers = (function () {
        function Helpers() {
        }
        Helpers.getDaysinYear = function (year) {
            if (typeof year === "undefined" || year === null) {
                year = (new Date()).getUTCFullYear();
            }
            var startOfYear = new Date(year, 0, 0).getTime();
            var endOfYear = new Date(year + 1, 0, 0).getTime();
            return (endOfYear - startOfYear) / (Constants.MillisecondsInDay);
        };
        /**
         * Registers a listener to the element's destroy.
         * @param element The element whose destroy event should be watched.
         * @param callback A callback method with an optional event parameter.
         * The parameter is an Event, if the 'DOMNodeRemoved' event was caught.
         * The parameter is undefined if a MutationObserver was used to watch the element's destroy event.
         */
        Helpers.registerOnDestroy = function (element, callback) {
            if (window.MutationObserver && element.parentElement) {
                var observer_1 = new MutationObserver(function (mutations) {
                    var isTargetRemoved = mutations.some(function (mutation) {
                        for (var i = 0; i < mutation.removedNodes.length; i++) {
                            if (mutation.removedNodes[i] === element) {
                                return true;
                            }
                        }
                        return false;
                    });
                    if (isTargetRemoved) {
                        callback();
                        observer_1.disconnect();
                    }
                });
                observer_1.observe(element.parentNode, { childList: true, subtree: true });
            }
            else {
                element.addEventListener("DOMNodeRemoved", function (event) { return callback(event); }, false);
            }
        };
        /**
         * Shallow merges objects to a destination object.
         * Use \{\} as the "to" parameter and add the original object to the "from" parameter if you do not want to modify the original object.
         * @param to The destination object.
         * @param from The objects wose properties will overwrite the properties of the destination object.
         * @returns The merged object.
         */
        Helpers.shallowMerge = function (to) {
            var from = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                from[_i - 1] = arguments[_i];
            }
            for (var _a = 0, from_1 = from; _a < from_1.length; _a++) {
                var f = from_1[_a];
                for (var propertyName in f) {
                    if (f.hasOwnProperty(propertyName)) {
                        to[propertyName] = f[propertyName];
                    }
                }
            }
            return to;
        };
        Helpers.deepMerge = function (to) {
            var from = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                from[_i - 1] = arguments[_i];
            }
            for (var _a = 0, from_2 = from; _a < from_2.length; _a++) {
                var f = from_2[_a];
                for (var propertyName in f) {
                    if (f.hasOwnProperty(propertyName)) {
                        if (typeof f[propertyName] === "object") {
                            if (f[propertyName] instanceof Array) {
                                to[propertyName] = new Array();
                                for (var _b = 0, _c = f[propertyName]; _b < _c.length; _b++) {
                                    var a = _c[_b];
                                    to[propertyName].push(Helpers.deepMerge({}, a));
                                }
                            }
                            else if (f[propertyName] instanceof Node) {
                                to[propertyName] = f[propertyName];
                            }
                            else {
                                to[propertyName] = Helpers.deepMerge({}, f[propertyName]);
                            }
                        }
                        else {
                            to[propertyName] = f[propertyName];
                        }
                    }
                }
            }
            return to;
        };
        return Helpers;
    }());
    DateSlider.Helpers = Helpers;
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    /**
     * Default options for the whole DateSlider.
     */
    DateSlider.defaults = {
        formatter: "timestamp",
        formatterOptions: { type: "milliseconds" },
        interval: false,
        parser: "timestamp",
        parserOptions: { type: "milliseconds" },
    };
    /**
     * Default options for the universal time slider.
     */
    DateSlider.universalTimeDefaults = {
        displayValueFormatter: function (value) {
            var pad = function (v) {
                return (0 <= v && v < 10) ? "0" + v : v.toString();
            };
            var seconds = value % 60;
            var minutes = Math.floor(value / 60) % 60;
            var hours = Math.floor(value / 3600);
            return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
        },
        markers: {
            displayValueFormatter: function (value, minimum, maximum) {
                if (value === maximum) {
                    return "24";
                }
                return (value / 3600).toString();
            },
            perpendicularOffset: 20,
            showValueMarker: function (value, minimum, maximum) {
                var show;
                if (value === maximum) {
                    show = true;
                }
                else {
                    show = value % 3600 === 0;
                }
                return show ? "" : null;
            },
        },
        type: "universal-time",
    };
    DateSlider.monthDefaults = {
        markers: {
            perpendicularOffset: 20,
            showValueMarker: function (value, minimum, maximum) {
                return "";
            },
        },
        type: "month",
    };
    DateSlider.universalDateDefaults = {
        // markers: {
        //     perpendicularOffset: 20,
        //     showValueMarker: (value: number, minimum: number, maximum: number): string | string[] => {
        //         return "";
        //     },
        // },
        type: "universal-date",
    };
    DateSlider.yearDefaults = {
        markers: {
            perpendicularOffset: 20,
            showValueMarker: function (value, minimum, maximum) {
                return "";
            },
        },
        movement: "slide",
        type: "year",
    };
    DateSlider.defaultSilderOptions = {
        "month": DateSlider.monthDefaults,
        "universal-date": DateSlider.universalDateDefaults,
        "universal-time": DateSlider.universalTimeDefaults,
        "year": DateSlider.yearDefaults,
    };
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    var DateSliderEventContext = (function () {
        function DateSliderEventContext() {
            this._isPropagationStopped = false;
        }
        Object.defineProperty(DateSliderEventContext.prototype, "isPropagationStopped", {
            get: function () {
                return this._isPropagationStopped;
            },
            enumerable: true,
            configurable: true
        });
        DateSliderEventContext.prototype.stopPropagation = function () {
            this._isPropagationStopped = true;
        };
        return DateSliderEventContext;
    }());
    DateSlider.DateSliderEventContext = DateSliderEventContext;
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    var DateSliderEventHandler = (function () {
        function DateSliderEventHandler() {
            this.events = [];
        }
        DateSliderEventHandler.prototype.register = function (handler, index) {
            if (!handler) {
                return;
            }
            if (typeof handler !== "function") {
                throw new Error("DateSliderEventHandler.register(): handler is not given or not a function.");
            }
            if ((typeof index !== "undefined" || index !== null) && 0 <= index && index < this.events.length) {
                this.events.splice(index, 0, handler);
            }
            else {
                this.events.push(handler);
            }
        };
        DateSliderEventHandler.prototype.remove = function (handler) {
            if (!handler) {
                return;
            }
            this.events = this.events.filter(function (e) { return e !== handler; });
        };
        DateSliderEventHandler.prototype.fire = function (context) {
            for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
                var callback = _a[_i];
                callback(context);
                if (context.isPropagationStopped) {
                    break;
                }
            }
        };
        return DateSliderEventHandler;
    }());
    DateSlider.DateSliderEventHandler = DateSliderEventHandler;
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    var DateSliderInstance = (function () {
        function DateSliderInstance(element, options, value) {
            var _this = this;
            this.element = element;
            this.options = options;
            this.value = value;
            this.onValueChangeEvent = new DateSlider.DateSliderEventHandler();
            this.onSliderUpdate = function (context, options) {
                var oldValue = _this.getValue();
                switch (options.type) {
                    case "year":
                        _this.value.model.year = context.newValue;
                        break;
                    case "month":
                        _this.value.model.month = context.newValue;
                        break;
                    case "day":
                        _this.value.model.day = context.newValue;
                        break;
                    case "hour":
                        _this.value.model.hour = context.newValue;
                        break;
                    case "minute":
                        _this.value.model.minute = context.newValue;
                        break;
                    case "second":
                        _this.value.model.second = context.newValue;
                        break;
                    case "universal-date":
                        // TODO
                        break;
                    case "universal-time":
                        _this.value.model.hour = Math.floor(context.newValue / 3600);
                        _this.value.model.minute = Math.floor(context.newValue / 60) % 60;
                        _this.value.model.second = context.newValue % 60;
                        break;
                    case "universal":
                        // TODO
                        break;
                }
                _this.onValueChangeEvent.fire(new DateSlider.Context.ValueChangeContext(oldValue, _this.getValue()));
            };
            if (!element || !element.parentNode) {
                throw new Error("DateSlider.create(): Given HTML element is invalid.");
            }
            this.sliders = DateSlider.Slider.SliderInstance.createAll(options);
            this.sliders.forEach(function (slider) {
                slider.on("onValueChanged", function (context) { return _this.onSliderUpdate(context, slider.options); });
            });
            var wrapper = this.createWrapper(this.sliders);
            element.parentNode.replaceChild(wrapper, element);
            DateSlider.Helpers.registerOnDestroy(wrapper, function (event) {
                for (var _i = 0, _a = _this.sliders; _i < _a.length; _i++) {
                    var slider = _a[_i];
                    slider.destroy(event);
                }
            });
            if (!value) {
                this.value = new DateSlider.DateSliderModel(new DateSlider.InnerModel(), null);
            }
            if (this.options.callback) {
                this.onValueChangeEvent.register(this.options.callback.onValueChanged);
            }
            this.setOptions();
        }
        DateSliderInstance.prototype.getValue = function () {
            return this.formatter.format(this.value, this.options.formatterOptions);
        };
        DateSliderInstance.prototype.setValue = function (input) {
            var oldValue = this.getValue();
            this.value = this.parser.parse(input, this.options.parserOptions);
            this.updateSliders();
            this.onValueChangeEvent.fire(new DateSlider.Context.ValueChangeContext(oldValue, this.getValue()));
        };
        DateSliderInstance.prototype.getOptions = function () {
            return this.options;
        };
        DateSliderInstance.prototype.updateOptions = function (options) {
            DateSlider.Helpers.deepMerge(this.options, options);
            // TODO update sliders
            this.setOptions();
        };
        DateSliderInstance.prototype.replaceOptions = function (options) {
            this.options = options;
            // TODO update sliders
            this.setOptions();
        };
        DateSliderInstance.prototype.on = function (eventName, callback) {
            if (eventName === "onValueChanged") {
                this.onValueChangeEvent.register(callback);
            }
        };
        DateSliderInstance.prototype.setOptions = function () {
            this.bindParser();
            this.bindFormatter();
        };
        DateSliderInstance.prototype.updateSliders = function () {
            for (var _i = 0, _a = this.sliders; _i < _a.length; _i++) {
                var slider = _a[_i];
                switch (slider.options.type) {
                    case "year":
                        slider.setValue(this.value.model.year);
                        break;
                    case "month":
                        slider.setValue(this.value.model.month);
                        break;
                    case "day":
                        slider.setValue(this.value.model.day);
                        break;
                    case "hour":
                        slider.setValue(this.value.model.hour);
                        break;
                    case "minute":
                        slider.setValue(this.value.model.minute);
                        break;
                    case "second":
                        slider.setValue(this.value.model.second);
                        break;
                    case "universal-date":
                        // TODO
                        break;
                    case "universal-time":
                        slider.setValue(this.value.model.hour * 3600 + this.value.model.minute * 60 + this.value.model.second);
                        break;
                    case "universal":
                        // TODO
                        break;
                }
            }
        };
        DateSliderInstance.prototype.bindFormatter = function () {
            if (typeof this.options.formatter === "string") {
                switch (this.options.formatter) {
                    case "timestamp":
                        this.formatter = new DateSlider.Formatter.UnixTimestampFormatter();
                        break;
                    case "date":
                        this.formatter = new DateSlider.Formatter.DateFormatter();
                        break;
                    case "string":
                        this.formatter = new DateSlider.Formatter.StringFormatter();
                        break;
                    default:
                        throw new Error("DateSlider.create(): Invalid formatter.");
                }
            }
            else if (typeof this.options.formatter === "function") {
                this.formatter = new DateSlider.Formatter.CustomFormatter(this.options.formatter);
            }
            else {
                throw new Error("DateSlider.create(): Invalid formatter.");
            }
        };
        DateSliderInstance.prototype.bindParser = function () {
            if (typeof this.options.parser === "string") {
                switch (this.options.parser) {
                    case "timestamp":
                        this.parser = new DateSlider.Parser.UnixTimestampParser();
                        break;
                    case "date":
                        this.parser = new DateSlider.Parser.DateParser();
                        break;
                    case "string":
                        this.parser = new DateSlider.Parser.StringParser();
                        break;
                    default:
                        throw new Error("DateSlider.create(): Invalid parser.");
                }
            }
            else if (typeof this.options.parser === "function") {
                this.parser = new DateSlider.Parser.CustomParser(this.options.parser);
            }
            else {
                throw new Error("DateSlider.create(): Invalid parser.");
            }
        };
        DateSliderInstance.prototype.createWrapper = function (sliders) {
            var fragment = document.createDocumentFragment();
            for (var _i = 0, sliders_1 = sliders; _i < sliders_1.length; _i++) {
                var slider = sliders_1[_i];
                fragment.appendChild(slider.element);
            }
            var wrapper = document.createElement("div");
            wrapper.classList.add("date-slider");
            wrapper.appendChild(fragment);
            var _loop_1 = function (slider) {
                DateSlider.Helpers.registerOnDestroy(slider.element, function (event) { return slider.destroy(event); });
            };
            // in the appendChild method the silders' destroy method would be called because it fires the 'DOMNodeRemoved' event
            // also only after this will the sliders' element gain a parent to use the MutationObserver
            for (var _a = 0, sliders_2 = sliders; _a < sliders_2.length; _a++) {
                var slider = sliders_2[_a];
                _loop_1(slider);
            }
            return wrapper;
        };
        return DateSliderInstance;
    }());
    DateSlider.DateSliderInstance = DateSliderInstance;
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    var DateSliderModel = (function () {
        function DateSliderModel(model, rawValue) {
            this.model = model;
            this.rawValue = rawValue;
        }
        return DateSliderModel;
    }());
    DateSlider.DateSliderModel = DateSliderModel;
    var InnerModel = (function () {
        function InnerModel(year, 
            /** In the range [1, 12]. */
            month, 
            /** In the range of [1, 31]. */
            day, hour, minute, second, timezone) {
            if (year === void 0) { year = 0; }
            if (month === void 0) { month = 1; }
            if (day === void 0) { day = 1; }
            if (hour === void 0) { hour = 0; }
            if (minute === void 0) { minute = 0; }
            if (second === void 0) { second = 0; }
            if (timezone === void 0) { timezone = ""; }
            this.year = year;
            this.month = month;
            this.day = day;
            this.hour = hour;
            this.minute = minute;
            this.second = second;
            this.timezone = timezone;
        }
        return InnerModel;
    }());
    DateSlider.InnerModel = InnerModel;
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    function create(element, options) {
        if (!element) {
            throw new Error("DateSlider.create(): Given HTML element is invalid.");
        }
        var opts = DateSlider.Helpers.deepMerge({}, DateSlider.defaults, options);
        for (var i = 0; i < opts.sliders.length; i++) {
            var sliderDefaults = DateSlider.defaultSilderOptions[opts.sliders[i].type];
            if (sliderDefaults) {
                opts.sliders[i] = DateSlider.Helpers.deepMerge({}, sliderDefaults, opts.sliders[i]);
            }
        }
        return new DateSlider.DateSliderInstance(element, opts);
    }
    DateSlider.create = create;
    // TODO
    // date parser / formatter + tests
    // string parser / formatter + tests
    // range interval
    // test range
    // demo: out of the box, full customization
    // slider distance of mouse from handle -> slowness of steps
    // jquery, angular integration
    // expanding / moving window slider
})(DateSlider || (DateSlider = {}));
"use strict";
"use strict";
var DateSlider;
(function (DateSlider) {
    var Vector = (function () {
        function Vector(x, y) {
            this.x = x;
            this.y = y;
        }
        Vector.prototype.add = function (vector) {
            return new Vector(this.x + vector.x, this.y + vector.y);
        };
        Vector.prototype.substract = function (vector) {
            return new Vector(this.x - vector.x, this.y - vector.y);
        };
        Vector.prototype.multiply = function (scalar) {
            return new Vector(this.x * scalar, this.y * scalar);
        };
        Vector.prototype.divide = function (scalar) {
            return new Vector(this.x / scalar, this.y / scalar);
        };
        Vector.prototype.dot = function (vector) {
            return this.x * vector.x + this.y * vector.y;
        };
        Vector.prototype.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        Vector.prototype.normalize = function () {
            var length = this.length();
            return new Vector(this.x / length, this.y / length);
        };
        Vector.prototype.perpendicularClockwise = function () {
            return new Vector(-this.y, this.x);
        };
        Vector.prototype.perpendicularCounterClockwise = function () {
            return new Vector(this.y, -this.x);
        };
        Vector.prototype.floor = function () {
            return new Vector(Math.floor(this.x), Math.floor(this.y));
        };
        Vector.prototype.ceil = function () {
            return new Vector(Math.ceil(this.x), Math.ceil(this.y));
        };
        return Vector;
    }());
    DateSlider.Vector = Vector;
})(DateSlider || (DateSlider = {}));
/// <reference path="../date-slider-event-context.ts" />
"use strict";
var DateSlider;
(function (DateSlider) {
    var Context;
    (function (Context) {
        var ValueChangeContext = (function (_super) {
            __extends(ValueChangeContext, _super);
            function ValueChangeContext(oldValue, newValue) {
                var _this = _super.call(this) || this;
                _this.oldValue = oldValue;
                _this.newValue = newValue;
                return _this;
            }
            return ValueChangeContext;
        }(DateSlider.DateSliderEventContext));
        Context.ValueChangeContext = ValueChangeContext;
    })(Context = DateSlider.Context || (DateSlider.Context = {}));
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    var Formatter;
    (function (Formatter) {
        var CustomFormatter = (function () {
            function CustomFormatter(format) {
                this.format = format;
            }
            return CustomFormatter;
        }());
        Formatter.CustomFormatter = CustomFormatter;
    })(Formatter = DateSlider.Formatter || (DateSlider.Formatter = {}));
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    var Formatter;
    (function (Formatter) {
        var DateFormatterOptions = (function () {
            function DateFormatterOptions(type) {
                this.type = type;
            }
            return DateFormatterOptions;
        }());
        Formatter.DateFormatterOptions = DateFormatterOptions;
        var DateFormatter = (function () {
            function DateFormatter() {
            }
            /**
             * Formats a Date object from a DateSliderModel object.
             */
            DateFormatter.prototype.format = function (input, options) {
                return new Date();
            };
            return DateFormatter;
        }());
        Formatter.DateFormatter = DateFormatter;
    })(Formatter = DateSlider.Formatter || (DateSlider.Formatter = {}));
})(DateSlider || (DateSlider = {}));
"use strict";
"use strict";
var DateSlider;
(function (DateSlider) {
    var Formatter;
    (function (Formatter) {
        var StringFormatterOptions = (function () {
            function StringFormatterOptions(format, culture) {
                this.format = format;
                this.culture = culture;
            }
            return StringFormatterOptions;
        }());
        Formatter.StringFormatterOptions = StringFormatterOptions;
        var StringFormatter = (function () {
            function StringFormatter() {
            }
            /**
             * Formats a string from a DateSliderModel object.
             */
            StringFormatter.prototype.format = function (input, options) {
                return "null";
            };
            return StringFormatter;
        }());
        Formatter.StringFormatter = StringFormatter;
    })(Formatter = DateSlider.Formatter || (DateSlider.Formatter = {}));
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    var Formatter;
    (function (Formatter) {
        var UnixTimestampFormatterOptions = (function () {
            function UnixTimestampFormatterOptions(type) {
                this.type = type;
            }
            return UnixTimestampFormatterOptions;
        }());
        Formatter.UnixTimestampFormatterOptions = UnixTimestampFormatterOptions;
        var UnixTimestampFormatter = (function () {
            function UnixTimestampFormatter() {
            }
            /**
             * Formats a unix timestamp (in seconds) from a DateSliderModel object.
             */
            UnixTimestampFormatter.prototype.format = function (input, options) {
                var timestampInMs = Date.UTC(input.model.year, input.model.month - 1, input.model.day, input.model.hour, input.model.minute, input.model.second, 0);
                return timestampInMs / (options.type === "seconds" ? 1000 : 1);
            };
            return UnixTimestampFormatter;
        }());
        Formatter.UnixTimestampFormatter = UnixTimestampFormatter;
    })(Formatter = DateSlider.Formatter || (DateSlider.Formatter = {}));
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    var Parser;
    (function (Parser) {
        var CustomParser = (function () {
            function CustomParser(parse) {
                this.parse = parse;
            }
            return CustomParser;
        }());
        Parser.CustomParser = CustomParser;
    })(Parser = DateSlider.Parser || (DateSlider.Parser = {}));
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    var Parser;
    (function (Parser) {
        var DateParserOptions = (function () {
            function DateParserOptions(type) {
                this.type = type;
            }
            return DateParserOptions;
        }());
        Parser.DateParserOptions = DateParserOptions;
        var DateParser = (function () {
            function DateParser() {
            }
            DateParser.prototype.parse = function (input, options) {
                return new DateSlider.DateSliderModel(null, input);
            };
            return DateParser;
        }());
        Parser.DateParser = DateParser;
    })(Parser = DateSlider.Parser || (DateSlider.Parser = {}));
})(DateSlider || (DateSlider = {}));
"use strict";
"use strict";
var DateSlider;
(function (DateSlider) {
    var Parser;
    (function (Parser) {
        var StringParserOptions = (function () {
            function StringParserOptions(format, culture) {
                this.format = format;
                this.culture = culture;
            }
            return StringParserOptions;
        }());
        Parser.StringParserOptions = StringParserOptions;
        var StringParser = (function () {
            function StringParser() {
            }
            StringParser.prototype.parse = function (input, options) {
                return new DateSlider.DateSliderModel(null, input);
            };
            return StringParser;
        }());
        Parser.StringParser = StringParser;
    })(Parser = DateSlider.Parser || (DateSlider.Parser = {}));
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    var Parser;
    (function (Parser) {
        var UnixTimestampParserOptions = (function () {
            function UnixTimestampParserOptions(type) {
                this.type = type;
            }
            return UnixTimestampParserOptions;
        }());
        Parser.UnixTimestampParserOptions = UnixTimestampParserOptions;
        var UnixTimestampParser = (function () {
            function UnixTimestampParser() {
            }
            /** Parses a unix timestamp from a number. */
            UnixTimestampParser.prototype.parse = function (input, options) {
                if (typeof input !== "number") {
                    throw new Error("Cannot parse non-number to unix timestamp.");
                }
                var date = new Date(input * (options.type === "seconds" ? 1000 : 1));
                var model = new DateSlider.InnerModel(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
                return new DateSlider.DateSliderModel(model, input);
            };
            return UnixTimestampParser;
        }());
        Parser.UnixTimestampParser = UnixTimestampParser;
    })(Parser = DateSlider.Parser || (DateSlider.Parser = {}));
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    var Slider;
    (function (Slider) {
        var SliderInstance = (function () {
            function SliderInstance(options, range) {
                var _this = this;
                this.options = options;
                this.range = range;
                this.toDiscrete = Math.round;
                this.isDragging = false;
                this.onValueChangeEvent = new DateSlider.DateSliderEventHandler();
                this.onSliderHandleGrabEvent = new DateSlider.DateSliderEventHandler();
                this.onSliderHandleReleaseEvent = new DateSlider.DateSliderEventHandler();
                this.onSliderHandleMoveEvent = new DateSlider.DateSliderEventHandler();
                this.events = {
                    load: function () { _this.updateHandlePosition(); _this.updateValueDisplay(); _this.createMarkers(); _this.updateMarkersPosition(); },
                    mousedown: function (e) { return _this.handleMouseDown(e); },
                    mousemove: function (e) { return _this.handleMouseMove(e); },
                    mouseup: function (e) { return _this.handleMouseUp(e); },
                    resize: function () { _this.updateHandlePosition(); _this.updateMarkersPosition(); },
                    touchend: function (e) { return _this.handleMouseUp(e); },
                    touchmove: function (e) { return _this.handleMouseMove(e); },
                    touchstart: function (e) { return _this.handleMouseDown(e); },
                };
                this.destroy = function (event) {
                    window.removeEventListener("load", _this.events.load);
                    window.removeEventListener("resize", _this.events.resize);
                    if (typeof _this.slideIntervalHandle !== "undefined" && _this.slideIntervalHandle !== null) {
                        window.clearInterval(_this.slideIntervalHandle);
                    }
                    _this.removeMovementListeners();
                };
                this.handleMouseDown = function (e) {
                    // only move handler with the left mouse button
                    if (_this.isHandleReleased(e)) {
                        _this.isDragging = false;
                        return;
                    }
                    e.preventDefault();
                    _this.lastPointerPosition = _this.getPositionFromEvent(e);
                    _this.isDragging = true;
                    _this.addMovementListeners();
                    _this.onSliderHandleGrabEvent.fire(null);
                };
                this.handleMouseUp = function (e) {
                    _this.isDragging = false;
                    _this.lastPointerPosition = _this.getPositionFromEvent(e);
                    _this.setValue(_this.toDiscrete(_this.calculateValue(_this.lastPointerPosition)));
                    _this.removeMovementListeners();
                    _this.onSliderHandleReleaseEvent.fire(null);
                };
                this.handleMouseMove = function (e) {
                    if (e instanceof MouseEvent) {
                        // prevent default: for example to disable the default image dragging
                        e.preventDefault();
                    }
                    if (_this.isHandleReleased(e)) {
                        _this.removeMovementListeners();
                        _this.isDragging = false;
                        return;
                    }
                    _this.lastPointerPosition = _this.getPositionFromEvent(e);
                    _this.setValue(_this.calculateValue(_this.lastPointerPosition));
                    _this.onSliderHandleMoveEvent.fire(null);
                };
                this.sliding = function () {
                    var direction;
                    if (_this.range.value === _this.range.maximum) {
                        direction = 1;
                    }
                    else if (_this.range.value === _this.range.minimum) {
                        direction = -1;
                    }
                    else {
                        direction = 0;
                    }
                    if (direction !== 0) {
                        _this.updateAfter(function () {
                            _this.range.slide(direction * (_this.options.movementStep || 1));
                            if (_this.isDragging) {
                                _this.setValue(_this.calculateValue(_this.lastPointerPosition));
                            }
                        });
                        _this.createMarkers();
                        _this.updateMarkersPosition();
                    }
                };
                this.updateValueDisplay = function () {
                    if (_this.valueContainerElement) {
                        var value = _this.getValue();
                        var displayedValue = _this.options.displayValueFormatter
                            ? _this.options.displayValueFormatter(value)
                            : value.toString();
                        _this.valueContainerElement.innerHTML = displayedValue;
                    }
                };
                this.updateHandlePosition = function () {
                    var position = _this.calculateHandlePosition();
                    _this.handleElement.style.position = "absolute";
                    _this.handleElement.style.left = position.x + "px";
                    _this.handleElement.style.top = position.y + "px";
                };
                if (options.callback) {
                    this.onValueChangeEvent.register(options.callback.onValueChanged);
                    this.onSliderHandleGrabEvent.register(options.callback.onSliderHandleGrabbed);
                    this.onSliderHandleMoveEvent.register(options.callback.onSliderHandleMoved);
                    this.onSliderHandleReleaseEvent.register(options.callback.onSliderHandleReleased);
                }
                if (this.options.movement === "slide") {
                    this.range.value = this.toDiscrete((this.range.maximum - this.range.minimum) / 2);
                    this.registerSliding();
                }
                if (this.options.template instanceof HTMLElement) {
                    this.bootstrapSliderToTemplate();
                }
                else {
                    this.createSliderElement();
                }
                this.registerListeners();
                this.onValueChangeEvent.fire(new Slider.Context.SliderValueChangeContext(null, this.range.value));
            }
            SliderInstance.createAll = function (options) {
                if (!options.sliders) {
                    throw new Error("Cannot create sliders because options.sliders is not set.");
                }
                var sliders = [];
                for (var _i = 0, _a = options.sliders; _i < _a.length; _i++) {
                    var sliderOptions = _a[_i];
                    sliders.push(new SliderInstance(sliderOptions, this.getRangeFromType(sliderOptions)));
                }
                return sliders;
            };
            SliderInstance.getRangeFromType = function (sliderOptions) {
                switch (sliderOptions.type) {
                    case "year":
                        var currentYear = new Date().getUTCFullYear();
                        return new Slider.SliderRange(currentYear - 10, currentYear + 10);
                    case "month":
                        return new Slider.SliderRange(1, 12);
                    case "day":
                        return new Slider.SliderRange(1, 31);
                    case "hour":
                        return new Slider.SliderRange(0, 23);
                    case "minute":
                    case "second":
                        return new Slider.SliderRange(0, 59);
                    case "universal":
                        // TODO
                        return new Slider.SliderRange(1, 12);
                    case "universal-date":
                        // TODO
                        return new Slider.SliderRange(1, 12);
                    case "universal-time":
                        return new Slider.SliderRange(0, DateSlider.Constants.SecondsInDay - 1);
                    default:
                        throw new Error("SliderOptions.type is not valid.");
                }
            };
            SliderInstance.prototype.getValue = function () {
                return this.toDiscrete(this.range.value);
            };
            SliderInstance.prototype.setValue = function (value) {
                var _this = this;
                this.updateAfter(function () {
                    _this.range.value = value;
                });
            };
            SliderInstance.prototype.on = function (eventName, callback) {
                switch (eventName) {
                    case "onValueChanged":
                        this.onValueChangeEvent.register(callback);
                        break;
                    case "onSliderBoxGrabbed":
                        this.onSliderHandleGrabEvent.register(callback);
                        break;
                    case "onSliderBoxMoved":
                        this.onSliderHandleMoveEvent.register(callback);
                        break;
                    case "onSliderBoxReleased":
                        this.onSliderHandleReleaseEvent.register(callback);
                        break;
                }
            };
            SliderInstance.prototype.bootstrapSliderToTemplate = function () {
                this.element = this.options.template.cloneNode(true);
                this.sliderElement = this.findElementInSlider("slider-control-template");
                this.handleElement = this.findElementInSlider("slider-handle-template");
                this.sliderLineStart = this.findElementInSlider("slider-control-start-template");
                this.sliderLineEnd = this.findElementInSlider("slider-control-end-template");
                // TODO?: multiple value containers? use same class in template and normal?
                this.valueContainerElement = this.findElementInSlider("slider-value-container-template", false);
                this.markerElement = this.findElementInSlider("slider-marker-template", false);
                this.markerElement.remove();
            };
            SliderInstance.prototype.findElementInSlider = function (className, required) {
                if (required === void 0) { required = true; }
                var found = this.element.getElementsByClassName(className);
                if (found.length > 0) {
                    return found[0];
                }
                if (required) {
                    throw new Error("Cannot find DOM element with class: '" + className + "' in the template.");
                }
                return null;
            };
            SliderInstance.prototype.createSliderElement = function () {
                this.element = document.createElement("div");
                this.element.classList.add("slider");
                // value display
                this.valueContainerElement = document.createElement("div");
                this.valueContainerElement.classList.add("slider-value-container");
                this.element.appendChild(this.valueContainerElement);
                // value marker
                this.markerElement = document.createElement("div");
                this.markerElement.classList.add("slider-marker");
                var valueContainer = document.createElement("div");
                valueContainer.classList.add(DateSlider.Constants.SliderMarkerValueContainer);
                this.markerElement.appendChild(valueContainer);
                var marker = document.createElement("div");
                marker.classList.add("marker-mark");
                this.markerElement.appendChild(marker);
                // slider
                this.sliderElement = document.createElement("div");
                this.sliderElement.classList.add("slider-control");
                this.element.appendChild(this.sliderElement);
                this.sliderLineStart = document.createElement("div");
                this.sliderLineStart.classList.add("slider-control-start");
                this.sliderElement.appendChild(this.sliderLineStart);
                this.sliderLineElement = document.createElement("div");
                this.sliderLineElement.classList.add("slider-control-line");
                this.sliderElement.appendChild(this.sliderLineElement);
                this.sliderLineEnd = document.createElement("div");
                this.sliderLineEnd.classList.add("slider-control-end");
                this.sliderElement.appendChild(this.sliderLineEnd);
                this.handleElement = document.createElement("div");
                this.handleElement.classList.add("slider-handle");
                this.sliderElement.appendChild(this.handleElement);
            };
            SliderInstance.prototype.registerListeners = function () {
                this.handleElement.addEventListener("mousedown", this.events.mousedown, false);
                this.handleElement.addEventListener("touchstart", this.events.touchstart, true);
                window.addEventListener("load", this.events.load);
                window.addEventListener("resize", this.events.resize);
            };
            SliderInstance.prototype.addMovementListeners = function () {
                window.addEventListener("touchmove", this.events.touchmove, true);
                window.addEventListener("mousemove", this.events.mousemove, true);
                window.addEventListener("mouseup", this.events.mouseup, false);
                window.addEventListener("touchend", this.events.touchend, false);
            };
            SliderInstance.prototype.removeMovementListeners = function () {
                window.removeEventListener("touchmove", this.events.touchmove, true);
                window.removeEventListener("mousemove", this.events.mousemove, true);
                window.removeEventListener("mouseup", this.events.mouseup, false);
                window.removeEventListener("touchend", this.events.touchend, false);
            };
            SliderInstance.prototype.isHandleReleased = function (e) {
                // no touches
                return e instanceof TouchEvent && e.targetTouches.length <= 0
                    || e instanceof MouseEvent && (1 & e.buttons) !== 1;
            };
            SliderInstance.prototype.updateAfter = function (callback) {
                var oldValue = this.toDiscrete(this.range.value);
                callback();
                var newValue = this.toDiscrete(this.range.value);
                this.updateValueDisplay();
                this.updateHandlePosition();
                if (oldValue !== newValue) {
                    this.onValueChangeEvent.fire(new Slider.Context.SliderValueChangeContext(oldValue, newValue));
                }
            };
            SliderInstance.prototype.registerSliding = function () {
                this.slideIntervalHandle = window.setInterval(this.sliding, 200);
            };
            SliderInstance.prototype.createMarkers = function () {
                if (this.markerElement && this.options.markers && this.options.markers.showValueMarker) {
                    if (this.markers) {
                        for (var _i = 0, _a = this.markers; _i < _a.length; _i++) {
                            var marker = _a[_i];
                            marker.element.remove();
                        }
                    }
                    this.markers = [];
                    for (var v = this.range.minimum; v <= this.range.maximum; v++) {
                        var classNames = this.options.markers.showValueMarker(v, this.range.minimum, this.range.maximum);
                        if (classNames !== null) {
                            var marker = this.markerElement.cloneNode(true);
                            if (typeof classNames === "string" && classNames.length > 0) {
                                marker.classList.add(classNames);
                            }
                            else if (classNames instanceof Array) {
                                (_b = marker.classList).add.apply(_b, classNames);
                            }
                            var valueContainers = marker.getElementsByClassName(DateSlider.Constants.SliderMarkerValueContainer);
                            this.markers.push({ element: marker, valueContainers: valueContainers, value: v });
                            this.sliderElement.appendChild(marker);
                            this.updateMarkerValue(this.markers[this.markers.length - 1]);
                        }
                    }
                    this.sliderElement.style.overflow = "hidden";
                }
                var _b;
            };
            SliderInstance.prototype.updateMarkerValue = function (marker) {
                var text;
                if (this.options.markers.displayValueFormatter) {
                    text = this.options.markers.displayValueFormatter(marker.value, this.range.minimum, this.range.maximum);
                }
                else if (this.options.displayValueFormatter) {
                    text = this.options.displayValueFormatter(marker.value);
                }
                else {
                    text = marker.value.toString();
                }
                for (var i = 0; i < marker.valueContainers.length; i++) {
                    var container = marker.valueContainers.item(i);
                    container.innerHTML = text;
                }
            };
            SliderInstance.prototype.updateMarkersPosition = function () {
                if (!this.markers || this.markers.length <= 0) {
                    return;
                }
                var startCenter = this.calculateCenterPosition(this.sliderLineStart);
                var endCenter = this.calculateCenterPosition(this.sliderLineEnd);
                var se = endCenter.substract(startCenter);
                // with this length, if the overflow is set to hidden,
                // then the first marker's start will be at the beginning of the slider
                // and the last marker's start will be at the end of the slider
                var markerLength = se.length() / (this.markers.length - 1);
                // offset the markers, so the first marker's CENTER will be at the beginning of the slider
                //                    and the last  marker's CENTER will be at the end of the slider
                var xOffset = se.normalize().multiply(markerLength / 2);
                for (var _i = 0, _a = this.markers; _i < _a.length; _i++) {
                    var marker = _a[_i];
                    var markerRatio = (marker.value - this.range.minimum) / (this.range.maximum - this.range.minimum);
                    var markerYPosition = startCenter.add(se.multiply(markerRatio).add(se.normalize().perpendicularCounterClockwise().multiply(this.options.markers.perpendicularOffset || 0)));
                    var markerXPosition = markerYPosition.substract(xOffset);
                    marker.element.style.width = markerLength.toFixed(2) + "px";
                    marker.element.style.position = "absolute";
                    marker.element.style.top = (markerYPosition.y - marker.element.scrollHeight).toFixed(2) + "px";
                    marker.element.style.left = markerXPosition.x.toFixed(2) + "px";
                }
            };
            SliderInstance.prototype.getPositionFromEvent = function (e) {
                if (e instanceof MouseEvent) {
                    return new DateSlider.Vector(e.clientX, e.clientY);
                }
                else if (e instanceof TouchEvent) {
                    return new DateSlider.Vector(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
                }
                throw new Error("Cannot extract position from event.");
            };
            SliderInstance.prototype.calculateValue = function (position) {
                var r = this.calculateOrthogonalProjectionRatio(position);
                return (this.range.maximum - this.range.minimum) * r.ratio + this.range.minimum;
            };
            SliderInstance.prototype.calculateOrthogonalProjectionRatio = function (position) {
                // the ratio of the projection of the s->p vector on the s->e vector
                // imagine that the /'s are orthogonal to the slider line
                // |---------->
                // |
                // |   s       slider start
                // |  / \
                // | .   \a    s->a is the projection
                // |  \  /\
                // |    p  \   p is the position of the mouse / touch
                // V        e  slider end
                var start = this.sliderLineStart.getBoundingClientRect();
                var end = this.sliderLineEnd.getBoundingClientRect();
                var startCenter = this.calculateCenterPosition(start);
                var endCenter = this.calculateCenterPosition(end);
                var sp = position.substract(startCenter);
                var se = endCenter.substract(startCenter);
                var othogonalProjectionRatio = sp.dot(se) / se.dot(se);
                return {
                    distance: sp.substract(se.multiply(othogonalProjectionRatio)).length(),
                    ratio: othogonalProjectionRatio,
                };
            };
            SliderInstance.prototype.calculateHandlePosition = function () {
                // calculates the center of an absolute positioned element
                var ratioInSlider = this.range.ratio;
                var startPosition = this.calculateCenterPosition(this.sliderLineStart);
                var endPosition = this.calculateCenterPosition(this.sliderLineEnd);
                // start the handle at the start
                // the handle's center should be at the start, so it needs an adjustment
                // finally, calculate the handle's position in the line by it's range value (min: 0% -> max: 100%)
                return new DateSlider.Vector(startPosition.x - this.handleElement.offsetWidth / 2 + (endPosition.x - startPosition.x) * ratioInSlider, startPosition.y - this.handleElement.offsetHeight / 2 + (endPosition.y - startPosition.y) * ratioInSlider);
            };
            SliderInstance.prototype.calculateCenterPosition = function (element) {
                if (element instanceof HTMLElement) {
                    return new DateSlider.Vector(element.offsetLeft + element.offsetWidth / 2, element.offsetTop + element.offsetHeight / 2);
                }
                else if (element instanceof ClientRect) {
                    return new DateSlider.Vector(element.left + element.width / 2, element.top + element.height / 2);
                }
                throw new Error("Invalid parameter.");
            };
            return SliderInstance;
        }());
        Slider.SliderInstance = SliderInstance;
    })(Slider = DateSlider.Slider || (DateSlider.Slider = {}));
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    var Slider;
    (function (Slider) {
        var SliderRange = (function () {
            function SliderRange(_minimum, _maximum, _value) {
                this._minimum = _minimum;
                this._maximum = _maximum;
                this._value = _value;
                if (this._minimum === this._maximum) {
                    throw new Error("Range minimum cannot be equal to the maximum.");
                }
                if (typeof this._value === "undefined" || this._value === null) {
                    this._value = this._minimum;
                }
            }
            Object.defineProperty(SliderRange.prototype, "ratio", {
                get: function () {
                    return (this.value - this.minimum) / (this.maximum - this.minimum);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SliderRange.prototype, "minimum", {
                get: function () { return this._minimum; },
                set: function (minimum) {
                    if (this._maximum <= minimum) {
                        throw new Error("Range minimum cannot be >= maximum.");
                    }
                    if (minimum > this._value) {
                        this._value = minimum;
                    }
                    this._maximum = minimum;
                },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(SliderRange.prototype, "maximum", {
                get: function () { return this._maximum; },
                set: function (maximum) {
                    if (this._minimum >= maximum) {
                        throw new Error("Range maximum cannot be <= minimum.");
                    }
                    if (maximum < this._value) {
                        this._value = maximum;
                    }
                    this._maximum = maximum;
                },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(SliderRange.prototype, "value", {
                get: function () { return this._value; },
                set: function (value) {
                    if (typeof value !== "number") {
                        throw new Error("SliderRange.setValue(value): value is not a number");
                    }
                    if (value < this._minimum) {
                        this._value = this._minimum;
                    }
                    else if (value > this._maximum) {
                        this._value = this._maximum;
                    }
                    else {
                        this._value = value;
                    }
                },
                enumerable: true,
                configurable: true
            });
            ;
            SliderRange.prototype.increment = function (by) {
                if (by === void 0) { by = 1; }
                if (typeof by !== "number") {
                    throw new Error("SliderRange.increment(by): by is not a number");
                }
                if (this._value + by <= this._maximum) {
                    this._value += by;
                }
                else {
                    this._value = this._maximum;
                }
            };
            SliderRange.prototype.decrement = function (by) {
                if (by === void 0) { by = 1; }
                if (typeof by !== "number") {
                    throw new Error("SliderRange.decrement(by): by is not a number");
                }
                if (this._value - by >= this._minimum) {
                    this._value -= by;
                }
                else {
                    this._value = this._minimum;
                }
            };
            SliderRange.prototype.expandMaximum = function (by) {
                if (by === void 0) { by = 1; }
                if (by < 0) {
                    throw new Error("Cannot expand by negative values.");
                }
                if (this._value === this._maximum) {
                    this._maximum += by;
                    this._value += by;
                    return;
                }
                this._maximum += by;
                this._minimum += by * ((this._value - this._minimum) / (this._value - this._maximum));
            };
            SliderRange.prototype.expandMinimum = function (by) {
                if (by === void 0) { by = -1; }
                if (by > 0) {
                    throw new Error("Cannot expand minimum with positive values.");
                }
                if (this._value === this._minimum) {
                    this._minimum += by;
                    this._value += by;
                    return;
                }
                this._minimum += by;
                this._maximum += by * ((this._value - this._maximum) / (this._value - this._minimum));
            };
            SliderRange.prototype.slide = function (by) {
                if (by === void 0) { by = 1; }
                if (typeof by !== "number") {
                    throw new Error("Cannot slide with non-number.");
                }
                this._minimum += by;
                this._maximum += by;
                if (by < 0 && this._value > this._maximum) {
                    this._value = this._maximum;
                }
                if (by > 0 && this._value < this._minimum) {
                    this._value = this._minimum;
                }
            };
            return SliderRange;
        }());
        Slider.SliderRange = SliderRange;
    })(Slider = DateSlider.Slider || (DateSlider.Slider = {}));
})(DateSlider || (DateSlider = {}));
/// <reference path="../../date-slider-event-context.ts" />
"use strict";
var DateSlider;
(function (DateSlider) {
    var Slider;
    (function (Slider) {
        var Context;
        (function (Context) {
            var SliderValueChangeContext = (function (_super) {
                __extends(SliderValueChangeContext, _super);
                function SliderValueChangeContext(oldValue, newValue) {
                    var _this = _super.call(this) || this;
                    _this.oldValue = oldValue;
                    _this.newValue = newValue;
                    return _this;
                }
                return SliderValueChangeContext;
            }(DateSlider.DateSliderEventContext));
            Context.SliderValueChangeContext = SliderValueChangeContext;
        })(Context = Slider.Context || (Slider.Context = {}));
    })(Slider = DateSlider.Slider || (DateSlider.Slider = {}));
})(DateSlider || (DateSlider = {}));

//# sourceMappingURL=date-slider.js.map
