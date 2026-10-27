import type { PrimeFactor } from "../interfaces";
import { assertPrimeFactorisation } from "../internal/assertPrimeFactorisation";

/**
 * Determines if the condition of reducing prime exponents is met.
 * @param primeFactors the prime factors of the number being interrogated
 * @returns `true` if the number has reducing prime exponents; `false` otherwise
 * @throws `TypeError` if the input is not an array or the array does not contain `PrimeFactor` objects
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
