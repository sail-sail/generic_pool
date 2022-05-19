import { DoublyLinkedList } from "./doubly_linked_list.ts";
import { DequeIterator } from "./deque_iterator.ts";

/**
 * DoublyLinkedList backed double ended queue
 * implements just enough to keep the Pool
 */
class Deque<T> {
  
  #list: DoublyLinkedList<T>;
  
  constructor() {
    this.#list = new DoublyLinkedList();
  }

  /**
   * removes and returns the first element from the queue
   * @return {T|undefined} 
   */
  shift(): T|undefined {
    if (this.length === 0) {
      return undefined;
    }

    const node = this.#list.head;
    if (node === null) {
      return;
    }
    this.#list.remove(node);

    return node.data;
  }

  /**
   * adds one elemts to the beginning of the queue
   * @param  {T} element
   */
  unshift(element: T) {
    const node = DoublyLinkedList.createNode(element);

    this.#list.insertBeginning(node);
  }

  /**
   * adds one to the end of the queue
   * @param  {T} element
   */
  push(element: T) {
    const node = DoublyLinkedList.createNode(element);

    this.#list.insertEnd(node);
  }

  /**
   * removes and returns the last element from the queue
   */
  pop() {
    if (this.length === 0) {
      return undefined;
    }

    const node = this.#list.tail;
    if (node === null) {
      return;
    }
    this.#list.remove(node);

    return node.data;
  }

  [Symbol.iterator]() {
    return new DequeIterator(this.#list);
  }

  iterator() {
    return new DequeIterator(this.#list);
  }

  reverseIterator() {
    return new DequeIterator(this.#list, true);
  }

  /**
   * get a reference to the item at the head of the queue
   */
  get head() {
    if (this.length === 0) {
      return undefined;
    }
    const node = this.#list.head;
    if (node === null) {
      return undefined;
    }
    return node.data;
  }

  /**
   * get a reference to the item at the tail of the queue
   */
  get tail() {
    if (this.length === 0) {
      return undefined;
    }
    const node = this.#list.tail;
    if (node === null) {
      return undefined;
    }
    return node.data;
  }

  get length() {
    return this.#list.length;
  }
}

export { Deque }
