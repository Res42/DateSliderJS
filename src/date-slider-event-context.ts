module DateSlider {
    export class DateSliderEventContext {
        private _isPropagationStopped = false;

        public get isPropagationStopped() {
            return this._isPropagationStopped;
        }

        public stopPropagation(): void {
            this._isPropagationStopped = true;
        }
    }
}
