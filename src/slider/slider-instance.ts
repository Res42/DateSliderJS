module DateSlider.Slider {
    export function create(dateSlider: DateSliderInstance, options: SliderOptions, range: SliderRange) {
        switch (options.movement) {
            default:
            case "none":
                return new Slider.SliderInstance(dateSlider, options, range);
            case "slide":
                return new Slider.SliderSlidingInstance(dateSlider, options, range);
        }
    };

    export class SliderInstance {
        public element: HTMLElement;
        protected sliderElement: HTMLElement;
        protected sliderLineStart: HTMLElement;
        protected sliderLineElement?: HTMLDivElement;
        protected sliderLineEnd: HTMLElement;
        protected handleElement: HTMLElement;
        protected valueContainerElement?: HTMLElement;
        protected markerElement?: HTMLElement;
        protected markers: Array<{ element: HTMLElement, valueContainers: NodeListOf<HTMLElement>, value: number }>;

        protected toDiscrete = Math.round;
        protected lastPointerPosition: Vector;
        protected isDragging = false;

        protected onValueChangeEvent = new DateSliderEventHandler();
        protected onSliderHandleGrabEvent = new DateSliderEventHandler();
        protected onSliderHandleReleaseEvent = new DateSliderEventHandler();
        protected onSliderHandleMoveEvent = new DateSliderEventHandler();

        protected events = {
            load: () => { this.updateHandlePosition(); this.updateValueDisplay(); this.createMarkers(); this.updateMarkersPosition(); },
            mousedown: (e: MouseEvent) => this.handleMouseDown(e),
            mousemove: (e: MouseEvent) => this.handleMouseMove(e),
            mouseup: (e: MouseEvent) => this.handleMouseUp(e),
            resize: () => { this.updateHandlePosition(); this.updateMarkersPosition(); },
            touchend: (e: TouchEvent) => this.handleMouseUp(e),
            touchmove: (e: TouchEvent) => this.handleMouseMove(e),
            touchstart: (e: TouchEvent) => this.handleMouseDown(e),
        };

        constructor(
            public dateSlider: DateSliderInstance,
            public options: SliderOptions,
            public range: SliderRange,
        ) {
            if (options.callback) {
                this.onValueChangeEvent.register(options.callback.onValueChanged);
                this.onSliderHandleGrabEvent.register(options.callback.onSliderHandleGrabbed);
                this.onSliderHandleMoveEvent.register(options.callback.onSliderHandleMoved);
                this.onSliderHandleReleaseEvent.register(options.callback.onSliderHandleReleased);
            }

            if (this.options.template instanceof HTMLElement) {
                this.bootstrapSliderToTemplate();
            } else {
                this.createSliderElement();
            }

            this.registerListeners();

            this.onValueChangeEvent.fire(new Context.SliderValueChangeContext(null, this.range.value));
        }

        public getValue(): number {
            return this.toDiscrete(this.range.value);
        }

        public updateValue(value: number): void {
            this.updateAfter(() => {
                this.range.value = value;
            });
        }

        public updateValueWithMaximum(value: number, maximum: number): void {
            this.updateAfter(() => {
                this.range.maximum = maximum;
                this.range.value = value;
            });
            this.createMarkers();
            this.updateMarkersPosition();
        }

        public setMininum(minimum: number): void {
            this.updateAfter(() => {
                this.range.minimum = minimum;
            });
            this.createMarkers();
            this.updateMarkersPosition();
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

        public destroy(event?: Event): void {
            window.removeEventListener("load", this.events.load);
            window.removeEventListener("resize", this.events.resize);
            this.removeMovementListeners();
        }

        protected setValue(value: number): void {
            let values = this.updateAfter(() => {
                this.range.value = value;
            });
            this.dateSlider.updateFromSlider(this.options.type, values.newValue, values.oldValue);
        }

        protected updateAfter(callback: () => void) {
            let oldValue = this.toDiscrete(this.range.value);
            callback();
            let newValue = this.toDiscrete(this.range.value);
            this.updateValueDisplay();
            this.updateHandlePosition();
            this.onValueChangeEvent.fire(new Context.SliderValueChangeContext(oldValue, newValue));
            return {oldValue: oldValue, newValue: newValue};
        }

        protected createMarkers() {
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

                        if (typeof classNames === "string" && classNames.length > 0) {
                            marker.classList.add(classNames);
                        } else if (classNames instanceof Array) {
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

        protected updateMarkerValue(marker: { element: HTMLElement, valueContainers: NodeListOf<HTMLElement>, value: number }): void {
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

        protected bootstrapSliderToTemplate(): void {
            this.element = (this.options.template as HTMLElement).cloneNode(true) as HTMLElement;

            this.sliderElement = Helpers.findChildWithClass(this.element, "slider-control-template");
            this.handleElement = Helpers.findChildWithClass(this.element, "slider-handle-template");
            this.sliderLineStart = Helpers.findChildWithClass(this.element, "slider-control-start-template");
            this.sliderLineEnd = Helpers.findChildWithClass(this.element, "slider-control-end-template");
            // TODO?: multiple value containers? use same class in template and normal?
            this.valueContainerElement = Helpers.findChildWithClass(this.element, "slider-value-container-template", false);
            this.markerElement = Helpers.findChildWithClass(this.element, "slider-marker-template", false);
            this.markerElement.remove();
        }

        protected createSliderElement(): void {
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

        protected registerListeners(): void {
            this.handleElement.addEventListener("mousedown", this.events.mousedown, false);
            this.handleElement.addEventListener("touchstart", this.events.touchstart, true);

            window.addEventListener("load", this.events.load);
            window.addEventListener("resize", this.events.resize);
        }

        protected addMovementListeners(): void {
            window.addEventListener("touchmove", this.events.touchmove, true);
            window.addEventListener("mousemove", this.events.mousemove, true);

            window.addEventListener("mouseup", this.events.mouseup, false);
            window.addEventListener("touchend", this.events.touchend, false);
        }

        protected removeMovementListeners(): void {
            window.removeEventListener("touchmove", this.events.touchmove, true);
            window.removeEventListener("mousemove", this.events.mousemove, true);

            window.removeEventListener("mouseup", this.events.mouseup, false);
            window.removeEventListener("touchend", this.events.touchend, false);
        }

        protected handleMouseDown = (e: MouseEvent | TouchEvent): void => {
            // only move handler with the left mouse button
            if (this.isHandleReleased(e)) {
                this.isDragging = false;
                return;
            }

            e.preventDefault();

            this.lastPointerPosition = Helpers.getPositionFromEvent(e);
            this.isDragging = true;

            this.addMovementListeners();
            this.onSliderHandleGrabEvent.fire(new DateSliderEventContext());
        }

        protected handleMouseUp = (e: MouseEvent | TouchEvent): void => {
            this.isDragging = false;
            this.lastPointerPosition = Helpers.getPositionFromEvent(e);
            this.setValue(this.toDiscrete(this.calculateValue(this.lastPointerPosition)));

            this.removeMovementListeners();
            this.onSliderHandleReleaseEvent.fire(new DateSliderEventContext());
        }

        protected handleMouseMove = (e: MouseEvent | TouchEvent): void => {
            if (e instanceof MouseEvent) {
                // prevent default: for example to disable the default image dragging
                e.preventDefault();
            }

            if (this.isHandleReleased(e)) {
                this.removeMovementListeners();
                this.isDragging = false;
                return;
            }

            this.lastPointerPosition = Helpers.getPositionFromEvent(e);
            this.setValue(this.calculateValue(this.lastPointerPosition));

            this.onSliderHandleMoveEvent.fire(new DateSliderEventContext());
        }

        protected isHandleReleased(e: MouseEvent | TouchEvent): boolean {
            // no touches
            return e instanceof TouchEvent && e.targetTouches.length <= 0
                // not holding the left button
                || e instanceof MouseEvent && (1 & e.buttons) !== 1;
        }

        protected updateMarkersPosition(): void {
            if (!this.markers || this.markers.length <= 0) {
                return;
            }

            let startCenter = Helpers.calculateCenterPosition(this.sliderLineStart);
            let endCenter = Helpers.calculateCenterPosition(this.sliderLineEnd);

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

        protected updateValueDisplay = (): void => {
            if (this.valueContainerElement) {
                let value = this.getValue();
                let displayedValue = this.options.displayValueFormatter
                    ? this.options.displayValueFormatter(value)
                    : value.toString();
                this.valueContainerElement.innerHTML = displayedValue;
            }
        }

        protected updateHandlePosition = (): void => {
            let position = this.calculateHandlePosition();
            this.handleElement.style.position = "absolute";
            this.handleElement.style.left = position.x + "px";
            this.handleElement.style.top = position.y + "px";
        }

        protected calculateValue(position: Vector) {
            let r = this.calculateOrthogonalProjectionRatio(position);
            return (this.range.maximum - this.range.minimum) * r.ratio + this.range.minimum;
        }

        protected calculateOrthogonalProjectionRatio(position: Vector): { ratio: number, distance: number } {
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
            let startCenter = Helpers.calculateCenterPosition(start);
            let endCenter = Helpers.calculateCenterPosition(end);

            let sp = position.substract(startCenter);
            let se = endCenter.substract(startCenter);

            let othogonalProjectionRatio = sp.dot(se) / se.dot(se);
            return {
                distance: sp.substract(se.multiply(othogonalProjectionRatio)).length(),
                ratio: othogonalProjectionRatio,
            };
        }

        protected calculateHandlePosition(): Vector {
            // calculates the center of an absolute positioned element

            let ratioInSlider = this.range.ratio;
            let startPosition = Helpers.calculateCenterPosition(this.sliderLineStart);
            let endPosition = Helpers.calculateCenterPosition(this.sliderLineEnd);

            // start the handle at the start
            // the handle's center should be at the start, so it needs an adjustment
            // finally, calculate the handle's position in the line by it's range value (min: 0% -> max: 100%)
            return new Vector(startPosition.x - this.handleElement.offsetWidth / 2 + (endPosition.x - startPosition.x) * ratioInSlider,
                startPosition.y - this.handleElement.offsetHeight / 2 + (endPosition.y - startPosition.y) * ratioInSlider);
        }
    }

    export class SliderSlidingInstance extends SliderInstance {
        protected slideIntervalHandle: number;

        constructor(
            dateSlider: DateSliderInstance,
            options: SliderOptions,
            range: SliderRange,
        ) {
            super(dateSlider, options, range);
            this.slideIntervalHandle = window.setInterval(this.sliding, this.options.movementSpeed || 0);
        }

        public destroy(event?: Event): void {
            super.destroy(event);
            window.clearInterval(this.slideIntervalHandle);
        }

        public updateValue(value: number): void {
            this.updateAfter(() => {
                this.range.slideTo(value, false);
            });
            this.createMarkers();
            this.updateMarkersPosition();
        }

        protected sliding = () => {
            let direction: number;
            if (this.range.value === this.range.maximum) {
                direction = 1;
            } else if (this.range.value === this.range.minimum) {
                direction = -1;
            } else {
                direction = 0;
            }

            if (direction !== 0) {
                this.updateAfter(() => {
                    this.range.slide(direction * (this.options.movementStep || 1));
                    if (this.isDragging) {
                        this.range.value = this.calculateValue(this.lastPointerPosition);
                    }
                });
                this.createMarkers();
                this.updateMarkersPosition();
            }
        }
    }
}
