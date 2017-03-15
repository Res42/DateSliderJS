module DateSlider {
    export class DateSliderHelpers {
        /**
         * Registers a listener to the element's destroy.
         * @param element The element whose destroy event should be watched.
         * @param callback A callback method with an optional event parameter.
         * The parameter is an Event, if the 'DOMNodeRemoved' event was caught.
         * The parameter is undefined if a MutationObserver was used to watch the element's destroy event.
         */
        public static registerOnDestroy(element: HTMLElement, callback: (event?: Event) => void): void {
            if ((window as Window & { MutationObserver?: any}).MutationObserver && element.parentElement) {
                let observer = new MutationObserver((mutations) => {
                    let isTargetRemoved = mutations.some((mutation) => {
                        for (let i = 0; i < mutation.removedNodes.length; i++) {
                            if (mutation.removedNodes[i] === element) {
                                return true;
                            }
                        }
                        return false;
                    });
                    if (isTargetRemoved) {
                        callback();
                        observer.disconnect();
                    }
                });

                observer.observe(element.parentNode, { childList: true, subtree: true });
            } else {
                element.addEventListener("DOMNodeRemoved", (event) => callback(event), false);
            }
        }
    }
}
