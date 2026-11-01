/**
 * Test and find antiprimes (highly composite numbers): positive integers with more factors than any smaller positive
 * integer.
 * @remarks
 * Every function and the {@link Antiprime} class judge a negative number by its absolute value, so `isAntiprime(-12)`
 * is `true`. Inputs must be within the safe integer range (up to `Number.MAX_SAFE_INTEGER`).
 * @packageDocumentation
 */

/* Class exports */
export { Antiprime, HighlyCompositeNumber } from "./classes";

/* Function exports */
export {
  factors,
  isAntiprime,
  isAntiprimeCandidate,
  isHighlyComposite,
  isConsecutivePrimeFactors,
  isPrime,
  isPrimeExponentsReducing,
  nextPrime,
  primeFactors,
} from "./functions";

/* Type exports */
export type { PrimeFactor } from "./interfaces";
