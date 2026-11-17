import { describe, expect, it } from "vitest";
import { FIRST_ANTIPRIMES, SUPERIOR_ANTIPRIMES } from "../testing/antiprimeFixtures";
import { isAntiprime, isSuperiorAntiprime } from ".";

describe("isSuperiorAntiprime", () => {
  it.each(SUPERIOR_ANTIPRIMES)("recognises the OEIS superior antiprime %d and its negative", (n) => {
    expect(isSuperiorAntiprime(n)).toBe(true);
    expect(isSuperiorAntiprime(-n)).toBe(true);
  });

  it("matches the OEIS list for every n up to 5000", () => {
    for (let n = 1; n <= 5000; n++) {
      expect(isSuperiorAntiprime(n), `isSuperiorAntiprime(${n})`).toBe(SUPERIOR_ANTIPRIMES.includes(n));
    }
  });

  it.each(FIRST_ANTIPRIMES.filter((n) => !SUPERIOR_ANTIPRIMES.includes(n)))(
    "rejects the antiprime %d, which is not superior",
    (n) => {
      expect(isAntiprime(n)).toBe(true);
      expect(isSuperiorAntiprime(n)).toBe(false);
    },
  );

  it.each([-1, 3, 10, 30, 6064949221531199, 6064949221531201, Number.MAX_SAFE_INTEGER])(
    "%d is not a superior antiprime",
    (n) => {
      expect(isSuperiorAntiprime(n)).toBe(false);
    },
  );

  it.each(SUPERIOR_ANTIPRIMES)("superior antiprime %d is an antiprime", (n) => {
    expect(isAntiprime(n)).toBe(true);
  });

  it.each([0, 0.5, 1.5, -1.5, 100.1, NaN, Infinity, 2 ** 53])("throws RangeError for %d", (n) => {
    expect(() => isSuperiorAntiprime(n)).toThrow(RangeError);
  });

  it.each(["abc", "1"])("throws TypeError for the string %j", (n) => {
    expect(() => isSuperiorAntiprime(n as unknown as number)).toThrow(TypeError);
  });
});
