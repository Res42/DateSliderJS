module DateSlider.Slider {
    export class SliderInstance {
        public element: HTMLDivElement;
        private sliderElement: HTMLDivElement;
        private sliderLineElement: HTMLDivElement;
        private handleElement: HTMLDivElement;

        private range: SliderRange;

        private onValueChangeEvent = new DateSliderEventHandler();

        public static createAll(options: DateSliderOptions): SliderInstance[] {
            if (!options.sliders) {
                throw new Error("Cannot create sliders because options.sliders is not set.");
            }
            let sliders: SliderInstance[] = [];
            for (let sliderOptions of options.sliders) {
                sliders.push(new SliderInstance(sliderOptions));
            }
            return sliders;
        }

        constructor(
            private options: SliderOptions,
        ) {
            this.onValueChangeEvent.register(options.callback.onValueChanged);

            switch (this.options.type) {
                case "month":
                    this.range = new SliderRange(1, 12);
                    break;
            }

            this.onValueChangeEvent.fire(new Context.SliderValueChangeContext(null, this.range.getValue));

            this.createSliderElement();
            this.registerHandleListeners();
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

        private createSliderElement(): void {
            this.element = document.createElement("div");
            this.element.classList.add("slider");

            this.sliderElement = document.createElement("div");
            this.sliderElement.classList.add("slider-control");

            this.sliderLineElement = document.createElement("div");
            this.sliderLineElement.classList.add("slider-control-line");

            this.handleElement = document.createElement("div");
            this.handleElement.classList.add("slider-handle");
            window.addEventListener("load", () => {
                this.updateHandlePosition();
            });
            window.addEventListener("resize", () => {
                this.updateHandlePosition();
            });

            this.sliderElement.appendChild(this.sliderLineElement);
            this.sliderElement.appendChild(this.handleElement);
            this.element.appendChild(this.sliderElement);
        }

        private registerHandleListeners(): void {
            this.handleElement.addEventListener("mousedown", this.handleMouseDown, false);
            window.addEventListener("mouseup", this.handleMouseUp, false);
        }

        private handleMouseDown = (): void => {
            window.addEventListener("mousemove", this.handleMouseMove, true);
        }

        private handleMouseUp = (): void => {
            window.removeEventListener("mousemove", this.handleMouseMove, true);
        }

        private handleMouseMove = (): void => {
            // TODO
        }

        private updateHandlePosition(): void {
            this.handleElement.style.left  = this.calculateHandlePosition() + "px";
        }

        private calculateHandlePosition(): number {
            let ratioInSlider = this.range.getRatio();
            let leftOffset = this.sliderLineElement.offsetLeft                   // start the handle at the start of the line
                           - this.handleElement.offsetWidth / 2                  // but the handle's center should be at the start of the line
                           + this.sliderLineElement.offsetWidth * ratioInSlider; // the handle's position on the line by value (min: 0% -> max: 100%)
            return leftOffset;
        }
    }
}
