import type { PrimeFactor } from "../interfaces";
import { assertPrimeFactorisation } from "../internal/assertPrimeFactorisation";
import { nextPrime } from "./nextPrime";

/**
 * Determines whether a prime factorisation uses exactly the first k primes (2, 3, 5, …), with none skipped.
 * @remarks
 * This is one of the tests every antiprime candidate passes. The empty factorisation of 1 passes trivially.
 * @param primeFactors - A prime factorisation, such as the result of {@link primeFactors}.
 * @returns `true` if the prime factors are the first k primes; otherwise `false`.
 * @throws `TypeError` If `primeFactors` is not an array of objects with numeric `factor` and `exponent` properties.
 * @throws `RangeError` If `primeFactors` is not a prime factorisation: ascending distinct primes with positive integer exponents.
 * @since 1.0.0
 * @example
 * ```ts
 * isConsecutivePrimeFactors(primeFactors(60)); // true: 2² × 3 × 5
 * isConsecutivePrimeFactors(primeFactors(10)); // false: 2 × 5 skips 3
 * ```
 */
export function isConsecutivePrimeFactors(primeFactors: readonly PrimeFactor[]): boolean {
  assertPrimeFactorisation(primeFactors);
  let expected = 2;
  for (const { factor } of primeFactors) {
    if (factor !== expected) return false;
    expected = nextPrime(factor);
  }
  return true;
}
