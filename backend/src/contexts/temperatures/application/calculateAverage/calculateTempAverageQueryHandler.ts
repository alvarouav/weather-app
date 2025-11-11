import type QueryHandler from "@/contexts/shared/domain/queryHandler";
import CalculateTempAverageQuery from "@/contexts/temperatures/application/calculateAverage/calculateTempAverageQuery";
import CalculateTempAverageResponse from "@/contexts/temperatures/application/calculateAverage/calculateTempAverageResponse";
import type TemperatureAverageCalculator from "@/contexts/temperatures/application/calculateAverage/temperatureAverageCalculator";

class CalculateTempAverageQueryHandler implements QueryHandler<CalculateTempAverageQuery, CalculateTempAverageResponse> {
  calculator : TemperatureAverageCalculator;

  constructor(calculator: TemperatureAverageCalculator) {
    this.calculator = calculator;
  }

  subscribedTo(): typeof CalculateTempAverageQuery {
    return CalculateTempAverageQuery;
  }
  
  async handle(query: CalculateTempAverageQuery): Promise<CalculateTempAverageResponse> {
    const average =  await this.calculator.run(query);

    return new CalculateTempAverageResponse({average});
  }
}

export default CalculateTempAverageQueryHandler;