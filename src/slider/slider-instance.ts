module DateSlider.Slider {
    export class SliderInstance {
        public element: HTMLElement;
        private sliderElement: HTMLElement;
        private sliderLineStart: HTMLElement;
        private sliderLineElement?: HTMLDivElement;
        private sliderLineEnd: HTMLElement;
        private handleElement: HTMLElement;
        private valueContainerElement?: HTMLElement;
        // private markerContainerElement?: HTMLElement;
        private markerElement?: HTMLElement;
        private markers: Array<{ element: HTMLElement, valueContainers: NodeListOf<HTMLElement>, value: number }>;

        private toDiscrete = Math.round;

        private onValueChangeEvent = new DateSliderEventHandler();
        private onSliderHandleGrabEvent = new DateSliderEventHandler();
        private onSliderHandleReleaseEvent = new DateSliderEventHandler();
        private onSliderHandleMoveEvent = new DateSliderEventHandler();

        private events = {
            load: () => { this.updateHandlePosition(); this.updateValueDisplay(); this.createMarkers(); this.updateMarkersPosition(); },
            mousedown: (e: MouseEvent) => this.handleMouseDown(e),
            mousemove: (e: MouseEvent) => this.handleMouseMove(e),
            mouseup: (e: MouseEvent) => this.handleMouseUp(e),
            resize: () => { this.updateHandlePosition(); this.updateMarkersPosition(); },
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
                    // 24 * 60 * 60 - 1
                    return new SliderRange(0, 86399);
                default:
                    throw new Error("SliderOptions.type is not valid.");
            }
        }

        constructor(
            public options: SliderOptions,
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

        public on(eventName: SliderEvent, callback: (context: DateSliderEventContext) => void): void {
            switch (eventName) {
                case "onValueChanged":
                    this.onValueChangeEvent.register(callback);
                    break;
                case "onSliderBoxGrabbed":
                    this.onSliderHandleGrabEvent.register(callback);
                    break;
                case "onSliderBoxMoved":
                    this.onSliderHandleMoveEvent.register(callback);
                    break;
                case "onSliderBoxReleased":
                    this.onSliderHandleReleaseEvent.register(callback);
                    break;
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
            // TODO?: multiple value containers? use same class in template and normal?
            this.valueContainerElement = this.findElementInSlider("slider-value-container-template", false);
            this.markerElement = this.findElementInSlider("slider-marker-template", false);
            this.markerElement.remove();
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

            // value display
            this.valueContainerElement = document.createElement("div");
            this.valueContainerElement.classList.add("slider-value-container");
            this.element.appendChild(this.valueContainerElement);

            // value marker
            this.markerElement = document.createElement("div");
            this.markerElement.classList.add("slider-marker");

            let valueContainer = document.createElement("div");
            valueContainer.classList.add(Constants.SliderMarkerValueContainer);
            this.markerElement.appendChild(valueContainer);

            let marker = document.createElement("div");
            marker.classList.add("marker-mark");
            this.markerElement.appendChild(marker);

            // slider
            this.sliderElement = document.createElement("div");
            this.sliderElement.classList.add("slider-control");
            this.element.appendChild(this.sliderElement);

            this.sliderLineStart = document.createElement("div");
            this.sliderLineStart.classList.add("slider-control-start");
            this.sliderElement.appendChild(this.sliderLineStart);

            this.sliderLineElement = document.createElement("div");
            this.sliderLineElement.classList.add("slider-control-line");
            this.sliderElement.appendChild(this.sliderLineElement);

            this.sliderLineEnd = document.createElement("div");
            this.sliderLineEnd.classList.add("slider-control-end");
            this.sliderElement.appendChild(this.sliderLineEnd);

            this.handleElement = document.createElement("div");
            this.handleElement.classList.add("slider-handle");
            this.sliderElement.appendChild(this.handleElement);
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

        private createMarkers() {
            if (this.markerElement && this.options.markers && this.options.markers.showValueMarker) {

                if (this.markers) {
                    for (let marker of this.markers) {
                        marker.element.remove();
                    }
                }
                this.markers = [];

                for (let v = this.range.minimum; v <= this.range.maximum; v++) {
                    let classNames = this.options.markers.showValueMarker(v, this.range.minimum, this.range.maximum);
                    if (classNames !== null) {
                        let marker = this.markerElement.cloneNode(true) as HTMLElement;

                        if (typeof classNames === "string") {
                            marker.classList.add(classNames);
                        } else {
                            marker.classList.add(...classNames);
                        }

                        let valueContainers = marker.getElementsByClassName(Constants.SliderMarkerValueContainer) as NodeListOf<HTMLElement>;
                        this.markers.push({ element: marker, valueContainers: valueContainers, value: v });
                        this.sliderElement.appendChild(marker);

                        this.updateMarkerValue(this.markers[this.markers.length - 1]);
                    }
                }

                this.sliderElement.style.overflow = "hidden";
            }
        }

        private updateMarkerValue(marker: { element: HTMLElement, valueContainers: NodeListOf<HTMLElement>, value: number }): void {
            let text: string;
            if (this.options.markers.displayValueFormatter) {
                text = this.options.markers.displayValueFormatter(marker.value, this.range.minimum, this.range.maximum);
            } else if (this.options.displayValueFormatter) {
                text = this.options.displayValueFormatter(marker.value);
            } else {
                text = marker.value.toString();
            }

            for (let i = 0; i < marker.valueContainers.length; i++) {
                let container = marker.valueContainers.item(i);
                container.innerHTML = text;
            }
        }

        private updateMarkersPosition(): void {
            if (!this.markers || this.markers.length <= 0) {
                return;
            }

            let startCenter = this.calculateCenterPosition(this.sliderLineStart);
            let endCenter = this.calculateCenterPosition(this.sliderLineEnd);

            let se = endCenter.substract(startCenter);

            // with this length, if the overflow is set to hidden,
            // then the first marker's start will be at the beginning of the slider
            // and the last marker's start will be at the end of the slider
            let markerLength = se.length() / (this.markers.length - 1);
            // offset the markers, so the first marker's CENTER will be at the beginning of the slider
            //                    and the last  marker's CENTER will be at the end of the slider
            let xOffset = se.normalize().multiply(markerLength / 2);
            for (let marker of this.markers) {
                let markerRatio = (marker.value - this.range.minimum) / (this.range.maximum - this.range.minimum);
                let markerYPosition = startCenter.add(se.multiply(markerRatio).add(se.normalize().perpendicularCounterClockwise().multiply(this.options.markers.perpendicularOffset || 0)));
                let markerXPosition = markerYPosition.substract(xOffset);

                marker.element.style.width = `${markerLength.toFixed(2)}px`;
                marker.element.style.position = "absolute";
                marker.element.style.top = `${(markerYPosition.y - marker.element.scrollHeight).toFixed(2)}px`;
                marker.element.style.left = `${markerXPosition.x.toFixed(2)}px`;
            }
        }

        private updateValueDisplay = (): void => {
            if (this.valueContainerElement) {
                let value = this.getValue();
                let displayedValue = this.options.displayValueFormatter
                    ? this.options.displayValueFormatter(value)
                    : value.toString();
                this.valueContainerElement.innerHTML = displayedValue;
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
