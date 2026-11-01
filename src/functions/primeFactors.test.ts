import { describe, expect, it } from "vitest";
import { primeFactors } from ".";

describe("primeFactors", () => {
  it.each([
    [1, []],
    [-1, []],
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
    [
      194,
      [
        { factor: 2, exponent: 1 },
        { factor: 97, exponent: 1 },
      ],
    ],
    [
      Number.MAX_SAFE_INTEGER,
      [
        { factor: 6361, exponent: 1 },
        { factor: 69431, exponent: 1 },
        { factor: 20394401, exponent: 1 },
      ],
    ],
  ])("primeFactors(%d) is %j", (n, expected) => {
    expect(primeFactors(n)).toEqual(expected);
  });

  it.each([0, 12.1, -12.1, NaN, Infinity, 2 ** 53])("throws RangeError for %d", (n) => {
    expect(() => primeFactors(n)).toThrow(RangeError);
  });

  it.each(["abc", "1"])("throws TypeError for the string %j", (n) => {
    expect(() => primeFactors(n as unknown as number)).toThrow(TypeError);
  });
});
