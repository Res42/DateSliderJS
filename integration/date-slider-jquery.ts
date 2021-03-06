interface JQuery {
    dateSlider(): JQuery;
    dateSlider(options?: DateSlider.DateSliderOptions): JQuery;

    data(key: "dateSlider"): DateSlider.DateSliderInstance;
}

(function ($) {
    $.fn.dateSlider = function (options?: DateSlider.DateSliderOptions): JQuery {
        this.each(function () {
            let instance = DateSlider.create(this, options);
            jQuery.data(this, "dateSlider", instance);

            DateSlider.Helpers.registerOnDestroy(instance.element, () => {
                jQuery.removeData(instance.element);
            });
        });

        return this;
    };
})(jQuery);
