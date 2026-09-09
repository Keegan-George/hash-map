# Hash Map

A Hash Map implementation that supports insertion, removal, and search operations.
Automatically resizes when load factor thresholds are crossed.
Uses an internal Linked List for collision handling.
Supports string keys and values only.

This is part of [The Odin Project's Full Stack JavaScript path](https://www.theodinproject.com/paths/full-stack-javascript) and focuses on data structure implementation.

## Installation

1. Clone the repository
2. Navigate to the project folder: `cd hash-map`
3. Install dependencies: `npm install`
4. Run the test suite: `npm test`

## Methods

- set(key, value) — Inserts or updates a key–value pair in the hash map.
- get(key) — Retrieves the value associated with a given key.
- has(key) — Checks whether a key exists in the hash map.
- remove(key) — Removes a key–value pair from the hash map.
- length() — Computes the total number of stored key–value pairs.
- clear() — Clears all entries and resets the hash map to initial capacity.
- keys() — Returns an array of all keys stored in the hash map.
- values() — Returns an array of all values stored in the hash map.
- entries() — Returns an array of `[key, value]` pairs stored in the hash map.

## Example

```javascript
import { HashMap } from "./hash-map.js";

// Instantiate new Hash Map
const map = new HashMap();

// Add entries to map
map.set("A", "1");
map.set("B", "2");
map.set("C", "3");

console.log(map.get("B"));
// "2"

console.log(map.has("C"));
// true

console.log(map.has("D"));
// false

console.log(map.length());
// 3

console.log(map.keys());
// ["A", "B", "C"]

console.log(map.values());
// ["1", "2", "3"]

console.log(map.entries());
// [["A", "1"], ["B", "2"], ["C", "3"]]

console.log(map.remove("B"));
// true

console.log(map.remove("B"));
// false

console.log(map.keys());
// ["A", "C"]

console.log(map.values());
// ["1", "3"]

console.log(map.entries());
// [["A", "1"], ["C", "3"]]

map.clear();
console.log(map.entries());
// []
```

## Features

- Comprehensive Jest unit tests
- Test-Driven Development (TDD)
- Internal Linked List implementation

## Technologies

- JavaScript
- Jest
