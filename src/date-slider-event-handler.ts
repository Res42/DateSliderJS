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
            if ((typeof index !== "undefined" || index !== null) && 0 <= index && index < this.events.length) {
                this.events.splice(index, 0, handler);
            } else {
                this.events.push(handler);
            }
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
