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
    test("update node", () => {
      expect(map.get("dog")).toBe("brown");
      expect(map.has("dog")).toBe(true);
      expect(map.length()).toBe(12);
      map.set("dog", "cane corso");
      expect(map.get("dog")).toBe("cane corso");
      expect(map.has("dog")).toBe(true);
      expect(map.length()).toBe(12);
    });

    test("repeated node updates", () => {
      expect(map.get("dog")).toBe("brown");
      expect(map.has("dog")).toBe(true);
      expect(map.length()).toBe(12);
      map.set("dog", "cane corso");
      expect(map.get("dog")).toBe("cane corso");
      expect(map.has("dog")).toBe(true);
      expect(map.length()).toBe(12);
      map.set("dog", "pit bull");
      expect(map.get("dog")).toBe("pit bull");
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

    test("HashMap size unchanged when node count reaches threshold", () => {
      expect(map.capacity).toBe(CAPACITY);
      map.set("carrot", "orange");
      expect(map.capacity).toBe(CAPACITY);
    });

    test("Resize HashMap when node count exceeds threshold", () => {
      expect(map.capacity).toBe(CAPACITY);
      map.set("moon", "silver");
      expect(map.capacity).toBe(CAPACITY * 2);
    });

    test("Resize preserves all entries", () => {
      map.set("moon", "silver");

      Object.entries(NODE_DATA).forEach(([k, v]) => {
        expect(map.get(k)).toBe(v);
      });

      expect(map.get("moon")).toBe("silver");
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
      expect(map.keys()).toEqual([]);
      expect(map.values()).toEqual([]);
      expect(map.entries()).toEqual([]);
    });

    test("Can add node after clearing", () => {
      expect(map.length()).toBe(12);
      map.clear();
      expect(map.set("moon", "silver"));
      expect(map.get("moon")).toBe("silver");
      expect(map.has("moon")).toBe(true);
      expect(map.length()).toBe(1);
    });

    test("HashMap size unchanged when node count below threshold", () => {
      expect(map.capacity).toBe(CAPACITY);
      map.remove("dog");
      expect(map.capacity).toBe(CAPACITY);
    });

    test("HashMap size does not oscillate after expanding", () => {
      expect(map.capacity).toBe(CAPACITY);
      map.set("moon", "silver");
      expect(map.capacity).toBe(CAPACITY * 2);
      map.remove("moon");
      expect(map.capacity).toBe(CAPACITY * 2);
    });

    test("HashMap can shrink after resizing when length drops below threshold", () => {
      expect(map.capacity).toBe(CAPACITY);
      map.set("moon", "silver");
      expect(map.capacity).toBe(CAPACITY * 2);
      map.remove("moon");
      expect(map.capacity).toBe(CAPACITY * 2);
      map.remove("dog");
      expect(map.capacity).toBe(CAPACITY);
    });

    test("HashMap never falls below minimum capacity", () => {
      expect(map.capacity).toBe(CAPACITY);
      map.set("moon", "silver");
      expect(map.capacity).toBe(CAPACITY * 2);
      map.remove("moon");
      expect(map.capacity).toBe(CAPACITY * 2);
      map.remove("dog");
      map.remove("apple");
      map.remove("banana");
      map.remove("carrot");
      map.remove("elephant");
      map.remove("frog");
      expect(map.length()).toBe(6);
      expect(map.capacity).toBe(CAPACITY);
      map.remove("grape");
      expect(map.length()).toBe(5);
      expect(map.capacity).toBe(CAPACITY);
    });

    test("Return to default size preserves all entries", () => {
      map.set("moon", "silver");

      Object.entries(NODE_DATA).forEach(([k, v]) => {
        expect(map.get(k)).toBe(v);
      });

      map.remove("moon");

      Object.entries(NODE_DATA).forEach(([k, v]) => {
        expect(map.get(k)).toBe(v);
      });

      expect(map.get("moon")).toBeNull();
    });
  });

  describe("keys(), values(), entries()", () => {
    test("get keys, values, and entries", () => {
      expect(map.keys().sort()).toEqual(Object.keys(NODE_DATA).sort());
      expect(map.values().sort()).toEqual(Object.values(NODE_DATA).sort());
      expect(map.entries().sort()).toEqual(Object.entries(NODE_DATA).sort());
    });

    test("keys are unique", () => {
      expect(new Set(map.keys()).size).toBe(map.keys().length);
    });

    test("length() equals keys().length", () => {
      expect(map.length()).toEqual(map.keys().length);
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
    expect(map.keys()).toEqual([]);
  });

  test("values() on empty map returns empty array", () => {
    expect(map.values()).toEqual([]);
  });

  test("entries() on empty map returns empty array", () => {
    map.clear();
    expect(map.entries()).toEqual([]);
  });
});

