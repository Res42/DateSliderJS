"use strict";
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
    var DateSliderInstance = (function () {
        function DateSliderInstance(element, options, value) {
            this.element = element;
            this.options = options;
            this.value = value;
            if (options.appendTo === "replaceElement") {
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
        return new DateSlider.DateSliderInstance(element, mergeOptions(options, DateSlider.defaults));
    }
    DateSlider.create = create;
    function mergeOptions(instanceOptions, defaultOptions) {
        return instanceOptions;
    }
    // TODO
    //  Date.parse() or write own implementation to parse from formats -> own
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
                this.options = options;
            }
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
        function create(options) {
            if (!options.sliders) {
                throw new Error("Cannot create sliders because options.sliders is not set.");
            }
            var sliders = [];
            for (var _i = 0, _a = options.sliders; _i < _a.length; _i++) {
                var sliderOptions = _a[_i];
                sliders.push(new Slider.SliderInstance(sliderOptions));
            }
            return sliders;
        }
        Slider.create = create;
    })(Slider = DateSlider.Slider || (DateSlider.Slider = {}));
})(DateSlider || (DateSlider = {}));

//# sourceMappingURL=date-slider.js.map
