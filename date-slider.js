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
            this.element = element;
            this.options = options;
            this.value = value;
            if (!element || !element.parentNode) {
                throw new Error("DateSlider.create(): Given HTML element is invalid.");
            }
            if (options.appendTo === "replaceElement") {
                this.sliders = DateSlider.Slider.SliderInstance.createAll(options);
                var wrapper = this.createWrapper(this.sliders);
                element.parentNode.replaceChild(wrapper, element);
            }
        }
        DateSliderInstance.prototype.getValue = function () {
            return null;
        };
        DateSliderInstance.prototype.setValue = function (input) {
        };
        DateSliderInstance.prototype.getOptions = function () {
            return this.options;
        };
        DateSliderInstance.prototype.setOptions = function () {
        };
        DateSliderInstance.prototype.on = function (eventName, callback) {
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
    // next week -> create demo page, create DOM elements, hooks
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
                return 0;
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
                return new DateSlider.DateSliderModel(null, input);
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
            function SliderInstance(options) {
                var _this = this;
                this.options = options;
                this.onValueChangeEvent = new DateSlider.DateSliderEventHandler();
                this.handleMouseDown = function () {
                    window.addEventListener("mousemove", _this.handleMouseMove, true);
                };
                this.handleMouseUp = function () {
                    window.removeEventListener("mousemove", _this.handleMouseMove, true);
                };
                this.handleMouseMove = function () {
                    // TODO
                };
                this.onValueChangeEvent.register(options.callback.onValueChanged);
                switch (this.options.type) {
                    case "month":
                        this.range = new Slider.SliderRange(1, 12);
                        break;
                }
                this.onValueChangeEvent.fire(new Slider.Context.SliderValueChangeContext(null, this.range.getValue));
                this.createSliderElement();
                this.registerHandleListeners();
            }
            SliderInstance.createAll = function (options) {
                if (!options.sliders) {
                    throw new Error("Cannot create sliders because options.sliders is not set.");
                }
                var sliders = [];
                for (var _i = 0, _a = options.sliders; _i < _a.length; _i++) {
                    var sliderOptions = _a[_i];
                    sliders.push(new SliderInstance(sliderOptions));
                }
                return sliders;
            };
            SliderInstance.prototype.getValue = function () {
                return this.range.getValue;
            };
            SliderInstance.prototype.setValue = function (value) {
                var oldValue = this.range.getValue;
                this.range.setValue(value);
                var newValue = this.range.getValue;
                this.updateHandlePosition();
                this.onValueChangeEvent.fire(new Slider.Context.SliderValueChangeContext(oldValue, newValue));
            };
            SliderInstance.prototype.createSliderElement = function () {
                var _this = this;
                this.element = document.createElement("div");
                this.element.classList.add("slider");
                this.sliderElement = document.createElement("div");
                this.sliderElement.classList.add("slider-control");
                this.sliderLineElement = document.createElement("div");
                this.sliderLineElement.classList.add("slider-control-line");
                this.handleElement = document.createElement("div");
                this.handleElement.classList.add("slider-handle");
                window.addEventListener("load", function () {
                    _this.updateHandlePosition();
                });
                window.addEventListener("resize", function () {
                    _this.updateHandlePosition();
                });
                this.sliderElement.appendChild(this.sliderLineElement);
                this.sliderElement.appendChild(this.handleElement);
                this.element.appendChild(this.sliderElement);
            };
            SliderInstance.prototype.registerHandleListeners = function () {
                this.handleElement.addEventListener("mousedown", this.handleMouseDown, false);
                window.addEventListener("mouseup", this.handleMouseUp, false);
            };
            SliderInstance.prototype.updateHandlePosition = function () {
                this.handleElement.style.left = this.calculateHandlePosition() + "px";
            };
            SliderInstance.prototype.calculateHandlePosition = function () {
                var ratioInSlider = this.range.getRatio();
                var leftOffset = this.sliderLineElement.offsetLeft // start the handle at the start of the line
                    - this.handleElement.offsetWidth / 2 // but the handle's center should be at the start of the line
                    + this.sliderLineElement.offsetWidth * ratioInSlider; // the handle's position on the line by value (min: 0% -> max: 100%)
                return leftOffset;
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
            function SliderRange(minimum, maximum, value) {
                this.minimum = minimum;
                this.maximum = maximum;
                this.value = value;
                if (typeof value === "undefined" || value === null) {
                    this.value = this.minimum;
                }
            }
            Object.defineProperty(SliderRange.prototype, "getValue", {
                get: function () { return this.value; },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(SliderRange.prototype, "getMinimum", {
                get: function () { return this.minimum; },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(SliderRange.prototype, "getMaximum", {
                get: function () { return this.maximum; },
                enumerable: true,
                configurable: true
            });
            ;
            SliderRange.prototype.getRatio = function () {
                return (this.value - this.minimum) / (this.maximum - this.minimum);
            };
            SliderRange.prototype.setValue = function (value) {
                if (typeof value !== "number") {
                    throw new Error("SliderRange.setValue(value): value is not a number");
                }
                if (value < this.minimum) {
                    this.value = this.minimum;
                }
                else if (value > this.maximum) {
                    this.value = this.maximum;
                }
                else {
                    this.value = value;
                }
            };
            SliderRange.prototype.increment = function (by) {
                if (by === void 0) { by = 1; }
                if (typeof by !== "number") {
                    throw new Error("SliderRange.increment(by): by is not a number");
                }
                if (this.value + by <= this.maximum) {
                    this.value += by;
                }
                else {
                    this.value = this.maximum;
                }
            };
            SliderRange.prototype.decrement = function (by) {
                if (by === void 0) { by = 1; }
                if (typeof by !== "number") {
                    throw new Error("SliderRange.decrement(by): by is not a number");
                }
                if (this.value - by >= this.minimum) {
                    this.value -= by;
                }
                else {
                    this.value = this.minimum;
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
