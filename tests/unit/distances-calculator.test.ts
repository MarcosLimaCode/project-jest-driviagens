import * as serviceFunctions from "../../src/services/distances-calculator-service";
import { createTrip } from "../factories/miles-factory";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("calculate distances", () => {
  it("should return the distance", async () => {
    const { origin, destination } = await createTrip();
    const result = serviceFunctions.calculateDistance(
      origin,
      destination,
      true
    );
    expect(result).toBeGreaterThan(0);
    expect(result).toBeDefined();
  });

  it("should return the radius", async () => {
    const result = serviceFunctions.toRadius(1000);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeDefined();
  });

  it("should return the Haversine Formula", async () => {
    const result = serviceFunctions.applyHaversineFormula(1, 2, 3, 4, 5);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeDefined();
  });
});
