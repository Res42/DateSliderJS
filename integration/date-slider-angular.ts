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

            if (typeof $scope.min !== "undefined") {
                $scope.options.validation.min = $scope.min;
            }

            if (typeof $scope.max !== "undefined") {
                $scope.options.validation.max = $scope.max;
            }

            $scope.instance = DateSlider.create($element[0], $scope.options);

            // Options changes
            $scope.$watch(() => $scope.min, (newValue) => {
                $scope.instance.updateOptions({ validation: { min: newValue } });
            });
            $scope.$watch(() => $scope.max, (newValue) => {
                $scope.instance.updateOptions({ validation: { max: newValue } });
            });
            $scope.$watch(() => $scope.options, (newValue) => {
                $scope.instance.updateOptions(newValue);
            });

            // Model changes
            $scope.$watch(() => $scope.ngModel, (newValue) => {
                $scope.instance.setValue(newValue);
            });
            $scope.instance.on("onValueChanged", (context: Context.ValueChangeContext): void => {
                $scope.ngModel = context.newValue;
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
