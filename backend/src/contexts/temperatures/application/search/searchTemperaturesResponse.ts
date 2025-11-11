import type QueryResponse from "@/contexts/shared/domain/queryResponse";
import type Temperature from "@/contexts/temperatures/domain/temperature";

export interface SearchTemperaturesResponsePrimitives {
    temperatures: Temperature [];
}

class SearchTemperaturesResponse implements QueryResponse {
  temperatures: Temperature [];

  constructor(primitives: SearchTemperaturesResponsePrimitives) {
    this.temperatures = primitives.temperatures;
  }

  equalsTo(other: SearchTemperaturesResponse): boolean {
    if (this.temperatures.length !== other.temperatures.length) return false;
    
    return this.temperatures.every(temp =>
      other.temperatures.some(t => t.equalsTo(temp)),
    );
  }    
}

export default SearchTemperaturesResponse;