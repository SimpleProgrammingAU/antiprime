import type { PrimeFactor } from "../interfaces";
import { assertNonZeroSafeInteger } from "../internal/assertNumber";

/**
 * Finds all prime factors and their exponents for a given input number
 * @param n the input number to find the prime factors
 * @returns an array of PrimeFactors with value and exponent
 * @throws `RangeError` when the input is not an integer value not equal to zero
 * @throws `TypeError` when the input is not an number value
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
