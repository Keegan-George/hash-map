import { LinkedList } from "./linked-list.js";

class HashMap {
  constructor() {
    this._loadFactor = 0.75;
    this._capacity = 16;
    this._buckets = [];
  }

  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  set(key, value) {
    const hashCode = this.#hash(key);
    const bucket = hashCode % this._capacity;

    if (!this._buckets[bucket]) {
      const list = new LinkedList();
      list.append(`${key}:${value}`);
      this._buckets[bucket] = list;
    } else {
      this._buckets[bucket].append(`${key}:${value}`);
    }
  }
}
