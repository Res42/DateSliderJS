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
        Helpers.isDefined = function (value) {
            return typeof value !== "undefined";
        };
        Helpers.isSet = function (value) {
            return Helpers.isDefined(value) && value !== null;
        };
        Helpers.getDaysinYear = function (year) {
            if (typeof year === "undefined" || year === null) {
                year = (new Date()).getUTCFullYear();
            }
            var startOfYear = new Date(year, 0, 0).getTime();
            var endOfYear = new Date(year + 1, 0, 0).getTime();
            return (endOfYear - startOfYear) / (Constants.MillisecondsInDay);
        };
        Helpers.getDaysInMonth = function (year, month) {
            return new Date(year, month, 0).getDate();
        };
        Helpers.getPositionFromEvent = function (e) {
            if (e instanceof MouseEvent) {
                return new DateSlider.Vector(e.clientX, e.clientY);
            }
            else if (e instanceof TouchEvent) {
                return new DateSlider.Vector(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
            }
            throw new Error("Cannot extract position from event.");
        };
        Helpers.findChildWithClass = function (element, className, required) {
            if (required === void 0) { required = true; }
            var found = element.getElementsByClassName(className);
            if (found.length > 0) {
                return found[0];
            }
            if (required) {
                throw new Error("Cannot find DOM element with class: '" + className + "' in the template.");
            }
            return null;
        };
        Helpers.calculateCenterPosition = function (element) {
            if (element instanceof HTMLElement) {
                return new DateSlider.Vector(element.offsetLeft + element.offsetWidth / 2, element.offsetTop + element.offsetHeight / 2);
            }
            else if (element instanceof ClientRect) {
                return new DateSlider.Vector(element.left + element.width / 2, element.top + element.height / 2);
            }
            throw new Error("Invalid parameter.");
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
                if (typeof f === "undefined" || f === null) {
                    break;
                }
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
                if (typeof f === "undefined" || f === null) {
                    break;
                }
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
        movementSpeed: 100,
        type: "year",
    };
    DateSlider.dayDefaults = {
        markers: {
            perpendicularOffset: 20,
            showValueMarker: function (value, minimum, maximum) {
                return "";
            },
        },
        type: "day",
    };
    DateSlider.defaultSilderOptions = {
        "day": DateSlider.dayDefaults,
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
            if (DateSlider.Helpers.isSet(index) && 0 <= index && index < this.events.length) {
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
        function DateSliderInstance(element, options) {
            var _this = this;
            this.element = element;
            this.options = options;
            this.onValueChangeEvent = new DateSlider.DateSliderEventHandler();
            if (!element || !element.parentNode) {
                throw new Error("DateSlider.create(): Given HTML element is invalid.");
            }
            this.bindParser();
            this.bindFormatter();
            if (DateSlider.Helpers.isSet(this.options.startValue)) {
                this.startValue = this.parse(this.options.startValue);
            }
            else {
                this.startValue = new DateSlider.DateSliderModel(new DateSlider.InnerModel(), null);
            }
            if (this.options.interval) {
                if (DateSlider.Helpers.isSet(this.options.endValue)) {
                    this.endValue = this.parse(this.options.endValue);
                }
                else {
                    this.endValue = new DateSlider.DateSliderModel(new DateSlider.InnerModel(), null);
                }
            }
            var isValid = this.validate(this.startValue, this.endValue);
            this.sliders = this.createAllSliders();
            this.bootstrapSliders(this.sliders);
            DateSlider.Helpers.registerOnDestroy(element, function (event) {
                for (var _i = 0, _a = _this.sliders; _i < _a.length; _i++) {
                    var slider = _a[_i];
                    slider.destroy(event);
                }
            });
            if (this.options.callback) {
                this.onValueChangeEvent.register(this.options.callback.onValueChanged);
            }
            var value = this.getValue();
            this.onValueChangeEvent.fire(new DateSlider.Context.ValueChangeContext(isValid, { oldValue: null, newValue: value.start }, this.options.interval ? { oldValue: null, newValue: value.end } : null));
        }
        DateSliderInstance.prototype.parse = function (value) {
            return this.parser.parse(value, this.options.parserOptions);
        };
        DateSliderInstance.prototype.format = function (value) {
            return this.formatter.format(value, this.options.formatterOptions);
        };
        DateSliderInstance.prototype.getValue = function () {
            return { start: this.format(this.startValue), end: this.options.interval ? this.format(this.endValue) : null };
        };
        DateSliderInstance.prototype.setValue = function (input) {
            var oldValue = this.getValue();
            var newStartModel = this.parse(input.start);
            var newEndModel = this.options.interval ? this.parse(input.end) : null;
            var isValid = this.validate(newStartModel, newEndModel);
            this.startValue = newStartModel;
            this.endValue = newEndModel;
            this.updateSliders();
            var newValue = this.getValue();
            this.onValueChangeEvent.fire(new DateSlider.Context.ValueChangeContext(isValid, { oldValue: oldValue.start, newValue: newValue.start }, this.options.interval ? { oldValue: oldValue.end, newValue: newValue.end } : null));
        };
        DateSliderInstance.prototype.getOptions = function () {
            return this.options;
        };
        DateSliderInstance.prototype.updateOptions = function (options) {
            DateSlider.Helpers.deepMerge(this.options, options);
            // TODO update sliders
            this.bindParser();
            this.bindFormatter();
        };
        DateSliderInstance.prototype.replaceOptions = function (options) {
            this.options = options;
            // TODO update sliders
            this.bindParser();
            this.bindFormatter();
        };
        DateSliderInstance.prototype.on = function (eventName, callback) {
            if (eventName === "onValueChanged") {
                this.onValueChangeEvent.register(callback);
            }
        };
        DateSliderInstance.prototype.updateFromSlider = function (sliderType, start, end) {
            var oldModelValue = this.getValue();
            var newStartModel = this.startValue.copy();
            switch (sliderType) {
                case "year":
                    newStartModel.model.year = start.newValue;
                    break;
                case "month":
                    newStartModel.model.month = start.newValue;
                    break;
                case "day":
                    newStartModel.model.day = start.newValue;
                    break;
                case "hour":
                    newStartModel.model.hour = start.newValue;
                    break;
                case "minute":
                    newStartModel.model.minute = start.newValue;
                    break;
                case "second":
                    newStartModel.model.second = start.newValue;
                    break;
                case "universal-date":
                    // TODO
                    break;
                case "universal-time":
                    newStartModel.model.hour = Math.floor(start.newValue / 3600);
                    newStartModel.model.minute = Math.floor(start.newValue / 60) % 60;
                    newStartModel.model.second = start.newValue % 60;
                    break;
                case "universal":
                    // TODO
                    break;
            }
            newStartModel.model.setDayOfMonth();
            var isValid = this.validate(newStartModel);
            this.startValue = newStartModel;
            this.updateDaySliders();
            var newModelValue = this.getValue();
            this.onValueChangeEvent.fire(new DateSlider.Context.ValueChangeContext(isValid, { oldValue: oldModelValue.start, newValue: newModelValue.start }, null));
        };
        DateSliderInstance.prototype.validate = function (newStartModel, newEndModel) {
            var isValid = this.isValid(newStartModel, newEndModel);
            if (isValid) {
                this.element.classList.add("date-slider-valid");
                this.element.classList.remove("date-slider-invalid");
            }
            else {
                this.element.classList.add("date-slider-invalid");
                this.element.classList.remove("date-slider-valid");
            }
            return isValid;
        };
        DateSliderInstance.prototype.isValid = function (startModel, endModel) {
            var isValid = this.validateModel(startModel);
            if (!isValid) {
                return false;
            }
            if (this.options.interval) {
                return this.validateModel(endModel);
            }
            return true;
        };
        DateSliderInstance.prototype.validateModel = function (model) {
            if (!this.options.validation) {
                return true;
            }
            if (DateSlider.Helpers.isSet(this.options.validation.min)) {
                var minimum = this.parse(this.options.validation.min);
                return minimum.model.lessThanOrEqual(model.model);
            }
            if (DateSlider.Helpers.isSet(this.options.validation.max)) {
                var maximum = this.parse(this.options.validation.max);
                return maximum.model.greaterThanOrEqual(model.model);
            }
            if (DateSlider.Helpers.isSet(this.options.validation.custom)) {
                return this.options.validation.custom(this.format(model));
            }
            return true;
        };
        DateSliderInstance.prototype.createAllSliders = function () {
            if (!this.options.sliders) {
                throw new Error("Cannot create sliders because options.sliders is not set.");
            }
            var sliders = [];
            for (var _i = 0, _a = this.options.sliders; _i < _a.length; _i++) {
                var sliderOptions = _a[_i];
                sliders.push(this.createSlider(this, sliderOptions, this.getRangeFromType(sliderOptions), this.options.interval));
            }
            return sliders;
        };
        DateSliderInstance.prototype.getRangeFromType = function (sliderOptions) {
            switch (sliderOptions.type) {
                case "year":
                    return new DateSlider.Slider.SliderRange(this.startValue.model.year - 10, (this.endValue ? this.endValue.model.year : this.startValue.model.year) + 10, this.startValue.model.year, this.endValue ? this.endValue.model.year : null);
                case "month":
                    return new DateSlider.Slider.SliderRange(1, 12, this.startValue.model.month, this.endValue ? this.endValue.model.month : null);
                case "day":
                    return new DateSlider.Slider.SliderRange(1, DateSlider.Helpers.getDaysInMonth(this.startValue.model.year, this.startValue.model.month), this.startValue.model.day, this.endValue ? this.endValue.model.day : null);
                case "hour":
                    return new DateSlider.Slider.SliderRange(0, 23, this.startValue.model.hour, this.endValue ? this.endValue.model.hour : null);
                case "minute":
                    return new DateSlider.Slider.SliderRange(0, 59, this.startValue.model.minute, this.endValue ? this.endValue.model.minute : null);
                case "second":
                    return new DateSlider.Slider.SliderRange(0, 59, this.startValue.model.second, this.endValue ? this.endValue.model.second : null);
                case "universal":
                    // TODO
                    return new DateSlider.Slider.SliderRange(1, 12);
                case "universal-date":
                    // TODO
                    return new DateSlider.Slider.SliderRange(1, 12);
                case "universal-time":
                    return new DateSlider.Slider.SliderRange(0, DateSlider.Constants.SecondsInDay - 1);
                default:
                    throw new Error("SliderOptions.type is not valid.");
            }
        };
        DateSliderInstance.prototype.updateDaySliders = function () {
            for (var _i = 0, _a = this.sliders; _i < _a.length; _i++) {
                var slider = _a[_i];
                if (slider.options.type === "day") {
                    slider.updateValueWithMaximum(this.startValue.model.day, DateSlider.Helpers.getDaysInMonth(this.startValue.model.year, this.startValue.model.month), this.endValue ? this.endValue.model.day : null);
                }
            }
        };
        DateSliderInstance.prototype.updateSliders = function () {
            for (var _i = 0, _a = this.sliders; _i < _a.length; _i++) {
                var slider = _a[_i];
                switch (slider.options.type) {
                    case "year":
                        slider.updateValue(this.startValue.model.year, this.endValue ? this.endValue.model.year : null);
                        break;
                    case "month":
                        slider.updateValue(this.startValue.model.month, this.endValue ? this.endValue.model.month : null);
                        break;
                    case "day":
                        slider.updateValueWithMaximum(this.startValue.model.day, DateSlider.Helpers.getDaysInMonth(this.startValue.model.year, this.startValue.model.month), this.endValue ? this.endValue.model.day : null);
                        break;
                    case "hour":
                        slider.updateValue(this.startValue.model.hour, this.endValue ? this.endValue.model.hour : null);
                        break;
                    case "minute":
                        slider.updateValue(this.startValue.model.minute, this.endValue ? this.endValue.model.minute : null);
                        break;
                    case "second":
                        slider.updateValue(this.startValue.model.second, this.endValue ? this.endValue.model.second : null);
                        break;
                    case "universal-date":
                        // TODO
                        break;
                    case "universal-time":
                        slider.updateValue(this.startValue.model.hour * 3600 + this.startValue.model.minute * 60 + this.startValue.model.second, this.endValue ? this.endValue.model.hour * 3600 + this.endValue.model.minute * 60 + this.endValue.model.second : null);
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
        DateSliderInstance.prototype.bootstrapSliders = function (sliders) {
            for (var _i = 0, sliders_1 = sliders; _i < sliders_1.length; _i++) {
                var slider = sliders_1[_i];
                this.element.appendChild(slider.element);
            }
            this.element.classList.add("date-slider");
            var _loop_1 = function (slider) {
                DateSlider.Helpers.registerOnDestroy(slider.element, function (event) { return slider.destroy(event); });
            };
            // in the appendChild method the silders' destroy method would be called because it fires the 'DOMNodeRemoved' event
            // also only after this will the sliders' element gain a parent to use the MutationObserver
            for (var _a = 0, sliders_2 = sliders; _a < sliders_2.length; _a++) {
                var slider = sliders_2[_a];
                _loop_1(slider);
            }
        };
        DateSliderInstance.prototype.createSlider = function (dateSlider, options, range, interval) {
            switch (options.movement) {
                default:
                case "none":
                    return new DateSlider.Slider.SliderInstance(dateSlider, options, range, interval);
                case "slide":
                    return new DateSlider.Slider.SlidingSliderInstance(dateSlider, options, range, interval);
                case "expand":
                    return new DateSlider.Slider.ExpandingSliderInstance(dateSlider, options, range, interval);
                case "slide expand":
                    return new DateSlider.Slider.SlidingExpandingSliderInstance(dateSlider, options, range, interval);
            }
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
        DateSliderModel.prototype.copy = function () {
            return new DateSliderModel(new InnerModel(this.model.year, this.model.month, this.model.day, this.model.hour, this.model.minute, this.model.second, this.model.timezone), this.rawValue);
        };
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
            this.setDayOfMonth();
        }
        InnerModel.prototype.setDayOfMonth = function () {
            var daysInMonth = DateSlider.Helpers.getDaysInMonth(this.year, this.month);
            if (this.day > daysInMonth) {
                this.day = daysInMonth;
            }
        };
        InnerModel.prototype.greaterThan = function (other) {
            return this.compare(other, function (a, b) { return a > b; }, false);
        };
        InnerModel.prototype.greaterThanOrEqual = function (other) {
            return this.compare(other, function (a, b) { return a > b; }, true);
        };
        InnerModel.prototype.lessThan = function (other) {
            return this.compare(other, function (a, b) { return a < b; }, false);
        };
        InnerModel.prototype.lessThanOrEqual = function (other) {
            return this.compare(other, function (a, b) { return a < b; }, true);
        };
        InnerModel.prototype.equal = function (other) {
            return this.compare(other, function (a, b) { return false; }, true);
        };
        InnerModel.prototype.compare = function (other, compareMethod, equalPermitted) {
            if (this.year !== other.year) {
                return compareMethod(this.year, other.year);
            }
            if (this.month !== other.month) {
                return compareMethod(this.month, other.month);
            }
            if (this.day !== other.day) {
                return compareMethod(this.day, other.day);
            }
            if (this.hour !== other.hour) {
                return compareMethod(this.hour, other.hour);
            }
            if (this.minute !== other.minute) {
                return compareMethod(this.minute, other.minute);
            }
            if (this.second !== other.second) {
                return compareMethod(this.second, other.second);
            }
            // If the execution reaches this line then the two models are equal.
            return equalPermitted;
        };
        return InnerModel;
    }());
    DateSlider.InnerModel = InnerModel;
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    function create(element, options) {
        if (!element || !(element instanceof HTMLElement)) {
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
    // --> range interval
    // test range
    // test model compare methods
    // demo: out of the box, full customization
    // slider distance of mouse from handle -> slowness of steps
    // ✓ angular integration
    // ✓ expanding slider
    // ✓ when changing years or months, set maximum days to monthly maximum
    // ✓ validation: min, max, custom
    // --> slide, expand with acceleration!
    // ✓ slide + expand option
    // out of scope: how to check timezone when comparing models?
    // ✓ angular integration: fix jumping handle.
    // ✓ validation enable wrong values but add invalid classes
    // --> ppt, docs
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
            function ValueChangeContext(isValid, start, end) {
                var _this = _super.call(this) || this;
                _this.isValid = isValid;
                _this.start = start;
                _this.end = end;
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
            function SliderInstance(dateSlider, options, range, interval) {
                var _this = this;
                this.dateSlider = dateSlider;
                this.options = options;
                this.range = range;
                this.interval = interval;
                this.toDiscrete = Math.round;
                this.isDragging = false;
                this.onValueChangeEvent = new DateSlider.DateSliderEventHandler();
                this.onSliderHandleGrabEvent = new DateSlider.DateSliderEventHandler();
                this.onSliderHandleReleaseEvent = new DateSlider.DateSliderEventHandler();
                this.onSliderHandleMoveEvent = new DateSlider.DateSliderEventHandler();
                this.events = {
                    load: function () {
                        _this.updateHandlePosition(_this.startHandleElement);
                        if (_this.interval) {
                            _this.updateHandlePosition(_this.endHandleElement);
                        }
                        _this.updateValueDisplay();
                        _this.createMarkers();
                        _this.updateMarkersPosition();
                    },
                    mousedown: function (e) { return _this.handleMouseDown(e); },
                    mousemove: function (e) { return _this.handleMouseMove(e); },
                    mouseup: function (e) { return _this.handleMouseUp(e); },
                    resize: function () {
                        _this.updateHandlePosition(_this.startHandleElement);
                        if (_this.interval) {
                            _this.updateHandlePosition(_this.endHandleElement);
                        }
                        _this.updateMarkersPosition();
                    },
                    touchend: function (e) { return _this.handleMouseUp(e); },
                    touchmove: function (e) { return _this.handleMouseMove(e); },
                    touchstart: function (e) { return _this.handleMouseDown(e); },
                };
                this.handleMouseDown = function (e) {
                    // only move handler with the left mouse button
                    if (_this.isHandleReleased(e)) {
                        _this.isDragging = false;
                        return;
                    }
                    e.preventDefault();
                    _this.lastPointerPosition = DateSlider.Helpers.getPositionFromEvent(e);
                    _this.isDragging = true;
                    _this.dragTarget = e.target;
                    _this.addMovementListeners();
                    _this.onSliderHandleGrabEvent.fire(new DateSlider.DateSliderEventContext());
                };
                this.handleMouseUp = function (e) {
                    _this.isDragging = false;
                    _this.lastPointerPosition = DateSlider.Helpers.getPositionFromEvent(e);
                    _this.setValueOfHandleModel(_this.dragTarget, _this.toDiscrete(_this.calculateValue(_this.lastPointerPosition)));
                    _this.dragTarget = null;
                    _this.removeMovementListeners();
                    _this.onSliderHandleReleaseEvent.fire(new DateSlider.DateSliderEventContext());
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
                    _this.lastPointerPosition = DateSlider.Helpers.getPositionFromEvent(e);
                    _this.setValueOfHandleModel(_this.dragTarget, _this.toDiscrete(_this.calculateValue(_this.lastPointerPosition)));
                    _this.onSliderHandleMoveEvent.fire(new DateSlider.DateSliderEventContext());
                };
                this.updateValueDisplay = function () {
                    if (_this.valueContainerElement) {
                        var startValue = _this.getStartValue();
                        var endValue = _this.getEndValue();
                        var displayedValue = _this.options.displayValueFormatter
                            ? _this.options.displayValueFormatter(startValue, (_this.interval ? endValue : null))
                            : (_this.interval ? startValue + " - " + endValue : startValue.toString());
                        _this.valueContainerElement.innerHTML = displayedValue;
                    }
                };
                this.updateHandlePosition = function (handleElement) {
                    var position = _this.calculateHandlePosition(handleElement);
                    handleElement.style.position = "absolute";
                    handleElement.style.left = position.x + "px";
                    handleElement.style.top = position.y + "px";
                };
                if (options.callback) {
                    this.onValueChangeEvent.register(options.callback.onValueChanged);
                    this.onSliderHandleGrabEvent.register(options.callback.onSliderHandleGrabbed);
                    this.onSliderHandleMoveEvent.register(options.callback.onSliderHandleMoved);
                    this.onSliderHandleReleaseEvent.register(options.callback.onSliderHandleReleased);
                }
                if (this.options.template instanceof HTMLElement) {
                    this.bootstrapSliderToTemplate();
                }
                else {
                    this.createSliderElement();
                }
                this.registerListeners();
                this.onValueChangeEvent.fire(new Slider.Context.SliderValueChangeContext({ oldValue: null, newValue: this.toDiscrete(this.range.startValue) }, this.interval ? { oldValue: null, newValue: this.toDiscrete(this.range.endValue) } : null));
            }
            SliderInstance.prototype.getStartValue = function () {
                return this.toDiscrete(this.range.startValue);
            };
            SliderInstance.prototype.getEndValue = function () {
                return this.toDiscrete(this.range.endValue);
            };
            SliderInstance.prototype.updateValue = function (startValue, endValue) {
                var _this = this;
                this.updateAfter(function () {
                    _this.range.startValue = startValue;
                    if (_this.interval) {
                        _this.range.endValue = endValue;
                    }
                });
            };
            SliderInstance.prototype.updateValueWithMaximum = function (startValue, maximum, endValue) {
                var _this = this;
                this.updateAfter(function () {
                    _this.range.maximum = maximum;
                    _this.range.startValue = startValue;
                    if (_this.interval) {
                        _this.range.endValue = endValue;
                    }
                });
                this.createMarkers();
                this.updateMarkersPosition();
            };
            SliderInstance.prototype.setMininum = function (minimum) {
                var _this = this;
                this.updateAfter(function () {
                    _this.range.minimum = minimum;
                });
                this.createMarkers();
                this.updateMarkersPosition();
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
            SliderInstance.prototype.destroy = function (event) {
                window.removeEventListener("load", this.events.load);
                window.removeEventListener("resize", this.events.resize);
                this.removeMovementListeners();
            };
            SliderInstance.prototype.setValue = function (startValue, endValue) {
                var _this = this;
                var values = this.updateAfter(function () {
                    _this.range.startValue = startValue;
                    if (_this.interval) {
                        _this.range.endValue = endValue;
                    }
                });
                this.dateSlider.updateFromSlider(this.options.type, values.start, values.end);
            };
            SliderInstance.prototype.updateAfter = function (callback) {
                var startOldValue = this.toDiscrete(this.range.startValue);
                var endOldValue = this.toDiscrete(this.range.endValue);
                callback();
                var startNewValue = this.toDiscrete(this.range.startValue);
                var endNewValue = this.toDiscrete(this.range.endValue);
                this.updateValueDisplay();
                this.updateHandlePosition(this.startHandleElement);
                if (this.interval) {
                    this.updateHandlePosition(this.endHandleElement);
                }
                this.onValueChangeEvent.fire(new Slider.Context.SliderValueChangeContext({ oldValue: startOldValue, newValue: startNewValue }, this.interval ? { oldValue: endOldValue, newValue: endNewValue } : null));
                return { start: { oldValue: startOldValue, newValue: startNewValue }, end: (this.interval ? { oldValue: endOldValue, newValue: endNewValue } : null) };
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
            SliderInstance.prototype.bootstrapSliderToTemplate = function () {
                this.element = this.options.template.cloneNode(true);
                this.sliderElement = DateSlider.Helpers.findChildWithClass(this.element, "slider-control-template");
                this.startHandleElement = DateSlider.Helpers.findChildWithClass(this.element, "slider-start-handle-template");
                if (this.interval) {
                    this.endHandleElement = DateSlider.Helpers.findChildWithClass(this.element, "slider-end-handle-template");
                }
                this.sliderLineStart = DateSlider.Helpers.findChildWithClass(this.element, "slider-control-start-template");
                this.sliderLineEnd = DateSlider.Helpers.findChildWithClass(this.element, "slider-control-end-template");
                // TODO?: multiple value containers? use same class in template and normal?
                this.valueContainerElement = DateSlider.Helpers.findChildWithClass(this.element, "slider-value-container-template", false);
                this.markerElement = DateSlider.Helpers.findChildWithClass(this.element, "slider-marker-template", false);
                this.markerElement.remove();
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
                this.startHandleElement = document.createElement("div");
                this.startHandleElement.classList.add("slider-start-handle");
                this.sliderElement.appendChild(this.startHandleElement);
                if (this.interval) {
                    this.endHandleElement = document.createElement("div");
                    this.endHandleElement.classList.add("slider-end-handle");
                    this.sliderElement.appendChild(this.endHandleElement);
                }
            };
            SliderInstance.prototype.registerListeners = function () {
                this.startHandleElement.addEventListener("mousedown", this.events.mousedown, false);
                this.startHandleElement.addEventListener("touchstart", this.events.touchstart, true);
                if (this.interval) {
                    this.endHandleElement.addEventListener("mousedown", this.events.mousedown, false);
                    this.endHandleElement.addEventListener("touchstart", this.events.touchstart, true);
                }
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
            SliderInstance.prototype.setValueOfHandleModel = function (dragTarget, value) {
                switch (dragTarget) {
                    case this.startHandleElement:
                        this.setValue(value, this.range.endValue);
                        break;
                    case this.endHandleElement:
                        this.setValue(this.range.startValue, value);
                        break;
                }
            };
            SliderInstance.prototype.isHandleReleased = function (e) {
                // no touches
                return e instanceof TouchEvent && e.targetTouches.length <= 0
                    || e instanceof MouseEvent && (1 & e.buttons) !== 1;
            };
            SliderInstance.prototype.updateMarkersPosition = function () {
                if (!this.markers || this.markers.length <= 0) {
                    return;
                }
                var startCenter = DateSlider.Helpers.calculateCenterPosition(this.sliderLineStart);
                var endCenter = DateSlider.Helpers.calculateCenterPosition(this.sliderLineEnd);
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
                var startCenter = DateSlider.Helpers.calculateCenterPosition(start);
                var endCenter = DateSlider.Helpers.calculateCenterPosition(end);
                var sp = position.substract(startCenter);
                var se = endCenter.substract(startCenter);
                var othogonalProjectionRatio = sp.dot(se) / se.dot(se);
                return {
                    distance: sp.substract(se.multiply(othogonalProjectionRatio)).length(),
                    ratio: othogonalProjectionRatio,
                };
            };
            SliderInstance.prototype.calculateHandlePosition = function (handleElement) {
                // calculates the center of an absolute positioned element
                var ratioInSlider = handleElement === this.startHandleElement ? this.range.startRatio : this.range.endRatio;
                var startPosition = DateSlider.Helpers.calculateCenterPosition(this.sliderLineStart);
                var endPosition = DateSlider.Helpers.calculateCenterPosition(this.sliderLineEnd);
                // start the handle at the start
                // the handle's center should be at the start, so it needs an adjustment
                // finally, calculate the handle's position in the line by it's range value (min: 0% -> max: 100%)
                return new DateSlider.Vector(startPosition.x - handleElement.offsetWidth / 2 + (endPosition.x - startPosition.x) * ratioInSlider, startPosition.y - handleElement.offsetHeight / 2 + (endPosition.y - startPosition.y) * ratioInSlider);
            };
            return SliderInstance;
        }());
        Slider.SliderInstance = SliderInstance;
        var SlidingSliderInstance = (function (_super) {
            __extends(SlidingSliderInstance, _super);
            function SlidingSliderInstance(dateSlider, options, range, interval) {
                var _this = _super.call(this, dateSlider, options, range, interval) || this;
                _this.borderCheck = function () {
                    var direction;
                    if (_this.range.startValue === _this.range.maximum || _this.range.endValue === _this.range.maximum) {
                        direction = 1;
                    }
                    else if (_this.range.startValue === _this.range.minimum || _this.range.endValue === _this.range.minimum) {
                        direction = -1;
                    }
                    else {
                        direction = 0;
                    }
                    if (direction !== 0) {
                        _this.updateAfter(function () {
                            _this.onBorder(direction);
                        });
                        _this.createMarkers();
                        _this.updateMarkersPosition();
                    }
                };
                _this.borderCheckIntervalHandle = window.setInterval(_this.borderCheck, _this.options.movementSpeed || 0);
                return _this;
            }
            SlidingSliderInstance.prototype.destroy = function (event) {
                _super.prototype.destroy.call(this, event);
                window.clearInterval(this.borderCheckIntervalHandle);
            };
            SlidingSliderInstance.prototype.updateValue = function (value) {
                var _this = this;
                this.updateAfter(function () {
                    _this.range.slideTo(value, false);
                });
                this.createMarkers();
                this.updateMarkersPosition();
            };
            SlidingSliderInstance.prototype.onBorder = function (direction) {
                this.range.slide(direction * (this.options.movementStep || 1));
                if (this.isDragging) {
                    this.range.startValue = this.calculateValue(this.lastPointerPosition);
                }
            };
            return SlidingSliderInstance;
        }(SliderInstance));
        Slider.SlidingSliderInstance = SlidingSliderInstance;
        var ExpandingSliderInstance = (function (_super) {
            __extends(ExpandingSliderInstance, _super);
            function ExpandingSliderInstance() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ExpandingSliderInstance.prototype.onBorder = function (direction) {
                if (DateSlider.Helpers.isSet(this.options.expandLimit) && this.options.expandLimit <= this.range.length) {
                    return;
                }
                if (direction === 1) {
                    this.range.maximum = this.range.maximum + (this.options.movementStep || 1);
                }
                if (direction === -1) {
                    this.range.minimum = this.range.minimum - (this.options.movementStep || 1);
                }
                if (this.isDragging) {
                    this.range.startValue = this.calculateValue(this.lastPointerPosition);
                }
            };
            return ExpandingSliderInstance;
        }(SlidingSliderInstance));
        Slider.ExpandingSliderInstance = ExpandingSliderInstance;
        var SlidingExpandingSliderInstance = (function (_super) {
            __extends(SlidingExpandingSliderInstance, _super);
            function SlidingExpandingSliderInstance() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SlidingExpandingSliderInstance.prototype.onBorder = function (direction) {
                if (DateSlider.Helpers.isSet(this.options.expandLimit) && this.options.expandLimit <= this.range.length) {
                    _super.prototype.onBorder.call(this, direction);
                    return;
                }
                if (direction === 1) {
                    this.range.maximum = this.range.maximum + (this.options.movementStep || 1);
                }
                if (direction === -1) {
                    this.range.minimum = this.range.minimum - (this.options.movementStep || 1);
                }
                if (this.isDragging) {
                    this.range.startValue = this.calculateValue(this.lastPointerPosition);
                }
            };
            return SlidingExpandingSliderInstance;
        }(SlidingSliderInstance));
        Slider.SlidingExpandingSliderInstance = SlidingExpandingSliderInstance;
    })(Slider = DateSlider.Slider || (DateSlider.Slider = {}));
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    var Slider;
    (function (Slider) {
        var SliderRange = (function () {
            function SliderRange(_minimum, _maximum, _startValue, _endValue) {
                this._minimum = _minimum;
                this._maximum = _maximum;
                this._startValue = _startValue;
                this._endValue = _endValue;
                if (this._minimum === this._maximum) {
                    throw new Error("Range minimum cannot be equal to the maximum.");
                }
                if (!DateSlider.Helpers.isSet(this._startValue)) {
                    this._startValue = this._minimum;
                }
            }
            Object.defineProperty(SliderRange.prototype, "startRatio", {
                get: function () {
                    return (this._startValue - this._minimum) / (this._maximum - this._minimum);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SliderRange.prototype, "endRatio", {
                get: function () {
                    return (this._endValue - this._minimum) / (this._maximum - this._minimum);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SliderRange.prototype, "length", {
                get: function () {
                    return this._maximum - this._minimum;
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
                    if (minimum > this._startValue) {
                        this._startValue = minimum;
                    }
                    if (DateSlider.Helpers.isSet(this._endValue) && minimum > this._endValue) {
                        this._endValue = minimum;
                    }
                    this._minimum = minimum;
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
                    if (maximum < this._startValue) {
                        this._startValue = maximum;
                    }
                    if (DateSlider.Helpers.isSet(this._endValue) && maximum < this._endValue) {
                        this._endValue = maximum;
                    }
                    this._maximum = maximum;
                },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(SliderRange.prototype, "startValue", {
                get: function () { return this._startValue; },
                set: function (startValue) {
                    if (typeof startValue !== "number") {
                        throw new Error("SliderRange.setValue(value): value is not a number.");
                    }
                    if (startValue < this._minimum) {
                        this._startValue = this._minimum;
                    }
                    else if (startValue > this._maximum) {
                        this._startValue = this._maximum;
                    }
                    else {
                        this._startValue = startValue;
                    }
                },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(SliderRange.prototype, "endValue", {
                get: function () { return this._endValue; },
                set: function (endValue) {
                    if (typeof endValue !== "number") {
                        throw new Error("SliderRange.setValue(value): value is not a number.");
                    }
                    if (endValue < this._minimum) {
                        this._endValue = this._minimum;
                    }
                    else if (endValue > this._maximum) {
                        this._endValue = this._maximum;
                    }
                    else {
                        this._endValue = endValue;
                    }
                },
                enumerable: true,
                configurable: true
            });
            ;
            // public expandMaximum(by = 1): void {
            //     if (by < 0) {
            //         throw new Error("Cannot expand by negative values.");
            //     }
            //     if (this._value === this._maximum) {
            //         this._maximum += by;
            //         this._value += by;
            //         return;
            //     }
            //     this._maximum += by;
            //     this._minimum += by * ((this._value - this._minimum) / (this._value - this._maximum));
            // }
            // public expandMinimum(by = -1): void {
            //     if (by > 0) {
            //         throw new Error("Cannot expand minimum with positive values.");
            //     }
            //     if (this._value === this._minimum) {
            //         this._minimum += by;
            //         this._value += by;
            //         return;
            //     }
            //     this._minimum += by;
            //     this._maximum += by * ((this._value - this._maximum) / (this._value - this._minimum));
            // }
            SliderRange.prototype.slide = function (by) {
                if (by === void 0) { by = 1; }
                if (typeof by !== "number") {
                    throw new Error("Cannot slide with non-number.");
                }
                this._minimum += by;
                this._maximum += by;
                if (by < 0 && this._startValue > this._maximum) {
                    this._startValue = this._maximum;
                }
                if (by > 0 && this._startValue < this._minimum) {
                    this._startValue = this._minimum;
                }
            };
            SliderRange.prototype.slideTo = function (target, mustSlide) {
                if (mustSlide === void 0) { mustSlide = true; }
                if (typeof target !== "number") {
                    throw new Error("Cannot slideTo with non-number.");
                }
                if (!mustSlide && this._minimum <= target && target <= this._maximum) {
                    this._startValue = target;
                    if (DateSlider.Helpers.isSet(this._endValue)) {
                        this._endValue = target;
                    }
                    return;
                }
                var distance = this._maximum - this._minimum;
                this._minimum = target - distance / 2;
                this._startValue = target;
                if (DateSlider.Helpers.isSet(this._endValue)) {
                    this._endValue = target;
                }
                this._maximum = target + distance / 2;
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
                function SliderValueChangeContext(start, end) {
                    var _this = _super.call(this) || this;
                    _this.start = start;
                    _this.end = end;
                    return _this;
                }
                return SliderValueChangeContext;
            }(DateSlider.DateSliderEventContext));
            Context.SliderValueChangeContext = SliderValueChangeContext;
        })(Context = Slider.Context || (Slider.Context = {}));
    })(Slider = DateSlider.Slider || (DateSlider.Slider = {}));
})(DateSlider || (DateSlider = {}));

//# sourceMappingURL=date-slider.js.map
