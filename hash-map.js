/**
 * A hash map implementation using separate chaining with linked lists.
 *
 * - Supports **string keys** and **string values** only.
 * - Provides insertion, retrieval, and deletion operations.
 * - Automatically resizes when load factor thresholds are crossed.
 *
 * Internal behavior:
 * - Buckets are stored as an array of LinkedList instances (or null).
 * - Collisions are resolved via linked‑list chaining.
 * - Resizes upward when `size > capacity * loadFactor`.
 * - Resizes downward when `size < capacity * loadFactor * SHRINK_FACTOR`.
 */

import { LinkedList } from "./linked-list.js";

const LOAD_FACTOR = 0.75;
const CAPACITY = 16;
const SHRINK_FACTOR = 0.5;

class HashMap {
  constructor() {
    this.clear();
  }

  /**
   * Computes a hash code for a given string key.
   *
   * @private
   * @param {string} key - The key to hash.
   * @returns {number} A bucket index within the current capacity.
   * @throws {TypeError} If the key is not a string.
   */
  #hash(key) {
    if (typeof key !== "string") {
      throw new TypeError("Hashmap only supports string keys.");
    }

    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  /**
   * Inserts or updates a key–value pair in the hash map.
   *
   * - If the key does not exist, it is appended to the bucket list.
   * - If the key exists, its value is updated.
   * - May trigger an upward resize if the load factor threshold is exceeded.
   *
   * @param {string} key - The key to insert or update.
   * @param {string} value - The value associated with the key.
   */
  set(key, value) {
    const hashCode = this.#hash(key);
    const bucket = this.buckets[hashCode]; //linked list or null

    //create new linked list if one doesn't exist
    if (!bucket) {
      const list = new LinkedList();
      list.append(key, value);
      this.buckets[hashCode] = list;
    } else {
      //othwerwise bucket exists so retrieve node
      const node = bucket.getNodeByKey(key);

      if (!node) {
        bucket.append(key, value);
      } else {
        node.value = value;
      }
    }

    //increase map size
    if (this.length() > this.capacity * this.loadFactor) {
      this.#resize(2);
    }
  }

  /**
   * Retrieves the value associated with a given key.
   *
   * @param {string} key - The key to look up.
   * @returns {string|null} The stored value, or `null` if not found.
   */
  get(key) {
    const hashCode = this.#hash(key);
    const bucket = this.buckets[hashCode]; //linked list or null

    const node = bucket?.getNodeByKey(key); //node or null

    if (node) {
      return node.value;
    }

    return null;
  }

  /**
   * Checks whether a key exists in the hash map.
   *
   * @param {string} key - The key to test.
   * @returns {boolean} `true` if the key exists, otherwise `false`.
   */
  has(key) {
    return this.get(key) !== null;
  }

  /**
   * Removes a key–value pair from the hash map.
   *
   * - Returns `false` if the key does not exist.
   * - Returns `true` if removal succeeds.
   * - May trigger a shrink operation if size falls below threshold.
   *
   * @param {string} key - The key to remove.
   * @returns {boolean} Whether the key was successfully removed.
   */
  remove(key) {
    const exists = this.has(key);

    if (!exists) {
      return false;
    }

    const hashCode = this.#hash(key);
    const bucket = this.buckets[hashCode]; //linked list or null

    bucket.removeNodeByKey(key);

    //decrease hashmap size
    if (this.length() < this.capacity * this.loadFactor * SHRINK_FACTOR) {
      this.#resize(0.5);
    }
    return true;
  }

  /**
   * Computes the total number of stored key–value pairs.
   *
   * @returns {number} The number of entries in the hash map.
   */
  length() {
    return this.buckets.reduce((acc, bucket) => {
      return acc + (bucket ? bucket.size : 0);
    }, 0);
  }

  /**
   * Clears all entries and resets the hash map to initial capacity.
   *
   * @returns {void}
   */
  clear() {
    this.loadFactor = LOAD_FACTOR;
    this.capacity = CAPACITY;
    this.buckets = new Array(this.capacity).fill(null);
  }

  /**
   * Returns an array of all keys stored in the hash map.
   *
   * @returns {string[]} A list of keys.
   */
  keys() {
    return this.buckets.reduce((acc, bucket) => {
      if (!bucket) {
        return acc;
      }

      acc.push(...bucket.getKeys());
      return acc;
    }, []);
  }

  /**
   * Returns an array of all values stored in the hash map.
   *
   * @returns {string[]} A list of values.
   */
  values() {
    return this.buckets.reduce((acc, bucket) => {
      if (!bucket) {
        return acc;
      }

      acc.push(...bucket.getValues());
      return acc;
    }, []);
  }

  /**
   * Returns an array of `[key, value]` pairs stored in the hash map.
   *
   * @returns {[string, string][]} A list of key–value tuples.
   */
  entries() {
    return this.buckets.reduce((acc, bucket) => {
      if (!bucket) {
        return acc;
      }

      acc.push(...bucket.getEntries());
      return acc;
    }, []);
  }

  /**
   * Resizes the hash map by a given multiplier.
   *
   * - Rehashes all existing entries into the new bucket array.
   * - Capacity will never shrink below the initial `CAPACITY`.
   *
   * @private
   * @param {number} change - Multiplier applied to current capacity.
   * @returns {void}
   */
  #resize(change) {
    const oldEntries = this.entries();
    this.capacity = Math.max(CAPACITY, this.capacity * change);
    this.buckets = new Array(this.capacity).fill(null);

    for (const [key, value] of oldEntries) {
      this.set(key, value);
    }
  }
}

export { HashMap, CAPACITY };
