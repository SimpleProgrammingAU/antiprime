import type { PrimeFactor } from "../interfaces";
import { isConsecutivePrimeFactors } from "./isConsecutivePrimeFactors";
import { isPrime } from "./isPrime";
import { isPrimeExponentsReducing } from "./isPrimeExponentsReducing";
import { primeFactors } from "./primeFactors";

/**
 * Determines if the input number is a candidate for a highly composite integer.
 * @param n the input number to be checked
 * @param pf the prime factors of the input number, if they have been previously calculated
 * @returns `true` if the number is highly composite; `false` otherwise
 * @throws `TypeError` if the input `n` is not an integer other than zero or `pf` is not an array of PrimeFactor objects (if supplied)
 */
export function isAntiprimeCandidate(n: number, pf?: PrimeFactor[]): boolean {
  if (typeof n !== "number") throw new TypeError("input must be a number");
  if (n < 0) n *= -1;
  if (n > 2 && isPrime(n)) return false;
  pf ??= primeFactors(n);
  if (!isConsecutivePrimeFactors(pf)) return false;
  if (!isPrimeExponentsReducing(pf)) return false;
  const largest = pf[pf.length - 1];
  if (largest !== undefined && largest.exponent > 1 && n !== 4 && n !== 36) return false;
  return true;
}
