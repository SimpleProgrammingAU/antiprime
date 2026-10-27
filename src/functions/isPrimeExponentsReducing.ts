import type { PrimeFactor } from "../interfaces";
import { assertPrimeFactorisation } from "../internal/assertPrimeFactorisation";

/**
 * Determines whether the exponents of a prime factorisation never increase from smaller to larger primes.
 * @remarks
 * This is one of the tests every antiprime candidate passes. The empty factorisation of 1 passes trivially.
 * @param primeFactors - A prime factorisation, such as the result of {@link primeFactors}.
 * @returns `true` if each exponent is no larger than the one before it; otherwise `false`.
 * @throws `TypeError` If `primeFactors` is not an array of objects with numeric `factor` and `exponent` properties.
 * @throws `RangeError` If `primeFactors` is not a prime factorisation: ascending distinct primes with positive integer exponents.
 * @since 1.0.0
 * @example
 * ```ts
 * isPrimeExponentsReducing(primeFactors(12)); // true: 2² × 3
 * isPrimeExponentsReducing(primeFactors(18)); // false: 2 × 3²
 * ```
 */
export function isPrimeExponentsReducing(primeFactors: readonly PrimeFactor[]): boolean {
  assertPrimeFactorisation(primeFactors);
  let previous = Infinity;
  for (const { exponent } of primeFactors) {
    if (exponent > previous) return false;
    previous = exponent;
  }
  return true;
}
