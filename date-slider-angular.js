"use strict";
var DateSlider;
(function (DateSlider) {
    var Angular;
    (function (Angular) {
        var DateSliderDirective = (function () {
            function DateSliderDirective() {
                this.restrict = "A";
                this.require = "ngModel";
                this.scope = {
                    "dateSlider": "=?instance",
                    "max": "<?",
                    "min": "<?",
                    "ngModel": "=",
                    "options": "=?",
                };
                this.link = function ($scope, $element, $attributes, ngModelController) {
                    $scope.options = $scope.options || {};
                    $scope.options.validation = $scope.options.validation || {};
                    $scope.options.value = $scope.ngModel;
                    if (typeof $scope.min !== "undefined") {
                        $scope.options.validation.min = $scope.min;
                    }
                    if (typeof $scope.max !== "undefined") {
                        $scope.options.validation.max = $scope.max;
                    }
                    $scope.instance = DateSlider.create($element[0], $scope.options);
                    // Options changes
                    $scope.$watch(function () { return $scope.min; }, function (newValue, oldValue) {
                        if (newValue === oldValue) {
                            return;
                        }
                        $scope.instance.updateOptions({ validation: { min: newValue } });
                    });
                    $scope.$watch(function () { return $scope.max; }, function (newValue, oldValue) {
                        if (newValue === oldValue) {
                            return;
                        }
                        $scope.instance.updateOptions({ validation: { max: newValue } });
                    });
                    $scope.$watch(function () { return $scope.options; }, function (newValue, oldValue) {
                        if (newValue === oldValue) {
                            return;
                        }
                        $scope.instance.updateOptions(newValue);
                    });
                    // Touched
                    // for (let slider of $scope.instance.sliders) {
                    //     slider.on("onSliderBoxGrabbed", () => {
                    //         ngModelController.$setTouched();
                    //     });
                    // }
                    // Model changes
                    $scope.$watch(function () { return $scope.ngModel; }, function (newValue, oldValue) {
                        $scope.instance.setValue(newValue);
                    });
                    $scope.instance.on("onValueChanged", function (context) {
                        ngModelController.$setViewValue(context.newValue);
                        ngModelController.$setTouched();
                    });
                };
            }
            DateSliderDirective.factory = function () {
                return new DateSliderDirective();
            };
            return DateSliderDirective;
        }());
        Angular.DateSliderDirective = DateSliderDirective;
        var DateSliderOptionsProvider = (function () {
            function DateSliderOptionsProvider() {
                this.defaultOptions = DateSlider.defaults;
                this.defaultSilderOptions = DateSlider.defaultSilderOptions;
            }
            DateSliderOptionsProvider.prototype.$get = function () {
                var _this = this;
                return {
                    defaultOptions: function () { return _this.defaultOptions; },
                    defaultSilderOptions: function () { return _this.defaultSilderOptions; },
                };
            };
            return DateSliderOptionsProvider;
        }());
        Angular.DateSliderOptionsProvider = DateSliderOptionsProvider;
        angular.module("dateSlider", [])
            .provider("dateSliderOptions", [DateSliderOptionsProvider])
            .directive("dateSlider", [DateSliderDirective.factory]);
    })(Angular = DateSlider.Angular || (DateSlider.Angular = {}));
})(DateSlider || (DateSlider = {}));

//# sourceMappingURL=date-slider-angular.js.map
