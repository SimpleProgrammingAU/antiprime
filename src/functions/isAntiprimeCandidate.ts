import type { PrimeFactor } from "../interfaces";
import { assertNonZeroSafeInteger } from "../internal/assertNumber";
import { assertPrimeFactorisationOf } from "../internal/assertPrimeFactorisation";
import { isConsecutivePrimeFactors } from "./isConsecutivePrimeFactors";
import { isPrimeExponentsReducing } from "./isPrimeExponentsReducing";
import { primeFactors } from "./primeFactors";

/**
 * Determines whether a number is an antiprime candidate: it passes the tests that every antiprime passes.
 * @remarks
 * A candidate's prime factors are the first k primes, its exponents never increase, and its largest prime factor has an
 * exponent of 1 (except for 4 and 36). Every antiprime is a candidate, but not every candidate is an antiprime.
 * Negative numbers are judged by their absolute value.
 * @param n - A non-zero safe integer.
 * @param pf - The prime factorisation of `n`, if already known; it is checked against `n`.
 * @returns `true` if the absolute value of `n` is an antiprime candidate; otherwise `false`.
 * @throws `TypeError` If `n` is not a number, or `pf` is not an array of prime factor objects.
 * @throws `RangeError` If `n` is zero, not an integer, or outside the safe integer range, or `pf` is not the prime
 * factorisation of `n`.
 * @since 1.0.0
 * @example
 * ```ts
 * isAntiprimeCandidate(36); // true
 * isAntiprimeCandidate(30); // true, though 30 is not an antiprime
 * isAntiprimeCandidate(18); // false
 * ```
 */
export function isAntiprimeCandidate(n: number, pf?: readonly PrimeFactor[]): boolean {
  assertNonZeroSafeInteger(n);
  n = Math.abs(n);
  if (pf === undefined) pf = primeFactors(n);
  else assertPrimeFactorisationOf(pf, n);
  if (!isConsecutivePrimeFactors(pf) || !isPrimeExponentsReducing(pf)) return false;
  const largest = pf.at(-1);
  return largest === undefined || largest.exponent === 1 || n === 4 || n === 36;
}
