import { nextPrime } from "../functions/nextPrime";

/** A prime paired with how many times it divides the latest superior antiprime. */
interface PrimeExponent {
  /** The prime. */
  readonly prime: number;
  /** How many times the prime divides the latest superior antiprime; 0 for the smallest prime not yet used. */
  exponent: number;
}

/**
 * Finds the critical ε at which a prime's exponent next grows.
 * @param primeExponent - The prime and its current exponent.
 * @returns The largest ε for which the prime divides a superior antiprime more than `primeExponent.exponent` times.
 */
function criticalEpsilon(primeExponent: PrimeExponent): number {
  return Math.log1p(1 / (primeExponent.exponent + 1)) / Math.log(primeExponent.prime);
}

/**
 * Lists every superior antiprime up to `limit`, in ascending order.
 * @remarks
 * As ε falls, prime p gains its k-th power at the critical value ln(1 + 1/k) / ln p, so multiplying by primes in order
 * of falling critical value reaches every superior antiprime. Only the smallest prime not yet used can be the next new
 * prime, because ln 2 / ln p falls as p grows.
 *
 * Assuming the Four Exponentials Conjecture, no two critical values are equal, so each superior antiprime is the one
 * before it times a prime. A tie would make the true sequence skip the number between the two steps, which this loop
 * would include. The tests check every value up to `Number.MAX_SAFE_INTEGER` against OEIS A002201.
 * @param limit - The largest value to include; at most `Number.MAX_SAFE_INTEGER`.
 * @returns The superior antiprimes.
 */
export function superiorAntiprimesUpTo(limit: number): number[] {
  const superiorAntiprimes: number[] = [];
  const primeExponents: PrimeExponent[] = [{ prime: 2, exponent: 0 }];
  let value = 1;
  for (;;) {
    const next = primeExponents.reduce((best, primeExponent) =>
      criticalEpsilon(primeExponent) > criticalEpsilon(best) ? primeExponent : best,
    );
    // A product above 2^53 may be rounded, but it still compares as larger than any safe limit.
    if (value * next.prime > limit) return superiorAntiprimes;
    value *= next.prime;
    next.exponent++;
    // The smallest unused prime has just been used, so the prime after it becomes the next new prime.
    if (next.exponent === 1) primeExponents.push({ prime: nextPrime(next.prime), exponent: 0 });
    superiorAntiprimes.push(value);
  }
}
