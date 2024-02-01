type List<T> = {
    addToEnd(value: T): void;
    addToStart(value: T): void;
    addByIndex(value: T, index: number): void;
    delFromEnd(): void;
    delFromStart(): void;
    delByIndex(index: number): void;
    getLenght(): number;
    getAsArray(): T[] | undefined;
}

class ListElement<T> {
    value: T;
    next: ListElement<T> | null;
    prev: ListElement<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

export default class DoubleLinkedList <T> implements List<T> {
    length: number;
    tail: ListElement<T> | null;
    head: ListElement<T> | null;

    constructor(array: T[]) {
        this.head = new ListElement<T>(array[0]);
        this.tail = this.head;
        this.length = 1;

        for (let i = 1; i < array.length; i++) {
            this.addToEnd(array[i]);
        }
    }

    addToEnd(value: T) {
        const newNode = new ListElement<T>(value);
        newNode.prev = this.tail;
        if (this.tail) {
            this.tail.next = newNode;
        }

        this.tail = newNode;
        this.length++;
        return this;
    }

    addToStart(value: T) {
        const newNode = new ListElement<T>(value);
        if (this.head) {
            this.head.prev = newNode;
        }

        newNode.next = this.head;
        this.head = newNode;
        this.length++;
        return this;
    }

    addByIndex(value: T, index: number) {
        const newNode = new ListElement<T>(value);
        let currentNode = this.head;

        for (let i = 0; i < index -1; i++) {
            if (currentNode) {
                currentNode = currentNode.next;
            }
        }

        if (currentNode) {
            newNode.next = currentNode.next;
        }

        newNode.prev = currentNode;
        if (currentNode) {
            currentNode.next = newNode;
        }

        if (currentNode?.next) {
            currentNode.next.prev = newNode;
        }

        this.length++;
    }

    delFromEnd(){
        if (this.tail) {
            this.tail = this.tail.prev;
            if (this.tail) {
                this.tail.next = null;
            }

            this.length--;
        }
    }

    delByIndex(index: number) {
        let currentNode = this.head;
        for (let i = 0; i < index -1; i++) {
            if (currentNode) currentNode = currentNode.next;
        }

        if (currentNode?.next) currentNode.next = currentNode.next.next;
        this.length--;
    }

    getLenght() {
        return this.length;
    }

    delFromStart() {
        if (this.head) {
            this.head = this.head.next;
            if (this.head) this.head.prev = null;
            this.length--;
        }
    }

    getAsArray() {
        if (this.head) {
            let currentNode = this.head;
            const resultArray = [];
            while (currentNode.next) {
                resultArray.push(currentNode.value);
                currentNode = currentNode.next;
            }
            resultArray.push(currentNode.value);
            if (resultArray) return resultArray;
        }
    }
}