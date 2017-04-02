module DateSlider.Slider {
    export class SliderRange {
        constructor(
            private _minimum: number,
            private _maximum: number,
            private _value?: number,
        ) {
            if (this._minimum === this._maximum) {
                throw new Error("Range minimum cannot be equal to the maximum.");
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

            if (value < this._minimum) {
                this._value = this._minimum;
            } else if (value > this._maximum) {
                this._value = this._maximum;
            } else {
                this._value = value;
            }
        }

        public increment(by = 1): void {
            if (typeof by !== "number") {
                throw new Error("SliderRange.increment(by): by is not a number");
            }

            if (this._value + by <= this._maximum) {
                this._value += by;
            } else {
                this._value = this._maximum;
            }
        }

        public decrement(by = 1) {
            if (typeof by !== "number") {
                throw new Error("SliderRange.decrement(by): by is not a number");
            }

            if (this._value - by >= this._minimum) {
                this._value -= by;
            } else {
                this._value = this._minimum;
            }
        }

        public expandMaximum(by = 1): void {
            if (by < 0) {
                throw new Error("Cannot expand by negative values.");
            }

            if (this._value === this._maximum) {
                this._maximum += by;
                this._value += by;
                return;
            }

            this._maximum += by;
            this._minimum += by * ((this._value - this._minimum) / (this._value - this._maximum));
        }

        public expandMinimum(by = -1): void {
            if (by > 0) {
                throw new Error("Cannot expand minimum with positive values.");
            }

            if (this._value === this._minimum) {
                this._minimum += by;
                this._value += by;
                return;
            }

            this._minimum += by;
            this._maximum += by * ((this._value - this._maximum) / (this._value - this._minimum));
        }

        public slide(by = 1): void {
            if (typeof by !== "number") {
                throw new Error("Cannot slide with non-number.");
            }

            if (by < 0) {
                this._minimum -= by;
                this._maximum -= by;
                if (this._value > this._maximum) {
                    this._value = this._maximum;
                }
            }

            if (by > 0) {
                this._maximum += by;
                this._minimum += by;
                if (this._value < this._minimum) {
                    this._value = this._minimum;
                }
            }
        }
    }
}
