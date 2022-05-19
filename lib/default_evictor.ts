import { PooledResource } from "./pooled_resource.ts";

class DefaultEvictor<T> {
  evict(
    config: {
      softIdleTimeoutMillis: number;
      idleTimeoutMillis: number;
      min: number;
    },
    pooledResource: PooledResource<T>,
    availableObjectsCount: number,
  ) {
    const idleTime = Date.now() - (pooledResource.lastIdleTime || 0);

    if (
      config.softIdleTimeoutMillis > 0 &&
      config.softIdleTimeoutMillis < idleTime &&
      config.min < availableObjectsCount
    ) {
      return true;
    }

    if (config.idleTimeoutMillis < idleTime) {
      return true;
    }

    return false;
  }
}

export { DefaultEvictor }
