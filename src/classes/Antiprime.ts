import { factors, isAntiprime, primeFactors } from "../functions";
import type { PrimeFactor } from "../interfaces";
import { antiprimesUpTo } from "../internal/antiprimes";
import { assertNonZeroSafeInteger } from "../internal/assertNumber";
import { factorCount } from "../internal/factorCount";

/**
 * The class representation of numbers and their antiprime (highly composite) status.
 * Note: constructed Antiprimes (via `new Antiprime(n)`) are not necessarily highly composite and should be checked via `Antiprime.isAntiprime()`.
 * Any new values derived from the class methods are antiprime.
 * All negative inputs are made positive.
 */
export class Antiprime {
  readonly #value: number;
  #factors: number[] | undefined;
  #primeFactors: PrimeFactor[] | undefined;
  #isAntiprime: boolean | undefined;

  /**
   * Creates new Antiprime object.
   * @param n the input number; note: this number is not necessarily highly composite.
   */
  constructor(n: number) {
    assertNonZeroSafeInteger(n);
    this.#value = Math.abs(n);
  }

  get value(): number {
    return this.#value;
  }

  get factorCount(): number {
    return factorCount(this.#primeFactorisation());
  }

  /**
   * Creates a new Antiprime object that represents the next antiprime smaller than the current Antiprime object.
   */
  previousAntiprime(): Antiprime {
    const previous = antiprimesUpTo(this.#value - 1).at(-1);
    if (previous === undefined) throw new RangeError("1 is the smallest antiprime");
    return new Antiprime(previous);
  }

  /**
   * Alias of `previousAntiprime`.
   */
  previousHighlyCompositeNumber(): Antiprime {
    return this.previousAntiprime();
  }

  /**
   * Creates a new Antiprime object that represents the next antiprime larger than the current Antiprime object.
   */
  nextAntiprime(): Antiprime {
    const limit = Math.min(2 * this.#value, Number.MAX_SAFE_INTEGER);
    const next = antiprimesUpTo(limit).find((antiprime) => antiprime > this.#value);
    if (next === undefined) throw new RangeError("The next antiprime is larger than Number.MAX_SAFE_INTEGER");
    return new Antiprime(next);
  }

  /**
   * Alias of `nextAntiprime`.
   */
  nextHighlyCompositeNumber(): Antiprime {
    return this.nextAntiprime();
  }

  /**
   * Returns the current highly composite status of the Antiprime object.
   */
  isAntiprime(): boolean {
    return (this.#isAntiprime ??= isAntiprime(this.#value, this.#primeFactorisation()));
  }

  /**
   * Alias of `nextAntiprime`.
   */
  isHighlyCompositeNumber(): boolean {
    return this.isAntiprime();
  }

  /**
   * Returns all of the factors associated with the current Antiprime object.
   */
  getFactors(): number[] {
    return [...(this.#factors ??= factors(this.#value))];
  }

  /**
   * Returns all of the prime factors and their exponents.
   */
  getPrimeFactors(): PrimeFactor[] {
    return this.#primeFactorisation().map((primeFactor) => ({ ...primeFactor }));
  }

  #primeFactorisation(): PrimeFactor[] {
    return (this.#primeFactors ??= primeFactors(this.#value));
  }
}
