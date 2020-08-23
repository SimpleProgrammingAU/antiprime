/**
 * Determines if the input number is prime.
 * @param n the input number to be assessed
 * @returns `true` if the input number is prime; `false` otherwise
 * @throws `TypeError` if the input is not a number
 */
const isPrime = (n: number): boolean => {
  if (typeof n !== "number") throw new TypeError("input must be a number");
  if (n < 0) n *= -1;
  if (n >= 0 && n <= 1 || n % 1 !== 0) return false;
  if (n === 2) return true;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};

export default isPrime;
