import { nextPrime } from "../functions/nextPrime";

/** A prime paired with how many times it divides the latest superior antiprime. */
interface Power {
  /** The prime. */
  readonly prime: number;
  /** How many times the prime divides the latest superior antiprime; 0 for the smallest prime not yet used. */
  exponent: number;
}

/**
 * Finds the critical ε at which a prime's exponent next grows.
 * @param power - The prime and its current exponent.
 * @returns The largest ε for which the prime divides a superior antiprime more than `power.exponent` times.
 */
function criticalEpsilon(power: Power): number {
  return Math.log1p(1 / (power.exponent + 1)) / Math.log(power.prime);
}

/**
 * Lists every superior antiprime up to `limit`, in ascending order.
 * @remarks
 * Each superior antiprime is the one before it times a prime. As ε falls, prime p gains its k-th power at the critical
 * value ln(1 + 1/k) / ln p, so multiplying by primes in order of falling critical value gives the sequence. Only the
 * smallest prime not yet used can be the next new prime, because ln 2 / ln p falls as p grows.
 *
 * Two equal critical values would make the sequence skip the number between them. The Four Exponentials Conjecture
 * rules this out, and none occur up to `Number.MAX_SAFE_INTEGER`: the tests check every value in that range against
 * OEIS A002201.
 * @param limit - The largest value to include; at most `Number.MAX_SAFE_INTEGER`.
 * @returns The superior antiprimes.
 */
export function superiorAntiprimesUpTo(limit: number): number[] {
  const superiorAntiprimes: number[] = [];
  const powers: Power[] = [{ prime: 2, exponent: 0 }];
  let value = 1;
  for (;;) {
    const next = powers.reduce((best, power) => (criticalEpsilon(power) > criticalEpsilon(best) ? power : best));
    // A product above 2^53 may be rounded, but it still compares as larger than any safe limit.
    if (value * next.prime > limit) return superiorAntiprimes;
    value *= next.prime;
    if (next.exponent++ === 0) powers.push({ prime: nextPrime(next.prime), exponent: 0 });
    superiorAntiprimes.push(value);
  }
}
