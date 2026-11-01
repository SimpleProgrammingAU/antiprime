import { describe, expect, it } from "vitest";
import { isPrime } from ".";

describe("isPrime", () => {
  it.each([2, 3, 5, 7, 11, 13, 97, -97, 7919, 1000003, 9007199254740881])("%d is prime", (n) => {
    expect(isPrime(n)).toBe(true);
  });

  it.each([0, 0.1, -1, 1, 1.1, -1.1, 10.5, -100.5, 4, 6, 8, 9, 10, 25, 35, 49, 7917, 1000001, Number.MAX_SAFE_INTEGER])(
    "%d is not prime",
    (n) => {
      expect(isPrime(n)).toBe(false);
    },
  );

  it.each([NaN, Infinity, -Infinity, 2 ** 53, -(2 ** 53)])("throws RangeError for %d", (n) => {
    expect(() => isPrime(n)).toThrow(RangeError);
  });

  it.each(["abc", "1"])("throws TypeError for the string %j", (n) => {
    expect(() => isPrime(n as unknown as number)).toThrow(TypeError);
  });
});
