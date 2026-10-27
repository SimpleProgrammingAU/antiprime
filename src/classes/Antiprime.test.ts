import { describe, expect, it } from "vitest";
import { Antiprime } from ".";

describe("Antiprime", () => {
  it("handles a negative non-antiprime (-10)", () => {
    const ap = new Antiprime(-10);
    expect(ap.value).toBe(10);
    expect(ap.nextAntiprime().value).toBe(12);
    expect(ap.previousAntiprime().value).toBe(6);
    expect(ap.isAntiprime()).toBe(false);
    expect(ap.getFactors()).toEqual([1, 2, 5, 10]);
    expect(ap.getPrimeFactors()).toEqual([
      { factor: 2, exponent: 1 },
      { factor: 5, exponent: 1 },
    ]);
  });

  it("handles a negative antiprime (-12)", () => {
    const ap = new Antiprime(-12);
    expect(ap.nextAntiprime().value).toBe(24);
    expect(ap.previousAntiprime().value).toBe(6);
    expect(ap.isAntiprime()).toBe(true);
    expect(ap.getFactors()).toEqual([1, 2, 3, 4, 6, 12]);
    expect(ap.getPrimeFactors()).toEqual([
      { factor: 2, exponent: 2 },
      { factor: 3, exponent: 1 },
    ]);
  });

  it("handles 1", () => {
    const ap = new Antiprime(1);
    expect(ap.nextAntiprime().value).toBe(2);
    expect(() => ap.previousAntiprime()).toThrow();
    expect(ap.isAntiprime()).toBe(true);
    expect(ap.getFactors()).toEqual([1]);
    expect(ap.getPrimeFactors()).toEqual([{ factor: 2, exponent: 0 }]);
  });

  it("handles an antiprime via the highly composite aliases (36)", () => {
    const ap = new Antiprime(36);
    expect(ap.nextHighlyCompositeNumber().value).toBe(48);
    expect(ap.previousHighlyCompositeNumber().value).toBe(24);
    expect(ap.isHighlyCompositeNumber()).toBe(true);
    expect(ap.getFactors()).toEqual([1, 2, 3, 4, 6, 9, 12, 18, 36]);
    expect(ap.getPrimeFactors()).toEqual([
      { factor: 2, exponent: 2 },
      { factor: 3, exponent: 2 },
    ]);
  });

  it("handles a non-antiprime via the highly composite aliases (125)", () => {
    const ap = new Antiprime(125);
    expect(ap.nextHighlyCompositeNumber().value).toBe(180);
    expect(ap.previousHighlyCompositeNumber().value).toBe(120);
    expect(ap.isHighlyCompositeNumber()).toBe(false);
    expect(ap.getFactors()).toEqual([1, 5, 25, 125]);
    expect(ap.getPrimeFactors()).toEqual([{ factor: 5, exponent: 3 }]);
  });

  it("handles a larger antiprime (5040)", () => {
    const ap = new Antiprime(5040);
    expect(ap.nextHighlyCompositeNumber().value).toBe(7560);
    expect(ap.previousHighlyCompositeNumber().value).toBe(2520);
    expect(ap.isHighlyCompositeNumber()).toBe(true);
    expect(ap.getFactors()).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24, 28, 30, 35, 36, 40, 42, 45, 48, 56, 60, 63, 70, 72,
      80, 84, 90, 105, 112, 120, 126, 140, 144, 168, 180, 210, 240, 252, 280, 315, 336, 360, 420, 504, 560, 630, 720,
      840, 1008, 1260, 1680, 2520, 5040,
    ]);
    expect(ap.getPrimeFactors()).toEqual([
      { factor: 2, exponent: 4 },
      { factor: 3, exponent: 2 },
      { factor: 5, exponent: 1 },
      { factor: 7, exponent: 1 },
    ]);
  });

  it("throws TypeError for a string", () => {
    expect(() => new Antiprime("a" as unknown as number)).toThrow(TypeError);
  });

  it.each([10.5, 0])("throws for %d", (n) => {
    expect(() => new Antiprime(n)).toThrow();
  });
});
