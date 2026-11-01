import type { PrimeFactor } from "../interfaces";
import { assertNonZeroSafeInteger } from "../internal/assertNumber";

/**
 * Finds the prime factorisation of a number.
 * @remarks
 * Negative numbers are judged by their absolute value. The prime factorisation of 1 is empty.
 * @param n - A non-zero safe integer.
 * @returns The prime factors of `n` in ascending order, each with an exponent of at least 1.
 * @throws `TypeError` If `n` is not a number.
 * @throws `RangeError` If `n` is zero, not an integer, or outside the safe integer range.
 * @since 1.0.0
 * @example
 * ```ts
 * primeFactors(360); // [{ factor: 2, exponent: 3 }, { factor: 3, exponent: 2 }, { factor: 5, exponent: 1 }]
 * primeFactors(1); // []
 * ```
 */
export function primeFactors(n: number): PrimeFactor[] {
  assertNonZeroSafeInteger(n);
  n = Math.abs(n);
  const result: PrimeFactor[] = [];
  for (let factor = 2; factor * factor <= n; factor += factor === 2 ? 1 : 2) {
    let exponent = 0;
    while (n % factor === 0) {
      n /= factor;
      exponent++;
    }
    if (exponent > 0) result.push({ factor, exponent });
  }
  if (n > 1) result.push({ factor: n, exponent: 1 });
  return result;
}
