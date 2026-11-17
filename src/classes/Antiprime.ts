import { factors, isAntiprime, isSuperiorAntiprime, primeFactors } from "../functions";
import type { PrimeFactor } from "../interfaces";
import { antiprimesUpTo } from "../internal/antiprimes";
import { assertNonZeroSafeInteger } from "../internal/assertNumber";
import { factorCount } from "../internal/factorCount";
import { superiorAntiprimesUpTo } from "../internal/superiorAntiprimes";

/**
 * A non-zero integer together with its antiprime and superior antiprime status, factors and prime factorisation.
 * @remarks
 * Also exported as `HighlyCompositeNumber`. Despite the name, an instance can hold any non-zero safe integer: use
 * {@link Antiprime.isAntiprime} to check whether its value is an antiprime. The instances returned by
 * {@link Antiprime.nextAntiprime}, {@link Antiprime.previousAntiprime}, {@link Antiprime.nextSuperiorAntiprime} and
 * {@link Antiprime.previousSuperiorAntiprime} always hold antiprimes.
 *
 * Negative numbers are judged by their absolute value. Everything except the value is worked out on first use and cached.
 * @since 1.0.0
 * @example
 * ```ts
 * const ap = new Antiprime(10);
 * ap.isAntiprime(); // false
 * ap.nextAntiprime().value; // 12
 * ```
 */
export class Antiprime {
  readonly #value: number;
  #factors: number[] | undefined;
  #primeFactors: PrimeFactor[] | undefined;
  #isAntiprime: boolean | undefined;
  #isSuperiorAntiprime: boolean | undefined;

  /**
   * Creates an instance holding the absolute value of `n`, which need not be an antiprime.
   * @param n - A non-zero safe integer.
   * @throws `TypeError` If `n` is not a number.
   * @throws `RangeError` If `n` is zero, not an integer, or outside the safe integer range.
   */
  constructor(n: number) {
    assertNonZeroSafeInteger(n);
    this.#value = Math.abs(n);
  }

  /**
   * The number this instance holds, which is always positive.
   * @returns The absolute value of the number the instance was created with.
   * @since 1.0.0
   * @example
   * ```ts
   * new Antiprime(-12).value; // 12
   * ```
   */
  get value(): number {
    return this.#value;
  }

