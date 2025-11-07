// Constants
const BITS_PER_NUMBER = 16;
const MASK_16BIT = (1n << 16n) - 1n; // 0xFFFF
const base62chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

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
 * Bonus: Convert BigInt to Base62
 * @param {bigint} num - BigInt to encode
 * @returns {string} Base62 encoded string
 */
export function encode(num) {
  if (num === 0n) return "0";
  
  let encoded = "";
  while (num > 0n) {
    const remainder = Number(num % 62n);
    encoded = base62chars[remainder] + encoded;
    num = num / 62n;
  }
  return encoded;
}

/**
 * Bonus: Convert Base62 back to BigInt
 * @param {string} encoded - Base62 encoded string
 * @returns {bigint} Decoded BigInt
 */
export function decode(encoded) {
  let result = 0n;
  
  for (const char of encoded) {
    const value = base62chars.indexOf(char);
    if (value === -1) throw new Error(`Invalid Base62 character: ${char}`);
    result = result * 62n + BigInt(value);
  }
  return result;
}
