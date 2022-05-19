import { DoublyLinkedList, Node } from "./doubly_linked_list.ts";
import { Deque } from "./deque.ts";
import { ResourceRequest } from "./resource_request.ts";

/**
 * Sort of a internal queue for holding the waiting
 * resource requets for a given "priority".
 * Also handles managing timeouts rejections on items (is this the best place for this?)
 * This is the last point where we know which queue a resourceRequest is in
 *
 */
class Queue<T> extends Deque<ResourceRequest<T>> {
  /**
   * Adds the obj to the end of the list for this slot
   * we completely override the parent method because we need access to the
   * node for our rejection handler
   */
  push(resourceRequest: ResourceRequest<T>) {
    const node = DoublyLinkedList.createNode(resourceRequest);
    resourceRequest.promise.catch(this._createTimeoutRejectionHandler(node));
    this._list.insertEnd(node);
  }

  _createTimeoutRejectionHandler(node: Node<ResourceRequest<T>>) {
    return (reason: { name: string; }) => {
      if (reason.name === "TimeoutError") {
        this._list.remove(node);
      }
    };
  }
}

export { Queue }
