import type TempCriteria from "@/contexts/temperatures/domain/tempCriteria";
import type Temperature from "../domain/temperature";
import type { TemperatureRepository } from "../domain/temperatureRepository";

class TemperatureMockRepository implements TemperatureRepository {
  #mockSearch = jest.fn();

  search(criteria: TempCriteria): Promise<Temperature[]> {
    return this.#mockSearch(criteria);
  }

  searchTemperatures(location: string, from: Date, to: Date) {
    return this.#mockSearch(from, to, location);   
  }
    
  whenSearchTemperaturesThenReturn(temperatures: Temperature[]): void {
    this.#mockSearch.mockResolvedValue(temperatures);
  }

  assertSearchHaveBeenCalledWith(criteria: TempCriteria) {
    expect(this.#mockSearch).toHaveBeenCalledWith(criteria);
  }
}

export default TemperatureMockRepository;