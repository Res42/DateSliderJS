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
        function DateSliderModel(year, 
            /** In the range [1, 12]. */
            month, 
            /** In the range of [1, 31]. */
            day, hour, minute, second) {
            this.year = year;
            this.month = month;
            this.day = day;
            this.hour = hour;
            this.minute = minute;
            this.second = second;
        }
        return DateSliderModel;
    }());
    DateSlider.DateSliderModel = DateSliderModel;
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
    // should we store the raw value? -> yes
    // return raw value if it is invalid? -> throw
    // date parse/format: utc, local? -> timezone to model
    // use abstractformatter or not? writing own formatter may be a hassle if used -> CustomFormatter/Parser should take the callback as constructor param
    // file: 'unix-timestamp-ms-formatter.ts'
    // severity: 'Error'
    // message: 'A class must be declared after its base class.'
    // at: '2,51'
    // source: 'ts' -> ///<reference ...
    //  Date.parse() or write own implementation to parse from formats -> own
    // next week -> create demo page, create DOM elements, hooks
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    var Formatter;
    (function (Formatter) {
        var AbstractFormatter = (function () {
            function AbstractFormatter() {
            }
            AbstractFormatter.prototype.format = function (input, invalidValueOption, format, culture) {
                if (input === null) {
                    return invalidValueOption;
                }
                return this.formatInput(input, format, culture);
            };
            return AbstractFormatter;
        }());
        Formatter.AbstractFormatter = AbstractFormatter;
    })(Formatter = DateSlider.Formatter || (DateSlider.Formatter = {}));
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    var Formatter;
    (function (Formatter) {
        var DateFormatter = (function (_super) {
            __extends(DateFormatter, _super);
            function DateFormatter() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /**
             * Formats a Date object from a DateSliderModel object.
             */
            DateFormatter.prototype.formatInput = function (input) {
                return new Date();
            };
            return DateFormatter;
        }(Formatter.AbstractFormatter));
        Formatter.DateFormatter = DateFormatter;
    })(Formatter = DateSlider.Formatter || (DateSlider.Formatter = {}));
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    var Formatter;
    (function (Formatter) {
        var StringFormatter = (function (_super) {
            __extends(StringFormatter, _super);
            function StringFormatter() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /**
             * Formats a string from a DateSliderModel object.
             */
            StringFormatter.prototype.formatInput = function (input, format, culture) {
                return null;
            };
            return StringFormatter;
        }(Formatter.AbstractFormatter));
        Formatter.StringFormatter = StringFormatter;
    })(Formatter = DateSlider.Formatter || (DateSlider.Formatter = {}));
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    var Formatter;
    (function (Formatter) {
        var UnixTimestampFormatter = (function (_super) {
            __extends(UnixTimestampFormatter, _super);
            function UnixTimestampFormatter() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /**
             * Formats a unix timestamp (in seconds) from a DateSliderModel object.
             */
            UnixTimestampFormatter.prototype.formatInput = function (input) {
                return null;
            };
            return UnixTimestampFormatter;
        }(Formatter.AbstractFormatter));
        Formatter.UnixTimestampFormatter = UnixTimestampFormatter;
    })(Formatter = DateSlider.Formatter || (DateSlider.Formatter = {}));
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    var Formatter;
    (function (Formatter) {
        var UnixTimestampMsFormatter = (function (_super) {
            __extends(UnixTimestampMsFormatter, _super);
            function UnixTimestampMsFormatter() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /**
             * Formats a unix timestamp (in seconds) from a DateSliderModel object.
             */
            UnixTimestampMsFormatter.prototype.formatInput = function (input) {
                return null;
            };
            return UnixTimestampMsFormatter;
        }(Formatter.AbstractFormatter));
        Formatter.UnixTimestampMsFormatter = UnixTimestampMsFormatter;
    })(Formatter = DateSlider.Formatter || (DateSlider.Formatter = {}));
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    var Parser;
    (function (Parser) {
        var DateParser = (function () {
            function DateParser() {
            }
            DateParser.prototype.parse = function (input) {
                return new DateSlider.DateSliderModel();
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
        var StringParser = (function () {
            function StringParser() {
            }
            StringParser.prototype.parse = function (input, format, culture) {
                return new DateSlider.DateSliderModel();
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
        var UnixTimestampMsParser = (function () {
            function UnixTimestampMsParser() {
            }
            UnixTimestampMsParser.prototype.parse = function (input) {
                return new DateSlider.DateSliderModel();
            };
            return UnixTimestampMsParser;
        }());
        Parser.UnixTimestampMsParser = UnixTimestampMsParser;
    })(Parser = DateSlider.Parser || (DateSlider.Parser = {}));
})(DateSlider || (DateSlider = {}));
"use strict";
var DateSlider;
(function (DateSlider) {
    var Parser;
    (function (Parser) {
        var UnixTimestampParser = (function () {
            function UnixTimestampParser() {
            }
            /**
             * Parses a unix timestamp (in seconds)
             * from a number or a string which can be parsed as a number.
             */
            UnixTimestampParser.prototype.parse = function (input) {
                return new DateSlider.DateSliderModel();
            };
            return UnixTimestampParser;
        }());
        Parser.UnixTimestampParser = UnixTimestampParser;
    })(Parser = DateSlider.Parser || (DateSlider.Parser = {}));
})(DateSlider || (DateSlider = {}));

//# sourceMappingURL=date-slider.js.map
