import { strict as assert } from "assert";
import {
  Antiprime,
  HighlyCompositeNumber,
  factors,
  isAntiprime,
  isHighlyComposite,
  isConsecutivePrimeFactors,
  isPrime,
  isPrimeExponentsReducing,
  nextPrime,
  primeFactors,
} from "./";
import { PrimeFactor } from "./interfaces";
import { isAntiprimeCandidate } from "./functions";

test("factors(n)", () => {
  assert.deepStrictEqual(factors(0), [0]);
  assert.deepStrictEqual(factors(1), [1]);
  assert.deepStrictEqual(factors(2), [1, 2]);
  assert.deepStrictEqual(factors(3), [1, 3]);
  assert.deepStrictEqual(factors(-4), [1, 2, 4]);
  assert.deepStrictEqual(factors(-5), [1, 5]);
  assert.deepStrictEqual(factors(-6), [1, 2, 3, 6]);
  assert.deepStrictEqual(factors(7), [1, 7]);
  assert.deepStrictEqual(factors(8), [1, 2, 4, 8]);
  assert.deepStrictEqual(factors(9), [1, 3, 9]);
  assert.deepStrictEqual(factors(10), [1, 2, 5, 10]);
  assert.deepStrictEqual(factors(11), [1, 11]);
  assert.deepStrictEqual(factors(12), [1, 2, 3, 4, 6, 12]);
  assert.deepStrictEqual(factors(125), [1, 5, 25, 125]);
  assert.throws(() => factors(1.1));
  assert.throws(() => factors(("abc" as unknown) as number));
  assert.throws(() => factors(("1" as unknown) as number));
});

test("isPrime(n)", () => {
  assert.strictEqual(isPrime(0), false);
  assert.strictEqual(isPrime(0.1), false);
  assert.strictEqual(isPrime(-1), false);
  assert.strictEqual(isPrime(1), false);
  assert.strictEqual(isPrime(1.1), false);
  assert.strictEqual(isPrime(-1.1), false);
  assert.strictEqual(isPrime(10.5), false);
  assert.strictEqual(isPrime(-100.5), false);
  assert.strictEqual(isPrime(2), true);
  assert.strictEqual(isPrime(3), true);
  assert.strictEqual(isPrime(4), false);
  assert.strictEqual(isPrime(5), true);
  assert.strictEqual(isPrime(6), false);
  assert.strictEqual(isPrime(7), true);
  assert.strictEqual(isPrime(8), false);
  assert.strictEqual(isPrime(9), false);
  assert.strictEqual(isPrime(10), false);
  assert.strictEqual(isPrime(97), true);
  assert.throws(() => isPrime(("abc" as unknown) as number));
  assert.throws(() => isPrime(("1" as unknown) as number));
});

test("nextPrime(n)", () => {
  assert.strictEqual(nextPrime(0), 2);
  assert.strictEqual(nextPrime(0.1), 2);
  assert.strictEqual(nextPrime(-1), 2);
  assert.strictEqual(nextPrime(1), 2);
  assert.strictEqual(nextPrime(1.1), 2);
  assert.strictEqual(nextPrime(-1.1), 2);
  assert.strictEqual(nextPrime(10.5), 11);
  assert.strictEqual(nextPrime(-100.5), 101);
  assert.strictEqual(nextPrime(2), 3);
  assert.strictEqual(nextPrime(3), 5);
  assert.strictEqual(nextPrime(4), 5);
  assert.strictEqual(nextPrime(5), 7);
  assert.strictEqual(nextPrime(6), 7);
  assert.strictEqual(nextPrime(7), 11);
  assert.strictEqual(nextPrime(8), 11);
  assert.strictEqual(nextPrime(9), 11);
  assert.strictEqual(nextPrime(10), 11);
  assert.strictEqual(nextPrime(97), 101);
  assert.throws(() => nextPrime(("abc" as unknown) as number));
  assert.throws(() => nextPrime(("1" as unknown) as number));
});

