import { assertNonZeroSafeInteger } from "../internal/assertNumber";

/**
 * Lists every factor of a number.
 * @remarks
 * Negative numbers are judged by their absolute value.
 * @param n - A non-zero safe integer.
 * @returns The factors of `n` in ascending order, including 1 and the absolute value of `n`.
 * @throws `TypeError` If `n` is not a number.
 * @throws `RangeError` If `n` is zero, not an integer, or outside the safe integer range.
 * @since 1.0.0
 * @example
 * ```ts
 * factors(12); // [1, 2, 3, 4, 6, 12]
 * factors(-6); // [1, 2, 3, 6]
 * ```
 */
export function factors(n: number): number[] {
  assertNonZeroSafeInteger(n);
  n = Math.abs(n);
  const small: number[] = [];
  const large: number[] = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i !== 0) continue;
    small.push(i);
    if (i * i !== n) large.push(n / i);
  }
  return [...small, ...large.reverse()];
}
