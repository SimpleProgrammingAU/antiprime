import { describe, expect, it } from "vitest";
import { primeFactors } from ".";

describe("primeFactors", () => {
  it.each([
    [1, [{ factor: 2, exponent: 0 }]],
    [-1, [{ factor: 2, exponent: 0 }]],
    [2, [{ factor: 2, exponent: 1 }]],
    [3, [{ factor: 3, exponent: 1 }]],
    [4, [{ factor: 2, exponent: 2 }]],
    [5, [{ factor: 5, exponent: 1 }]],
    [
      6,
      [
        { factor: 2, exponent: 1 },
        { factor: 3, exponent: 1 },
      ],
    ],
    [7, [{ factor: 7, exponent: 1 }]],
    [8, [{ factor: 2, exponent: 3 }]],
    [9, [{ factor: 3, exponent: 2 }]],
    [
      10,
      [
        { factor: 2, exponent: 1 },
        { factor: 5, exponent: 1 },
      ],
    ],
    [
      12,
      [
        { factor: 2, exponent: 2 },
        { factor: 3, exponent: 1 },
      ],
    ],
    [
      100,
      [
        { factor: 2, exponent: 2 },
        { factor: 5, exponent: 2 },
      ],
    ],
  ])("primeFactors(%d) is %j", (n, expected) => {
    expect(primeFactors(n)).toEqual(expected);
  });

  it("throws TypeError for zero", () => {
    expect(() => primeFactors(0)).toThrow(TypeError);
  });

  it.each([12.1, -12.1])("throws RangeError for the non-integer %d", (n) => {
    expect(() => primeFactors(n)).toThrow(RangeError);
  });

  it.each(["abc", "1"])("throws TypeError for the string %j", (n) => {
    expect(() => primeFactors(n as unknown as number)).toThrow(TypeError);
  });
});
