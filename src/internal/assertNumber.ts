/**
 * Asserts that `n` is a number whose magnitude is within the safe integer range.
 * @param n - The value to check.
 * @throws `TypeError` If `n` is not a number.
 * @throws `RangeError` If `n` is NaN, infinite or larger in magnitude than `Number.MAX_SAFE_INTEGER`.
 */
export function assertSafeNumber(n: number): void {
  if (typeof n !== "number") throw new TypeError(`Expected a number, received ${typeof n}`);
  if (!(Math.abs(n) <= Number.MAX_SAFE_INTEGER)) throw new RangeError(`Expected a safe number, received ${n}`);
}

/**
 * Asserts that `n` is a safe integer other than zero.
 * @param n - The value to check.
 * @throws `TypeError` If `n` is not a number.
 * @throws `RangeError` If `n` is zero, not an integer, or outside the safe integer range.
 */
export function assertNonZeroSafeInteger(n: number): void {
  assertSafeNumber(n);
  if (!Number.isInteger(n)) throw new RangeError(`Expected an integer, received ${n}`);
  if (n === 0) throw new RangeError("Expected a non-zero integer, received 0");
}
