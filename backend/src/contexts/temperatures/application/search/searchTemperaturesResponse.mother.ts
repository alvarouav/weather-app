import { RepeaterMother } from "@/contexts/shared/domain/repeater.mother";
import type { SearchTemperaturesResponsePrimitives } from "@/contexts/temperatures/application/search/searchTemperaturesResponse";
// eslint-disable-next-line no-duplicate-imports
import SearchTemperaturesResponse from "@/contexts/temperatures/application/search/searchTemperaturesResponse";
import { TemperatureMother } from "@/contexts/temperatures/domain/temperature.mother";

class SearchTemperaturesResponseMother {
  static create(primitives : SearchTemperaturesResponsePrimitives){
    return new SearchTemperaturesResponse(primitives);
  }

  static random(){
    return SearchTemperaturesResponseMother.create(
      {temperatures: RepeaterMother.generate(TemperatureMother.random, 5)},
    );
  }
    
  static empty(){
    return this.create({ temperatures: [] });
  }
}

export { SearchTemperaturesResponseMother };