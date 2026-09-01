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
});
