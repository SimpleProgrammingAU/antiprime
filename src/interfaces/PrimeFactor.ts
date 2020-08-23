/**
 * A prime number that devides into a composite number with no remainder.
 */
interface PrimeFactor {
  /**
   * The prime factor
   */
  factor:number;
  /**
   * The number of times the factor divdes into the composite number
   */
  exponent:number;
}

export default PrimeFactor;