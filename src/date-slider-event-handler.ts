module DateSlider {
    export class DateSliderEventHandler {
        private events: ((context: DateSliderEventContext) => void)[] = [];

        public register(handler: (context: DateSliderEventContext) => void, index?: number): void {
            if (!handler) {
                return;
            }

            if (typeof handler !== "function") {
                throw new Error("DateSliderEventHandler.register(): handler is not given or not a function.");
            }
            if (Helpers.isSet(index) && 0 <= index && index < this.events.length) {
                this.events.splice(index, 0, handler);
            } else {
                this.events.push(handler);
            }
        }

        public remove(handler: (context: DateSliderEventContext) => void): void {
            if (!handler) {
                return;
            }

            this.events = this.events.filter((e) => e !== handler);
        }

        public fire(context: DateSliderEventContext): void {
            for (let callback of this.events) {
                callback(context);
                if (context.isPropagationStopped) {
                    break;
                }
            }
        }
    }
}
