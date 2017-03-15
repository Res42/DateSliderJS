module DateSlider {
    export class DateSliderInstance {
        public sliders: Slider.SliderInstance[];
        public parser: Parser.IParser;
        public formatter: Formatter.IFormatter;

        constructor(
            public element: HTMLElement,
            private options: DateSliderOptions,
            private value?: DateSliderModel,
        ) {
            if (!element || !element.parentNode) {
                throw new Error("DateSlider.create(): Given HTML element is invalid.");
            }
            this.sliders = Slider.SliderInstance.createAll(options);
            let wrapper = this.createWrapper(this.sliders);
            element.parentNode.replaceChild(wrapper, element);
            DateSliderHelpers.registerOnDestroy(wrapper, (event) => {
                for (let slider of this.sliders) {
                    slider.destroy(event);
                }
            });

            this.bindParser();
            this.bindFormatter();
        }

        public getValue(): any {
            return this.formatter.format(this.value, this.options.formatterOptions);
        }

        public setValue(input: any): void {
            this.value = this.parser.parse(input, this.options.parserOptions);
            // TODO update sliders
        }

        public getOptions(): DateSliderOptions {
            return this.options;
        }

        public updateOptions(options: DateSliderOptions): void {

        }

        public replaceOptions(options: DateSliderOptions): void {

        }

        public on(eventName: DateSliderEvent, callback: (context: DateSliderEventContext) => DateSliderEventContext): void {

        }

        private bindFormatter(): void {
            if (typeof this.options.formatter === "string") {
                switch (this.options.formatter) {
                    case "timestamp":
                        this.formatter = new Formatter.UnixTimestampFormatter();
                        break;
                    case "date":
                        this.formatter = new Formatter.DateFormatter();
                        break;
                    case "string":
                        this.formatter = new Formatter.StringFormatter();
                        break;
                    default:
                        throw new Error("DateSlider.create(): Invalid formatter.");
                }
            } else if (typeof this.options.formatter === "function") {
                this.formatter = new Formatter.CustomFormatter(this.options.formatter);
            } else {
                throw new Error("DateSlider.create(): Invalid formatter.");
            }
        }

        private bindParser(): void {
            if (typeof this.options.parser === "string") {
                switch (this.options.parser) {
                    case "timestamp":
                        this.parser = new Parser.UnixTimestampParser();
                        break;
                    case "date":
                        this.parser = new Parser.DateParser();
                        break;
                    case "string":
                        this.parser = new Parser.StringParser();
                        break;
                    default:
                        throw new Error("DateSlider.create(): Invalid parser.");
                }
            } else if (typeof this.options.parser === "function") {
                this.parser = new Parser.CustomParser(this.options.parser);
            } else {
                throw new Error("DateSlider.create(): Invalid parser.");
            }
        }

        private createWrapper(sliders: Slider.SliderInstance[]): HTMLDivElement {
                let fragment = document.createDocumentFragment();
                for (let slider of sliders) {
                    fragment.appendChild(slider.element);
                }
                let wrapper = document.createElement("div");
                wrapper.classList.add("date-slider");
                wrapper.appendChild(fragment);
                // in the appendChild method the silders' destroy method would be called because it fires the 'DOMNodeRemoved' event
                // also only after this will the sliders' element gain a parent to use the MutationObserver
                for (let slider of sliders) {
                    DateSliderHelpers.registerOnDestroy(slider.element, (event) => slider.destroy(event));
                }
                return wrapper;
        }
    }
}
