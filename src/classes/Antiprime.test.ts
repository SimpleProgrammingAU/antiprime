import { describe, expect, it } from "vitest";
import { FIRST_ANTIPRIMES } from "../testing/antiprimeFixtures";
import { Antiprime } from ".";

describe("Antiprime", () => {
  it("walks forwards through the OEIS antiprimes", () => {
    let ap = new Antiprime(1);
    const seen = [ap.value];
    while (seen.length < FIRST_ANTIPRIMES.length) {
      ap = ap.nextAntiprime();
      seen.push(ap.value);
    }
    expect(seen).toEqual(FIRST_ANTIPRIMES);
  });

  it("walks backwards through the OEIS antiprimes", () => {
    let ap = new Antiprime(2162161);
    const seen: number[] = [];
    while (ap.value > 1) {
      ap = ap.previousAntiprime();
      seen.push(ap.value);
    }
    expect(seen).toEqual([...FIRST_ANTIPRIMES].reverse());
  });

  it("finds the antiprime after 720720", () => {
    expect(new Antiprime(720720).nextAntiprime().value).toBe(1081080);
  });

  it("throws RangeError when the next antiprime is beyond the safe integer range", () => {
    expect(() => new Antiprime(Number.MAX_SAFE_INTEGER).nextAntiprime()).toThrow(RangeError);
  });

  it.each([
    [1, 1],
    [2, 2],
    [12, 6],
    [-36, 9],
    [97, 2],
    [5040, 60],
    [2162160, 320],
  ])("new Antiprime(%d).factorCount is %d", (n, expected) => {
    expect(new Antiprime(n).factorCount).toBe(expected);
  });

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
    expect(() => ap.previousAntiprime()).toThrow(new RangeError("1 is the smallest antiprime"));
    expect(ap.isAntiprime()).toBe(true);
    expect(ap.getFactors()).toEqual([1]);
    expect(ap.getPrimeFactors()).toEqual([]);
  });

  it("returns copies that callers can change safely", () => {
    const ap = new Antiprime(12);
    ap.getFactors().reverse();
    const primeFactors = ap.getPrimeFactors();
    primeFactors[0] = { factor: 7, exponent: 7 };
    primeFactors.pop();
    const [first] = ap.getPrimeFactors();
    if (first) first.exponent = 99;
    expect(ap.getFactors()).toEqual([1, 2, 3, 4, 6, 12]);
    expect(ap.getPrimeFactors()).toEqual([
      { factor: 2, exponent: 2 },
      { factor: 3, exponent: 1 },
    ]);
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

  it.each([10.5, 0, NaN, Infinity, 2 ** 53])("throws RangeError for %d", (n) => {
    expect(() => new Antiprime(n)).toThrow(RangeError);
  });
});
