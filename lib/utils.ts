function noop() {}

/**
 * Reflects a promise but does not expose any
 * underlying value or rejection from that promise.
 * @param  {Promise} promise 
 */
export function reflector<T>(promise: Promise<T>) {
  return promise.then(noop, noop);
}
