import { DoublyLinkedList, Node } from "./doubly_linked_list.ts";

/**
 * Creates an interator for a DoublyLinkedList starting at the given node
 * It's internal cursor will remains relative to the last "iterated" node as that
 * node moves through the list until it either iterates to the end of the list,
 * or the the node it's tracking is removed from the list. Until the first 'next'
 * call it tracks the head/tail of the linked list. This means that one can create
 * an iterator on an empty list, then add nodes, and then the iterator will follow
 * those nodes. Because the DoublyLinkedList nodes don't track their owning "list" and
 * it's highly inefficient to walk the list for every iteration, the iterator won't know
 * if the node has been detached from one List and added to another list, or if the iterator
 *
 * The created object is an es6 compatible iterator
 */
class DoublyLinkedListIterator<T> {
  
  #list: DoublyLinkedList<T>;
  #direction: "prev" | "next";
  #startPosition: "tail" | "head";
  #started: boolean;
  #cursor: Node<T>|null;
  #done: boolean;
  
  /**
   * @param  {DoublyLinkedList<T>} doublyLinkedList     a node that is part of a doublyLinkedList
   * @param  {Boolean} [reverse=false]     is this a reverse iterator? default: false
   */
  constructor(doublyLinkedList: DoublyLinkedList<T>, reverse: boolean = false) {
    this.#list = doublyLinkedList;
    // NOTE: these key names are tied to the DoublyLinkedListIterator
    this.#direction = reverse === true ? "prev" : "next";
    this.#startPosition = reverse === true ? "tail" : "head";
    this.#started = false;
    this.#cursor = null;
    this.#done = false;
  }

  _start() {
    this.#cursor = this.#list[this.#startPosition];
    this.#started = true;
  }

  _advanceCursor() {
    if (this.#started === false) {
      this.#started = true;
      this.#cursor = this.#list[this.#startPosition];
      return;
    }
    this.#cursor = this.#cursor?.[this.#direction] || null;
  }

  reset() {
    this.#done = false;
    this.#started = false;
    this.#cursor = null;
  }

  remove() {
    if (
      this.#started === false ||
      this.#done === true ||
      this._isCursorDetached()
    ) {
      return false;
    }
    if (this.#cursor) {
      this.#list.remove(this.#cursor);
    }
  }

  next() {
    if (this.#done === true) {
      return { done: true };
    }

    this._advanceCursor();

    // if there is no node at the cursor or the node at the cursor is no longer part of
    // a doubly linked list then we are done/finished/kaput
    if (this.#cursor === null || this._isCursorDetached()) {
      this.#done = true;
      return { done: true };
    }

    return {
      value: this.#cursor,
      done: false
    };
  }

  /**
   * Is the node detached from a list?
   * NOTE: you can trick/bypass/confuse this check by removing a node from one DoublyLinkedList
   * and adding it to another.
   * TODO: We can make this smarter by checking the direction of travel and only checking
   * the required next/prev/head/tail rather than all of them
   * @return {Boolean}      [description]
   */
  _isCursorDetached(): boolean {
    return (
      this.#cursor?.prev === null &&
      this.#cursor?.next === null &&
      this.#list.tail !== this.#cursor &&
      this.#list.head !== this.#cursor
    );
  }
}

export { DoublyLinkedListIterator }
