/** The first 41 antiprimes, from OEIS A002182. */
export const FIRST_ANTIPRIMES: readonly number[] = [
  1, 2, 4, 6, 12, 24, 36, 48, 60, 120, 180, 240, 360, 720, 840, 1260, 1680, 2520, 5040, 7560, 10080, 15120, 20160,
  25200, 27720, 45360, 50400, 55440, 83160, 110880, 166320, 221760, 277200, 332640, 498960, 554400, 665280, 720720,
  1081080, 1441440, 2162160,
];

/** Every superior antiprime up to `Number.MAX_SAFE_INTEGER` (the first 21), from OEIS A002201. */
export const SUPERIOR_ANTIPRIMES: readonly number[] = [
  2, 6, 12, 60, 120, 360, 2520, 5040, 55440, 720720, 1441440, 4324320, 21621600, 367567200, 6983776800, 13967553600,
  321253732800, 2248776129600, 65214507758400, 195643523275200, 6064949221531200,
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
