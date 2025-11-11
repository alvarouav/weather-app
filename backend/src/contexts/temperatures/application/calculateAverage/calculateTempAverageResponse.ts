import type QueryResponse from "@/contexts/shared/domain/queryResponse";

export interface CalculateTempAverageResponsePrimitives {
    average: number;
}

class CalculateTempAverageResponse implements QueryResponse{
  average: number;

  constructor(primitives: CalculateTempAverageResponsePrimitives) {
    this.average = primitives.average;
  }

  equalsTo(other: QueryResponse): boolean {
    if (!(other instanceof CalculateTempAverageResponse)) {
      return false;
    }

    return this.average === other.average;
  }

  toPrimitives(): CalculateTempAverageResponsePrimitives {
    return {
      average: this.average,
    };
  }
}

export default CalculateTempAverageResponse;