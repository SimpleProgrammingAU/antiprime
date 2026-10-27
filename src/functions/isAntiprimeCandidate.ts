import type { PrimeFactor } from "../interfaces";
import { assertNonZeroSafeInteger } from "../internal/assertNumber";
import { assertPrimeFactorisationOf } from "../internal/assertPrimeFactorisation";
import { isConsecutivePrimeFactors } from "./isConsecutivePrimeFactors";
import { isPrimeExponentsReducing } from "./isPrimeExponentsReducing";
import { primeFactors } from "./primeFactors";

/**
 * Determines if the input number is a candidate for a highly composite integer.
 * @param n the input number to be checked
 * @param pf the prime factors of the input number, if they have been previously calculated
 * @returns `true` if the number is highly composite; `false` otherwise
 * @throws `TypeError` if the input `n` is not an integer other than zero or `pf` is not an array of PrimeFactor objects (if supplied)
 */
export function isAntiprimeCandidate(n: number, pf?: readonly PrimeFactor[]): boolean {
  assertNonZeroSafeInteger(n);
  n = Math.abs(n);
  if (pf === undefined) pf = primeFactors(n);
  else assertPrimeFactorisationOf(pf, n);
  if (!isConsecutivePrimeFactors(pf) || !isPrimeExponentsReducing(pf)) return false;
  const largest = pf.at(-1);
  return largest === undefined || largest.exponent === 1 || n === 4 || n === 36;
}
