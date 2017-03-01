module DateSlider {
    export class DateSliderInstance {
        constructor(
            private element: HTMLElement,
            private options: DateSliderOptions,
            private value?: DateSliderModel,
        ) {
            if (options.appendTo === "replaceElement") {
                
            }
        }

        public getValue(): any {
            return null;
        }

        public setValue(input: any): void {

        }

        public getOptions(): DateSliderOptions {
            return this.options;
        }

        public setOptions(): void {

        }

        public on(eventName: DateSliderEvent, callback: (context: DateSliderEventContext) => DateSliderEventContext): void {

        }
    }
}
