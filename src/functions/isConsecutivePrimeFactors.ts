import type { PrimeFactor } from "../interfaces";
import { nextPrime } from "./nextPrime";

/**
 * Determines if the condition of consecutive prime factors is met.
 * @param primeFactors the prime factors of the number being interrogated
 * @returns `true` if all prime factors are consecutive; `false` otherwise
 * @throws `TypeError` if the input is not an array or the array does not contain `PrimeFactor` objects
 */
export function isConsecutivePrimeFactors(primeFactors: PrimeFactor[]): boolean {
  if (!(primeFactors.length > 0)) throw new TypeError("Input must be an array");
  let isConsecutive = true;
  let expected = 2;
  for (const primeFactor of primeFactors) {
    if (typeof primeFactor.exponent !== "number" || typeof primeFactor.factor !== "number")
      throw new TypeError("Input array values must include factor and exponent values");
    if (primeFactor.factor !== expected) isConsecutive = false;
    expected = nextPrime(primeFactor.factor);
  }
  return isConsecutive;
}
