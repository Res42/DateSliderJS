module DateSlider.Slider {
    export class SliderRange {
        constructor(
            private _minimum: number,
            private _maximum: number,
            private _value?: number,
        ) {
            if (this._minimum === this._maximum) {
                throw new Error("Range minimum cannot be equal as maximum.");
            }

            if (typeof this._value === "undefined" || this._value === null) {
                this._value = this._minimum;
            }
        }

        public get ratio() {
            return (this.value - this.minimum) / (this.maximum - this.minimum);
        }

        public get minimum() { return this._minimum; };

        public set minimum(minimum: number) {
            if (this._maximum <= minimum) {
                throw new Error("Range minimum cannot be >= maximum.");
            }

            if (minimum > this._value) {
                this._value = minimum;
            }

            this._maximum = minimum;
        }

        public get maximum() { return this._maximum; };

        public set maximum(maximum: number) {
            if (this._minimum >= maximum) {
                throw new Error("Range maximum cannot be <= minimum.");
            }

            if (maximum < this._value) {
                this._value = maximum;
            }

            this._maximum = maximum;
        }

        public get value() { return this._value; };

        public set value(value: number) {
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
