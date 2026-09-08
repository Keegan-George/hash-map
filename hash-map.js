import { LinkedList } from "./linked-list.js";

const LOAD_FACTOR = 0.75;
const CAPACITY = 16;

class HashMap {
  constructor() {
    this.clear();
  }

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

  set(key, value) {
    const hashCode = this.#hash(key);
    const bucket = this.buckets[hashCode]; //linked list or null

    //create new linked list if one doesn't exist
    if (!bucket) {
      const list = new LinkedList();
      list.append(key, value);
      this.buckets[hashCode] = list;
    } else {
      //othwerwise bucket exists so get node
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

  get(key) {
    const hashCode = this.#hash(key);
    const bucket = this.buckets[hashCode]; //linked list or null

    const node = bucket?.getNodeByKey(key); //node or null

    if (node) {
      return node.value;
    }

    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const exists = this.has(key);

    if (!exists) {
      return false;
    }

    const hashCode = this.#hash(key);
    const bucket = this.buckets[hashCode]; //linked list or null

    bucket.removeNodeByKey(key);

    if (this.length() === CAPACITY * this.loadFactor) {
      this.#resize(0.5);
    }
    return true;
  }

  length() {
    return this.buckets.reduce((acc, bucket) => {
      return acc + (bucket ? bucket.size : 0);
    }, 0);
  }

  clear() {
    this.loadFactor = LOAD_FACTOR;
    this.capacity = CAPACITY;
    this.buckets = new Array(this.capacity).fill(null);
  }

  keys() {
    return this.buckets.reduce((acc, bucket) => {
      if (!bucket) {
        return acc;
      }

      acc.push(...bucket.getKeys());
      return acc;
    }, []);
  }

  values() {
    return this.buckets.reduce((acc, bucket) => {
      if (!bucket) {
        return acc;
      }

      acc.push(...bucket.getValues());
      return acc;
    }, []);
  }

  entries() {
    return this.buckets.reduce((acc, bucket) => {
      if (!bucket) {
        return acc;
      }

      acc.push(...bucket.getEntries());
      return acc;
    }, []);
  }

  #resize(change) {
    const oldEntries = this.entries();
    this.capacity = this.capacity * change;
    this.buckets = new Array(this.capacity).fill(null);

    for (const [key, value] of oldEntries) {
      this.set(key, value);
    }
  }
}

export { HashMap, CAPACITY };
