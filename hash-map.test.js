import { HashMap } from "./hash-map.js";
import { test, expect, describe, beforeEach } from "@jest/globals";

let map;

describe("Positive cases", () => {
  beforeEach(() => {
    map = new HashMap();
    map.set("Peter", "Parker");
    map.set("Bruce", "Wayne");
    map.set("Clark", "Kent");
    map.set("Eric", "Brooks");
  });

  describe("get() scenarios", () => {
    test("Get node value", () => {
      expect(map.get("Peter")).toBe("Parker");
      expect(map.get("Bruce")).toBe("Wayne");
      expect(map.get("Clark")).toBe("Kent");
      expect(map.get("Eric")).toBe("Brooks");
    });

    test("Update node value", () => {
      expect(map.get("Bruce")).toBe("Wayne");
      map.set("Bruce", "Banner");
      expect(map.get("Bruce")).toBe("Banner");
    });

    test("Non-existant node returns null", () => {
      expect(map.get("Tony")).toBeNull();
    });
  });

  describe("has() scenarios", () => {
    test("Existant nodes return true", () => {
      expect(map.has("Peter")).toBe(true);
      expect(map.has("Bruce")).toBe(true);
      expect(map.has("Clark")).toBe(true);
      expect(map.has("Eric")).toBe(true);
    });

    test("Non-existant node return false", () => {
      expect(map.has("Tony")).toBe(false);
    });
  });
});
