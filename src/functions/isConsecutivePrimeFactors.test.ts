import { describe, expect, it } from "vitest";
import type { PrimeFactor } from "../interfaces";
import { isConsecutivePrimeFactors, primeFactors } from ".";

describe("isConsecutivePrimeFactors", () => {
  it.each([1, -1, 2, 4, 6, 8, 12, 36])("is true for the prime factors of %d", (n) => {
    expect(isConsecutivePrimeFactors(primeFactors(n))).toBe(true);
  });

  it.each([3, 5, 7, 9, 10, 21, 45, 100])("is false for the prime factors of %d", (n) => {
    expect(isConsecutivePrimeFactors(primeFactors(n))).toBe(false);
  });

  it.each([0, { exponent: 1, factor: 2 }, [{ exponent: "a", factor: "b" }], [{ exponent: 1 }], "abc", undefined])(
    "throws TypeError for %j",
    (input) => {
      expect(() => isConsecutivePrimeFactors(input as unknown as PrimeFactor[])).toThrow(TypeError);
    },
  );
});
