import { nextPrime } from "../functions/nextPrime";

/** An antiprime candidate together with its factor count. */
interface Candidate {
  /** The candidate itself. */
  readonly value: number;
  /** How many factors the candidate has. */
  readonly factorCount: number;
}

/**
 * Lists every antiprime candidate up to `limit`, in ascending order.
 * @param limit - The largest value to include; at most `Number.MAX_SAFE_INTEGER`.
 * @returns The candidates, each with its factor count.
 */
export function candidatesUpTo(limit: number): Candidate[] {
  if (limit < 1) return [];
  const candidates: Candidate[] = [{ value: 1, factorCount: 1 }];
  /**
   * Adds every candidate formed by multiplying `value` by powers of `prime` and then of the primes after it.
   * @param value - The product of the smaller primes chosen so far.
   * @param prime - The next prime to multiply by.
   * @param maxExponent - The largest exponent allowed for `prime`, so exponents never increase.
   * @param count - The factor count of `value`.
   */
  const visit = (value: number, prime: number, maxExponent: number, count: number): void => {
    let power = value;
    for (let exponent = 1; exponent <= maxExponent; exponent++) {
      power *= prime;
      if (power > limit) return;
      const factorCount = count * (exponent + 1);
      if (exponent === 1 || power === 4 || power === 36) candidates.push({ value: power, factorCount });
      visit(power, nextPrime(prime), exponent, factorCount);
    }
  };
  visit(1, 2, Infinity, 1);
  return candidates.sort((a, b) => a.value - b.value);
}

/**
 * Lists every antiprime up to `limit`, in ascending order.
 * @remarks
 * A candidate is an antiprime when it has more factors than every smaller candidate. Checking only candidates is
 * enough: the smallest number with at least as many factors as any `m` is itself an antiprime, so a candidate.
 * @param limit - The largest value to include; at most `Number.MAX_SAFE_INTEGER`.
 * @returns The antiprimes.
 */
export function antiprimesUpTo(limit: number): number[] {
  const antiprimes: number[] = [];
  let best = 0;
  for (const { value, factorCount } of candidatesUpTo(limit)) {
    if (factorCount <= best) continue;
    best = factorCount;
    antiprimes.push(value);
  }
  return antiprimes;
}
