module DateSlider {
    export class Constants {
        public static SliderMarkerValueContainer = "marker-value-container";
        /** 86400 = 24 \* 60 \* 60 */
        public static SecondsInDay = 86400;
        /** 86400000 = 24 \* 60 \* 60 \* 1000 */
        public static MillisecondsInDay = 86400000;
    }

    export class Helpers {
        public static isDefined(value: any) {
            return typeof value !== "undefined";
        }

        public static isSet(value: any) {
            return Helpers.isDefined(value) && value !== null;
        }

        public static getDaysinYear(year?: number): number {
            if (typeof year === "undefined" || year === null) {
                year = (new Date()).getUTCFullYear();
            }

            let startOfYear = new Date(year, 0, 0).getTime();
            let endOfYear = new Date(year + 1, 0, 0).getTime();

            return (endOfYear - startOfYear) / (Constants.MillisecondsInDay);
        }

        public static getDaysInMonth(year: number, month: number): number {
            return new Date(year, month, 0).getDate();
        }

        public static getPositionFromEvent(e: MouseEvent | TouchEvent): Vector {
            if (e instanceof MouseEvent) {
                return new Vector(e.clientX, e.clientY);
            } else if (e instanceof TouchEvent) {
                return new Vector(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
            }

            throw new Error("Cannot extract position from event.");
        }

        public static findChildWithClass(element: HTMLElement, className: string, required = true): HTMLElement {
            let found = element.getElementsByClassName(className);
            if (found.length > 0) {
                return found[0] as HTMLElement;
            }

            if (required) {
                throw new Error(`Cannot find DOM element with class: '${className}' in the template.`);
            }

            return null;
        }

        public static calculateCenterPosition(element: HTMLElement | ClientRect): Vector {
            if (element instanceof HTMLElement) {
                return new Vector(element.offsetLeft + element.offsetWidth / 2,
                    element.offsetTop + element.offsetHeight / 2);
            } else if (element instanceof ClientRect) {
                return new Vector(element.left + element.width / 2,
                    element.top + element.height / 2);
            }
            throw new Error("Invalid parameter.");
        }

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
                if (typeof f === "undefined" || f === null) {
                    break;
                }

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
                if (typeof f === "undefined" || f === null) {
                    break;
                }

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
