class ExtendableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

/* eslint-disable no-useless-constructor */
class TimeoutError extends ExtendableError {
  constructor(m: string) {
    super(m);
  }
}
/* eslint-enable no-useless-constructor */

export { TimeoutError }
