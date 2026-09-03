import { HashMap, CAPACITY } from "./hash-map.js";
import { test, expect, describe, beforeEach } from "@jest/globals";

let map;

describe("Positive cases", () => {
  beforeEach(() => {
    map = new HashMap();
    map.set("apple", "red");
    map.set("banana", "yellow");
    map.set("carrot", "orange");
    map.set("dog", "brown");
    map.set("elephant", "gray");
    map.set("frog", "green");
    map.set("grape", "purple");
    map.set("hat", "black");
    map.set("ice cream", "white");
    map.set("jacket", "blue");
    map.set("kite", "pink");
    map.set("lion", "golden");
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

    test("map size unchanged when nodes equal loadFactor * capacity", () => {
      expect(map.capacity).toBe(CAPACITY);
      map.set("carrot", "orange");
      expect(map.capacity).toBe(CAPACITY);
    });

    test("Resize map when nodes exceeds loadFactor * capacity", () => {
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
      map.clear();
      expect(map.get("dog")).toBeNull();
      expect(map.has("dog")).toBe(false);
      expect(map.length()).toBe(0);
    });
  });

  describe("keys(), values(), entries()", () => {
    test("get all keys", () => {
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
    });

    test("get all values", () => {
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
    });

    test("get all key:value pairs", () => {
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
      map.set("zebra", "striped");

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
          "zebra",
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
          "striped",
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
          ["zebra", "striped"],
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
