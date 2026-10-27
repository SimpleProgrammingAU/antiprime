# Changelog

## 2.0.0

### Breaking changes

- The package now ships ES modules and CommonJS through an `exports` map. Imports from inside the package (such as `antiprime/lib/...`) no longer work, and `lib/index.min.js` is gone.
- Node.js 22 or later is required.
- Input validation is consistent and stricter:
  - NaN, ±Infinity and numbers outside the safe integer range throw `RangeError` in every function.
  - Zero throws `RangeError` wherever a non-zero integer is needed. Previously `factors(0)` returned `[0]`, and `primeFactors(0)`, `isAntiprime(0)` and `new Antiprime(0)` threw `TypeError`.
  - `isAntiprime` and `isAntiprimeCandidate` throw `RangeError` for non-integers. Previously `isAntiprime(1.5)` returned `true`.
  - A `pf` argument must be the prime factorisation of `n`, or a `RangeError` is thrown. Previously a mismatched `pf` gave a wrong answer.
  - Prime factorisations passed to `isConsecutivePrimeFactors` and `isPrimeExponentsReducing` must be ascending distinct primes with exponents of at least 1, or a `RangeError` is thrown.
- `primeFactors(1)` returns `[]` instead of `[{ factor: 2, exponent: 0 }]`. `isConsecutivePrimeFactors([])` and `isPrimeExponentsReducing([])` return `true` instead of throwing.
- `previousAntiprime()` on 1 throws `RangeError("1 is the smallest antiprime")` instead of an unrelated error.
- `getFactors()` and `getPrimeFactors()` return copies, so changing the result no longer changes the instance.
- `Antiprime` methods are defined on the class prototype instead of on each instance, so calling a detached method (`const next = ap.nextAntiprime; next()`) no longer works.

### Added

- The `factorCount` getter on `Antiprime`.
- The `PrimeFactor` type is exported.
- An [API reference](https://simpleprogrammingau.github.io/antiprime/) generated from the TSDoc comments.

### Fixed

- `nextPrime(NaN)` and `nextPrime(Infinity)` no longer loop forever.
- `isAntiprime` no longer returns `true` for non-integers between 0 and 2.

### Performance

- `isAntiprime`, `nextAntiprime` and `previousAntiprime` only examine antiprime candidates, so they answer in milliseconds even near `Number.MAX_SAFE_INTEGER`. Previously the cost grew roughly with the square of `n`; `new Antiprime(55440).nextAntiprime()` took about 4 seconds.
- `isPrime`, `factors` and `primeFactors` only test divisors up to √n.
- `new Antiprime(n)` no longer works out every property up front; each is computed on first use and cached.
