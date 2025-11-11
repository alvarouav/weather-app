import CustomDate from "@/contexts/shared/domain/customDate";
import type SearchTemperaturesQuery from "@/contexts/temperatures/application/search/searchTemperaturesQuery";
import InvalidArgumentsError from "@/contexts/temperatures/domain/errors/invalidArgumentsError";
import type { TemperatureRepository } from "@/contexts/temperatures/domain/temperatureRepository";

class TemperatureSearcher {
  repository: TemperatureRepository;

  constructor(repository: TemperatureRepository) {
    this.repository = repository;
  }

  async run(query : SearchTemperaturesQuery) {
    if(!query.location || !query.from || !query.to){
      throw new InvalidArgumentsError("All search fields are required (location, from, to)");
    }
    const result = await this.repository.search({
      location: query.location,
      from: new CustomDate(query.from).value,
      to: new CustomDate(query.to).value,
    });

    return result;
  }
}

export { TemperatureSearcher };