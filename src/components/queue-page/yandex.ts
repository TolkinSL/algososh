interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size);
    }

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }

        // Ваш код
        this.container[this.tail % this.size] = item;
        this.tail++;
        this.length++;
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }

        // Ваш код
        const item = this.container[this.head];
        delete this.container[this.head % this.size];
        this.length--;
        this.head++;
        return item;
    };

    peak = (): T | null => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        return this.container[this.head]; // Ваш код
    };

    isEmpty = () => this.length === 0;
}

const queue = new Queue<number>(4);
queue.enqueue(12);
queue.enqueue(3);
queue.enqueue(33);
console.log(`peak ${queue.peak()}`); // 12
queue.dequeue();
queue.dequeue();
queue.enqueue(1);
queue.enqueue(2);
console.log(`peak ${queue.peak()}`); // 33