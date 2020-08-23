import { isPrime } from ".";

/**
 * Determines the next largest prime number based on the input number.
 * @param n the input number to find the next prime
 * @returns the next largest prime number; if the input is negative it returns the next prime of larger magnitude
 * @throws `TypeError` if the input is not a number
 */
const nextPrime = (n: number): number => {
  if (typeof n !== "number") throw new TypeError("input must be a number");
  if (n < 0) n *= -1;
  if (n % 1 !== 0) n = Math.floor(n);
  if (n < 2) return 2;
  n % 2 === 0 ? n++ : (n += 2);
  while (!isPrime(n)) n += 2;
  return n;
};

export default nextPrime;
