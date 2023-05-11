import { LRUCache } from "lru-cache";
import dns from "node:dns";

function lookupPromise(
  hostname: string,
  options?: dns.LookupOneOptions
): Promise<{ address: string; family: number }> {
  return new Promise((resolve, reject) => {
    dns.lookup(hostname, options, (err, address, family) => {
      if (err) {
        reject(err);
      } else {
        resolve({ address, family });
      }
    });
  });
}

const options = {
  max: 500,
  maxSize: 5000,
  ttl: 1000 * 60 * 5,

  allowStale: false,

  updateAgeOnGet: false,
  updateAgeOnHas: false,

  fetchMethod: async (key, staleValue, { options, signal, context }) => {},
};

export class DNSResolver {
  cache: LRUCache<any, any, any>;

  constructor({
    cacheOptions = { ...options },
  }: {
    cacheOptions: LRUCache.Options<any, any, any>;
  }) {
    this.cache = new LRUCache(cacheOptions);
  }

  async resolve(name: string) {
    let result = this.cache.get(name);
    if (result) return result;

    result = await lookupPromise(name);
    if (result && result.address) {
      this.cache.set(name, result.address);
      return result.address;
    }
  }
}
