module DateSlider.Slider {
    export class SliderInstance {
        public element: HTMLElement;
        private sliderElement: HTMLElement;
        private sliderLineStart: HTMLElement;
        private sliderLineElement?: HTMLDivElement;
        private sliderLineEnd: HTMLElement;
        private handleElement: HTMLElement;
        private valueContainerElement?: HTMLElement;

        private onValueChangeEvent = new DateSliderEventHandler();

        private events = {
            load: () => { this.updateHandlePosition(); this.updateValueDisplay(); },
            mousedown: (e: MouseEvent) => this.handleMouseDown(e),
            mousemove: (e: MouseEvent) => this.handleMouseMove(e),
            mouseup: (e: MouseEvent) => this.handleMouseUp(e),
            resize: () => this.updateHandlePosition(),
            touchend: (e: TouchEvent) => this.handleMouseUp(e),
            touchmove: (e: TouchEvent) => this.handleMouseMove(e),
            touchstart: (e: TouchEvent) => this.handleMouseDown(e),
        };

        public static createAll(options: DateSliderOptions): SliderInstance[] {
            if (!options.sliders) {
                throw new Error("Cannot create sliders because options.sliders is not set.");
            }
            let sliders: SliderInstance[] = [];
            for (let sliderOptions of options.sliders) {
                sliders.push(new SliderInstance(sliderOptions, this.getRangeFromType(sliderOptions)));
            }
            return sliders;
        }

        private static getRangeFromType(sliderOptions: SliderOptions): SliderRange {
            switch (sliderOptions.type) {
                case "month":
                    return new SliderRange(1, 12);
                default:
                    throw new Error("SliderOptions.type is not valid.");
            }
        }

        constructor(
            private options: SliderOptions,
            private range: SliderRange,
        ) {
            if (options.callback && options.callback.onValueChanged) {
                this.onValueChangeEvent.register(options.callback.onValueChanged);
            }

            this.onValueChangeEvent.fire(new Context.SliderValueChangeContext(null, this.range.value));

            if (this.options.template instanceof HTMLElement) {
                this.bootstrapSliderToTemplate();
            } else {
                this.createSliderElement();
            }

            this.registerListeners();
        }

        public getValue(): number {
            return this.range.value;
        }

        public setValue(value: number): void {
            let oldValue = this.range.value;
            this.range.value = value;
            let newValue = this.range.value;
            this.updateValueDisplay();
            this.updateHandlePosition();
            this.onValueChangeEvent.fire(new Context.SliderValueChangeContext(oldValue, newValue));
        }

        public destroy = (event?: Event): void => {
            window.removeEventListener("mouseup", this.events.mouseup, false);
            window.removeEventListener("touchend", this.events.touchend, false);
            window.removeEventListener("load", this.events.load);
            window.removeEventListener("resize", this.events.resize);
            window.removeEventListener("mousemove", this.events.mousemove, true);
            window.removeEventListener("touchmove", this.events.touchmove, true);
        }

        private bootstrapSliderToTemplate(): void {
            this.element = (this.options.template as HTMLElement).cloneNode(true) as HTMLElement;

            this.sliderElement = this.findElementInSlider("slider-control-template");
            this.handleElement = this.findElementInSlider("slider-handle-template");
            this.sliderLineStart = this.findElementInSlider("slider-control-start-template");
            this.sliderLineEnd = this.findElementInSlider("slider-control-end-template");
            this.valueContainerElement = this.findElementInSlider("slider-value-container-template", false);
        }

        private findElementInSlider(className: string, required = true): HTMLElement {
            let found = this.element.getElementsByClassName(className);
            if (found.length > 0) {
                return found[0] as HTMLElement;
            }

            if (required) {
                throw new Error(`Cannot find DOM element with class: '${className}' in the template.`);
            }

            return undefined;
        }

