import type { PrimeFactor } from "../interfaces";

/**
 * Determines if the condition of reducing prime exponents is met.
 * @param primeFactors the prime factors of the number being interrogated
 * @returns `true` if the number has reducing prime exponents; `false` otherwise
 * @throws `TypeError` if the input is not an array or the array does not contain `PrimeFactor` objects
 */
export function isPrimeExponentsReducing(primeFactors: PrimeFactor[]): boolean {
  if (!(primeFactors.length > 0)) throw new TypeError("Input must be an array");
  let isReducing = true;
  let previous = Infinity;
  for (const primeFactor of primeFactors) {
    if (typeof primeFactor.exponent !== "number" || typeof primeFactor.factor !== "number")
      throw new TypeError("Input array values must include factor and exponent values");
    if (primeFactor.exponent > previous) isReducing = false;
    previous = primeFactor.exponent;
  }
  return isReducing;
}
