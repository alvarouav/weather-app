import QueryBusMock from "@/contexts/shared/__mocks__/queryBus.mock";
import CalculateTempAverageQueryMother from "@/contexts/temperatures/application/calculateAverage/calculateTempAverageQuery.mother";
import CalculateTempAverageQueryHandler from "@/contexts/temperatures/application/calculateAverage/calculateTempAverageQueryHandler";
import { CalculateTempAverageResponseMother } from "@/contexts/temperatures/application/calculateAverage/calculateTempAverageResponse.mother";
import TemperatureAverageCalculator from "@/contexts/temperatures/application/calculateAverage/temperatureAverageCalculator";
import { SearchTemperaturesResponseMother } from "@/contexts/temperatures/application/search/searchTemperaturesResponse.mother";
import InvalidArgumentsError from "@/contexts/temperatures/domain/errors/invalidArgumentsError";
import InvalidDatesError from "@/contexts/temperatures/domain/errors/invalidDatesError";
import TemperaturesNotFoundError from "@/contexts/temperatures/domain/errors/temperaturesNotFoundError";

describe("Temperature Average Calculator", () => {
  it("should throw InvalidArgumentsError when some field is missing/empty", async () => {
    expect.hasAssertions();

    const queryBusMock = new QueryBusMock(),
      calculator = new TemperatureAverageCalculator(queryBusMock),
      handler = new CalculateTempAverageQueryHandler(calculator),
      query = CalculateTempAverageQueryMother.random({
        from: "",
      });

    await expect(handler.handle(query)).rejects.toThrow(InvalidArgumentsError);
  });

  it("should throw InvalidDatesError when from date is after to date", async () => {
    expect.hasAssertions();

    const queryBusMock = new QueryBusMock(),
      calculator = new TemperatureAverageCalculator(queryBusMock),
      handler = new CalculateTempAverageQueryHandler(calculator),
      query = CalculateTempAverageQueryMother.random({
        from: new Date("2024-01-10").toISOString(),
        to: new Date("2024-01-05").toISOString(),
      });

    await expect(handler.handle(query)).rejects.toThrow(InvalidDatesError);
  });

  it("should ask the queryBus with correct params", async () => {
    expect.hasAssertions();

    const queryBusMock = new QueryBusMock(),
      calculator = new TemperatureAverageCalculator(queryBusMock),
      handler = new CalculateTempAverageQueryHandler(calculator),
      query = CalculateTempAverageQueryMother.random();

    queryBusMock.whenAskThenReturn(SearchTemperaturesResponseMother.random());

    await handler.handle(query);

    queryBusMock.assertAskCalledWith(query);
  });

  it("should throw TemperaturesNotFoundError when no temperatures are found", async () => {
    expect.hasAssertions();

    const queryBusMock = new QueryBusMock(),
      calculator = new TemperatureAverageCalculator(queryBusMock),
      handler = new CalculateTempAverageQueryHandler(calculator),
      query = CalculateTempAverageQueryMother.random();

    queryBusMock.whenAskThenReturn(SearchTemperaturesResponseMother.empty());

    await expect(handler.handle(query)).rejects.toThrow(TemperaturesNotFoundError);
  });

  it("should return a CalculateTempAverageResponse with correct average temperature", async () => {
    expect.hasAssertions();

    const queryBusMock = new QueryBusMock(),
      calculator = new TemperatureAverageCalculator(queryBusMock),
      handler = new CalculateTempAverageQueryHandler(calculator),
      query = CalculateTempAverageQueryMother.random(),
      temperatures = SearchTemperaturesResponseMother.random(),
      responseExpected = CalculateTempAverageResponseMother.create({
        average: temperatures.temperatures.reduce((sum, temp) => sum + temp.degree.value, 0) / temperatures.temperatures.length,
      });

    queryBusMock.whenAskThenReturn(SearchTemperaturesResponseMother.create(temperatures));

    // eslint-disable-next-line one-var
    const response = await handler.handle(query);

    expect(response.equalsTo(responseExpected)).toBe(true); 
  });
});