test("primeFactors(n)", () => {
  assert.deepStrictEqual(primeFactors(1), [{ factor: 2, exponent: 0 }]);
  assert.deepStrictEqual(primeFactors(-1), [{ factor: 2, exponent: 0 }]);
  assert.deepStrictEqual(primeFactors(2), [{ factor: 2, exponent: 1 }]);
  assert.deepStrictEqual(primeFactors(3), [{ factor: 3, exponent: 1 }]);
  assert.deepStrictEqual(primeFactors(4), [{ factor: 2, exponent: 2 }]);
  assert.deepStrictEqual(primeFactors(5), [{ factor: 5, exponent: 1 }]);
  assert.deepStrictEqual(primeFactors(6), [
    { factor: 2, exponent: 1 },
    { factor: 3, exponent: 1 },
  ]);
  assert.deepStrictEqual(primeFactors(7), [{ factor: 7, exponent: 1 }]);
  assert.deepStrictEqual(primeFactors(8), [{ factor: 2, exponent: 3 }]);
  assert.deepStrictEqual(primeFactors(9), [{ factor: 3, exponent: 2 }]);
  assert.deepStrictEqual(primeFactors(10), [
    { factor: 2, exponent: 1 },
    { factor: 5, exponent: 1 },
  ]);
  assert.deepStrictEqual(primeFactors(12), [
    { factor: 2, exponent: 2 },
    { factor: 3, exponent: 1 },
  ]);
  assert.deepStrictEqual(primeFactors(100), [
    { factor: 2, exponent: 2 },
    { factor: 5, exponent: 2 },
  ]);
  assert.throws(() => primeFactors(0));
  assert.throws(() => primeFactors(12.1));
  assert.throws(() => primeFactors(-12.1));
  assert.throws(() => primeFactors(("abc" as unknown) as number));
  assert.throws(() => primeFactors(("1" as unknown) as number));
});

test("isConsecutivePrimeFactors(n)", () => {
  assert.strictEqual(isConsecutivePrimeFactors(primeFactors(1)), true);
  assert.strictEqual(isConsecutivePrimeFactors(primeFactors(-1)), true);
  assert.strictEqual(isConsecutivePrimeFactors(primeFactors(2)), true);
  assert.strictEqual(isConsecutivePrimeFactors(primeFactors(3)), false);
  assert.strictEqual(isConsecutivePrimeFactors(primeFactors(4)), true);
  assert.strictEqual(isConsecutivePrimeFactors(primeFactors(5)), false);
  assert.strictEqual(isConsecutivePrimeFactors(primeFactors(6)), true);
  assert.strictEqual(isConsecutivePrimeFactors(primeFactors(7)), false);
  assert.strictEqual(isConsecutivePrimeFactors(primeFactors(8)), true);
  assert.strictEqual(isConsecutivePrimeFactors(primeFactors(9)), false);
  assert.strictEqual(isConsecutivePrimeFactors(primeFactors(10)), false);
  assert.strictEqual(isConsecutivePrimeFactors(primeFactors(12)), true);
  assert.strictEqual(isConsecutivePrimeFactors(primeFactors(21)), false);
  assert.strictEqual(isConsecutivePrimeFactors(primeFactors(36)), true);
  assert.strictEqual(isConsecutivePrimeFactors(primeFactors(45)), false);
  assert.strictEqual(isConsecutivePrimeFactors(primeFactors(100)), false);
  assert.throws(() => isConsecutivePrimeFactors((0 as unknown) as PrimeFactor[]));
  assert.throws(() => isConsecutivePrimeFactors(({ exponent: 1, factor: 2 } as unknown) as PrimeFactor[]));
  assert.throws(() => isConsecutivePrimeFactors(([{ exponent: "a", factor: "b" }] as unknown) as PrimeFactor[]));
  assert.throws(() => isConsecutivePrimeFactors(([{ exponent: 1 }] as unknown) as PrimeFactor[]));
  assert.throws(() => isConsecutivePrimeFactors(("abc" as unknown) as PrimeFactor[]));
  assert.throws(() => isConsecutivePrimeFactors((undefined as unknown) as PrimeFactor[]));
});

