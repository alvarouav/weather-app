import InMemoryQueryBus from "@/contexts/shared/infra/queryBus/inMemoryQueryBus";
import QueryHandlersInformation from "@/contexts/shared/infra/queryBus/queryHandlersInformation";
import CalculateTempAverageQueryHandler from "@/contexts/temperatures/application/calculateAverage/calculateTempAverageQueryHandler";
import TemperatureAverageCalculator from "@/contexts/temperatures/application/calculateAverage/temperatureAverageCalculator";
import SearchTemperaturesQueryHandler from "@/contexts/temperatures/application/search/searchTemperaturesQueryHandler";
import { TemperatureSearcher } from "@/contexts/temperatures/application/search/temperaturesSearcher";
import TemperatureCSVRepository from "@/contexts/temperatures/infra/temperatureCSVRepository";
import { ContainerBuilder, Reference } from "node-dependency-injection";
import path from "path";

const temperaturesContainer = new ContainerBuilder(),
  csvPath = path.resolve(__dirname, "../../../fakes/temperatures-input-0.csv");

temperaturesContainer
  .register("TemperaturesRepository", TemperatureCSVRepository)
  .addArgument(csvPath);

temperaturesContainer
  .register("QueryHandlersInformation", QueryHandlersInformation)
  .addArgument([]); // we will set this in the controllers

temperaturesContainer
  .register("QueryBus", InMemoryQueryBus)
  .addArgument(new Reference("QueryHandlersInformation"));

// SEARCH
temperaturesContainer
  .register("TemperatureSearcher", TemperatureSearcher)
  .addArgument(new Reference("TemperaturesRepository"));

temperaturesContainer
  .register("SearchTemperaturesQueryHandler", SearchTemperaturesQueryHandler)
  .addArgument(new Reference("TemperatureSearcher"));

// CALCULATE TEMPERATURE AVERAGE
temperaturesContainer
  .register("TemperatureAverageCalculator", TemperatureAverageCalculator)
  .addArgument(new Reference("QueryBus"));

temperaturesContainer
  .register(
    "CalculateTempAverageQueryHandler",
    CalculateTempAverageQueryHandler,
  )
  .addArgument(new Reference("TemperatureAverageCalculator"));

export default temperaturesContainer;
