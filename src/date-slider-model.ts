module DateSlider {
    export class DateSliderModel {
        constructor(
            public model: InnerModel | null,
            public rawValue: any,
        ) {
        }

        public copy(): DateSliderModel {
            return new DateSliderModel(new InnerModel(this.model.year, this.model.month, this.model.day,
                this.model.hour, this.model.minute, this.model.second , this.model.timezone), this.rawValue);
        }
    }

    export class InnerModel {
        constructor(
            public year = 0,
            /** In the range [1, 12]. */
            public month = 1,
            /** In the range of [1, 31]. */
            public day = 1,
            public hour = 0,
            public minute = 0,
            public second = 0,
            public timezone = "",
        ) {
            this.setDayOfMonth();
        }

        public toDate(): Date {
            return new Date(this.year, this.month - 1, this.day, this.hour, this.minute, this.second);
        }

        public setDayOfMonth() {
            let daysInMonth = Helpers.getDaysInMonth(this.year, this.month);
            if (this.day > daysInMonth) {
                this.day = daysInMonth;
            }
        }

        public greaterThan(other: InnerModel): boolean {
            return this.compare(other, (a, b) => a > b, false);
        }

        public greaterThanOrEqual(other: InnerModel): boolean {
            return this.compare(other, (a, b) => a > b, true);
        }

        public lessThan(other: InnerModel): boolean {
            return this.compare(other, (a, b) => a < b, false);
        }

        public lessThanOrEqual(other: InnerModel): boolean {
            return this.compare(other, (a, b) => a < b, true);
        }

        public equal(other: InnerModel): boolean {
            return this.compare(other, (a, b) => false, true);
        }

        private compare(other: InnerModel, compareMethod: (first: number, second: number) => boolean, equalPermitted: boolean): boolean {
            if (this.year !== other.year) {
                return compareMethod(this.year, other.year);
            }
            if (this.month !== other.month) {
                return compareMethod(this.month, other.month);
            }
            if (this.day !== other.day) {
                return compareMethod(this.day, other.day);
            }
            if (this.hour !== other.hour) {
                return compareMethod(this.hour, other.hour);
            }
            if (this.minute !== other.minute) {
                return compareMethod(this.minute, other.minute);
            }
            if (this.second !== other.second) {
                return compareMethod(this.second, other.second);
            }
            // If the execution reaches this line then the two models are equal.
            return equalPermitted;
        }
    }
}
