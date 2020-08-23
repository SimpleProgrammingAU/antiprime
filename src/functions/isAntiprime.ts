import { factors, primeFactors, isPrime, isAntiprimeCandidate } from ".";
import { PrimeFactor } from "../interfaces";

/**
 * Determines if the input number is highly composite.
 * @param n the input number to be checked
 * @param pf the prime factors of the input number, if they have been previously calculated
 * @returns `true` if the number is highly composite; `false` otherwise
 * @throws `TypeError` if the input `n` is not an integer other than zero or `pf` is not an array of PrimeFactor objects (if supplied)
 */
const isAntiprime = (n: number, pf?: PrimeFactor[]): boolean => {
  if (typeof n !== "number") throw new TypeError("input must be a number");
  if (n < 0) n *= -1;
  if (n > 2 && isPrime(n)) return false;
  else if (n <= 2 && n !== 0) return true;
  if (pf === undefined) pf = primeFactors(n);
  if (!isAntiprimeCandidate(n, pf)) return false;
  let prevCandidate = n - 1;
  while (prevCandidate > 1) {
    while (!isAntiprimeCandidate(prevCandidate) && prevCandidate > 1) prevCandidate--;
    if (factors(n).length <= factors(prevCandidate).length) return false;
    else if (prevCandidate > 1) prevCandidate--;
  }
  return true;
};

export default isAntiprime;
