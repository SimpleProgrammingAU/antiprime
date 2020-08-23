# antiprime

[![Build Status](https://travis-ci.org/SimpleProgrammingAU/nihon-numbers.svg?branch=master)](https://travis-ci.org/SimpleProgrammingAU/nihon-numbers)
[![Coverage Status](https://coveralls.io/repos/github/SimpleProgrammingAU/nihon-numbers/badge.svg?branch=master)](https://coveralls.io/github/SimpleProgrammingAU/nihon-numbers?branch=master)
![GitHub issues](https://img.shields.io/github/issues/SimpleProgrammingAU/antiprime)
![NPM Licence](https://img.shields.io/npm/l/nihon-numbers)
![npm bundle size](https://img.shields.io/bundlephobia/min/nihon-numbers)
![npm total downloads](https://img.shields.io/npm/dt/nihon-numbers)
![npm version](https://img.shields.io/npm/v/nihon-numbers)

Because sometimes we want [highly composite numbers](https://en.wikipedia.org/wiki/Highly_composite_number).

## Installation
```sh
npm i --save antiprime
```

## Usage
### JavaScript
```javascript
const { isHighlyComposite } = require('antiprime');
const hc = isHighlyComposite(12);
console.log(hc); //Outputs: true
```

### TypeScript
```typescript
import { Antiprime } from 'antiprime';
const ap = new Antiprime(33);
console.log(ap.isAntiprime()); //Outputs: false
```

## API
```javascript
new Antiprime(n);
new HighlyCompositeNumber(n); //alias
```
Creates a new Antiprime class object.
### Properties
```javascript
value
```
The positive integer value currently stored in the Antiprime object.

### Functions
```javascript
previousAntiprime()
previousHighlyCompositeNumber() //alias
```
Returns a new `Antiprime` object where `value` is equal to the next lowest Antiprime number.

```javascript
nextAntiprime()
nextHighlyCompositeNumber() //alias
```
Returns a new `Antiprime` object where `value` is equal to the next largest Antiprime number.

```javascript
getFactors()
```
Returns an array of numbers that include all factors including the 1 and `value`.

```javascript
getPrimeFactors()
```
Returns an array of objects with properties `factor` and `exponent` of all prime factors.

-------

As well as the `Antiprime` class, there are exported functions that can used to test numbers without calculating other properties.

### Functions
```javascript
factors(n)
```
Takes an input integer `n` and returns all factors of the input as an array of numbers.
```javascript
isAntiprime(n, pf)
isHighlyComposite(n, pf) //alias
```
Takes an input integer `n` and returns `true` if the input is highly composite; false otherwise. Optional input `pf` is the output to the `primeFactors` function. This is provided to reduce computational overhead in the case that `primeFactors` has been calculated for `n` previously.
```javascript
isAntiprimeCandidate(n, pf)
```
Takes an input integer `n` and returns `true` if the input is a candidate for a highly composite number; false otherwise. Optional input `pf` is the output to the `primeFactors` function. This is provided to reduce computational overhead in the case that `primeFactors` has been calculated for `n` previously.

A candidate is a number that meets the following criteria:

* The `k` prime factors are equal to the first `k` prime numbers.
* The exponent of each prime factor does not increase as the magnitude of prime factors increases.
* The exponent of the final prime factor is `1`.
* `n` is one of the special cases: 4 or 36.

```javascript
isConsecutivePrimeFactors(pf)
```
Takes the output of `primeFactors` and returns `true` if the `k` prime factors are equal to the first `k` prime numbers; `false` otherwise.

```javascript
isPrime(n)
```
Returns true if the input number `n` is prime; `false` otherwise.

```javascript
isPrimeExponentsReducing(pf)
```
Takes the output of `primeFactors` and returns `true` if the exponent of each prime factor does not increase as the magnitude of prime factors increases; `false` otherwise.

```javascript
nextPrime(n)
```
Returns the next prime number larger than the magnitude of `n`.

```javascript
primeFactors(n)
```
Returns an array of objects containing the properties `factor` and `magnitude` representing the prime factors of `n` and their magnitude.

## Test
```sh
npm run test
```