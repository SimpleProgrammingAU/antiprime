import type { PrimeFactor } from "../interfaces";

/**
 * Counts the factors of a number from its prime factorisation.
 * @param primeFactors - The prime factorisation of the number.
 * @returns The product of one more than each exponent.
 */
export function factorCount(primeFactors: readonly PrimeFactor[]): number {
  return primeFactors.reduce((count, { exponent }) => count * (exponent + 1), 1);
}
