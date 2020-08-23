/**
 * Finds all factors of the input number
 * @param n the integer to factorise
 * @returns an array of numbers representing all factors of `n`; if the integer is negative, the factors for the positive integer are returned
 * @throws `RangeError` when the input is not an integer value
 * @throws `TypeError` when the input is not an number value
 */
const factors = (n: number): number[] => {
  if (typeof n !== 'number') throw new TypeError("Input number must be an integer.");
  if (n % 1 !== 0) throw new RangeError("Input number must be an integer.");
  if (n < 0) n *= -1;
  const factors: number[] = [];
  for (let i = 1; i <= n / 2; i++) {
    n % i === 0 ? factors.push(i) : false;
  }
  factors.push(n);
  return factors;
};

export default factors;
