import * as validators from "./validators";

test('validator "empty"', () => {
  expect(validators.empty(undefined)).toBe(true);
  expect(validators.empty(null)).toBe(true);
  // strings
  expect(validators.empty("")).toBe(true);
  expect(validators.empty("some string")).toBe(false);
  // numbers
  expect(validators.empty(0)).toBe(false);
  expect(validators.empty(1)).toBe(false);
});

test('validator "notEmpty"', () => {
  expect(validators.notEmpty(undefined)).toBe(false);
  expect(validators.notEmpty(null)).toBe(false);
  // strings
  expect(validators.notEmpty("")).toBe(false);
  expect(validators.notEmpty("some string")).toBe(true);
  // numbers
  expect(validators.notEmpty(0)).toBe(true);
  expect(validators.notEmpty(1)).toBe(true);
});
