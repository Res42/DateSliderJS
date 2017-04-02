"use strict";
(function ($) {
    $.fn.dateSlider = function (options) {
        this.each(function () {
            var instance = DateSlider.create(this, options);
            jQuery.data(this, "dateSlider", instance);
            DateSlider.Helpers.registerOnDestroy(instance.element, function () {
                jQuery.removeData(instance.element);
            });
        });
        return this;
    };
})(jQuery);

//# sourceMappingURL=date-slider-jquery.js.map
