import * as serviceFunctions from "../../src/services/distances-calculator-service";
import { createTrip } from "../factories/miles-factory";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("calculate distances", () => {
  it("should return the distance", async () => {
    jest
      .spyOn(serviceFunctions, "applyHaversineFormula")
      .mockReturnValueOnce(1);

    const { origin, destination } = await createTrip();
    const result = serviceFunctions.calculateDistance(origin, destination);
    expect(result).toBe(Math.round(1));
  });
});
