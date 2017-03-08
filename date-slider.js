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
            this.sliders = DateSlider.Slider.SliderInstance.createAll(options);
            var wrapper = this.createWrapper(this.sliders);
            element.parentNode.replaceChild(wrapper, element);
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
    // check if sliders move with touch events
    // test range, division with zero
    // demo: out of the box, full customization
    // timestamp parse/format
    // instance.refresh
    // on creation getter setter for outside model
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
            function SliderInstance(options, range) {
                var _this = this;
                this.options = options;
                this.range = range;
                this.onValueChangeEvent = new DateSlider.DateSliderEventHandler();
                this.destroy = function () {
                    window.removeEventListener("mouseup", _this.handleMouseUp, false);
                    window.removeEventListener("load", _this.updateHandlePosition);
                    window.removeEventListener("resize", _this.updateHandlePosition);
                    window.removeEventListener("mousemove", _this.handleMouseMove, true);
                    if (_this.observer) {
                        _this.observer.disconnect();
                    }
                };
                this.handleMouseDown = function () {
                    window.addEventListener("mousemove", _this.handleMouseMove, true);
                };
                this.handleMouseUp = function () {
                    window.removeEventListener("mousemove", _this.handleMouseMove, true);
                };
                this.handleMouseMove = function () {
                    // TODO
                };
                this.updateHandlePosition = function () {
                    var position = _this.calculateHandlePosition();
                    _this.handleElement.style.position = "absolute";
                    _this.handleElement.style.left = position.x + "px";
                    _this.handleElement.style.top = position.y + "px";
                };
                if (options.callback && options.callback.onValueChanged) {
                    this.onValueChangeEvent.register(options.callback.onValueChanged);
                }
                this.onValueChangeEvent.fire(new Slider.Context.SliderValueChangeContext(null, this.range.getValue));
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
                return this.range.getValue;
            };
            SliderInstance.prototype.setValue = function (value) {
                var oldValue = this.range.getValue;
                this.range.setValue(value);
                var newValue = this.range.getValue;
                this.updateHandlePosition();
                this.onValueChangeEvent.fire(new Slider.Context.SliderValueChangeContext(oldValue, newValue));
            };
            SliderInstance.prototype.bootstrapSliderToTemplate = function () {
                this.element = this.options.template.cloneNode(true);
                this.sliderElement = this.findElementInSlider("slider-control-template");
                this.handleElement = this.findElementInSlider("slider-handle-template");
                this.sliderLineStart = this.findElementInSlider("slider-control-start-template");
                this.sliderLineEnd = this.findElementInSlider("slider-control-end-template");
            };
            SliderInstance.prototype.findElementInSlider = function (className) {
                var found = this.element.getElementsByClassName(className);
                if (found.length > 0) {
                    return found[0];
                }
                throw new Error("Cannot find DOM element with class: '" + className + "' in the template.");
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
                this.sliderElement.appendChild(this.sliderLineStart);
                this.sliderElement.appendChild(this.sliderLineElement);
                this.sliderElement.appendChild(this.sliderLineEnd);
                this.sliderElement.appendChild(this.handleElement);
                this.element.appendChild(this.sliderElement);
            };
            SliderInstance.prototype.registerListeners = function () {
                var _this = this;
                this.handleElement.addEventListener("mousedown", this.handleMouseDown, false);
                window.addEventListener("mouseup", this.handleMouseUp, false);
                window.addEventListener("load", this.updateHandlePosition);
                window.addEventListener("resize", this.updateHandlePosition);
                if (window.MutationObserver && this.element.parentNode) {
                    this.observer = new MutationObserver(function (mutations) {
                        var isTargetRemoved = mutations.some(function (mutation) {
                            for (var i = 0; i < mutation.removedNodes.length; i++) {
                                if (mutation.removedNodes[i] === _this.element) {
                                    return true;
                                }
                            }
                            return false;
                        });
                        if (isTargetRemoved) {
                            _this.destroy();
                        }
                    });
                    this.observer.observe(this.element.parentNode, { childList: true, subtree: true });
                }
                else {
                    this.element.addEventListener("DOMNodeRemoved", this.destroy, false);
                }
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
                var ratioInSlider = this.range.getRatio();
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
