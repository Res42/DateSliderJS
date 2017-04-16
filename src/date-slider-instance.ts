module DateSlider {
    export class DateSliderInstance {
        public sliders: Slider.SliderInstance[];
        public parser: Parser.IParser;
        public formatter: Formatter.IFormatter;

        private onValueChangeEvent = new DateSliderEventHandler();

        constructor(
            public element: HTMLElement,
            private options: DateSliderOptions,
            private value?: DateSliderModel,
        ) {
            if (!element || !element.parentNode) {
                throw new Error("DateSlider.create(): Given HTML element is invalid.");
            }
            this.sliders = Slider.SliderInstance.createAll(options);
            this.sliders.forEach(slider => {
                slider.on("onValueChanged", (context: Slider.Context.SliderValueChangeContext) => this.onSliderUpdate(context, slider.options));
            });

            this.bootstrapSliders(this.sliders);
            Helpers.registerOnDestroy(element, (event) => {
                for (let slider of this.sliders) {
                    slider.destroy(event);
                }
            });

            if (!value) {
                this.value = new DateSliderModel(new InnerModel(), null);
            }

            if (this.options.callback) {
                this.onValueChangeEvent.register(this.options.callback.onValueChanged);
            }
            this.setOptions();
        }

        public getValue(): any {
            return this.formatter.format(this.value, this.options.formatterOptions);
        }

        public setValue(input: any): void {
            let oldValue = this.getValue();
            this.value = this.parser.parse(input, this.options.parserOptions);
            this.updateSliders();
            this.onValueChangeEvent.fire(new Context.ValueChangeContext(oldValue, this.getValue()));
        }

        public getOptions(): DateSliderOptions {
            return this.options;
        }

        public updateOptions(options: DateSliderOptions): void {
            Helpers.deepMerge(this.options, options);
            // TODO update sliders
            this.setOptions();
        }

        public replaceOptions(options: DateSliderOptions): void {
            this.options = options;
            // TODO update sliders
            this.setOptions();
        }

        public on(eventName: DateSliderEvent, callback: (context: DateSliderEventContext) => void): void {
            if (eventName === "onValueChanged") {
                this.onValueChangeEvent.register(callback);
            }
        }

        private setOptions(): void {
            this.bindParser();
            this.bindFormatter();
        }

        private onSliderUpdate = (context: Slider.Context.SliderValueChangeContext, options: SliderOptions) => {
            let oldValue = this.getValue();
            switch (options.type) {
                case "year":
                    this.value.model.year = context.newValue;
                    break;
                case "month":
                    this.value.model.month = context.newValue;
                    break;
                case "day":
                    this.value.model.day = context.newValue;
                    break;
                case "hour":
                    this.value.model.hour = context.newValue;
                    break;
                case "minute":
                    this.value.model.minute = context.newValue;
                    break;
                case "second":
                    this.value.model.second = context.newValue;
                    break;
                case "universal-date":
                    // TODO
                    break;
                case "universal-time":
                    this.value.model.hour = Math.floor(context.newValue / 3600);
                    this.value.model.minute = Math.floor(context.newValue / 60) % 60;
                    this.value.model.second = context.newValue % 60;
                    break;
                case "universal":
                    // TODO
                    break;
            }
            this.onValueChangeEvent.fire(new Context.ValueChangeContext(oldValue, this.getValue()));
        }

        private updateSliders(): void {
            for (let slider of this.sliders) {
                switch (slider.options.type) {
                    case "year":
                        slider.slideTo(this.value.model.year);
                        break;
                    case "month":
                        slider.setValue(this.value.model.month);
                        break;
                    case "day":
                        slider.setValue(this.value.model.day);
                        break;
                    case "hour":
                        slider.setValue(this.value.model.hour);
                        break;
                    case "minute":
                        slider.setValue(this.value.model.minute);
                        break;
                    case "second":
                        slider.setValue(this.value.model.second);
                        break;
                    case "universal-date":
                        // TODO
                        break;
                    case "universal-time":
                        slider.setValue(this.value.model.hour * 3600 + this.value.model.minute * 60 + this.value.model.second);
                        break;
                    case "universal":
                        // TODO
                        break;
                }
            }
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

        private bootstrapSliders(sliders: Slider.SliderInstance[]) {
            for (let slider of sliders) {
                this.element.appendChild(slider.element);
            }
            this.element.classList.add("date-slider");

            // in the appendChild method the silders' destroy method would be called because it fires the 'DOMNodeRemoved' event
            // also only after this will the sliders' element gain a parent to use the MutationObserver
            for (let slider of sliders) {
                Helpers.registerOnDestroy(slider.element, (event) => slider.destroy(event));
            }
        }
    }
}
