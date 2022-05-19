import { Deferred } from "./deferred.ts";
import { TimeoutError } from "./errors.ts";

// deno-lint-ignore ban-types
function fbind<T>(fn: Function, ctx: ResourceRequest<T>) {
  return function bound() {
    return fn.apply(ctx, arguments);
  };
}

/**
 * Wraps a users request for a resource
 * Basically a promise mashed in with a timeout
 * @private
 */
class ResourceRequest<T> extends Deferred<T> {
  
  #creationTimestamp: number;
  #timeout: number|null;
  
  /**
   * [constructor description]
   * @param  {Number} ttl     timeout
   */
  constructor(ttl?: number) {
    super();
    this.#creationTimestamp = Date.now();
    this.#timeout = null;

    if (ttl !== undefined) {
      this.setTimeout(ttl);
    }
  }

  setTimeout(delay: number|string) {
    if (this.state !== ResourceRequest.PENDING) {
      return;
    }
    const ttl = parseInt(delay.toString(), 10);

    if (isNaN(ttl) || ttl <= 0) {
      throw new Error("delay must be a positive int");
    }

    const age = Date.now() - this.#creationTimestamp;

    if (this.#timeout) {
      this.removeTimeout();
    }

    this.#timeout = setTimeout(
      fbind(this._fireTimeout, this),
      Math.max(ttl - age, 0)
    );
  }

  removeTimeout() {
    if (this.#timeout) {
      clearTimeout(this.#timeout);
    }
    this.#timeout = null;
  }

  _fireTimeout() {
    this.reject(new TimeoutError("ResourceRequest timed out"));
  }

  reject(reason: TimeoutError) {
    this.removeTimeout();
    super.reject(reason);
  }

  resolve(value: T|PromiseLike<T>) {
    this.removeTimeout();
    super.resolve(value);
  }
}

export { ResourceRequest }
