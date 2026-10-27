import { isPrime } from "../functions/isPrime";
import type { PrimeFactor } from "../interfaces";

/**
 * Asserts that `primeFactors` is a prime factorisation: ascending distinct primes, each with a positive integer exponent.
 * @param primeFactors - The value to check.
 * @throws `TypeError` If `primeFactors` is not an array of objects with numeric `factor` and `exponent` properties.
 * @throws `RangeError` If a factor is not prime, the factors are not strictly ascending, or an exponent is not a positive integer.
 */
export function assertPrimeFactorisation(primeFactors: readonly PrimeFactor[]): void {
  if (!Array.isArray(primeFactors)) throw new TypeError("Expected an array of prime factors");
  let previous = 0;
  for (const primeFactor of primeFactors as unknown[]) {
    if (typeof primeFactor !== "object" || primeFactor === null)
      throw new TypeError("Expected each prime factor to be an object");
    const { factor, exponent } = primeFactor as Partial<Record<keyof PrimeFactor, unknown>>;
    if (typeof factor !== "number" || typeof exponent !== "number")
      throw new TypeError("Expected each prime factor to have numeric factor and exponent properties");
    if (!isPrime(factor) || factor <= previous)
      throw new RangeError(`Expected ascending distinct prime factors, received ${factor} after ${previous}`);
    if (!Number.isSafeInteger(exponent) || exponent < 1)
      throw new RangeError(`Expected a positive integer exponent, received ${exponent}`);
    previous = factor;
  }
}

/**
 * Asserts that `primeFactors` is the prime factorisation of `n`.
 * @param primeFactors - The value to check.
 * @param n - The non-zero safe integer the prime factors must belong to; its absolute value is used.
 * @throws `TypeError` If `primeFactors` is not an array of prime factor objects.
 * @throws `RangeError` If `primeFactors` is not a prime factorisation, or its product is not the absolute value of `n`.
 */
export function assertPrimeFactorisationOf(primeFactors: readonly PrimeFactor[], n: number): void {
  assertPrimeFactorisation(primeFactors);
  const target = Math.abs(n);
  let product = 1;
  for (const { factor, exponent } of primeFactors) {
    product *= factor ** exponent;
    if (product > target) break;
  }
  if (product !== target) throw new RangeError(`Expected the prime factorisation of ${target}`);
}
