import { HashMap, CAPACITY } from "./hash-map.js";
import { test, expect, describe, beforeEach } from "@jest/globals";

let map;

const NODE_DATA = {
  apple: "red",
  banana: "yellow",
  carrot: "orange",
  dog: "brown",
  elephant: "gray",
  frog: "green",
  grape: "purple",
  hat: "black",
  "ice cream": "white",
  jacket: "blue",
  kite: "pink",
  lion: "golden",
};

describe("Positive cases", () => {
  beforeEach(() => {
    map = new HashMap();
    Object.entries(NODE_DATA).forEach(([k, v]) => map.set(k, v));
  });

  describe("Add/Update scenarios", () => {
    test("update existing node", () => {
      expect(map.get("dog")).toBe("brown");
      expect(map.has("dog")).toBe(true);
      expect(map.length()).toBe(12);
      map.set("dog", "cane corso");
      expect(map.get("dog")).toBe("cane corso");
      expect(map.has("dog")).toBe(true);
      expect(map.length()).toBe(12);
    });

    test("add node", () => {
      expect(map.get("moon")).toBeNull();
      expect(map.has("moon")).toBe(false);
      expect(map.length()).toBe(12);
      map.set("moon", "silver");
      expect(map.get("moon")).toBe("silver");
      expect(map.has("moon")).toBe(true);
      expect(map.length()).toBe(13);
    });

    test("HashMap size unchanged when node count equals limit", () => {
      expect(map.capacity).toBe(CAPACITY);
      map.set("carrot", "orange");
      expect(map.capacity).toBe(CAPACITY);
    });

    test("Resize HashMap when node count exceeds limit", () => {
      expect(map.capacity).toBe(CAPACITY);
      map.set("moon", "silver");
      expect(map.capacity).toBe(CAPACITY * 2);
    });
  });

  describe("Remove scenarios", () => {
    test("Remove node", () => {
      expect(map.get("jacket")).toBe("blue");
      expect(map.has("jacket")).toBe(true);
      expect(map.length()).toBe(12);
      expect(map.remove("jacket")).toBe(true);
      expect(map.get("jacket")).toBeNull();
      expect(map.has("jacket")).toBe(false);
      expect(map.length()).toBe(11);
    });

    test("Remove non-existant node returns false", () => {
      expect(map.get("moon")).toBeNull();
      expect(map.has("moon")).toBe(false);
      expect(map.remove("moon")).toBe(false);
    });

    test("clear", () => {
      expect(map.get("dog")).toBe("brown");
      expect(map.has("dog")).toBe(true);
      expect(map.length()).toBe(12);
      expect(map.capacity).toBe(CAPACITY);
      map.clear();
      expect(map.get("dog")).toBeNull();
      expect(map.has("dog")).toBe(false);
      expect(map.length()).toBe(0);
      expect(map.capacity).toBe(CAPACITY);
    });

    test("HashMap size unchanged when node count below limit", () => {
      expect(map.capacity).toBe(CAPACITY);
      map.remove("dog");
      expect(map.capacity).toBe(CAPACITY);
    });

    test("HashMap can return to default size after expanding", () => {
      expect(map.capacity).toBe(CAPACITY);
      map.set("moon", "silver");
      expect(map.capacity).toBe(CAPACITY * 2);
      map.remove("moon");
      expect(map.capacity).toBe(CAPACITY);
      map.remove("dog");
      expect(map.capacity).toBe(CAPACITY);
    });
  });

  describe("keys(), values(), entries()", () => {
    test("get keys, values, and entries", () => {
      expect(map.keys().sort()).toEqual(
        [
          "elephant",
          "carrot",
          "frog",
          "banana",
          "apple",
          "grape",
          "hat",
          "dog",
          "lion",
          "ice cream",
          "jacket",
          "kite",
        ].sort(),
      );

      expect(map.values().sort()).toEqual(
        [
          "gray",
          "orange",
          "green",
          "yellow",
          "red",
          "purple",
          "black",
          "brown",
          "golden",
          "white",
          "blue",
          "pink",
        ].sort(),
      );

      expect(map.entries().sort()).toEqual(
        [
          ["elephant", "gray"],
          ["carrot", "orange"],
          ["frog", "green"],
          ["banana", "yellow"],
          ["apple", "red"],
          ["grape", "purple"],
          ["hat", "black"],
          ["dog", "brown"],
          ["lion", "golden"],
          ["ice cream", "white"],
          ["jacket", "blue"],
          ["kite", "pink"],
        ].sort(),
      );
    });

    test("Add node updates keys, values, and entries", () => {
      map.set("moon", "silver");

      expect(map.keys().sort()).toEqual(
        [
          "elephant",
          "carrot",
          "frog",
          "banana",
          "apple",
          "grape",
          "hat",
          "dog",
          "lion",
          "ice cream",
          "jacket",
          "kite",
          "moon",
        ].sort(),
      );

      expect(map.values().sort()).toEqual(
        [
          "gray",
          "orange",
          "green",
          "yellow",
          "red",
          "purple",
          "black",
          "brown",
          "golden",
          "white",
          "blue",
          "pink",
          "silver",
        ].sort(),
      );

      expect(map.entries().sort()).toEqual(
        [
          ["elephant", "gray"],
          ["carrot", "orange"],
          ["frog", "green"],
          ["banana", "yellow"],
          ["apple", "red"],
          ["grape", "purple"],
          ["hat", "black"],
          ["dog", "brown"],
          ["lion", "golden"],
          ["ice cream", "white"],
          ["jacket", "blue"],
          ["kite", "pink"],
          ["moon", "silver"],
        ].sort(),
      );
    });

    test("Remove node updates keys, values, and entries", () => {
      map.remove("apple");

      expect(map.keys().sort()).toEqual(
        [
          "elephant",
          "carrot",
          "frog",
          "banana",
          "grape",
          "hat",
          "dog",
          "lion",
          "ice cream",
          "jacket",
          "kite",
        ].sort(),
      );

      expect(map.values().sort()).toEqual(
        [
          "gray",
          "orange",
          "green",
          "yellow",
          "purple",
          "black",
          "brown",
          "golden",
          "white",
          "blue",
          "pink",
        ].sort(),
      );

      expect(map.entries().sort()).toEqual(
        [
          ["elephant", "gray"],
          ["carrot", "orange"],
          ["frog", "green"],
          ["banana", "yellow"],
          ["grape", "purple"],
          ["hat", "black"],
          ["dog", "brown"],
          ["lion", "golden"],
          ["ice cream", "white"],
          ["jacket", "blue"],
          ["kite", "pink"],
        ].sort(),
      );
    });
  });
});

describe("Empty map cases", () => {
  beforeEach(() => {
    map = new HashMap();
  });

  test("get() on empty map returns null", () => {
    expect(map.get("frog")).toBeNull();
  });

  test("has() on empty map returns false", () => {
    expect(map.has("frog")).toBe(false);
  });

  test("remove() on empty map returns false", () => {
    expect(map.remove("frog")).toBe(false);
  });

  test("multiple remove() calls all return false", () => {
    expect(map.remove("frog")).toBe(false);
    expect(map.remove("banana")).toBe(false);
    expect(map.remove("ice cream")).toBe(false);
  });

  test("length() on empty map returns 0", () => {
    expect(map.length()).toBe(0);
  });

  test("clear() empty map", () => {
    map.clear();
    expect(map.length()).toBe(0);
  });

  test("keys() on empty map returns empty array", () => {
    expect(map.keys().length).toBe(0);
  });

  test("values() on empty map returns empty array", () => {
    expect(map.values().length).toBe(0);
  });

  test("entries() on empty map returns empty array", () => {
    map.clear();
    expect(map.entries().length).toBe(0);
  });
});
