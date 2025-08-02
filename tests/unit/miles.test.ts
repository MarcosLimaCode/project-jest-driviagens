import * as serviceFunctions from "../../src/services/miles-calculator-service";
import * as repositoriesFunctions from "../../src/repositories/miles-repository";
import {
  generateMilesForTrip,
  getMilesFromCode,
} from "../../src/services/miles-service";
import { createMiles, createTrip } from "../factories/miles-factory";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Miles service", () => {
  it("should generate miles for trip", async () => {
    const data = await createMiles();
    const miles = 6271627621;
    jest.spyOn(repositoriesFunctions, "findMiles").mockReturnValueOnce(null);
    jest.spyOn(repositoriesFunctions, "saveMiles").mockResolvedValueOnce(data);
    jest.spyOn(serviceFunctions, "calculateMiles").mockReturnValueOnce(miles);

    const fakeTrip = await createTrip();
    const result = await generateMilesForTrip(fakeTrip);

    expect(repositoriesFunctions.findMiles).toHaveBeenCalled();
    expect(repositoriesFunctions.saveMiles).toHaveBeenCalled();
    expect(serviceFunctions.calculateMiles).toHaveBeenCalled();
    expect(result).toBe(miles);
  });

  it("should get miles from code", async () => {
    const data = await createMiles();
    jest.spyOn(repositoriesFunctions, "findMiles").mockResolvedValueOnce(data);

    const result = await getMilesFromCode(data.code);

    expect(repositoriesFunctions.findMiles).toHaveBeenCalled();
    expect(result).toEqual(data);
  });

  it("should return error to try to create miles with an used code", async () => {
    const data = await createMiles();
    jest.spyOn(repositoriesFunctions, "findMiles").mockResolvedValueOnce(data);

    const fakeTrip = await createTrip();
    const result = generateMilesForTrip(fakeTrip);

    expect(repositoriesFunctions.findMiles).toHaveBeenCalled();
    expect(result).rejects.toEqual({
      type: "conflict",
      message: `Miles already registered for code ${fakeTrip.code}`,
    });
  });

  it("should return error to try get miles from wrong code", () => {
    jest.spyOn(repositoriesFunctions, "findMiles").mockReturnValueOnce(null);

    const result = getMilesFromCode(null);

    expect(repositoriesFunctions.findMiles).toHaveBeenCalled();
    expect(result).rejects.toEqual({
      type: "not_found",
      message: `Miles not found for code ${null}`,
    });
  });
});
