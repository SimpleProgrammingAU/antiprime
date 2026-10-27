import { describe, expect, it } from "vitest";
import { isAntiprimeCandidate, primeFactors } from ".";

describe("isAntiprimeCandidate", () => {
  it.each([-1, 1, 2, 4, 6, 36])("%d is a candidate", (n) => {
    expect(isAntiprimeCandidate(n)).toBe(true);
  });

  it.each([3, 5, 9, 10, 18, 72])("%d is not a candidate", (n) => {
    expect(isAntiprimeCandidate(n)).toBe(false);
  });

  it("uses precomputed prime factors", () => {
    expect(isAntiprimeCandidate(12, primeFactors(12))).toBe(true);
  });

  it.each([0, 1.5, NaN])("throws RangeError for %d", (n) => {
    expect(() => isAntiprimeCandidate(n)).toThrow(RangeError);
  });

  it("throws RangeError when the prime factors do not belong to n", () => {
    expect(() => isAntiprimeCandidate(10, primeFactors(12))).toThrow(RangeError);
  });

  it("throws TypeError for a string", () => {
    expect(() => isAntiprimeCandidate("abc" as unknown as number)).toThrow(TypeError);
  });
});