test("isPrimeExponentsReducing(n)", () => {
  assert.strictEqual(isPrimeExponentsReducing(primeFactors(1)), true);
  assert.strictEqual(isPrimeExponentsReducing(primeFactors(-1)), true);
  assert.strictEqual(isPrimeExponentsReducing(primeFactors(2)), true);
  assert.strictEqual(isPrimeExponentsReducing(primeFactors(3)), true);
  assert.strictEqual(isPrimeExponentsReducing(primeFactors(4)), true);
  assert.strictEqual(isPrimeExponentsReducing(primeFactors(5)), true);
  assert.strictEqual(isPrimeExponentsReducing(primeFactors(6)), true);
  assert.strictEqual(isPrimeExponentsReducing(primeFactors(7)), true);
  assert.strictEqual(isPrimeExponentsReducing(primeFactors(8)), true);
  assert.strictEqual(isPrimeExponentsReducing(primeFactors(9)), true);
  assert.strictEqual(isPrimeExponentsReducing(primeFactors(10)), true);
  assert.strictEqual(isPrimeExponentsReducing(primeFactors(12)), true);
  assert.strictEqual(isPrimeExponentsReducing(primeFactors(18)), false);
  assert.strictEqual(isPrimeExponentsReducing(primeFactors(90)), false);
  assert.strictEqual(isPrimeExponentsReducing(primeFactors(300)), false);
  assert.strictEqual(isPrimeExponentsReducing(primeFactors(100)), true);
  assert.throws(() => isPrimeExponentsReducing((0 as unknown) as PrimeFactor[]));
  assert.throws(() => isPrimeExponentsReducing(({ exponent: 1, factor: 2 } as unknown) as PrimeFactor[]));
  assert.throws(() => isPrimeExponentsReducing(([{ exponent: "a", factor: "b" }] as unknown) as PrimeFactor[]));
  assert.throws(() => isPrimeExponentsReducing(([{ exponent: 1 }] as unknown) as PrimeFactor[]));
  assert.throws(() => isPrimeExponentsReducing(("abc" as unknown) as PrimeFactor[]));
  assert.throws(() => isPrimeExponentsReducing((undefined as unknown) as PrimeFactor[]));
});

test("isAntiprime(n) and isHighlyComposite", () => {
  assert.strictEqual(isAntiprime(-1), true);
  assert.strictEqual(isHighlyComposite(1), true);
  assert.strictEqual(isAntiprime(2), true);
  assert.strictEqual(isHighlyComposite(3), false);
  assert.strictEqual(isAntiprime(4), true);
  assert.strictEqual(isHighlyComposite(5), false);
  assert.strictEqual(isAntiprime(6), true);
  assert.strictEqual(isHighlyComposite(12, primeFactors(12)), true);
  assert.strictEqual(isAntiprime(15), false);
  assert.strictEqual(isHighlyComposite(18), false);
  assert.strictEqual(isAntiprime(90), false);
  assert.throws(() => isAntiprime(0));
  assert.throws(() => isAntiprime(100.1));
  assert.throws(() => isAntiprime(("abc" as unknown) as number));
  assert.throws(() => isAntiprime(("1" as unknown) as number));
});

test("isAntiprimeCandidate(n)", () => {
  assert.strictEqual(isAntiprimeCandidate(-1), true);
  assert.strictEqual(isAntiprimeCandidate(1), true);
  assert.strictEqual(isAntiprimeCandidate(2), true);
  assert.strictEqual(isAntiprimeCandidate(3), false);
  assert.strictEqual(isAntiprimeCandidate(4), true);
  assert.strictEqual(isAntiprimeCandidate(5), false);
  assert.strictEqual(isAntiprimeCandidate(6), true);
  assert.strictEqual(isAntiprimeCandidate(12, primeFactors(12)), true);
  assert.throws(() => isAntiprimeCandidate(("abc" as unknown) as number));
});

