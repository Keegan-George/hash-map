import { LinkedList } from "./linked-list.js";

const LOAD_FACTOR = 0.75;
const CAPACITY = 16;

class HashMap {
  constructor() {
    this.loadFactor;
    this.capacity;
    this.buckets = [];
    this.clear();
  }

  #hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const hashCode = this.#hash(key);
    const index = hashCode % this.capacity;

    const bucket = this.buckets[index]; //linked list or null

    //create new linked list if one doesn't exist
    if (!bucket) {
      const list = new LinkedList();
      list.append(key, value);
      this.buckets[index] = list;
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
    const index = hashCode % this.capacity;
    const bucket = this.buckets[index]; //linked list or null

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
    const index = hashCode % this.capacity;
    const bucket = this.buckets[index]; //linked list or null

    bucket.removeNodeByKey(key);
    return true;
  }

  length() {
    return this.buckets.reduce((acc, item) => {
      acc += item.size;
      return acc;
    }, 0);
  }

  clear() {
    this.loadFactor = LOAD_FACTOR;
    this.capacity = CAPACITY;
    this.buckets.length = 0; //empty array contents
  }

  keys() {
    return this.buckets.reduce((acc, item) => {
      return acc.concat(...item.getKeys());
    }, []);
  }

  values() {
    return this.buckets.reduce((acc, item) => {
      return acc.concat(...item.getValues());
    }, []);
  }

  entries() {
    return this.buckets.reduce((acc, item) => {
      return acc.concat(item.getEntries());
    }, []);
  }

  #resize(change) {
    const newMap = new HashMap();
    newMap.capacity = this.capacity * change;

    const entries = this.entries();

    for (const node of entries) {
      let key, value;
      [key, value] = node;
      newMap.set(key, value);
    }

    this.capacity = newMap.capacity;
    this.buckets = newMap.buckets;
  }
}

export { HashMap };
