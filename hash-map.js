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
    const index = hashCode % this._capacity;

    const bucket = this._buckets[index]; //linked list or null

    if (!bucket) {
      const list = new LinkedList();
      list.append(key, value);
      this._buckets[index] = list;
      return;
    }

    const node = bucket.getNodeByKey(key);

    if (!node) {
      bucket.append(key, value);
    } else {
      node.value = value;
    }
  }

  get(key) {
    const hashCode = this.#hash(key);
    const index = hashCode % this._capacity;
    const bucket = this._buckets[index]; //linked list or null

    const node = bucket?.getNodeByKey(key); //node or null

    if (node) {
      return node.value;
    }

    return null;
  }

  has(key) {
    const node = this.get(key);

    if (node) {
      return true;
    }

    return false;
  }

  remove(key) {
    const exists = this.has(key);

    if (!exists) {
      return false;
    }

    const hashCode = this.#hash(key);
    const index = hashCode % this._capacity;
    const bucket = this._buckets[index]; //linked list or null

    bucket.removeNodeByKey(key);
    return true;
  }

  length() {
    return this._buckets.reduce((acc, item) => {
      acc += item.size;
      return acc;
    }, 0);
  }
}

export { HashMap };
