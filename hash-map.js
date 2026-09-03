import { LinkedList } from "./linked-list.js";

const LOAD_FACTOR = 0.75;
const CAPACITY = 16;

class HashMap {
  constructor() {
    this._loadFactor;
    this._capacity;
    this._buckets = [];
    this.clear();
  }

  #hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this._capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const hashCode = this.#hash(key);
    const index = hashCode % this._capacity;

    const bucket = this._buckets[index]; //linked list or null

    //create new linked list if one doesn't exist
    if (!bucket) {
      const list = new LinkedList();
      list.append(key, value);
      this._buckets[index] = list;
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
    if (this.length() > this._capacity * this._loadFactor) {
      this.#resize(2);
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

  clear() {
    this._loadFactor = LOAD_FACTOR;
    this._capacity = CAPACITY;
    this._buckets.length = 0; //empty array contents
  }

  keys() {
    return this._buckets.reduce((acc, item) => {
      return acc.concat(...item.getKeys());
    }, []);
  }

  values() {
    return this._buckets.reduce((acc, item) => {
      return acc.concat(...item.getValues());
    }, []);
  }

  entries() {
    return this._buckets.reduce((acc, item) => {
      return acc.concat(item.getEntries());
    }, []);
  }

  #resize(change) {
    const newMap = new HashMap();
    newMap._capacity = this._capacity * change;

    const entries = this.entries();

    for (const node of entries) {
      let key, value;
      [key, value] = node;
      newMap.set(key, value);
    }

    this._capacity = newMap._capacity;
    this._buckets = newMap._buckets;
  }
}

export { HashMap };
