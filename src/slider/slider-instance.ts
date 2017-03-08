module DateSlider.Slider {
    export class SliderInstance {
        public element: HTMLElement;
        private sliderElement: HTMLElement;
        private sliderLineStart: HTMLElement;
        private sliderLineElement: HTMLDivElement;
        private sliderLineEnd: HTMLElement;
        private handleElement: HTMLElement;

        private observer?: MutationObserver;

        private onValueChangeEvent = new DateSliderEventHandler();

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

            this.onValueChangeEvent.fire(new Context.SliderValueChangeContext(null, this.range.getValue));

            if (this.options.template instanceof HTMLElement) {
                this.bootstrapSliderToTemplate();
            } else {
                this.createSliderElement();
            }

            this.registerListeners();
        }

        public getValue(): number {
            return this.range.getValue;
        }

        public setValue(value: number): void {
            let oldValue = this.range.getValue;
            this.range.setValue(value);
            let newValue = this.range.getValue;
            this.updateHandlePosition();
            this.onValueChangeEvent.fire(new Context.SliderValueChangeContext(oldValue, newValue));
        }

        private bootstrapSliderToTemplate(): void {
            this.element = (this.options.template as HTMLElement).cloneNode(true) as HTMLElement;

            this.sliderElement = this.findElementInSlider("slider-control-template");
            this.handleElement = this.findElementInSlider("slider-handle-template");
            this.sliderLineStart = this.findElementInSlider("slider-control-start-template");
            this.sliderLineEnd = this.findElementInSlider("slider-control-end-template");
        }

        private findElementInSlider(className: string): HTMLElement {
            let found = this.element.getElementsByClassName(className);
            if (found.length > 0) {
                return found[0] as HTMLElement;
            }
            throw new Error(`Cannot find DOM element with class: '${className}' in the template.`);
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

            this.sliderElement.appendChild(this.sliderLineStart);
            this.sliderElement.appendChild(this.sliderLineElement);
            this.sliderElement.appendChild(this.sliderLineEnd);
            this.sliderElement.appendChild(this.handleElement);
            this.element.appendChild(this.sliderElement);
        }

        private registerListeners(): void {
            this.handleElement.addEventListener("mousedown", this.handleMouseDown, false);
            this.handleElement.addEventListener("touchstart", (e) => {this.handleMouseDown(); e.preventDefault(); }, false);
            window.addEventListener("mouseup", this.handleMouseUp, false);
            window.addEventListener("touchend", (e) => {this.handleMouseUp(); e.preventDefault(); }, false);

            window.addEventListener("load", this.updateHandlePosition);
            window.addEventListener("resize", this.updateHandlePosition);

            if ((window as Window & { MutationObserver?: any}).MutationObserver && this.element.parentNode) {
                this.observer = new MutationObserver((mutations) => {
                    let isTargetRemoved = mutations.some((mutation) => {
                        for (let i = 0; i < mutation.removedNodes.length; i++) {
                            if (mutation.removedNodes[i] === this.element) {
                                return true;
                            }
                        }
                        return false;
                    });
                    if (isTargetRemoved) {
                        this.destroy();
                    }
                });

                this.observer.observe(this.element.parentNode, { childList: true, subtree: true });
            } else {
                this.element.addEventListener("DOMNodeRemoved", this.destroy, false);
            }
        }

        private destroy = (): void => {
            window.removeEventListener("mouseup", this.handleMouseUp, false);
            window.addEventListener("touchend", (e) => {this.handleMouseUp(); e.preventDefault(); }, false);
            window.removeEventListener("load", this.updateHandlePosition);
            window.removeEventListener("resize", this.updateHandlePosition);
            window.removeEventListener("mousemove", this.handleMouseMove, true);
            window.removeEventListener("touchmove", (e) => {this.handleMouseMove(); e.preventDefault(); }, true);
            if (this.observer) {
                this.observer.disconnect();
            }
        }

        private handleMouseDown = (): void => {
            window.addEventListener("touchmove", (e) => {this.handleMouseMove(); e.preventDefault(); }, true);
            window.addEventListener("mousemove", this.handleMouseMove, true);
        }

        private handleMouseUp = (): void => {
            window.removeEventListener("touchmove", (e) => {this.handleMouseMove(); e.preventDefault(); }, true);
            window.removeEventListener("mousemove", this.handleMouseMove, true);
        }

        private handleMouseMove = (): void => {
            // TODO
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

            let ratioInSlider = this.range.getRatio();
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
