/**
 * Create the default settings used by the pool
 * @class PoolDefaults
 */
class PoolDefaults {
  
  fifo: boolean;
  priorityRange: number;
  testOnBorrow: boolean;
  testOnReturn: boolean;
  autostart: boolean;
  evictionRunIntervalMillis: number;
  numTestsPerEvictionRun: number;
  softIdleTimeoutMillis: number;
  idleTimeoutMillis: number;
  acquireTimeoutMillis: number|null;
  destroyTimeoutMillis: number|null;
  maxWaitingClients: number|null;
  min: number|null;
  max: number|null;
  
  constructor() {
    this.fifo = true;
    this.priorityRange = 1;

    this.testOnBorrow = false;
    this.testOnReturn = false;

    this.autostart = true;

    this.evictionRunIntervalMillis = 0;
    this.numTestsPerEvictionRun = 3;
    this.softIdleTimeoutMillis = -1;
    this.idleTimeoutMillis = 30000;

    // FIXME: no defaults!
    this.acquireTimeoutMillis = null;
    this.destroyTimeoutMillis = null;
    this.maxWaitingClients = null;

    this.min = null;
    this.max = null;
  }
}

export { PoolDefaults }
