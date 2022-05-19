/**
 * This is apparently a bit like a Jquery deferred, hence the name
 */

class Deferred<T> {
  
  #promise: Promise<T>;
  #state: string;
  #resolve: ((value: T | PromiseLike<T>) => void)|undefined;
  #reject: ((reason?: Error) => void)|undefined;
  
  constructor() {
    this.#state = Deferred.PENDING;
    this.#resolve = undefined;
    this.#reject = undefined;

    this.#promise = new Promise((resolve, reject) => {
      this.#resolve = resolve;
      this.#reject = reject;
    });
  }

  get state() {
    return this.#state;
  }

  get promise() {
    return this.#promise;
  }

  reject(reason: Error) {
    if (this.#state !== Deferred.PENDING) {
      return;
    }
    this.#state = Deferred.REJECTED;
    if (this.#reject) {
      this.#reject(reason);
    }
  }

  resolve(value?: T|PromiseLike<T>) {
    if (this.#state !== Deferred.PENDING) {
      return;
    }
    this.#state = Deferred.FULFILLED;
    if (this.#resolve) {
      this.#resolve(value as T);
    }
  }
  
  static PENDING = "PENDING";
  static FULFILLED = "FULFILLED";
  static REJECTED = "REJECTED";
  
}

export { Deferred }
