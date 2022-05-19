import { Queue } from "./queue.ts";
import { ResourceRequest } from "./resource_request.ts";

/**
 * @class
 */
class PriorityQueue<T> {
  
  #size: number;
  #slots: Queue<T>[];
  
  constructor(size: number = 0) {
    this.#size = Math.max(+size | 0, 1);
    this.#slots = [];
    // initialize arrays to hold queue elements
    for (let i = 0; i < this.#size; i++) {
      this.#slots.push(new Queue());
    }
  }

  get length() {
    let _length = 0;
    for (let i = 0, slots = this.#slots.length; i < slots; i++) {
      _length += this.#slots[i].length;
    }
    return _length;
  }

  enqueue(obj: ResourceRequest<T>, priority: number) {
    // Convert to integer with a default value of 0.
    priority = (priority && +priority | 0) || 0;

    if (priority) {
      if (priority < 0 || priority >= this.#size) {
        priority = this.#size - 1;
        // put obj at the end of the line
      }
    }
    this.#slots[priority].push(obj);
  }

  dequeue() {
    for (let i = 0, sl = this.#slots.length; i < sl; i += 1) {
      if (this.#slots[i].length) {
        return this.#slots[i].shift();
      }
    }
    return;
  }

  get head() {
    for (let i = 0, sl = this.#slots.length; i < sl; i += 1) {
      if (this.#slots[i].length > 0) {
        return this.#slots[i].head;
      }
    }
    return undefined;
  }

  get tail() {
    for (let i = this.#slots.length - 1; i >= 0; i--) {
      if (this.#slots[i].length > 0) {
        return this.#slots[i].tail;
      }
    }
    return undefined;
  }
}

export { PriorityQueue }
