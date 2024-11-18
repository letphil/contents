/**
 * @description takes 2 numbers and adds them
 * @param {number} a number to be passed and added to b
 * @param {number} b number to be passed and added to a
 * @returns {number} sum of a and b
 *
 * @example sum(1, 1)
 */
function sum(a, b) {
  if (!a || !b) throw new Error("both arguments should be passed");
  if (typeof a !== "number" || typeof b !== "number")
    throw new Error("both arguments should be numbers");
  return a + b;
}

module.exports = sum;
