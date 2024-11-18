const sum = require("./sum");

test("sum should add 2 numbers together", function () {
  expect(sum(1, 1)).toBe(2);
  expect(sum(50, 50)).toBe(100);
});

test("both arguments should be passed", function () {
  expect(() => sum(1)).toThrow("both arguments should be passed");
});

test("both arguments should be numbers", function () {
  expect(() => sum("hello", "goodbye")).toThrow(
    "both arguments should be numbers"
  );
});
