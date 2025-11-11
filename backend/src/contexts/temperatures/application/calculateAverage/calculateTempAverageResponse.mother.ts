/* eslint-disable no-duplicate-imports */
import type { CalculateTempAverageResponsePrimitives } from "@/contexts/temperatures/application/calculateAverage/calculateTempAverageResponse";
import CalculateTempAverageResponse
  from "@/contexts/temperatures/application/calculateAverage/calculateTempAverageResponse";

class CalculateTempAverageResponseMother {
  static create(primitives: CalculateTempAverageResponsePrimitives) {
    return new CalculateTempAverageResponse(primitives);
  }
}

export { CalculateTempAverageResponseMother };