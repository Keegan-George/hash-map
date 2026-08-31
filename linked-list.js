/**
 * A singly linked list implementation for use in a hash map.
 * Supports insertion, removal, and search operations of key:value pairs.
 */
class LinkedList {
  constructor() {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  /**
   * Appends a node to the end of the list.
   * @param {*} key - The node's key.
   * @param {*} value - The node's value.
   * @returns {void}
   */
  append(key, value) {
    const node = new Node(key, value);

    if (!this._head) {
      this._head = node;
      this._tail = node;
    } else {
      this._tail.nextNode = node;
      this._tail = node;
    }

    this._size++;
  }

  /**
   * Prepends a node to the beginning of the list.
   * @param {*} value - The node's key.
   * @param {*} value - The node's value.
   * @returns {void}
   */
  prepend(key, value) {
    const node = new Node(key, value);

    if (!this._head) {
      this._head = node;
      this._tail = node;
    } else {
      node.nextNode = this._head;
      this._head = node;
    }

    this._size++;
  }

  /**
   * The number of nodes in the list.
   * @type {number}
   * @readonly
   */
  get size() {
    return this._size;
  }

  /**
   * The key stored in the head node.
   * @type {*|undefined}
   * @readonly
   */
  get head() {
    return this._head?.key;
  }

  /**
   * The key stored in the tail node.
   * @type {*|undefined}
   * @readonly
   */
  get tail() {
    return this._tail?.key;
  }

  /**
   * Retrieves the key at a given index.
   * @param {number} index - Zero-based index.
   * @returns {*|undefined} The key at the index, or undefined if out of range.
   */
  at(index) {
    const node = this.#getNode(index);
    return node?.key;
  }

  /**
   * Removes the first node in the list and returns its key and value
   * @returns {*|undefined} The removed node, or undefined if the list is empty.
   */
  pop() {
    if (!this._size) {
      return undefined;
    }

    const node = this._head;
    this._head = this._head.nextNode;

    if (!this._head) {
      this._tail = null;
    }

    this._size--;

    return { key: node.key, value: node.value };
  }

  /**
   * Checks whether a key exists in the list.
   * @param {*} key - The key to search for.
   * @returns {boolean} True if found, otherwise false.
   */
  contains(key) {
    let current = this._head;

    while (current) {
      if (current.key === key) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }

  /**
   * Finds the index of a given key.
   * @param {*} key - The key to search for.
   * @returns {number} The index, or -1 if not found.
   */
  findIndex(key) {
    let current = this._head;
    let i = 0;

    while (current) {
      if (current.key === key) {
        return i;
      }
      current = current.nextNode;
      i++;
    }

    return -1;
  }

  /**
   * Converts the list into a readable string representation.
   * Returns an empty string if the list is empty.
   * @returns {string} A formatted string of node key:value pairs.
   */
  toString() {
    let current = this._head;
    let out = "";

    if (!this._size) {
      return out;
    }

    while (current) {
      out += `( ${current.key}:${current.value} ) -> `;
      current = current.nextNode;
    }

    return out + "null";
  }

  /**
   * Removes the node at a given index.
   * @param {number} index - Zero-based index of the node to remove.
   * @throws {RangeError} If index is out of bounds.
   * @returns {void}
   */
  removeAt(index) {
    if (index < 0 || index >= this._size) {
      throw new RangeError();
    }

    if (index === 0) {
      this.pop();
      return;
    }

    //get the node before removal index
    const before = this.#getNode(index - 1);

    //node to be removed
    let remove = before.nextNode;

    //node after the one to be removed
    let after = remove.nextNode;

    //update the previous node's nextNode property
    before.nextNode = after;

    if (index === this._size - 1) {
      this._tail = before;
    }

    this._size--;
  }

  /**
   * Retrieves the node at a given index.
   * @private
   * @param {number} index - Zero-based index.
   * @returns {Node|null} The node, or null if out of range.
   */
  #getNode(index) {
    if (index < 0 || index >= this._size) {
      return null;
    }

    let current = this._head;
    for (let i = 0; i < index; i++) {
      current = current.nextNode;
    }
    return current;
  }
}

/**
 * A node in a singly linked list.
 */
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}

export { LinkedList };
