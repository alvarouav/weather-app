import { CustomDateMother } from "@/contexts/shared/domain/customDate.mother";
import { LocationMother } from "@/contexts/shared/domain/location.mother";
import type { CalculateTempAverageQueryPrimitives } from "@/contexts/temperatures/application/calculateAverage/calculateTempAverageQuery";
// eslint-disable-next-line no-duplicate-imports
import CalculateTempAverageQuery 
  from "@/contexts/temperatures/application/calculateAverage/calculateTempAverageQuery";

class CalculateTempAverageQueryMother {
  static create(primitives: CalculateTempAverageQueryPrimitives) {
    return new CalculateTempAverageQuery(primitives);
  }

  static random(overrides: Partial<CalculateTempAverageQueryPrimitives> = {}) {
    return this.create({
      from: CustomDateMother.create( new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)).toDDMMYYYY(),
      to: CustomDateMother.create( new Date()).toDDMMYYYY(),
      location: LocationMother.random().toPrimitives(),
      ...overrides,
    });
  }
}

export default CalculateTempAverageQueryMother;