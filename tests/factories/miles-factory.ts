import { faker } from "@faker-js/faker";
import { AffiliateStatus, ServiceClass } from "protocols";

export async function createLocation() {
  return {
    lat: faker.location.latitude(),
    long: faker.location.longitude(),
  };
}

export async function createTrip() {
  return {
    code: faker.lorem.word({ length: 14 }),
    origin: await createLocation(),
    destination: await createLocation(),
    miles: false,
    plane: faker.airline.airplane().name,
    service: ServiceClass.ECONOMIC,
    coupom: "BRONZE",
    affiliate: AffiliateStatus.BRONZE,
    date: "2026-08-01",
  };
}

export async function createMiles() {
  return {
    id: 1,
    code: faker.word.words(1),
    miles: faker.number.int(),
  };
}
