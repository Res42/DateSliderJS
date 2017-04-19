module DateSlider {
    export class DateSliderInstance {
        public sliders: Slider.SliderInstance[];
        public parser: Parser.IParser;
        public formatter: Formatter.IFormatter;
        public value: DateSliderModel;

        private onValueChangeEvent = new DateSliderEventHandler();

        constructor(
            public element: HTMLElement,
            private options: DateSliderOptions,
        ) {
            if (!element || !element.parentNode) {
                throw new Error("DateSlider.create(): Given HTML element is invalid.");
            }

            this.bindParser();
            this.bindFormatter();

            if (Helpers.isSet(this.options.value)) {
                this.value = this.parse(this.options.value);
            } else {
                this.value = new DateSliderModel(new InnerModel, null);
            }

            this.sliders = this.createAllSliders();

            this.bootstrapSliders(this.sliders);
            Helpers.registerOnDestroy(element, (event) => {
                for (let slider of this.sliders) {
                    slider.destroy(event);
                }
            });

            if (this.options.callback) {
                this.onValueChangeEvent.register(this.options.callback.onValueChanged);
            }
        }

        public parse(value: any): DateSliderModel {
            return this.parser.parse(value, this.options.parserOptions);
        }

        public format(value: DateSliderModel): any {
            return this.formatter.format(value, this.options.formatterOptions);
        }

        public getValue(): any {
            return this.format(this.value);
        }

        public setValue(input: any): void {
            let oldValue = this.getValue();
            let newModel = this.parse(input);

            if (!this.isValid(newModel)) {
                // alert the outside that their new input is not valid
                this.onValueChangeEvent.fire(new Context.ValueChangeContext(oldValue, oldValue));
                return;
            }
            this.value = newModel;

            this.updateSliders();
            let newValue = this.getValue();
            this.onValueChangeEvent.fire(new Context.ValueChangeContext(oldValue, newValue));
        }

        public getOptions(): DateSliderOptions {
            return this.options;
        }

        public updateOptions(options: DateSliderOptions): void {
            Helpers.deepMerge(this.options, options);
            // TODO update sliders
            this.bindParser();
            this.bindFormatter();
        }

        public replaceOptions(options: DateSliderOptions): void {
            this.options = options;
            // TODO update sliders
            this.bindParser();
            this.bindFormatter();
        }

        public on(eventName: DateSliderEvent, callback: (context: DateSliderEventContext) => void): void {
            if (eventName === "onValueChanged") {
                this.onValueChangeEvent.register(callback);
            }
        }

        public updateFromSlider(sliderType: SliderType, newValue: number, oldValue: number) {
            let oldModelValue = this.getValue();
            let newModel = this.value.copy();

            switch (sliderType) {
                case "year":
                    newModel.model.year = newValue;
                    break;
                case "month":
                    newModel.model.month = newValue;
                    break;
                case "day":
                    newModel.model.day = newValue;
                    break;
                case "hour":
                    newModel.model.hour = newValue;
                    break;
                case "minute":
                    newModel.model.minute = newValue;
                    break;
                case "second":
                    newModel.model.second = newValue;
                    break;
                case "universal-date":
                    // TODO
                    break;
                case "universal-time":
                    newModel.model.hour = Math.floor(newValue / 3600);
                    newModel.model.minute = Math.floor(newValue / 60) % 60;
                    newModel.model.second = newValue % 60;
                    break;
                case "universal":
                    // TODO
                    break;
            }

            newModel.model.setDayOfMonth();

            // check validity
            if (!this.isValid(newModel)) {
                // rollback to the last valid value if the new model is not valid
                this.updateSliders();
                return;
            }

            // if the new model is valid, then it is saved as the new value
            this.value = newModel;
            this.updateDaySliders();

            let newModelValue = this.getValue();
            this.onValueChangeEvent.fire(new Context.ValueChangeContext(oldValue, newValue));
        }

        private createAllSliders(): Slider.SliderInstance[] {
            if (!this.options.sliders) {
                throw new Error("Cannot create sliders because options.sliders is not set.");
            }
            let sliders: Slider.SliderInstance[] = [];
            for (let sliderOptions of this.options.sliders) {
                sliders.push(Slider.create(this, sliderOptions, this.getRangeFromType(sliderOptions)));
            }
            return sliders;
        }

        private isValid(model: DateSliderModel): boolean {
            if (!this.options.validation) {
                return true;
            }

            if (Helpers.isSet(this.options.validation.min)) {
                let minimum = this.parse(this.options.validation.min);
                return minimum.model.lessThanOrEqual(model.model);
            }

            if (Helpers.isSet(this.options.validation.max)) {
                let maximum = this.parse(this.options.validation.max);
                return maximum.model.greaterThanOrEqual(model.model);
            }

            if (Helpers.isSet(this.options.validation.custom)) {
                return this.options.validation.custom(this.format(model));
            }

            return true;
        }

        private getRangeFromType(sliderOptions: SliderOptions): Slider.SliderRange {
            switch (sliderOptions.type) {
                case "year":
                    return new Slider.SliderRange(this.value.model.year - 10, this.value.model.year + 10, this.value.model.year);
                case "month":
                    return new Slider.SliderRange(1, 12, this.value.model.month);
                case "day":
                    return new Slider.SliderRange(1, Helpers.getDaysInMonth(this.value.model.year, this.value.model.month), this.value.model.day);
                case "hour":
                    return new Slider.SliderRange(0, 23, this.value.model.hour);
                case "minute":
                    return new Slider.SliderRange(0, 59, this.value.model.minute);
                case "second":
                    return new Slider.SliderRange(0, 59, this.value.model.second);
                case "universal":
                    // TODO
                    return new Slider.SliderRange(1, 12);
                case "universal-date":
                    // TODO
                    return new Slider.SliderRange(1, 12);
                case "universal-time":
                    return new Slider.SliderRange(0, Constants.SecondsInDay - 1);
                default:
                    throw new Error("SliderOptions.type is not valid.");
            }
        }

        private updateDaySliders(): void {
            for (let slider of this.sliders) {
                if (slider.options.type === "day") {
                    slider.updateValueWithMaximum(this.value.model.day, Helpers.getDaysInMonth(this.value.model.year, this.value.model.month));
                }
            }
        }

        private updateSliders(): void {
            for (let slider of this.sliders) {
                switch (slider.options.type) {
                    case "year":
                        slider.updateValue(this.value.model.year);
                        break;
                    case "month":
                        slider.updateValue(this.value.model.month);
                        break;
                    case "day":
                        slider.updateValueWithMaximum(this.value.model.day, Helpers.getDaysInMonth(this.value.model.year, this.value.model.month));
                        break;
                    case "hour":
                        slider.updateValue(this.value.model.hour);
                        break;
                    case "minute":
                        slider.updateValue(this.value.model.minute);
                        break;
                    case "second":
                        slider.updateValue(this.value.model.second);
                        break;
                    case "universal-date":
                        // TODO
                        break;
                    case "universal-time":
                        slider.updateValue(this.value.model.hour * 3600 + this.value.model.minute * 60 + this.value.model.second);
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
