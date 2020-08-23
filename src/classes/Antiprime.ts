import { PrimeFactor } from "../interfaces";
import { isAntiprime, factors, primeFactors } from "../functions";

/**
 * The class representation of numbers and their antiprime (highly composite) status.
 * Note: constructed Antiprimes (via `new Antiprime(n)`) are not necessarily highly composite and should be checked via `Antiprime.isAntiprime()`.
 * Any new values derived from the class methods are antiprime.
 * All negative inputs are made positive.
 */
class Antiprime {
  private _value: number;
  private _isAntiprime: boolean;
  private _factors: number[];
  private _primeFactors: PrimeFactor[];

  /**
   * Creates new Antiprime object.
   * @param n the input number; note: this number is not necessarily highly composite.
   */
  constructor(n: number) {
    this._value = n < 0 ? (n *= -1) : n;
    this._isAntiprime = isAntiprime(n);
    this._factors = factors(n);
    this._primeFactors = primeFactors(n);
  }

  get value() {
    return this._value;
  }

  /**
   * Creates a new Antiprime object that represents the next antiprime smaller than the current Antiprime object.
   */
  public previousAntiprime = (): Antiprime => {
    let nextVal = this._value - 1;
    while (!isAntiprime(nextVal) && nextVal > 0) nextVal--;
    return new Antiprime(nextVal);
  };

  /**
   * Alias of `previousAntiprime`.
   */
  public previousHighlyCompositeNumber = (): Antiprime => {
    return this.previousAntiprime();
  };

  /**
   * Creates a new Antiprime object that represents the next antiprime larger than the current Antiprime object.
   */
  public nextAntiprime = (): Antiprime => {
    let nextVal = this._value + 1;
    while (!isAntiprime(nextVal)) nextVal++;
    return new Antiprime(nextVal);
  };

  /**
   * Alias of `nextAntiprime`.
   */
  public nextHighlyCompositeNumber = (): Antiprime => {
    return this.nextAntiprime();
  };

  /**
   * Returns the current highly composite status of the Antiprime object.
   */
  public isAntiprime = (): boolean => {
    return this._isAntiprime;
  };

  /**
   * Alias of `nextAntiprime`.
   */
  public isHighlyCompositeNumber = (): boolean => {
    return this.isAntiprime();
  };

  /**
   * Returns all of the factors associated with the current Antiprime object.
   */
  public getFactors = (): number[] => {
    return this._factors;
  };

  /**
   * Returns all of the prime factors and their exponents.
   */
  public getPrimeFactors = (): PrimeFactor[] => {
    return this._primeFactors;
  };
}

export default Antiprime;
