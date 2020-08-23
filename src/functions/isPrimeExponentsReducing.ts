import { PrimeFactor } from "../interfaces";

/**
 * Determines if the condition of reducing prime exponents is met.
 * @param primeFactors the prime factors of the number being interrogated
 * @returns `true` if the number has reducing prime exponents; `false` otherwise
 * @throws `TypeError` if the input is not an array or the array does not contain `PrimeFactor` objects
 */
const isPrimeExponentsReducing = (primeFactors: PrimeFactor[]): boolean => {
  if (!(primeFactors.length > 0)) throw new TypeError("Input must be an array");
  return primeFactors.reduce((a: boolean, c: PrimeFactor, i: number, arr: PrimeFactor[]) => {
    if (typeof c.exponent !== "number" || typeof c.factor !== "number")
      throw new TypeError("Input array values must include factor and exponent values");
    if (i === 0) return true;
    return a ? c.exponent <= arr[i - 1].exponent : false;
  }, true);
};

export default isPrimeExponentsReducing;
