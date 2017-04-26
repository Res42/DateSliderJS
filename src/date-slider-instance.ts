module DateSlider {
    export class DateSliderInstance {
        public sliders: Slider.SliderInstance[];
        public parser: Parser.IParser;
        public formatter: Formatter.IFormatter;
        public startValue: DateSliderModel;
        public endValue?: DateSliderModel;

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

            if (Helpers.isSet(this.options.startValue)) {
                this.startValue = this.parse(this.options.startValue);
            } else {
                this.startValue = new DateSliderModel(new InnerModel(), null);
            }

            if (this.options.interval) {
                if (Helpers.isSet(this.options.endValue)) {
                    this.endValue = this.parse(this.options.endValue);
                } else {
                    this.endValue = new DateSliderModel(new InnerModel(), null);
                }
            }

            let isValid = this.validate(this.startValue, this.endValue);

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
            let value = this.getValue();
            this.onValueChangeEvent.fire(new Context.ValueChangeContext(isValid, {oldValue: null, newValue: value.start},
                                                                        this.options.interval ? {oldValue: null, newValue: value.end} : null));
        }

        public parse(value: any): DateSliderModel {
            return this.parser.parse(value, this.options.parserOptions);
        }

        public format(value: DateSliderModel): any {
            return this.formatter.format(value, this.options.formatterOptions);
        }

        public getValue(): {start: any, end?: any} {
            return {start: this.format(this.startValue), end: this.options.interval ? this.format(this.endValue) : null};
        }

        public setValue(input: {start: any, end?: any}): void {
            let oldValue = this.getValue();
            let newStartModel = this.parse(input.start);
            let newEndModel = this.options.interval ? this.parse(input.end) : null;

            let isValid = this.validate(newStartModel, newEndModel);

            this.startValue = newStartModel;
            this.endValue = newEndModel;

            this.updateSliders();
            let newValue = this.getValue();
            this.onValueChangeEvent.fire(new Context.ValueChangeContext(isValid, {oldValue: oldValue.start, newValue: newValue.start},
                                                                        this.options.interval ? {oldValue: oldValue.end, newValue: newValue.end} : null));
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

        public updateFromSlider(sliderType: SliderType, start: {newValue: number, oldValue: number}, end?: {newValue: number, oldValue: number}) {
            let oldModelValue = this.getValue();
            let newStartModel = this.startValue.copy();

            switch (sliderType) {
                case "year":
                    newStartModel.model.year = start.newValue;
                    break;
                case "month":
                    newStartModel.model.month = start.newValue;
                    break;
                case "day":
                    newStartModel.model.day = start.newValue;
                    break;
                case "hour":
                    newStartModel.model.hour = start.newValue;
                    break;
                case "minute":
                    newStartModel.model.minute = start.newValue;
                    break;
                case "second":
                    newStartModel.model.second = start.newValue;
                    break;
                case "universal-date":
                    // TODO
                    break;
                case "universal-time":
                    newStartModel.model.hour = Math.floor(start.newValue / 3600);
                    newStartModel.model.minute = Math.floor(start.newValue / 60) % 60;
                    newStartModel.model.second = start.newValue % 60;
                    break;
                case "universal":
                    // TODO
                    break;
            }

            newStartModel.model.setDayOfMonth();

            let isValid = this.validate(newStartModel);

            this.startValue = newStartModel;
            this.updateDaySliders();

            let newModelValue = this.getValue();
            this.onValueChangeEvent.fire(new Context.ValueChangeContext(isValid, {oldValue: oldModelValue.start, newValue: newModelValue.start}, null));
        }

        public validate(newStartModel: DateSliderModel, newEndModel?: DateSliderModel): boolean {
            let isValid = this.isValid(newStartModel, newEndModel);
            if (isValid) {
                this.element.classList.add("date-slider-valid");
                this.element.classList.remove("date-slider-invalid");
            } else {
                this.element.classList.add("date-slider-invalid");
                this.element.classList.remove("date-slider-valid");
            }
            return isValid;
        }

        public isValid(startModel: DateSliderModel, endModel?: DateSliderModel): boolean {
            let isValid = this.validateModel(startModel);

            if (!isValid) {
                return false;
            }

            if (this.options.interval) {
                return this.validateModel(endModel);
            }

            return true;
        }

        private validateModel(model: DateSliderModel): boolean {
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

        private createAllSliders(): Slider.SliderInstance[] {
            if (!this.options.sliders) {
                throw new Error("Cannot create sliders because options.sliders is not set.");
            }
            let sliders: Slider.SliderInstance[] = [];
            for (let sliderOptions of this.options.sliders) {
                sliders.push(this.createSlider(this, sliderOptions, this.getRangeFromType(sliderOptions), this.options.interval));
            }
            return sliders;
        }

        private getRangeFromType(sliderOptions: SliderOptions): Slider.SliderRange {
            switch (sliderOptions.type) {
                case "year":
                    return new Slider.SliderRange(this.startValue.model.year - 10, (this.endValue ? this.endValue.model.year : this.startValue.model.year) + 10, this.startValue.model.year, this.endValue ? this.endValue.model.year : null);
                case "month":
                    return new Slider.SliderRange(1, 12, this.startValue.model.month, this.endValue ? this.endValue.model.month : null);
                case "day":
                    return new Slider.SliderRange(1, Helpers.getDaysInMonth(this.startValue.model.year, this.startValue.model.month), this.startValue.model.day, this.endValue ? this.endValue.model.day : null);
                case "hour":
                    return new Slider.SliderRange(0, 23, this.startValue.model.hour, this.endValue ? this.endValue.model.hour : null);
                case "minute":
                    return new Slider.SliderRange(0, 59, this.startValue.model.minute, this.endValue ? this.endValue.model.minute : null);
                case "second":
                    return new Slider.SliderRange(0, 59, this.startValue.model.second, this.endValue ? this.endValue.model.second : null);
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
                    slider.updateValueWithMaximum(this.startValue.model.day, Helpers.getDaysInMonth(this.startValue.model.year, this.startValue.model.month), this.endValue ? this.endValue.model.day : null);
                }
            }
        }

        private updateSliders(): void {
            for (let slider of this.sliders) {
                switch (slider.options.type) {
                    case "year":
                        slider.updateValue(this.startValue.model.year, this.endValue ? this.endValue.model.year : null);
                        break;
                    case "month":
                        slider.updateValue(this.startValue.model.month, this.endValue ? this.endValue.model.month : null);
                        break;
                    case "day":
                        slider.updateValueWithMaximum(this.startValue.model.day, Helpers.getDaysInMonth(this.startValue.model.year, this.startValue.model.month), this.endValue ? this.endValue.model.day : null);
                        break;
                    case "hour":
                        slider.updateValue(this.startValue.model.hour, this.endValue ? this.endValue.model.hour : null);
                        break;
                    case "minute":
                        slider.updateValue(this.startValue.model.minute, this.endValue ? this.endValue.model.minute : null);
                        break;
                    case "second":
                        slider.updateValue(this.startValue.model.second, this.endValue ? this.endValue.model.second : null);
                        break;
                    case "universal-date":
                        // TODO
                        break;
                    case "universal-time":
                        slider.updateValue(this.startValue.model.hour * 3600 + this.startValue.model.minute * 60 + this.startValue.model.second,
                                           this.endValue ? this.endValue.model.hour * 3600 + this.endValue.model.minute * 60 + this.endValue.model.second : null);
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

        private createSlider(dateSlider: DateSliderInstance, options: SliderOptions, range: Slider.SliderRange, interval: boolean): Slider.SliderInstance {
            switch (options.movement) {
                default:
                case "none":
                    return new Slider.SliderInstance(dateSlider, options, range, interval);
                case "slide":
                    return new Slider.SlidingSliderInstance(dateSlider, options, range, interval);
                case "expand":
                    return new Slider.ExpandingSliderInstance(dateSlider, options, range, interval);
                case "slide expand":
                    return new Slider.SlidingExpandingSliderInstance(dateSlider, options, range, interval);
            }
        }
    }
}
