import { PrimeFactor } from "../interfaces";
import { isPrime } from ".";

/**
 * Finds all prime factors and their exponents for a given input number
 * @param n the input number to find the prime factors
 * @returns an array of PrimeFactors with value and exponent
 * @throws `RangeError` when the input is not an integer value not equal to zero
 * @throws `TypeError` when the input is not an number value
 */
const primeFactors = (n: number): PrimeFactor[] => {
  if (typeof n !== "number" || n === 0) throw new TypeError("Input number must be an integer not equal to zero.");
  if (n % 1 !== 0) throw new RangeError("Input number must be an integer.");
  if (n < 0) n *= -1;
  if (n === 1) return [{ factor: 2, exponent: 0 }];
  if (isPrime(n)) return [{ factor: n, exponent: 1}];
  const primes: PrimeFactor[] = [];
  for (let i = 2; i <= n; i++) {
    if (n % i === 0) {
      primes.push({ factor: i, exponent: 0 });
    }
    while (n > 1 && n % i === 0) {
      primes[primes.length - 1].exponent++;
      n /= i;
    }
  }
  return primes;
};

export default primeFactors;
