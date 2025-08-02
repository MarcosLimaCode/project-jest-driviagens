import * as serviceFunctions from "../../src/services/miles-calculator-service";
import { createTrip } from "../factories/miles-factory";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Calculate Miles", () => {
  it("should calculate miles", async () => {
    const fakeTrip = await createTrip();
    const result = serviceFunctions.calculateMiles(fakeTrip);

    expect(result).toBeGreaterThan(0);
  });

  it("should return error to calculate miles in use", async () => {
    const fakeTrip = await createTrip();
    const result = serviceFunctions.calculateMiles({
      ...fakeTrip,
      miles: true,
    });

    expect(result).toBe(0);
  });
});
