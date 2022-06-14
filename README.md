# generic_pool

Generic resource pool with Promise based API. Can be used to reuse or throttle usage of expensive resources such as database connections.

fock by https://github.com/coopernurse/node-pool

## usage
```ts
import { createPool } from "https://deno.land/x/generic_pool/mod.ts";
import { connect as redisConnect } from "https://deno.land/x/redis/mod.ts";

/**
 * Step 1 - Create pool using a factory object
 */
const factory = {
  async create() {
    let client: Awaited<ReturnType<typeof redisConnect>> | undefined;
    try {
      client = await redisConnect({
        hostname: "127.0.0.1",
        port: 6379,
      });
    } catch (err) {
      console.error(err);
    }
    return client;
  },
  async destroy(client: Awaited<ReturnType<typeof redisConnect>>) {
    await client.close();
  },
};

const opts = {
  max: 10, // maximum size of the pool
  min: 2 // minimum size of the pool
};

const pool = genericPool.createPool(factory, opts);

/**
 * Step 2 - Use pool in your code to acquire/release resources
 */

// acquire connection - Promise is resolved
// once a resource becomes available
const client = await pool.acquire();

try {
  await client.set("cacheKey", "cacheValue");
  const str = await client.get("cacheKey");
  console.log(str); // cacheValue
} finally {
  await pool.release(client);
}

/**
 * Step 3 - Drain pool during shutdown (optional)
 */
// Only call this once in your application -- at the point you want
// to shutdown and stop using this pool.
await pool.drain();
pool.clear();
```
