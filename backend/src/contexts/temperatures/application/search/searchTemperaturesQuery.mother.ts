import { CustomDateMother } from "@/contexts/shared/domain/customDate.mother";
import { LocationMother } from "@/contexts/shared/domain/location.mother";
import type { SearchTemperaturesQueryPrimitives } from "@/contexts/temperatures/application/search/searchTemperaturesQuery";
// eslint-disable-next-line no-duplicate-imports
import SearchTemperaturesQuery from "@/contexts/temperatures/application/search/searchTemperaturesQuery";

class SearchTemperaturesQueryMother {
  static create(primitives : SearchTemperaturesQueryPrimitives) {
    return new SearchTemperaturesQuery(primitives);
  }

  static random(overrides: Partial<SearchTemperaturesQueryPrimitives> = {}) {
    return this.create({
      from: CustomDateMother.create(new Date(Date.now() - 86400000)).toPrimitives(),
      to: CustomDateMother.create(new Date()).toPrimitives(),
      location: LocationMother.random().toPrimitives(),
      ...overrides,
    }); 
  }
}

export default SearchTemperaturesQueryMother;