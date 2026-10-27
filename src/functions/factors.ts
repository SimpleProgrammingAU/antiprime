import { assertNonZeroSafeInteger } from "../internal/assertNumber";

/**
 * Finds all factors of the input number
 * @param n the integer to factorise
 * @returns an array of numbers representing all factors of `n`; if the integer is negative, the factors for the positive integer are returned
 * @throws `RangeError` when the input is not an integer value
 * @throws `TypeError` when the input is not an number value
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
