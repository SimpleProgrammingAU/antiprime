import type { PrimeFactor } from "../interfaces";
import { antiprimesUpTo } from "../internal/antiprimes";
import { assertNonZeroSafeInteger } from "../internal/assertNumber";
import { isAntiprimeCandidate } from "./isAntiprimeCandidate";

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
  if (!isAntiprimeCandidate(n, pf)) return false;
  return antiprimesUpTo(n).at(-1) === n;
}
