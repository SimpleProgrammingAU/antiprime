import { assertNonZeroSafeInteger } from "../internal/assertNumber";
import { superiorAntiprimesUpTo } from "../internal/superiorAntiprimes";

/**
 * Determines whether a number is a superior antiprime: for some positive ε, its factor count divided by its ε-th power
 * is at least as large as any other positive integer's.
 * @remarks
 * Also exported as `isSuperiorHighlyComposite`. The first superior antiprime is 2: 1 is excluded by convention, as in
 * OEIS A002201, even though it is the first antiprime. Every superior antiprime is an antiprime. Negative numbers are
 * judged by their absolute value.
 * @param n - A non-zero safe integer.
 * @returns `true` if the absolute value of `n` is a superior antiprime; otherwise `false`.
 * @throws `TypeError` If `n` is not a number.
 * @throws `RangeError` If `n` is zero, not an integer, or outside the safe integer range.
 * @since 2.1.0
 * @example
 * ```ts
 * isSuperiorAntiprime(5040); // true
 * isSuperiorAntiprime(-60); // true
 * isSuperiorAntiprime(24); // false, though 24 is an antiprime
 * isSuperiorAntiprime(1); // false
 * ```
 */
export function isSuperiorAntiprime(n: number): boolean {
  assertNonZeroSafeInteger(n);
  n = Math.abs(n);
  return superiorAntiprimesUpTo(n).at(-1) === n;
}
