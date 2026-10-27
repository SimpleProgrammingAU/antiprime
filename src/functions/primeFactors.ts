import type { PrimeFactor } from "../interfaces";
import { assertNonZeroSafeInteger } from "../internal/assertNumber";
import { isPrime } from "./isPrime";

/**
 * Finds all prime factors and their exponents for a given input number
 * @param n the input number to find the prime factors
 * @returns an array of PrimeFactors with value and exponent
 * @throws `RangeError` when the input is not an integer value not equal to zero
 * @throws `TypeError` when the input is not an number value
 */
export function primeFactors(n: number): PrimeFactor[] {
  assertNonZeroSafeInteger(n);
  n = Math.abs(n);
  if (isPrime(n)) return [{ factor: n, exponent: 1 }];
  const primes: PrimeFactor[] = [];
  for (let i = 2; i <= n; i++) {
    let exponent = 0;
    while (n % i === 0) {
      exponent++;
      n /= i;
    }
    if (exponent > 0) primes.push({ factor: i, exponent });
  }
  return primes;
}