describe("Edgecase strings", () => {
  beforeEach(() => {
    map = new HashMap();
    Object.entries(NODE_DATA).forEach(([k, v]) => map.set(k, v));
  });
  describe("Edgecase string keys", () => {
    test("Empty string key", () => {
      map.set("", "empty");
      expect(map.get("")).toBe("empty");
      expect(map.has("")).toBe(true);
      expect(map.remove("")).toBe(true);
      expect(map.get("")).toBeNull();
      expect(map.has("")).toBe(false);
    });

    test("Special characters key", () => {
      const chars = "!@#$%^&*()";

      map.set(chars, "special");
      expect(map.get(chars)).toBe("special");
      expect(map.has(chars)).toBe(true);
      expect(map.remove(chars)).toBe(true);
      expect(map.get("")).toBeNull();
      expect(map.has(chars)).toBe(false);
    });

    test("Long character key", () => {
      const longKey = "x".repeat(5000);
      map.set(longKey, "long");
      expect(map.get(longKey)).toBe("long");
      expect(map.has(longKey)).toBe(true);
      expect(map.remove(longKey)).toBe(true);
      expect(map.get(longKey)).toBeNull();
      expect(map.has(longKey)).toBe(false);
    });
  });

  describe("Edgecase string values", () => {
    test("Empty string value", () => {
      map.set("empty", "");
      expect(map.get("empty")).toBe("");
      expect(map.remove("empty")).toBe(true);
      expect(map.get("empty")).toBeNull();
    });

    test("Special characters value", () => {
      const chars = "!@#$%^&*()";

      map.set("special", chars);
      expect(map.get("special")).toBe(chars);
      expect(map.remove("special")).toBe(true);
      expect(map.get("special")).toBeNull();
    });

    test("Long character value", () => {
      const longValue = "x".repeat(5000);
      map.set("long", longValue);
      expect(map.get("long")).toBe(longValue);
      expect(map.remove("long")).toBe(true);
      expect(map.get("long")).toBeNull();
    });
  });
});

describe("Collision tests", () => {
  beforeEach(() => {
    map = new HashMap();
    map.set("grape", "purple");
    map.set("hat", "black");
  });

  test("multiple nodes in same bucket are retrievable", () => {
    expect(map.get("grape")).toBe("purple");
    expect(map.get("hat")).toBe("black");
  });

  test("remove node in collision bucket preserves other node", () => {
    expect(map.remove("grape")).toBe(true);
    expect(map.get("grape")).toBeNull();
    expect(map.get("hat")).toBe("black");
  });

  test("overwrite node in collision bucket works correctly", () => {
    map.set("hat", "cowboy");
    expect(map.get("hat")).toBe("cowboy");
    expect(map.get("grape")).toBe("purple");
  });

  test("resize preserves collision bucket", () => {
    // trigger resize
    for (let i = 0; i < 20; i++) {
      map.set(`extra${i}`, `${i}`);
    }

    expect(map.get("grape")).toBe("purple");
    expect(map.get("hat")).toBe("black");
  });
});
