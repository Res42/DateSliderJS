module DateSlider.Slider {
    export class SliderRange {
        constructor(
            private _minimum: number,
            private _maximum: number,
            private _startValue?: number,
            private _endValue?: number,
        ) {
            if (this._minimum === this._maximum) {
                throw new Error("Range minimum cannot be equal to the maximum.");
            }

            if (!Helpers.isSet(this._startValue)) {
                this._startValue = this._minimum;
            }
        }

        public get startRatio() {
            return (this._startValue - this._minimum) / (this._maximum - this._minimum);
        }

        public get endRatio() {
            return (this._endValue - this._minimum) / (this._maximum - this._minimum);
        }

        public get length() {
            return this._maximum - this._minimum;
        }

        public get minimum() { return this._minimum; };

        public set minimum(minimum: number) {
            if (this._maximum <= minimum) {
                throw new Error("Range minimum cannot be >= maximum.");
            }

            if (minimum > this._startValue) {
                this._startValue = minimum;
            }

            if (Helpers.isSet(this._endValue) && minimum > this._endValue) {
                this._endValue = minimum;
            }

            this._minimum = minimum;
        }

        public get maximum() { return this._maximum; };

        public set maximum(maximum: number) {
            if (this._minimum >= maximum) {
                throw new Error("Range maximum cannot be <= minimum.");
            }

            if (maximum < this._startValue) {
                this._startValue = maximum;
            }

            if (Helpers.isSet(this._endValue) && maximum < this._endValue) {
                this._endValue = maximum;
            }

            this._maximum = maximum;
        }

        public get startValue() { return this._startValue; };

        public get endValue() { return this._endValue; };

        public set startValue(startValue: number) {
            if (typeof startValue !== "number") {
                throw new Error("SliderRange.setValue(value): value is not a number.");
            }

            if (startValue < this._minimum) {
                this._startValue = this._minimum;
            } else if (startValue > this._maximum) {
                this._startValue = this._maximum;
            } else {
                this._startValue = startValue;
            }
        }

        public set endValue(endValue: number) {
            if (typeof endValue !== "number") {
                throw new Error("SliderRange.setValue(value): value is not a number.");
            }

            if (endValue < this._minimum) {
                this._endValue = this._minimum;
            } else if (endValue > this._maximum) {
                this._endValue = this._maximum;
            } else {
                this._endValue = endValue;
            }
        }

        // public expandMaximum(by = 1): void {
        //     if (by < 0) {
        //         throw new Error("Cannot expand by negative values.");
        //     }

        //     if (this._value === this._maximum) {
        //         this._maximum += by;
        //         this._value += by;
        //         return;
        //     }

        //     this._maximum += by;
        //     this._minimum += by * ((this._value - this._minimum) / (this._value - this._maximum));
        // }

        // public expandMinimum(by = -1): void {
        //     if (by > 0) {
        //         throw new Error("Cannot expand minimum with positive values.");
        //     }

        //     if (this._value === this._minimum) {
        //         this._minimum += by;
        //         this._value += by;
        //         return;
        //     }

        //     this._minimum += by;
        //     this._maximum += by * ((this._value - this._maximum) / (this._value - this._minimum));
        // }

        public slide(by = 1): void {
            if (typeof by !== "number") {
                throw new Error("Cannot slide with non-number.");
            }

            this._minimum += by;
            this._maximum += by;

            if (by < 0 && this._startValue > this._maximum) {
                this._startValue = this._maximum;
            }

            if (by > 0 && this._startValue < this._minimum) {
                this._startValue = this._minimum;
            }
        }

        public slideTo(target: number, mustSlide = true): void {
            if (typeof target !== "number") {
                throw new Error("Cannot slideTo with non-number.");
            }

            if (!mustSlide && this._minimum <= target && target <= this._maximum) {
                this._startValue = target;
                if (Helpers.isSet(this._endValue)) {
                    this._endValue = target;
                }
                return;
            }

            let distance = this._maximum - this._minimum;

            this._minimum = target - distance / 2;
            this._startValue = target;
            if (Helpers.isSet(this._endValue)) {
                    this._endValue = target;
                }
            this._maximum = target + distance / 2;
        }
    }
}
