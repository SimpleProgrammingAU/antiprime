# antiprime

[![CI](https://github.com/SimpleProgrammingAU/antiprime/actions/workflows/ci.yml/badge.svg)](https://github.com/SimpleProgrammingAU/antiprime/actions/workflows/ci.yml)
[![API docs](https://img.shields.io/badge/docs-API-blue)](https://simpleprogrammingau.github.io/antiprime/)
![GitHub issues](https://img.shields.io/github/issues/SimpleProgrammingAU/antiprime)
![NPM Licence](https://img.shields.io/npm/l/antiprime)
![npm bundle size](https://img.shields.io/bundlephobia/min/antiprime)
![npm total downloads](https://img.shields.io/npm/dt/antiprime)
![npm version](https://img.shields.io/npm/v/antiprime)

Because sometimes we want [highly composite numbers](https://en.wikipedia.org/wiki/Highly_composite_number).

An **antiprime** (or highly composite number) is a positive integer with more factors than any smaller positive integer: 1, 2, 4, 6, 12, 24, 36, 48, 60, 120, …

## Installation

```sh
npm install antiprime
```

Requires Node.js 22 or later. The package ships both ES modules and CommonJS, with TypeScript types.

## Usage

```js
import { Antiprime, isAntiprime } from "antiprime";

isAntiprime(12); // true
isAntiprime(30); // false

const ap = new Antiprime(33);
ap.isAntiprime(); // false
ap.nextAntiprime().value; // 36
ap.factorCount; // 4
```

CommonJS works too:

```js
const { isHighlyComposite } = require("antiprime");

isHighlyComposite(12); // true
```

## API

The [API reference](https://simpleprogrammingau.github.io/antiprime/) documents every export, with examples.

### `new Antiprime(n)`

Also exported as `HighlyCompositeNumber`. Holds the number `n` (which need not be an antiprime) and works out its properties on first use.

| Member                                                    | Description                                                            |
| --------------------------------------------------------- | ---------------------------------------------------------------------- |
| `value`                                                   | The number held, always positive.                                      |
| `factorCount`                                             | How many factors `value` has.                                          |
| `isAntiprime()` / `isHighlyCompositeNumber()`             | Whether `value` is an antiprime.                                       |
| `nextAntiprime()` / `nextHighlyCompositeNumber()`         | A new instance holding the smallest antiprime larger than `value`.     |
| `previousAntiprime()` / `previousHighlyCompositeNumber()` | A new instance holding the largest antiprime smaller than `value`.     |
| `getFactors()`                                            | Every factor of `value`, ascending.                                    |
| `getPrimeFactors()`                                       | The prime factorisation of `value`, as `{ factor, exponent }` objects. |

### Functions

| Function                                            | Description                                                                               |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `isAntiprime(n, pf?)` / `isHighlyComposite(n, pf?)` | Whether `n` is an antiprime.                                                              |
| `isAntiprimeCandidate(n, pf?)`                      | Whether `n` passes the tests every antiprime passes (see below).                          |
| `factors(n)`                                        | Every factor of `n`, ascending.                                                           |
| `primeFactors(n)`                                   | The prime factorisation of `n` as `{ factor, exponent }` objects, ascending. Empty for 1. |
| `isPrime(n)`                                        | Whether `n` is prime.                                                                     |
| `nextPrime(n)`                                      | The smallest prime larger than `n`.                                                       |
| `isConsecutivePrimeFactors(pf)`                     | Whether the prime factorisation `pf` uses exactly the first _k_ primes.                   |
| `isPrimeExponentsReducing(pf)`                      | Whether the exponents in `pf` never increase from smaller to larger primes.               |

The optional `pf` argument is the prime factorisation of `n`, if you already have it. It is checked against `n`.

An **antiprime candidate** is a number whose prime factors are the first _k_ primes, whose exponents never increase, and whose largest prime factor has an exponent of 1 (4 and 36 are the only exceptions). Every antiprime is a candidate, but not every candidate is an antiprime.

The `PrimeFactor` type is exported for TypeScript users.

## Input rules

- **Negative numbers are judged by their absolute value.** `isAntiprime(-12)` is `true`, and `new Antiprime(-12).value` is `12`.
- **Numbers must be within the safe integer range** (up to `Number.MAX_SAFE_INTEGER`, 2⁵³ − 1).
- Functions that factorise (`factors`, `primeFactors`, `isAntiprime`, `isAntiprimeCandidate` and the `Antiprime` constructor) need a non-zero integer. `isPrime` and `nextPrime` also accept non-integers: `isPrime(10.5)` is `false` and `nextPrime(10.5)` is `11`.
- Invalid input throws a `TypeError` (not a number, or not an array of prime factors) or a `RangeError` (zero, a non-integer, NaN, infinite, outside the safe range, or a prime factorisation that is invalid or does not belong to `n`).

## Migrating from 1.x

2.0 fixes several wrong answers and modernises the package. You may need to change your code if you:

- **Import from inside the package** (for example `antiprime/lib/...`). Only `antiprime` itself can be imported now.
- **Run Node.js older than 22.**
- **Rely on lenient input handling.** Zero, NaN, infinite and out-of-range numbers now throw a `RangeError` everywhere. `factors(0)` used to return `[0]`, and `isAntiprime(1.5)` used to return `true`.
- **Use `primeFactors(1)`.** It now returns `[]` instead of `[{ factor: 2, exponent: 0 }]`.
- **Call `previousAntiprime()` on 1.** It throws `RangeError("1 is the smallest antiprime")`.
- **Detach methods from an instance** (such as `const next = ap.nextAntiprime; next()`). Methods now live on the class prototype, so call them on the instance.

See the [changelog](CHANGELOG.md) for the full list.

## Development

```sh
pnpm install
pnpm test:coverage   # tests, with 100% coverage required
pnpm lint            # ESLint, including TSDoc rules
pnpm typecheck
pnpm format          # Prettier
pnpm build           # ESM + CommonJS build, checked with publint and attw
pnpm docs:build      # API docs
```

Releases are published by GitHub Actions; see [docs/releasing.md](docs/releasing.md).
