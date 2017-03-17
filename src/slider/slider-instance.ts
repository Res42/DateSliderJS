module DateSlider.Slider {
    export class SliderInstance {
        public element: HTMLElement;
        private sliderElement: HTMLElement;
        private sliderLineStart: HTMLElement;
        private sliderLineElement?: HTMLDivElement;
        private sliderLineEnd: HTMLElement;
        private handleElement: HTMLElement;
        private valueContainerElement?: HTMLElement;

        private toDiscrete = Math.round;

        private onValueChangeEvent = new DateSliderEventHandler();
        private onSliderHandleGrabEvent = new DateSliderEventHandler();
        private onSliderHandleReleaseEvent = new DateSliderEventHandler();
        private onSliderHandleMoveEvent = new DateSliderEventHandler();

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
                case "year":
                    // TODO
                    return new SliderRange(1, 12);
                case "month":
                    return new SliderRange(1, 12);
                case "day":
                    return new SliderRange(1, 31);
                case "hour":
                    return new SliderRange(0, 23);
                case "minute":
                case "second":
                    return new SliderRange(0, 59);
                case "universal":
                    // TODO
                    return new SliderRange(1, 12);
                case "universal-date":
                    // TODO
                    return new SliderRange(1, 12);
                case "universal-time":
                    // 24 * 60 * 60 -1
                    return new SliderRange(0, 86399);
                default:
                    throw new Error("SliderOptions.type is not valid.");
            }
        }

        constructor(
            private options: SliderOptions,
            private range: SliderRange,
        ) {
            if (options.callback) {
                this.onValueChangeEvent.register(options.callback.onValueChanged);
                this.onSliderHandleGrabEvent.register(options.callback.onSliderHandleGrabbed);
                this.onSliderHandleMoveEvent.register(options.callback.onSliderHandleMoved);
                this.onSliderHandleReleaseEvent.register(options.callback.onSliderHandleReleased);
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
            return this.toDiscrete(this.range.value);
        }

        public setValue(value: number): void {
            let oldValue = this.toDiscrete(this.range.value);
            this.range.value = value;
            let newValue = this.toDiscrete(this.range.value);
            this.updateValueDisplay();
            this.updateHandlePosition();
            if (oldValue !== newValue) {
                this.onValueChangeEvent.fire(new Context.SliderValueChangeContext(oldValue, newValue));
            }
        }

        public destroy = (event?: Event): void => {
            window.removeEventListener("load", this.events.load);
            window.removeEventListener("resize", this.events.resize);
            this.removeMovementListeners();
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

            return null;
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
            this.handleElement.addEventListener("touchstart", this.events.touchstart, true);

            window.addEventListener("load", this.events.load);
            window.addEventListener("resize", this.events.resize);
        }

        private addMovementListeners(): void {
            window.addEventListener("touchmove", this.events.touchmove, true);
            window.addEventListener("mousemove", this.events.mousemove, true);

            window.addEventListener("mouseup", this.events.mouseup, false);
            window.addEventListener("touchend", this.events.touchend, false);
        }

        private removeMovementListeners(): void {
            window.removeEventListener("touchmove", this.events.touchmove, true);
            window.removeEventListener("mousemove", this.events.mousemove, true);

            window.removeEventListener("mouseup", this.events.mouseup, false);
            window.removeEventListener("touchend", this.events.touchend, false);
        }

        private handleMouseDown = (e: MouseEvent | TouchEvent): void => {
            // only move handler with the left mouse button
            if (this.isHandleReleased(e)) {
                return;
            }

            e.preventDefault();
            this.addMovementListeners();
            this.onSliderHandleGrabEvent.fire(null);
        }

        private handleMouseUp = (e: MouseEvent | TouchEvent): void => {
            let position = this.getPositionFromEvent(e);
            this.setValue(this.toDiscrete(this.calculateValue(position)));

            this.removeMovementListeners();
            this.onSliderHandleReleaseEvent.fire(null);
        }

        private handleMouseMove = (e: MouseEvent | TouchEvent): void => {
            if (e instanceof MouseEvent) {
                // prevent default: for example to disable the default image dragging
                e.preventDefault();
            }

            if (this.isHandleReleased(e)) {
                this.removeMovementListeners();
                return;
            }

            let position = this.getPositionFromEvent(e);
            this.setValue(this.calculateValue(position));

            this.onSliderHandleMoveEvent.fire(null);
        }

        private isHandleReleased(e: MouseEvent | TouchEvent): boolean {
                   // no touches
            return e instanceof TouchEvent && e.targetTouches.length <= 0
                   // not holding the left button
                || e instanceof MouseEvent && (1 & e.buttons) !== 1;
        }

        private updateValueDisplay = (): void => {
            if (this.valueContainerElement) {
                let value = this.getValue();
                let displayedValue = this.options.displayValueFormatter
                                     ? this.options.displayValueFormatter(value)
                                     : value.toString();
                this.valueContainerElement.innerText = displayedValue;
            }
        }

        private updateHandlePosition = (): void => {
            let position = this.calculateHandlePosition();
            this.handleElement.style.position = "absolute";
            this.handleElement.style.left = position.x + "px";
            this.handleElement.style.top = position.y + "px";
        }

        private getPositionFromEvent(e: MouseEvent | TouchEvent): Vector {
            if (e instanceof MouseEvent) {
                return new Vector(e.clientX, e.clientY);
            } else if (e instanceof TouchEvent) {
                return new Vector(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
            }

            throw new Error("Cannot extract position from event.");
        }

        private calculateValue(position: Vector) {
            let r = this.calculateOrthogonalProjectionRatio(position);
            return (this.range.maximum - this.range.minimum) * r.ratio + this.range.minimum;
        }

        private calculateOrthogonalProjectionRatio(position: Vector): { ratio: number, distance: number } {
            // the ratio of the projection of the s->p vector on the s->e vector
            // imagine that the /'s are orthogonal to the slider line
            // |---------->
            // |
            // |   s       slider start
            // |  / \
            // | .   \a    s->a is the projection
            // |  \  /\
            // |    p  \   p is the position of the mouse / touch
            // V        e  slider end
            let start = this.sliderLineStart.getBoundingClientRect();
            let end = this.sliderLineEnd.getBoundingClientRect();
            let startCenter = this.calculateCenterPosition(start);
            let endCenter = this.calculateCenterPosition(end);

            let sp = position.substract(startCenter);
            let se = endCenter.substract(startCenter);

            let othogonalProjectionRatio = sp.dot(se) / se.dot(se);
            return {
                distance: sp.substract(se.multiply(othogonalProjectionRatio)).length(),
                ratio: othogonalProjectionRatio,
            };
        }

        private calculateHandlePosition(): Vector {
            // calculates the center of an absolute positioned element

            let ratioInSlider = this.range.ratio;
            let startPosition = this.calculateCenterPosition(this.sliderLineStart);
            let endPosition = this.calculateCenterPosition(this.sliderLineEnd);

            // start the handle at the start
            // the handle's center should be at the start, so it needs an adjustment
            // finally, calculate the handle's position in the line by it's range value (min: 0% -> max: 100%)
            return new Vector(startPosition.x - this.handleElement.offsetWidth / 2 + (endPosition.x - startPosition.x) * ratioInSlider,
                              startPosition.y - this.handleElement.offsetHeight / 2 + (endPosition.y - startPosition.y) * ratioInSlider);
        }

        private calculateCenterPosition(element: HTMLElement | ClientRect): Vector {
            if (element instanceof HTMLElement) {
                return new Vector(element.offsetLeft + element.offsetWidth / 2,
                                  element.offsetTop + element.offsetHeight / 2);
            } else if (element instanceof ClientRect) {
                return new Vector(element.left + element.width / 2,
                                  element.top + element.height / 2);
            }
            throw new Error("Invalid parameter.");
        }
    }
}
