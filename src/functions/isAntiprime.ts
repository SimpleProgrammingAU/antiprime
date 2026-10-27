import type { PrimeFactor } from "../interfaces";
import { assertNonZeroSafeInteger } from "../internal/assertNumber";
import { assertPrimeFactorisationOf } from "../internal/assertPrimeFactorisation";
import { factors } from "./factors";
import { isAntiprimeCandidate } from "./isAntiprimeCandidate";
import { primeFactors } from "./primeFactors";

/**
 * Determines if the input number is highly composite.
 * @param n the input number to be checked
 * @param pf the prime factors of the input number, if they have been previously calculated
 * @returns `true` if the number is highly composite; `false` otherwise
 * @throws `TypeError` if the input `n` is not an integer other than zero or `pf` is not an array of PrimeFactor objects (if supplied)
 */
export function isAntiprime(n: number, pf?: readonly PrimeFactor[]): boolean {
  assertNonZeroSafeInteger(n);
  n = Math.abs(n);
  if (pf === undefined) pf = primeFactors(n);
  else assertPrimeFactorisationOf(pf, n);
  if (!isAntiprimeCandidate(n, pf)) return false;
  let prevCandidate = n - 1;
  while (prevCandidate > 1) {
    while (!isAntiprimeCandidate(prevCandidate) && prevCandidate > 1) prevCandidate--;
    if (factors(n).length <= factors(prevCandidate).length) return false;
    else if (prevCandidate > 1) prevCandidate--;
  }
  return true;
}
