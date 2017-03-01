module DateSlider {
    export class DateSliderInstance {
        public sliders: Slider.SliderInstance[];

        constructor(
            private element: HTMLElement,
            private options: DateSliderOptions,
            private value?: DateSliderModel,
        ) {
            if (!element || !element.parentNode) {
                throw new Error("DateSlider.create(): Given HTML element is invalid.");
            }
            if (options.appendTo === "replaceElement") {
                this.sliders = Slider.SliderInstance.createAll(options);
                let wrapper = this.createWrapper(this.sliders);
                element.parentNode.replaceChild(wrapper, element);
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

        private createWrapper(sliders: Slider.SliderInstance[]): HTMLDivElement {
                let fragment = document.createDocumentFragment();
                for (let slider of sliders) {
                    fragment.appendChild(slider.element);
                }
                let wrapper = document.createElement("div");
                wrapper.classList.add("date-slider");
                wrapper.appendChild(fragment);
                return wrapper;
        }
    }
}
