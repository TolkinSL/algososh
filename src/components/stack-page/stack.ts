type Stack<T> = {
    push(item: T): void;
    pop(): void;
    getItem(): T[];
    getSize(): number;
    clear(): void;
}

export default class StackArr<T> implements Stack<T> {
    head: number | null;
    private container: T[] = [];

    constructor() {
        this.head = null;
        this.container = [];
    }

    push(item: T) {
        this.container.push(item);
        this.head === null ? this.head = 0 : this.head++;
    }

    pop() {
        this.container.pop();
    }


    getItem = () => {
        return this.container;
    }

    getSize = () => {
        return this.container.length;
    }

    clear() {
        this.container = [];
    }
}
