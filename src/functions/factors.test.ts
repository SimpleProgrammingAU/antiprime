import { describe, expect, it } from "vitest";
import { factors } from ".";

describe("factors", () => {
  it.each([
    [0, [0]],
    [1, [1]],
    [2, [1, 2]],
    [3, [1, 3]],
    [-4, [1, 2, 4]],
    [-5, [1, 5]],
    [-6, [1, 2, 3, 6]],
    [7, [1, 7]],
    [8, [1, 2, 4, 8]],
    [9, [1, 3, 9]],
    [10, [1, 2, 5, 10]],
    [11, [1, 11]],
    [12, [1, 2, 3, 4, 6, 12]],
    [125, [1, 5, 25, 125]],
  ])("factors(%d) is %j", (n, expected) => {
    expect(factors(n)).toEqual(expected);
  });

  it("throws RangeError for a non-integer", () => {
    expect(() => factors(1.1)).toThrow(RangeError);
  });

  it.each(["abc", "1"])("throws TypeError for the string %j", (n) => {
    expect(() => factors(n as unknown as number)).toThrow(TypeError);
  });
});
