module DateSlider {
    export class Vector {
        constructor(
            public x: number,
            public y: number,
        ) {
        }

        public add(vector: Vector): Vector {
            return new Vector(this.x + vector.x, this.y + vector.y);
        }

        public substract(vector: Vector): Vector {
            return new Vector(this.x - vector.x, this.y - vector.y);
        }

        public multiply(scalar: number): Vector {
            return new Vector(this.x * scalar, this.y * scalar);
        }

        public divide(scalar: number): Vector {
            return new Vector(this.x / scalar, this.y / scalar);
        }

        public dot(vector: Vector): number {
            return this.x * vector.x + this.y * vector.y;
        }

        public length(): number {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    }
}
