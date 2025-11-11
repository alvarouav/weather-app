import TemperatureCSVRepository from "@/contexts/temperatures/infra/temperatureCSVRepository";
import expectedOutput0 from "../../../fakes/temperatures-output-0.json";
import CSVFileNotFoundError from "@/contexts/temperatures/infra/errors/CSVFileNotFoundError";
import path from "path";

const koPath = "../../../fakes/temperatures.csv/no_existent_temperatures_file.csv",
  input0 = path.resolve(__dirname, "../../../fakes/temperatures-input-0.csv"),
  defaultCriteria = {
    location: "Düsseldorf",
    from: new Date("2025-09-25"),
    to: new Date("2025-10-08"),
  };

describe("TemperatureCSVRepository", () => {
  describe("search", () => {
    it("should propagate errors when the CSV file does not exist", async () => {
      expect.assertions(1);

      const repository = new TemperatureCSVRepository(koPath);

      await expect(repository.search(defaultCriteria)).rejects.toThrow(CSVFileNotFoundError);
    });

    it("should return an empty array when no CSV rows match the criteria", async () => {
      expect.assertions(1);

      const repository = new TemperatureCSVRepository(input0),
        criteria = {
          location: "NonExistentLocation",
          from: new Date("2025-01-01"),
          to: new Date("2025-01-31"),
        },
        results = await repository.search(criteria);

      expect(results).toEqual([]);
    });

    it("should return a Temperatures array when they match the date range and location", async () => {
      expect.assertions(1);

      const repository = new TemperatureCSVRepository(input0),
        results = await repository.search(defaultCriteria),
        temperaturesPrimitives = results.map(t => t.toPrimitives());            

      expect(temperaturesPrimitives).toEqual(expectedOutput0);    
    });

    it("should be case-insensitive for location matching", async () => {
      expect.assertions(1);

      const repository = new TemperatureCSVRepository(input0),
        criteria = {
          location: "dÜsseldorf",
          from: new Date("2025-09-25"),
          to: new Date("2025-10-08"),
        },
        results = await repository.search(criteria),
        temperaturesPrimitives = results.map(t => t.toPrimitives());            

      expect(temperaturesPrimitives).toEqual(expectedOutput0);    
    });
  });
});
  