// Constants
const BITS_PER_NUMBER = 16;
const MASK_16BIT = (1n << 16n) - 1n; // 0xFFFF
// Current alphabet uses 64 URL-safe characters; feel free to expand/modify later.
const ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.-";
const BASE = BigInt(ALPHABET.length);

/**
 * Combine an array of 16-bit numbers into a single BigInt
 * @param {number[]} numbers - Array of 16-bit numbers (0-65535)
 * @returns {bigint} Combined BigInt
 */
export function combine(numbers) {
  let result = 0n;
  for (let i = 0; i < numbers.length; i++) {
    const num = BigInt(numbers[i]);
    const shift = BigInt((numbers.length - 1 - i) * BITS_PER_NUMBER);
    result |= (num & MASK_16BIT) << shift;
  }
  return result;
}

/**
 * Split a BigInt back into an array of 16-bit numbers
 * @param {bigint} bigIntValue - Combined BigInt value
 * @param {number} count - How many 16-bit numbers to extract
 * @returns {number[]} Array of 16-bit numbers
 */
export function split(bigIntValue, count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    const shift = BigInt((count - 1 - i) * BITS_PER_NUMBER);
    const num = (bigIntValue >> shift) & MASK_16BIT;
    result.push(Number(num));
  }
  return result;
}

/**
 * Convert a BigInt to a compact string using the active alphabet (currently 62 chars).
 * @param {bigint} num - BigInt to encode
 * @returns {string} Encoded string
 */
export function encode(num) {
  if (num === 0n) return "0";
  
  let encoded = "";
  while (num > 0n) {
  const remainder = Number(num % BASE);
  encoded = ALPHABET[remainder] + encoded;
    num = num / BASE;
  }
  return encoded;
}

/**
 * Convert an encoded string (using the active alphabet) back into a BigInt.
 * @param {string} encoded - Encoded string
 * @returns {bigint} Decoded BigInt
 */
export function decode(encoded) {
  let result = 0n;
  
  for (const char of encoded) {
  const value = ALPHABET.indexOf(char);
  if (value === -1) throw new Error(`Invalid encoded character: ${char}`);
    result = result * BASE + BigInt(value);
  }
  return result;
}