const ap = [
  new Antiprime(-10),
  new Antiprime(-12),
  new Antiprime(1),
  new HighlyCompositeNumber(36),
  new HighlyCompositeNumber(125),
  new HighlyCompositeNumber(5040),
];
test("new Antiprime(n) and new HighlyCompositeNumber(n)", () => {
  //-10
  assert.strictEqual(ap[0].nextAntiprime().value, 12);
  assert.strictEqual(ap[0].previousAntiprime().value, 6);
  assert.strictEqual(ap[0].isAntiprime(), false);
  assert.deepStrictEqual(ap[0].getFactors(), [1, 2, 5, 10]);
  assert.deepStrictEqual(ap[0].getPrimeFactors(), [
    { factor: 2, exponent: 1 },
    { factor: 5, exponent: 1 },
  ]);
  //-12
  assert.strictEqual(ap[1].nextAntiprime().value, 24);
  assert.strictEqual(ap[1].previousAntiprime().value, 6);
  assert.strictEqual(ap[1].isAntiprime(), true);
  assert.deepStrictEqual(ap[1].getFactors(), [1, 2, 3, 4, 6, 12]);
  assert.deepStrictEqual(ap[1].getPrimeFactors(), [
    { factor: 2, exponent: 2 },
    { factor: 3, exponent: 1 },
  ]);
  //1
  assert.strictEqual(ap[2].nextAntiprime().value, 2);
  assert.throws(() => ap[2].previousAntiprime().value);
  assert.strictEqual(ap[2].isAntiprime(), true);
  assert.deepStrictEqual(ap[2].getFactors(), [1]);
  assert.deepStrictEqual(ap[2].getPrimeFactors(), [{ factor: 2, exponent: 0 }]);
  //36
  assert.strictEqual(ap[3].nextHighlyCompositeNumber().value, 48);
  assert.strictEqual(ap[3].previousHighlyCompositeNumber().value, 24);
  assert.strictEqual(ap[3].isHighlyCompositeNumber(), true);
  assert.deepStrictEqual(ap[3].getFactors(), [1, 2, 3, 4, 6, 9, 12, 18, 36]);
  assert.deepStrictEqual(ap[3].getPrimeFactors(), [
    { factor: 2, exponent: 2 },
    { factor: 3, exponent: 2 },
  ]);
  //125
  assert.strictEqual(ap[4].nextHighlyCompositeNumber().value, 180);
  assert.strictEqual(ap[4].previousHighlyCompositeNumber().value, 120);
  assert.strictEqual(ap[4].isHighlyCompositeNumber(), false);
  assert.deepStrictEqual(ap[4].getFactors(), [1, 5, 25, 125]);
  assert.deepStrictEqual(ap[4].getPrimeFactors(), [
    { factor: 5, exponent: 3 },
  ]);
  //5040
  assert.strictEqual(ap[5].nextHighlyCompositeNumber().value, 7560);
  assert.strictEqual(ap[5].previousHighlyCompositeNumber().value, 2520);
  assert.strictEqual(ap[5].isHighlyCompositeNumber(), true);
  assert.deepStrictEqual(ap[5].getFactors(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24, 28, 30, 35, 36, 40, 42, 45, 48, 56, 60, 63, 70, 72, 80, 84, 90, 105, 112, 120, 126, 140, 144, 168, 180, 210, 240, 252, 280, 315, 336, 360, 420, 504, 560, 630, 720, 840, 1008, 1260, 1680, 2520, 5040]);
  assert.deepStrictEqual(ap[5].getPrimeFactors(), [
    { factor: 2, exponent: 4 },
    { factor: 3, exponent: 2 },
    { factor: 5, exponent: 1 },
    { factor: 7, exponent: 1 },
  ]);
  //Error conditions
  assert.throws(() => new Antiprime(("a" as unknown) as number));
  assert.throws(() => new Antiprime(10.5));
  assert.throws(() => new Antiprime(0));
});
