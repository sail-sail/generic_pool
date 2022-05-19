import { Pool } from "./lib/pool.ts";

export { Pool } from "./lib/pool.ts";
export { Deque } from "./lib/deque.ts";
export { PriorityQueue } from "./lib/priority_queue.ts";
export { DefaultEvictor } from "./lib/default_evictor.ts";

export interface Factory<T> {
  create(): Promise<T>;
  destroy(client: T): Promise<void>;
  validate?(client: T): Promise<boolean>;
}

export interface Options {
  max?: number;
  min?: number;
  maxWaitingClients?: number;
  testOnBorrow?: boolean;
  testOnReturn?: boolean;
  acquireTimeoutMillis?: number;
  fifo?: boolean;
  priorityRange?: number;
  autostart?: boolean;
  evictionRunIntervalMillis?: number;
  numTestsPerEvictionRun?: number;
  softIdleTimeoutMillis?: number;
  idleTimeoutMillis?: number;
  destroyTimeoutMillis?: number;
}

export function createPool<T>(factory: Factory<T>, config?: Options): Pool<T> {
  return new Pool(factory, config);
}