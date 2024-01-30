type Queue<T> = {
    enqueue(value: T): void;
    dequeue(): void;
    getIsEmpty(): boolean;
    getHead(): number | null;
    getTail(): number | null;
    clear(): void;
    getItem(): Array<ArrayElement<T>>;
}
type ArrayElement<T> = T | "";

export default class QueueArr<T> implements Queue<T> {
    head: number | null;
    tail: number | null;
    array: Array<ArrayElement<T>>;

    constructor(initValue: Array<T | ""> = ["", "", "", "", "", "", ""]) {
        this.head = null;
        this.tail = null;
        this.array = initValue;
    }

    enqueue(element: T) {
        if (this.head === null) {
            this.array[0] = element;
            this.head = 0;
            this.tail = 0;
        } else {
            if (this.tail !== null && this.tail < this.array.length - 1) {
                this.tail++
                this.array[this.tail] = element;
            } else if (this.tail === null && this.head > 0 && this.head !== this.array.length - 1) {
                this.array[this.head] = element;
                this.tail = this.head;
            }
        }
    }

    dequeue() {
        if (this.head !== null && this.array[this.head] !== "" && this.head < this.array.length) {
            this.array[this.head] = "";
            if (this.head === this.array.length - 1 || this.head === this.tail) this.tail = null;
            this.head < this.array.length - 1 && this.head++;
        }
    }

    getHead = () => {
        return this.head;
    }

    getTail = () => {
        return this.tail;
    }

    getIsEmpty = () => {
        return this.array.length === 0;
    }
    getItem = () => {
        return this.array;
    }

    clear() {
        for (let i = 0; i < this.array.length; i++) {
            this.array[i] = "";
        }
        this.head = null;
        this.tail = null;
    }
}