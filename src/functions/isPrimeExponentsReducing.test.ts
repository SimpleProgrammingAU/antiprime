import { describe, expect, it } from "vitest";
import type { PrimeFactor } from "../interfaces";
import { isPrimeExponentsReducing, primeFactors } from ".";

describe("isPrimeExponentsReducing", () => {
  it.each([1, -1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 100])("is true for the prime factors of %d", (n) => {
    expect(isPrimeExponentsReducing(primeFactors(n))).toBe(true);
  });

  it.each([18, 90, 300])("is false for the prime factors of %d", (n) => {
    expect(isPrimeExponentsReducing(primeFactors(n))).toBe(false);
  });

  it.each([0, { exponent: 1, factor: 2 }, [{ exponent: "a", factor: "b" }], [{ exponent: 1 }], "abc", undefined])(
    "throws TypeError for %j",
    (input) => {
      expect(() => isPrimeExponentsReducing(input as unknown as PrimeFactor[])).toThrow(TypeError);
    },
  );
});
