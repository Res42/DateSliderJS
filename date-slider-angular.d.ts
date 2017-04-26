/// <reference types="angular" />
declare module DateSlider.Angular {
    interface IDateSliderDirectiveScope extends ng.IScope {
        min?: any;
        max?: any;
        options?: DateSliderOptions;
        instance?: DateSliderInstance;
        ngModel: {
            start: any;
            end?: any;
        };
    }
    class DateSliderDirective implements ng.IDirective {
        restrict: string;
        require: string;
        scope: {
            "dateSlider": string;
            "max": string;
            "min": string;
            "ngModel": string;
            "options": string;
        };
        static factory(): DateSliderDirective;
        link: ($scope: IDateSliderDirectiveScope, $element: angular.IAugmentedJQuery, $attributes: angular.IAttributes, ngModelController: angular.INgModelController) => void;
    }
    class DateSliderOptionsProvider implements ng.IServiceProvider {
        defaultOptions: DateSliderOptions;
        defaultSilderOptions: {
            [key: string]: SliderOptions;
        };
        $get(): {
            defaultOptions: () => DateSliderOptions;
            defaultSilderOptions: () => {
                [key: string]: SliderOptions;
            };
        };
    }
}
