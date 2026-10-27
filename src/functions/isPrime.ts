import { assertSafeNumber } from "../internal/assertNumber";

/**
 * Determines if the input number is prime.
 * @param n the input number to be assessed
 * @returns `true` if the input number is prime; `false` otherwise
 * @throws `TypeError` if the input is not a number
 */
export function isPrime(n: number): boolean {
  assertSafeNumber(n);
  n = Math.abs(n);
  if (n < 2 || !Number.isInteger(n)) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}
