/** The first 41 antiprimes, from OEIS A002182. */
export const FIRST_ANTIPRIMES: readonly number[] = [
  1, 2, 4, 6, 12, 24, 36, 48, 60, 120, 180, 240, 360, 720, 840, 1260, 1680, 2520, 5040, 7560, 10080, 15120, 20160,
  25200, 27720, 45360, 50400, 55440, 83160, 110880, 166320, 221760, 277200, 332640, 498960, 554400, 665280, 720720,
  1081080, 1441440, 2162160,
];

/**
 * Counts the factors of every integer from 0 to `limit` by brute force, as an oracle for the fast algorithms.
 * @param limit - The largest integer to count factors for.
 * @returns An array where index `n` holds the factor count of `n` (index 0 holds 0).
 */
export function bruteForceFactorCounts(limit: number): Uint16Array {
  const counts = new Uint16Array(limit + 1);
  for (let i = 1; i <= limit; i++) {
    for (let j = i; j <= limit; j += i) counts[j] = (counts[j] ?? 0) + 1;
  }
  return counts;
}
