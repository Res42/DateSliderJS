module DateSlider.Angular {
    export interface IDateSliderDirectiveScope extends ng.IScope {
        min?: any;
        max?: any;
        options?: DateSliderOptions;
        instance?: DateSliderInstance;
        ngModel: any;
    }

    export class DateSliderDirective implements ng.IDirective {
        public restrict = "A";
        public require = "ngModel";
        public scope = {
            "dateSlider": "=?instance",
            "max": "<?",
            "min": "<?",
            "ngModel": "=",
            "options": "=?",
        };

        public static factory(): DateSliderDirective {
            return new DateSliderDirective();
        }

        public link = ($scope: IDateSliderDirectiveScope, $element: ng.IAugmentedJQuery, $attributes: ng.IAttributes, ngModelController: ng.INgModelController) => {
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
            $scope.$watch(() => $scope.min, (newValue, oldValue) => {
                if (newValue === oldValue) {
                    return;
                }

                $scope.instance.updateOptions({ validation: { min: newValue } });
            });
            $scope.$watch(() => $scope.max, (newValue, oldValue) => {
                if (newValue === oldValue) {
                    return;
                }

                $scope.instance.updateOptions({ validation: { max: newValue } });
            });
            $scope.$watch(() => $scope.options, (newValue, oldValue) => {
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
            let fromEvent = false;
            $scope.$watch(() => $scope.ngModel, (newValue, oldValue) => {
                if (newValue === oldValue) {
                    return;
                }

                // if the model changed from the event then the slider is already has the same value
                // also if this isn't checked then it will cause the handle to jump sometimes
                if (fromEvent) {
                    return;
                }

                $scope.instance.setValue(newValue);
            });

            $scope.instance.on("onValueChanged", (context: Context.ValueChangeContext): void => {
                fromEvent = true;
                ngModelController.$setViewValue(context.newValue);
                ngModelController.$setValidity("date-slider", context.isValid);
                ngModelController.$setTouched();
                setTimeout(() => { fromEvent = false; });
            });
        }
    }

    export class DateSliderOptionsProvider implements ng.IServiceProvider {
        public defaultOptions = DateSlider.defaults;
        public defaultSilderOptions = DateSlider.defaultSilderOptions;

        public $get() {
            return {
                defaultOptions: () => { return this.defaultOptions; },
                defaultSilderOptions: () => { return this.defaultSilderOptions; },
            };
        }
    }

    angular.module("dateSlider", [])
        .provider("dateSliderOptions", [DateSliderOptionsProvider])
        .directive("dateSlider", [DateSliderDirective.factory]);
}
