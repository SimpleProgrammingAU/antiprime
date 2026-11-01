/**
 * A prime factor of a number, paired with how many times it divides that number.
 * @since 2.0.0
 */
export interface PrimeFactor {
  /**
   * The prime.
   * @since 2.0.0
   */
  factor: number;
  /**
   * How many times the prime divides the number; always at least 1.
   * @since 2.0.0
   */
  exponent: number;
}
