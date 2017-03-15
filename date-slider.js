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
    var DateSliderHelpers = (function () {
        function DateSliderHelpers() {
        }
        /**
         * Registers a listener to the element's destroy.
         * @param element The element whose destroy event should be watched.
         * @param callback A callback method with an optional event parameter.
         * The parameter is an Event, if the 'DOMNodeRemoved' event was caught.
         * The parameter is undefined if a MutationObserver was used to watch the element's destroy event.
         */
        DateSliderHelpers.registerOnDestroy = function (element, callback) {
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
        return DateSliderHelpers;
    }());
    DateSlider.DateSliderHelpers = DateSliderHelpers;
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
            if (!element || !element.parentNode) {
                throw new Error("DateSlider.create(): Given HTML element is invalid.");
            }
            this.sliders = DateSlider.Slider.SliderInstance.createAll(options);
            var wrapper = this.createWrapper(this.sliders);
            element.parentNode.replaceChild(wrapper, element);
            DateSlider.DateSliderHelpers.registerOnDestroy(wrapper, function (event) {
                for (var _i = 0, _a = _this.sliders; _i < _a.length; _i++) {
                    var slider = _a[_i];
                    slider.destroy(event);
                }
            });
            this.bindParser();
            this.bindFormatter();
        }
        DateSliderInstance.prototype.getValue = function () {
            return this.formatter.format(this.value, this.options.formatterOptions);
        };
        DateSliderInstance.prototype.setValue = function (input) {
            this.value = this.parser.parse(input, this.options.parserOptions);
            // TODO update sliders
        };
        DateSliderInstance.prototype.getOptions = function () {
            return this.options;
        };
        DateSliderInstance.prototype.updateOptions = function (options) {
        };
        DateSliderInstance.prototype.replaceOptions = function (options) {
        };
        DateSliderInstance.prototype.on = function (eventName, callback) {
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
                DateSlider.DateSliderHelpers.registerOnDestroy(slider.element, function (event) { return slider.destroy(event); });
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
    DateSlider.defaults = {};
    function create(element, options) {
        if (!element) {
            throw new Error("DateSlider.create(): Given HTML element is invalid.");
        }
        return new DateSlider.DateSliderInstance(element, mergeOptions(options, DateSlider.defaults));
    }
    DateSlider.create = create;
    function mergeOptions(instanceOptions, defaultOptions) {
        return instanceOptions;
    }
    // TODO
    // Date.parse() or write own implementation to parse from formats -> own
    // test range
    // demo: out of the box, full customization
    // instance.refresh
    // on creation getter setter for outside model
    // slider distance of mouse from handle -> slowness of steps
})(DateSlider || (DateSlider = {}));
"use strict";
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
                this.onValueChangeEvent = new DateSlider.DateSliderEventHandler();
                this.onSliderHandleGrabEvent = new DateSlider.DateSliderEventHandler();
                this.onSliderHandleReleaseEvent = new DateSlider.DateSliderEventHandler();
                this.onSliderHandleMoveEvent = new DateSlider.DateSliderEventHandler();
                this.events = {
                    load: function () { _this.updateHandlePosition(); _this.updateValueDisplay(); },
                    mousedown: function (e) { return _this.handleMouseDown(e); },
                    mousemove: function (e) { return _this.handleMouseMove(e); },
                    mouseup: function (e) { return _this.handleMouseUp(e); },
                    resize: function () { return _this.updateHandlePosition(); },
                    touchend: function (e) { return _this.handleMouseUp(e); },
                    touchmove: function (e) { return _this.handleMouseMove(e); },
                    touchstart: function (e) { return _this.handleMouseDown(e); },
                };
                this.destroy = function (event) {
                    window.removeEventListener("mouseup", _this.events.mouseup, false);
                    window.removeEventListener("touchend", _this.events.touchend, false);
                    window.removeEventListener("load", _this.events.load);
                    window.removeEventListener("resize", _this.events.resize);
                    window.removeEventListener("mousemove", _this.events.mousemove, true);
                    window.removeEventListener("touchmove", _this.events.touchmove, true);
                };
                this.handleMouseDown = function (e) {
                    // prevent default: for example to disable the default image dragging
                    e.preventDefault();
                    window.addEventListener("touchmove", _this.events.touchmove, true);
                    window.addEventListener("mousemove", _this.events.mousemove, true);
                    window.addEventListener("mouseup", _this.events.mouseup, false);
                    window.addEventListener("touchend", _this.events.touchend, false);
                    _this.onSliderHandleGrabEvent.fire(null);
                };
                this.handleMouseUp = function (e) {
                    window.removeEventListener("touchmove", _this.events.touchmove, true);
                    window.removeEventListener("mousemove", _this.events.mousemove, true);
                    window.removeEventListener("mouseup", _this.events.mouseup, false);
                    window.removeEventListener("touchend", _this.events.touchend, false);
                    _this.onSliderHandleReleaseEvent.fire(null);
                };
                this.handleMouseMove = function (e) {
                    // prevent default: for example to disable the default image dragging
                    e.preventDefault();
                    var pointEvent = (typeof e.clientX !== "undefined")
                        ? e
                        : e.targetTouches[0];
                    var position = {
                        x: pointEvent.clientX,
                        y: pointEvent.clientY,
                    };
                    // the ratio of the projection of the s->p vector on the s->e vector
                    // imagagine that the /'s are orthogonal to the slider line
                    // |-----------
                    // |
                    // |   s       slider start
                    // |  / \
                    // | .   \a    s->a is the projection
                    // |  \  /\
                    // |    p  \   p is the position of the mouse / touch
                    // |        e  slider end
                    var start = _this.sliderLineStart.getBoundingClientRect();
                    var end = _this.sliderLineEnd.getBoundingClientRect();
                    var sp = {
                        x: position.x - start.left,
                        y: position.y - start.top,
                    };
                    var se = {
                        x: end.left - start.left,
                        y: end.top - start.top,
                    };
                    // the projection ratio is: dot(sp, se) / dot(se, se)
                    var projectionRatio = ((sp.x * se.x) + (sp.y * se.y)) / ((se.x * se.x) + (se.y * se.y));
                    _this.setValue(Math.round((_this.range.maximum - _this.range.minimum) * projectionRatio + _this.range.minimum));
                    _this.onSliderHandleMoveEvent.fire(null);
                };
                this.updateValueDisplay = function () {
                    if (_this.valueContainerElement) {
                        _this.valueContainerElement.innerText = _this.range.value.toString();
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
                this.onValueChangeEvent.fire(new Slider.Context.SliderValueChangeContext(null, this.range.value));
                if (this.options.template instanceof HTMLElement) {
                    this.bootstrapSliderToTemplate();
                }
                else {
                    this.createSliderElement();
                }
                this.registerListeners();
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
                    case "month":
                        return new Slider.SliderRange(1, 12);
                    default:
                        throw new Error("SliderOptions.type is not valid.");
                }
            };
            SliderInstance.prototype.getValue = function () {
                return this.range.value;
            };
            SliderInstance.prototype.setValue = function (value) {
                var oldValue = this.range.value;
                this.range.value = value;
                var newValue = this.range.value;
                this.updateValueDisplay();
                this.updateHandlePosition();
                this.onValueChangeEvent.fire(new Slider.Context.SliderValueChangeContext(oldValue, newValue));
            };
            SliderInstance.prototype.bootstrapSliderToTemplate = function () {
                this.element = this.options.template.cloneNode(true);
                this.sliderElement = this.findElementInSlider("slider-control-template");
                this.handleElement = this.findElementInSlider("slider-handle-template");
                this.sliderLineStart = this.findElementInSlider("slider-control-start-template");
                this.sliderLineEnd = this.findElementInSlider("slider-control-end-template");
                this.valueContainerElement = this.findElementInSlider("slider-value-container-template", false);
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
                this.sliderElement = document.createElement("div");
                this.sliderElement.classList.add("slider-control");
                this.sliderLineStart = document.createElement("div");
                this.sliderLineStart.classList.add("slider-control-start");
                this.sliderLineElement = document.createElement("div");
                this.sliderLineElement.classList.add("slider-control-line");
                this.sliderLineEnd = document.createElement("div");
                this.sliderLineEnd.classList.add("slider-control-end");
                this.handleElement = document.createElement("div");
                this.handleElement.classList.add("slider-handle");
                this.valueContainerElement = document.createElement("div");
                this.valueContainerElement.classList.add("slider-value-container");
                this.element.appendChild(this.valueContainerElement);
                this.sliderElement.appendChild(this.sliderLineStart);
                this.sliderElement.appendChild(this.sliderLineElement);
                this.sliderElement.appendChild(this.sliderLineEnd);
                this.sliderElement.appendChild(this.handleElement);
                this.element.appendChild(this.sliderElement);
            };
            SliderInstance.prototype.registerListeners = function () {
                this.handleElement.addEventListener("mousedown", this.events.mousedown, false);
                this.handleElement.addEventListener("touchstart", this.events.touchstart, false);
                window.addEventListener("load", this.events.load);
                window.addEventListener("resize", this.events.resize);
            };
            SliderInstance.prototype.calculateHandlePosition = function () {
                // calculates the center of an absolute positioned element
                var calculateCenterPosition = function (element) {
                    return {
                        x: element.offsetLeft
                            + element.offsetWidth / 2,
                        y: element.offsetTop
                            + element.offsetHeight / 2,
                    };
                };
                var ratioInSlider = this.range.ratio;
                var startPosition = calculateCenterPosition(this.sliderLineStart);
                var endPosition = calculateCenterPosition(this.sliderLineEnd);
                // start the handle at the start
                // the handle's center should be at the start, so it needs an adjustment
                // finally, calculate the handle's position in the line by it's range value (min: 0% -> max: 100%)
                return {
                    x: startPosition.x
                        - this.handleElement.offsetWidth / 2
                        + (endPosition.x - startPosition.x) * ratioInSlider,
                    y: startPosition.y
                        - this.handleElement.offsetHeight / 2
                        + (endPosition.y - startPosition.y) * ratioInSlider,
                };
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
                    throw new Error("Range minimum cannot be equal as maximum.");
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
