/// <reference types="angular" />
declare module DateSlider.Angular {
    class DateSliderDirective implements ng.IDirective {
        restrict: string;
        scope: {
            "dateSlider": string;
            "max": string;
            "min": string;
            "options": string;
        };
        static factory(): DateSliderDirective;
        link: ($scope: angular.IScope & {
            min?: any;
            max?: any;
            options?: DateSliderOptions;
            instance?: DateSliderInstance;
        }, $element: angular.IAugmentedJQuery, $attributes: angular.IAttributes) => void;
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
