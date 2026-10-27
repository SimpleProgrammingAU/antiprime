import type { PrimeFactor } from "../interfaces";
import { antiprimesUpTo } from "../internal/antiprimes";
import { assertNonZeroSafeInteger } from "../internal/assertNumber";
import { isAntiprimeCandidate } from "./isAntiprimeCandidate";

/**
 * Determines whether a number is an antiprime: a positive integer with more factors than any smaller positive integer.
 * @remarks
 * Also exported as `isHighlyComposite`. Negative numbers are judged by their absolute value.
 * @param n - A non-zero safe integer.
 * @param pf - The prime factorisation of `n`, if already known; it is checked against `n`.
 * @returns `true` if the absolute value of `n` is an antiprime; otherwise `false`.
 * @throws `TypeError` If `n` is not a number, or `pf` is not an array of prime factor objects.
 * @throws `RangeError` If `n` is zero, not an integer, or outside the safe integer range, or `pf` is not the prime
 * factorisation of `n`.
 * @since 1.0.0
 * @example
 * ```ts
 * isAntiprime(12); // true
 * isAntiprime(-12); // true
 * isAntiprime(30); // false
 * isAntiprime(12, primeFactors(12)); // true
 * ```
 */
export function isAntiprime(n: number, pf?: readonly PrimeFactor[]): boolean {
  assertNonZeroSafeInteger(n);
  n = Math.abs(n);
  if (!isAntiprimeCandidate(n, pf)) return false;
  return antiprimesUpTo(n).at(-1) === n;
}
