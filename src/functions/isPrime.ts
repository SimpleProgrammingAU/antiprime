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
  if (n < 4) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}
