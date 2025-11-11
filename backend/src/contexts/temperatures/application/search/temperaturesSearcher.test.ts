import { RepeaterMother } from "@/contexts/shared/domain/repeater.mother";
import TemperatureMockRepository from "@/contexts/temperatures/__mocks__/temperatureRepository.mock";
import SearchTemperaturesQueryMother from "@/contexts/temperatures/application/search/searchTemperaturesQuery.mother";
import SearchTemperaturesQueryHandler from "@/contexts/temperatures/application/search/searchTemperaturesQueryHandler";
import SearchTemperaturesResponse from "@/contexts/temperatures/application/search/searchTemperaturesResponse";
import { SearchTemperaturesResponseMother } from "@/contexts/temperatures/application/search/searchTemperaturesResponse.mother";
import { TemperatureSearcher } from "@/contexts/temperatures/application/search/temperaturesSearcher";
import InvalidArgumentsError from "@/contexts/temperatures/domain/errors/invalidArgumentsError";
import { TemperatureMother } from "@/contexts/temperatures/domain/temperature.mother";

describe("Temperatures Searcher", () => {
  it("should throw InvalidArgumentError when any search field is empty", async () => {
    const repository = new TemperatureMockRepository(),
      searcher = new TemperatureSearcher(repository),
      handler = new SearchTemperaturesQueryHandler(searcher),
      query = SearchTemperaturesQueryMother.random({
        location: "",
        from: "",
        to: "",
      });

    await expect(handler.handle(query)).rejects.toThrow(InvalidArgumentsError);
  });

  it("should call the repository with correct params", async () => {
    const repository = new TemperatureMockRepository(),
      searcher = new TemperatureSearcher(repository),
      handler = new SearchTemperaturesQueryHandler(searcher),
      query = SearchTemperaturesQueryMother.random();

    repository.whenSearchTemperaturesThenReturn([]);
        
    await handler.handle(query);

    repository.assertSearchHaveBeenCalledWith({
      location: query.location,
      from: new Date(query.from),
      to: new Date(query.to),
    });

  });

  it("should return an instance of SearchTemperaturesResponse", async () => {
    const repository = new TemperatureMockRepository(),
      searcher = new TemperatureSearcher(repository),
      handler = new SearchTemperaturesQueryHandler(searcher),
      query = SearchTemperaturesQueryMother.random();

    repository.whenSearchTemperaturesThenReturn([]);
        
    expect(await handler.handle(query)).toBeInstanceOf(SearchTemperaturesResponse);
  });

  it("should return an SearchTemperaturesResponse when no temperatures found", async () => {
    const repository = new TemperatureMockRepository(),
      searcher = new TemperatureSearcher(repository),
      handler = new SearchTemperaturesQueryHandler(searcher),
      query = SearchTemperaturesQueryMother.random(),
      expected = SearchTemperaturesResponseMother.empty();

    repository.whenSearchTemperaturesThenReturn([]);

    // eslint-disable-next-line one-var
    const response = await handler.handle(query);

    expect(response.equalsTo(expected)).toBe(true);
  });

  it("should return a SearchTemperaturesResponse of temperatures when temperatures found", async () => {
    const repository = new TemperatureMockRepository(),
      searcher = new TemperatureSearcher(repository),
      handler = new SearchTemperaturesQueryHandler(searcher),
      query = SearchTemperaturesQueryMother.random(),
      found = RepeaterMother.generate(TemperatureMother.random, Math.floor(Math.random() * 10) + 1),
      expected = SearchTemperaturesResponseMother.create({temperatures: found});

    repository.whenSearchTemperaturesThenReturn(found);
    
    // eslint-disable-next-line one-var
    const response = await handler.handle(query);

    expect(response.equalsTo(expected)).toBe(true);
  });
});