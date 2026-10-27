import { describe, expect, it } from "vitest";
import { nextPrime } from ".";

describe("nextPrime", () => {
  it.each([
    [0, 2],
    [0.1, 2],
    [-1, 2],
    [1, 2],
    [1.1, 2],
    [-1.1, 2],
    [10.5, 11],
    [-100.5, 101],
    [2, 3],
    [3, 5],
    [4, 5],
    [5, 7],
    [6, 7],
    [7, 11],
    [8, 11],
    [9, 11],
    [10, 11],
    [97, 101],
  ])("nextPrime(%d) is %d", (n, expected) => {
    expect(nextPrime(n)).toBe(expected);
  });

  it.each(["abc", "1"])("throws TypeError for the string %j", (n) => {
    expect(() => nextPrime(n as unknown as number)).toThrow(TypeError);
  });
});
