import { assertSafeNumber } from "../internal/assertNumber";
import { isPrime } from "./isPrime";

/**
 * Finds the smallest prime larger than a number.
 * @remarks
 * Negative numbers are judged by their absolute value, and non-integers are rounded down first.
 * @param n - A number within the safe integer range.
 * @returns The smallest prime larger than the absolute value of `n`, rounded down.
 * @throws `TypeError` If `n` is not a number.
 * @throws `RangeError` If `n` is NaN or infinite, or if `n` or the next prime is larger than `Number.MAX_SAFE_INTEGER`.
 * @since 1.0.0
 * @example
 * ```ts
 * nextPrime(7); // 11
 * nextPrime(10.5); // 11
 * nextPrime(-100.5); // 101
 * ```
 */
export function nextPrime(n: number): number {
  assertSafeNumber(n);
  n = Math.floor(Math.abs(n));
  if (n < 2) return 2;
  for (n += n % 2 === 0 ? 1 : 2; n <= Number.MAX_SAFE_INTEGER; n += 2) {
    if (isPrime(n)) return n;
  }
  throw new RangeError("The next prime is larger than Number.MAX_SAFE_INTEGER");
}
