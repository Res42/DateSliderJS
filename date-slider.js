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
    function create(element, options) {
        return new DateSlider.DateSliderInstance(element, options);
    }
    DateSlider.create = create;
})(DateSlider || (DateSlider = {}));
"use strict";
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