  /**
   * How many factors the value has.
   * @returns The number of factors of {@link Antiprime.value}, including 1 and the value itself.
   * @since 2.0.0
   * @example
   * ```ts
   * new Antiprime(12).factorCount; // 6
   * ```
   */
  get factorCount(): number {
    return factorCount(this.#primeFactorisation());
  }

  /**
   * Finds the largest antiprime smaller than the value.
   * @returns A new instance holding the previous antiprime.
   * @throws `RangeError` If the value is 1, the smallest antiprime.
   * @since 1.0.0
   * @example
   * ```ts
   * new Antiprime(12).previousAntiprime().value; // 6
   * new Antiprime(10).previousAntiprime().value; // 6
   * ```
   */
  previousAntiprime(): Antiprime {
    const previous = antiprimesUpTo(this.#value - 1).at(-1);
    if (previous === undefined) throw new RangeError("1 is the smallest antiprime");
    return new Antiprime(previous);
  }

  /**
   * Alias of {@link Antiprime.previousAntiprime}.
   * @returns A new instance holding the previous antiprime.
   * @throws `RangeError` If the value is 1, the smallest antiprime.
   * @since 1.0.0
   * @example
   * ```ts
   * new HighlyCompositeNumber(12).previousHighlyCompositeNumber().value; // 6
   * ```
   */
  previousHighlyCompositeNumber(): Antiprime {
    return this.previousAntiprime();
  }

  /**
   * Finds the smallest antiprime larger than the value.
   * @returns A new instance holding the next antiprime.
   * @throws `RangeError` If the next antiprime is larger than `Number.MAX_SAFE_INTEGER`.
   * @since 1.0.0
   * @example
   * ```ts
   * new Antiprime(12).nextAntiprime().value; // 24
   * new Antiprime(720720).nextAntiprime().value; // 1081080
   * ```
   */
  nextAntiprime(): Antiprime {
    const limit = Math.min(2 * this.#value, Number.MAX_SAFE_INTEGER);
    const next = antiprimesUpTo(limit).find((antiprime) => antiprime > this.#value);
    if (next === undefined) throw new RangeError("The next antiprime is larger than Number.MAX_SAFE_INTEGER");
    return new Antiprime(next);
  }

  /**
   * Alias of {@link Antiprime.nextAntiprime}.
   * @returns A new instance holding the next antiprime.
   * @throws `RangeError` If the next antiprime is larger than `Number.MAX_SAFE_INTEGER`.
   * @since 1.0.0
   * @example
   * ```ts
   * new HighlyCompositeNumber(12).nextHighlyCompositeNumber().value; // 24
   * ```
   */
  nextHighlyCompositeNumber(): Antiprime {
    return this.nextAntiprime();
  }

  /**
   * Determines whether the value is an antiprime.
   * @returns `true` if the value has more factors than any smaller positive integer; otherwise `false`.
   * @since 1.0.0
   * @example
   * ```ts
   * new Antiprime(12).isAntiprime(); // true
   * new Antiprime(10).isAntiprime(); // false
   * ```
   */
  isAntiprime(): boolean {
    return (this.#isAntiprime ??= isAntiprime(this.#value, this.#primeFactorisation()));
  }

  /**
   * Alias of {@link Antiprime.isAntiprime}.
   * @returns `true` if the value has more factors than any smaller positive integer; otherwise `false`.
   * @since 1.0.0
   * @example
   * ```ts
   * new HighlyCompositeNumber(12).isHighlyCompositeNumber(); // true
   * ```
   */
  isHighlyCompositeNumber(): boolean {
    return this.isAntiprime();
  }

  /**
   * Finds the largest superior antiprime smaller than the value.
   * @returns A new instance holding the previous superior antiprime.
   * @throws `RangeError` If the value is 1 or 2, since 2 is the smallest superior antiprime.
   * @since 2.1.0
   * @example
   * ```ts
   * new Antiprime(5040).previousSuperiorAntiprime().value; // 2520
   * new Antiprime(100).previousSuperiorAntiprime().value; // 60
   * ```
   */
  previousSuperiorAntiprime(): Antiprime {
    const previous = superiorAntiprimesUpTo(this.#value - 1).at(-1);
    if (previous === undefined) throw new RangeError("2 is the smallest superior antiprime");
    return new Antiprime(previous);
  }

  /**
   * Alias of {@link Antiprime.previousSuperiorAntiprime}.
   * @returns A new instance holding the previous superior antiprime.
   * @throws `RangeError` If the value is 1 or 2, since 2 is the smallest superior antiprime.
   * @since 2.1.0
   * @example
   * ```ts
   * new HighlyCompositeNumber(5040).previousSuperiorHighlyCompositeNumber().value; // 2520
   * ```
   */
  previousSuperiorHighlyCompositeNumber(): Antiprime {
    return this.previousSuperiorAntiprime();
  }

  /**
   * Finds the smallest superior antiprime larger than the value.
   * @returns A new instance holding the next superior antiprime.
   * @throws `RangeError` If the next superior antiprime is larger than `Number.MAX_SAFE_INTEGER`.
   * @since 2.1.0
   * @example
   * ```ts
   * new Antiprime(1).nextSuperiorAntiprime().value; // 2
   * new Antiprime(5040).nextSuperiorAntiprime().value; // 55440
   * ```
   */
  nextSuperiorAntiprime(): Antiprime {
    const next = superiorAntiprimesUpTo(Number.MAX_SAFE_INTEGER).find(
      (superiorAntiprime) => superiorAntiprime > this.#value,
    );
    if (next === undefined) throw new RangeError("The next superior antiprime is larger than Number.MAX_SAFE_INTEGER");
    return new Antiprime(next);
  }

  /**
   * Alias of {@link Antiprime.nextSuperiorAntiprime}.
   * @returns A new instance holding the next superior antiprime.
   * @throws `RangeError` If the next superior antiprime is larger than `Number.MAX_SAFE_INTEGER`.
   * @since 2.1.0
   * @example
   * ```ts
   * new HighlyCompositeNumber(5040).nextSuperiorHighlyCompositeNumber().value; // 55440
   * ```
   */
  nextSuperiorHighlyCompositeNumber(): Antiprime {
    return this.nextSuperiorAntiprime();
  }

  /**
   * Determines whether the value is a superior antiprime.
   * @remarks
   * The first superior antiprime is 2: 1 is excluded by convention, even though it is the first antiprime.
   * @returns `true` if the value is a superior antiprime; otherwise `false`.
   * @since 2.1.0
   * @example
   * ```ts
   * new Antiprime(60).isSuperiorAntiprime(); // true
   * new Antiprime(24).isSuperiorAntiprime(); // false, though 24 is an antiprime
   * ```
   */
  isSuperiorAntiprime(): boolean {
    return (this.#isSuperiorAntiprime ??= isSuperiorAntiprime(this.#value));
  }

  /**
   * Alias of {@link Antiprime.isSuperiorAntiprime}.
   * @returns `true` if the value is a superior antiprime; otherwise `false`.
   * @since 2.1.0
   * @example
   * ```ts
   * new HighlyCompositeNumber(60).isSuperiorHighlyCompositeNumber(); // true
   * ```
   */
  isSuperiorHighlyCompositeNumber(): boolean {
    return this.isSuperiorAntiprime();
  }

  /**
   * Lists every factor of the value.
   * @returns A new array of the factors in ascending order, which the caller may change freely.
   * @since 1.0.0
   * @example
   * ```ts
   * new Antiprime(12).getFactors(); // [1, 2, 3, 4, 6, 12]
   * ```
   */
  getFactors(): number[] {
    return [...(this.#factors ??= factors(this.#value))];
  }

  /**
   * Finds the prime factorisation of the value.
   * @returns A new array of new prime factor objects in ascending order, which the caller may change freely.
   * @since 1.0.0
   * @example
   * ```ts
   * new Antiprime(12).getPrimeFactors(); // [{ factor: 2, exponent: 2 }, { factor: 3, exponent: 1 }]
   * ```
   */
  getPrimeFactors(): PrimeFactor[] {
    return this.#primeFactorisation().map((primeFactor) => ({ ...primeFactor }));
  }

  /**
   * Finds the prime factorisation of the value, computing it on first use.
   * @returns The cached prime factorisation, which must not be changed.
   */
  #primeFactorisation(): PrimeFactor[] {
    return (this.#primeFactors ??= primeFactors(this.#value));
  }
}