        private createSliderElement(): void {
            this.element = document.createElement("div");
            this.element.classList.add("slider");

            this.sliderElement = document.createElement("div");
            this.sliderElement.classList.add("slider-control");

            this.sliderLineStart = document.createElement("div");
            this.sliderLineStart.classList.add("slider-control-start");

            this.sliderLineElement = document.createElement("div");
            this.sliderLineElement.classList.add("slider-control-line");

            this.sliderLineEnd = document.createElement("div");
            this.sliderLineEnd.classList.add("slider-control-end");

            this.handleElement = document.createElement("div");
            this.handleElement.classList.add("slider-handle");

            this.valueContainerElement = document.createElement("div");
            this.valueContainerElement.classList.add("slider-value-container");

            this.element.appendChild(this.valueContainerElement);

            this.sliderElement.appendChild(this.sliderLineStart);
            this.sliderElement.appendChild(this.sliderLineElement);
            this.sliderElement.appendChild(this.sliderLineEnd);
            this.sliderElement.appendChild(this.handleElement);
            this.element.appendChild(this.sliderElement);
        }

        private registerListeners(): void {
            this.handleElement.addEventListener("mousedown", this.events.mousedown, false);
            this.handleElement.addEventListener("touchstart", this.events.touchstart, false);

            window.addEventListener("load", this.events.load);
            window.addEventListener("resize", this.events.resize);
        }

        private handleMouseDown = (e: MouseEvent | TouchEvent): void => {
            // prevent default: for example to disable the default image dragging
            e.preventDefault();
            window.addEventListener("touchmove", this.events.touchmove, true);
            window.addEventListener("mousemove", this.events.mousemove, true);

            window.addEventListener("mouseup", this.events.mouseup, false);
            window.addEventListener("touchend", this.events.touchend, false);
        }

        private handleMouseUp = (e: MouseEvent | TouchEvent): void => {
            window.removeEventListener("touchmove", this.events.touchmove, true);
            window.removeEventListener("mousemove", this.events.mousemove, true);

            window.removeEventListener("mouseup", this.events.mouseup, false);
            window.removeEventListener("touchend", this.events.touchend, false);
        }

        private handleMouseMove = (e: MouseEvent | TouchEvent): void => {
            // prevent default: for example to disable the default image dragging
            e.preventDefault();
            let pointEvent = (typeof (e as MouseEvent).screenX !== "undefined")
                ? e as MouseEvent
                : (e as TouchEvent).targetTouches[0];

            let position = {
                x: pointEvent.screenX,
                y: pointEvent.screenY,
            };

            // this.handleElement.style.left = pointer.x + "px";
            // this.handleElement.style.top = pointer.y + "px";
            // this.setValue(5);
        }

        private updateValueDisplay = (): void => {
            if (this.valueContainerElement) {
                this.valueContainerElement.innerText = this.range.value.toString();
            }
        }

        private updateHandlePosition = (): void => {
            let position = this.calculateHandlePosition();
            this.handleElement.style.position = "absolute";
            this.handleElement.style.left = position.x + "px";
            this.handleElement.style.top = position.y + "px";
        }

        private calculateHandlePosition(): { x: number, y: number } {
            // calculates the center of an absolute positioned element
            let calculateCenterPosition = (element: HTMLElement): { x: number, y: number } => {
                return {
                    x: element.offsetLeft
                     + element.offsetWidth / 2,
                    y: element.offsetTop
                     + element.offsetHeight / 2,
                };
            };

            let ratioInSlider = this.range.ratio;
            let startPosition = calculateCenterPosition(this.sliderLineStart);
            let endPosition = calculateCenterPosition(this.sliderLineEnd);

            // start the handle at the start
            // the handle's center should be at the start, so it needs an adjustment
            // finally, calculate the handle's position in the line by it's range value (min: 0% -> max: 100%)
            return {
                x: startPosition.x
                 - this.handleElement.offsetWidth / 2
                 + (endPosition.x - startPosition.x) * ratioInSlider,
                y: startPosition.y
                 - this.handleElement.offsetHeight / 2
                 + (endPosition.y - startPosition.y) * ratioInSlider,
            };
        }
    }
}
