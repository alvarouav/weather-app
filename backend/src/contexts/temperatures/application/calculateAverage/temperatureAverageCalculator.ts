import CustomDate from "@/contexts/shared/domain/customDate";
import type QueryBus from "@/contexts/shared/domain/queryBus";
import type CalculateTempAverageQuery from "@/contexts/temperatures/application/calculateAverage/calculateTempAverageQuery";
import SearchTemperaturesQuery from "@/contexts/temperatures/application/search/searchTemperaturesQuery";
import type SearchTemperaturesResponse from "@/contexts/temperatures/application/search/searchTemperaturesResponse";
import InvalidArgumentsError from "@/contexts/temperatures/domain/errors/invalidArgumentsError";
import InvalidDatesError from "@/contexts/temperatures/domain/errors/invalidDatesError";
import TemperaturesNotFoundError from "@/contexts/temperatures/domain/errors/temperaturesNotFoundError";

class TemperatureAverageCalculator {
  private queryBus: QueryBus;

  constructor(queryBus: QueryBus) {
    this.queryBus = queryBus;
  }

  async run(query: CalculateTempAverageQuery): Promise<number> {
    const from = query.from ? new CustomDate(query.from) : null,
      to = query.to ? new CustomDate(query.to) : null,
      location = query.location ? query.location : null;

    if(!from || !to || !location) {
      throw new InvalidArgumentsError("InvalidArgumentsError: parameters \"from\", \"to\" and \"location\" are required.");
    }

    if(from.greaterThan(to) || from.equalsTo(to)) {
      throw new InvalidDatesError("\"From\" date must be earlier than \"to\" date.");
    }

    // eslint-disable-next-line one-var
    const queryBusResponse = await this.queryBus.ask(new SearchTemperaturesQuery({
      from: from.toDDMMYYYY(),
      to: to.toDDMMYYYY(),
      location: location,
    })) as SearchTemperaturesResponse,
      {temperatures} = queryBusResponse;

    if(temperatures.length === 0) throw new TemperaturesNotFoundError("No temperatures found for the given interval/location.");

    return temperatures.reduce((sum, temp) => sum + temp.degree.value, 0) / temperatures.length;
  }
}

export default TemperatureAverageCalculator;