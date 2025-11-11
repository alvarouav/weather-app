import type Query from "@/contexts/shared/domain/query";

export interface CalculateTempAverageQueryPrimitives {
    from: string;
    to: string;
    location: string;
}

class CalculateTempAverageQuery implements Query {
  from: string;
  to: string;
  location: string;

  constructor(primitives: CalculateTempAverageQueryPrimitives) {
    this.from = primitives.from;
    this.to = primitives.to;
    this.location = primitives.location;
  }

  equalsTo(other: Query): boolean {
    if (!(other instanceof CalculateTempAverageQuery)) {
      return false;
    }

    return this.from === other.from &&
            this.to === other.to &&
            this.location === other.location;
  }
}

export default CalculateTempAverageQuery;