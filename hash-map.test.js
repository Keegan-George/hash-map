import { HashMap } from "./hash-map.js";
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

  describe("set() scenarios", () => {
    test("add node", () => {
      expect(map.get("ebony")).toBeNull();
      expect(map.has("ebony")).toBe(false);
      map.set("ebony", "blade");
      expect(map.get("ebony")).toBe("blade");
      expect(map.has("ebony")).toBe(true);
    });

    test("update node", () => {
      expect(map.get("dog")).toBe("brown");
      expect(map.has("dog")).toBe(true);
      map.set("dog", "cane corso");
      expect(map.get("dog")).toBe("cane corso");
      expect(map.has("dog")).toBe(true);
    });
  });

  describe("remove() scenarios", () => {
    test("Remove node", () => {
      expect(map.get("jacket")).toBe("blue");
      expect(map.has("jacket")).toBe(true);
      expect(map.remove("jacket")).toBe(true);
      expect(map.get("jacket")).toBeNull();
      expect(map.has("jacket")).toBe(false);
    });

    test("Remove non-existant node returns false", () => {
      expect(map.get("purple")).toBeNull();
      expect(map.has("purple")).toBe(false);
      expect(map.remove("purple")).toBe(false);
    });
  });

  describe("length() scenarios", () => {
    test("Get total number of nodes", () => {
      expect(map.length()).toBe(12);
    });

    test("Add node increases length", () => {
      expect(map.length()).toBe(12);
      map.set("flamingo", "pink");
      expect(map.length()).toBe(13);
    });

    test("Remove node decreases length", () => {
      expect(map.length()).toBe(12);
      map.remove("apple", "red");
      expect(map.length()).toBe(11);
    });

    describe("clear() scenarios", () => {
      test("clear map", () => {
        expect(map.length()).toBe(12);
        map.clear();
        expect(map.length()).toBe(0);
      });
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
