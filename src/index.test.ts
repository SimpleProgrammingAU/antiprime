import { describe, expect, it } from "vitest";
import type { PrimeFactor } from ".";
import * as antiprime from ".";

describe("public API", () => {
  it("exports every function and class", () => {
    expect(Object.keys(antiprime).sort()).toEqual([
      "Antiprime",
      "HighlyCompositeNumber",
      "factors",
      "isAntiprime",
      "isAntiprimeCandidate",
      "isConsecutivePrimeFactors",
      "isHighlyComposite",
      "isPrime",
      "isPrimeExponentsReducing",
      "nextPrime",
      "primeFactors",
    ]);
  });

  it("exports the highly composite names as aliases", () => {
    expect(antiprime.HighlyCompositeNumber).toBe(antiprime.Antiprime);
    expect(antiprime.isHighlyComposite).toBe(antiprime.isAntiprime);
  });

  it("exports the PrimeFactor type", () => {
    const primeFactors: PrimeFactor[] = [{ factor: 2, exponent: 1 }];
    expect(antiprime.isPrimeExponentsReducing(primeFactors)).toBe(true);
  });
});
