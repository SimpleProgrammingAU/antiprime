import { describe, expect, it } from "vitest";
import { isAntiprime, primeFactors } from ".";

describe("isAntiprime", () => {
  it.each([-1, 1, 2, 4, 6])("%d is an antiprime", (n) => {
    expect(isAntiprime(n)).toBe(true);
  });

  it.each([3, 5, 15, 18, 90])("%d is not an antiprime", (n) => {
    expect(isAntiprime(n)).toBe(false);
  });

  it("uses precomputed prime factors", () => {
    expect(isAntiprime(12, primeFactors(12))).toBe(true);
    expect(isAntiprime(-12, primeFactors(12))).toBe(true);
    expect(isAntiprime(1, [])).toBe(true);
  });

  it.each([0, 0.5, 1.5, -1.5, 100.1, NaN, Infinity, 2 ** 53])("throws RangeError for %d", (n) => {
    expect(() => isAntiprime(n)).toThrow(RangeError);
  });

  it("throws RangeError when the prime factors do not belong to n", () => {
    expect(() => isAntiprime(10, primeFactors(12))).toThrow(RangeError);
    expect(() => isAntiprime(4, [{ factor: 4, exponent: 1 }])).toThrow(RangeError);
  });

  it.each(["abc", "1"])("throws TypeError for the string %j", (n) => {
    expect(() => isAntiprime(n as unknown as number)).toThrow(TypeError);
  });
});
