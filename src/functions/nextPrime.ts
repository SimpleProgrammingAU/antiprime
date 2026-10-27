import { assertSafeNumber } from "../internal/assertNumber";
import { isPrime } from "./isPrime";

/**
 * Determines the next largest prime number based on the input number.
 * @param n the input number to find the next prime
 * @returns the next largest prime number; if the input is negative it returns the next prime of larger magnitude
 * @throws `TypeError` if the input is not a number
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
