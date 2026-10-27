import { describe, expect, it } from "vitest";
import { isAntiprimeCandidate, primeFactors } from ".";

describe("isAntiprimeCandidate", () => {
  it.each([-1, 1, 2, 4, 6])("%d is a candidate", (n) => {
    expect(isAntiprimeCandidate(n)).toBe(true);
  });

  it.each([3, 5])("%d is not a candidate", (n) => {
    expect(isAntiprimeCandidate(n)).toBe(false);
  });

  it("uses precomputed prime factors", () => {
    expect(isAntiprimeCandidate(12, primeFactors(12))).toBe(true);
  });

  it("throws TypeError for a string", () => {
    expect(() => isAntiprimeCandidate("abc" as unknown as number)).toThrow(TypeError);
  });
});
