module DateSlider {
    export class Helpers {
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

        /**
         * Shallow merges objects to a destination object.
         * Use \{\} as the "to" parameter and add the original object to the "from" parameter if you do not want to modify the original object.
         * @param to The destination object.
         * @param from The objects wose properties will overwrite the properties of the destination object.
         * @returns The merged object.
         */
        public static shallowMerge<T extends { [key: string]: any }, U extends { [key: string]: any }>(to: T, ...from: U[]): T & U {
            for (let f of from) {
                for (let propertyName in f) {
                    if (f.hasOwnProperty(propertyName)) {
                        to[propertyName] = f[propertyName];
                    }
                }
            }

            return to as T & U;
        }

        public static deepMerge<T extends { [key: string]: any }, U extends { [key: string]: any }>(to: T, ...from: U[]): T & U {
            for (let f of from) {
                for (let propertyName in f) {
                    if (f.hasOwnProperty(propertyName)) {
                        if (typeof f[propertyName] === "object") {
                            if (f[propertyName] instanceof Array) {
                                to[propertyName] = new Array();
                                for (let a of f[propertyName]) {
                                    (to[propertyName] as Array<any>).push(Helpers.deepMerge({}, a));
                                }
                            } else if (f[propertyName] instanceof Node) {
                                to[propertyName] = f[propertyName];
                            } else {
                                to[propertyName] = Helpers.deepMerge({}, f[propertyName]);
                            }
                        } else {
                            to[propertyName] = f[propertyName];
                        }
                    }
                }
            }

            return to as T & U;
        }
    }
}
