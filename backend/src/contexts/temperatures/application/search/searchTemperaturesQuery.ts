import type Query from "@/contexts/shared/domain/query";

export interface SearchTemperaturesQueryPrimitives {
    from : string;
    to : string;
    location : string;
}

class SearchTemperaturesQuery implements Query {
  from : string;
  to : string;
  location : string;

  constructor(primitives: SearchTemperaturesQueryPrimitives) {
    this.from = primitives.from;
    this.to = primitives.to;
    this.location = primitives.location;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  equalsTo(other: Query): boolean {
    throw new Error("Method not implemented.");
  }
}

export default SearchTemperaturesQuery;