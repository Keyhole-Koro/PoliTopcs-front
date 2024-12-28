// cacheManager.ts

interface CacheItem<T> {
  data: T;
  timestamp: number;  // Timestamp when the data was cached
}

export class CacheManager {
  private cache: Map<string, CacheItem<any>> = new Map();
  private ttl: number; // TTL (Time To Live) in seconds. After this time, cache will be considered expired.

  constructor(ttl: number = 3600) { // Default TTL is 1 hour (3600 seconds)
    this.ttl = ttl;
  }

  // Retrieve data from cache by key
  get<T>(key: string): T | undefined {
    const cachedItem = this.cache.get(key);
    if (cachedItem) {
      const now = Date.now();
      // If the TTL hasn't expired, return the cached data
      if (now - cachedItem.timestamp < this.ttl * 1000) {
        return cachedItem.data;
      } else {
        this.cache.delete(key); // If TTL expired, remove the cache entry
      }
    }
    return undefined;  // Return undefined if cache doesn't exist or is expired
  }

  // Set data to cache with a specific key
  set<T>(key: string, data: T): void {
    const cachedItem: CacheItem<T> = {
      data,
      timestamp: Date.now(), // Store the current timestamp when data is cached
    };
    this.cache.set(key, cachedItem);
  }

  // Clear all cache entries
  clear(): void {
    this.cache.clear();
  }
}
