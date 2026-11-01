import { assertSafeNumber } from "../internal/assertNumber";

/**
 * Determines whether a number is prime.
 * @remarks
 * Negative numbers are judged by their absolute value. Non-integers are never prime.
 * @param n - A number within the safe integer range.
 * @returns `true` if the absolute value of `n` is prime; otherwise `false`.
 * @throws `TypeError` If `n` is not a number.
 * @throws `RangeError` If `n` is NaN, infinite, or larger in magnitude than `Number.MAX_SAFE_INTEGER`.
 * @since 1.0.0
 * @example
 * ```ts
 * isPrime(97); // true
 * isPrime(-7); // true
 * isPrime(10.5); // false
 * ```
 */
export function isPrime(n: number): boolean {
  assertSafeNumber(n);
  n = Math.abs(n);
  if (n < 2 || !Number.isInteger(n)) return false;
  if (n < 4) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}
