import { it, expect, describe } from "vitest"; // it lets us create test,except checks if the resut is correct,describe group tests together,group of tests = test suite
import { formatMoney } from "./money";

describe("formatMoney", () => {
  it("formats 1999 cents as $19.99", () => {
    // String is considered as name of the test,describes what we are testing
    expect(formatMoney(1999)).toBe("$19.99"); // if equal is it passed,if not it is failed,vitest will display it in summary
  });

  it("displays 2 decimals", () => {
    expect(formatMoney(1090)).toBe("$10.90");
    expect(formatMoney(100)).toBe("$1.00");
  });
});

