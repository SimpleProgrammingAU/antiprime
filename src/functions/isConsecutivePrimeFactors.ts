import { PrimeFactor } from "../interfaces";
import { nextPrime } from ".";

/**
 * Determines if the condition of consecutive prime factors is met.
 * @param primeFactors the prime factors of the number being interrogated
 * @returns `true` if all prime factors are consecutive; `false` otherwise
 * @throws `TypeError` if the input is not an array or the array does not contain `PrimeFactor` objects
 */
const isConsecutivePrimeFactors = (primeFactors: PrimeFactor[]): boolean => {
  if (!(primeFactors.length > 0)) throw new TypeError("Input must be an array");
  let isConsecutivePrimeFactors = true;
  primeFactors.forEach((primeFactor, i, arr) => {
    if (typeof primeFactor.exponent !== "number" || typeof primeFactor.factor !== "number")
      throw new TypeError("Input array values must include factor and exponent values");
    if (i === 0 && primeFactor.factor !== 2) isConsecutivePrimeFactors = false;
    if (i > 0 && isConsecutivePrimeFactors) isConsecutivePrimeFactors = primeFactor.factor === nextPrime(arr[i - 1].factor);
  });
  return isConsecutivePrimeFactors;
};

export default isConsecutivePrimeFactors;
