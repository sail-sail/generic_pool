import { DoublyLinkedListIterator } from "./doubly_linked_list_iterator.ts";
/**
 * Thin wrapper around an underlying DDL iterator
 */
class DequeIterator<T> extends DoublyLinkedListIterator<T> {
  next() {
    const result = super.next();

    // unwrap the node...
    if (result.value) {
      // deno-lint-ignore no-explicit-any
      result.value = result.value.data as any;
    }

    return result;
  }
}

export { DequeIterator }
