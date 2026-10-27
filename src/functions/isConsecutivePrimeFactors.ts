import type { PrimeFactor } from "../interfaces";
import { assertPrimeFactorisation } from "../internal/assertPrimeFactorisation";
import { nextPrime } from "./nextPrime";

/**
 * Determines if the condition of consecutive prime factors is met.
 * @param primeFactors the prime factors of the number being interrogated
 * @returns `true` if all prime factors are consecutive; `false` otherwise
 * @throws `TypeError` if the input is not an array or the array does not contain `PrimeFactor` objects
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
