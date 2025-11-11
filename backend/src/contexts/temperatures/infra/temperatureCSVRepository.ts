import type TempCriteria from "@/contexts/temperatures/domain/tempCriteria";
import Temperature from "@/contexts/temperatures/domain/temperature";
import type { TemperatureRepository } from "@/contexts/temperatures/domain/temperatureRepository";

import fs from "fs";
import { finished } from "stream/promises";
import csv from "csv-parser";
import CSVFileNotFoundError from "@/contexts/temperatures/infra/errors/CSVFileNotFoundError";

interface CsvRow {
  date: string;
  location: string;
  temperature_celsius: string;
}

class TemperatureCSVRepository implements TemperatureRepository {
  private readonly csvPath: string;

  constructor(csvPath: string) {
    this.csvPath = csvPath;
  }

  async search(criteria: TempCriteria): Promise<Temperature[]> {
    if (!fs.existsSync(this.csvPath)) {
      throw new CSVFileNotFoundError(this.csvPath);
    }

    const results: Temperature[] = [],
      stream = fs.createReadStream(this.csvPath).pipe(csv());

    stream.on("data", (row: CsvRow) => {
      const date = new Date(row.date),
        location = row.location.trim(),
        degree = parseFloat(row.temperature_celsius);

      if (isNaN(date.getTime()) || isNaN(degree)) return;

      if (
        date >= criteria.from &&
        date <= criteria.to &&
        location.toLowerCase() === criteria.location.toLowerCase()
      ) {
        results.push(
          new Temperature({
            degree,
            date: row.date,
            location,
          }),
        );
      }
    });
    await finished(stream);
    return results;
  }
}

export default TemperatureCSVRepository;
