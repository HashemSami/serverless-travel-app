import { getDateString, calculateRemainingDays } from "../client/js/helperFunctions";

describe("Testing helper functions", () => {
  it("should be able to output a date strting of: YYYY-M-D", () => {
    const d = new Date(1603964649968);
    const timestamp = d.getTime();
    const result = `2020-10-29`;
    expect(getDateString(timestamp)).toBe(result);
  });

  it("should be able to calculate the remaining days from the current date to entered date", () => {
    const d = new Date();

    const dFuture = new Date();
    dFuture.setDate(d.getDate() + 16);

    expect(calculateRemainingDays(dFuture.getTime())).toBe(16);
  });
});
