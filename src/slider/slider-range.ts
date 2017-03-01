module DateSlider.Slider {
    export class SliderRange {
        public get getValue() { return this.value; };
        public get getMinimum() { return this.minimum; };
        public get getMaximum() { return this.maximum; };

        constructor(
            private minimum: number,
            private maximum: number,
            private value?: number,
        ) {
            if (typeof value === "undefined" || value === null) {
                this.value = this.minimum;
            }
        }

        public getRatio() {
            return (this.value - this.minimum) / (this.maximum - this.minimum);
        }

        public setValue(value: number) {
            if (typeof value !== "number") {
                throw new Error("SliderRange.setValue(value): value is not a number");
            }

            if (value < this.minimum) {
                this.value = this.minimum;
            } else if (value > this.maximum) {
                this.value = this.maximum;
            } else {
                this.value = value;
            }
        }

        public increment(by = 1): void {
            if (typeof by !== "number") {
                throw new Error("SliderRange.increment(by): by is not a number");
            }

            if (this.value + by <= this.maximum) {
                this.value += by;
            } else {
                this.value = this.maximum;
            }
        }

        public decrement(by = 1) {
            if (typeof by !== "number") {
                throw new Error("SliderRange.decrement(by): by is not a number");
            }

            if (this.value - by >= this.minimum) {
                this.value -= by;
            } else {
                this.value = this.minimum;
            }
        }
    }
}
