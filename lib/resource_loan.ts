import { Deferred } from "./deferred.ts";
import { PooledResource } from "./pooled_resource.ts";

/**
 * Plan is to maybe add tracking via Error objects
 * and other fun stuff!
 */

class ResourceLoan<T> extends Deferred<T> {
  
  pooledResource: PooledResource<T>;
  #creationTimestamp: number;
  
  /**
   *
   * @param  {PooledResource<T>} pooledResource the PooledResource this loan belongs to
   */
  constructor(pooledResource: PooledResource<T>) {
    super();
    this.#creationTimestamp = Date.now();
    this.pooledResource = pooledResource;
  }

  reject() {
    /**
     * Loans can only be resolved at the moment
     */
  }
}

export { ResourceLoan }
