/* eslint-disable no-console */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import InvalidDateFormatError from "@/contexts/shared/domain/errors/InvalidDateFormatError";
import CalculateTempAverageQuery from "@/contexts/temperatures/application/calculateAverage/calculateTempAverageQuery";
import InvalidArgumentsError from "@/contexts/temperatures/domain/errors/invalidArgumentsError";
import InvalidDatesError from "@/contexts/temperatures/domain/errors/invalidDatesError";
import TemperaturesNotFoundError from "@/contexts/temperatures/domain/errors/temperaturesNotFoundError";
import temperaturesContainer from "@/controllers/temperatures/di/application.di";

// THIS IS A QUICK APROACH IN FUTURE IS A MUST IMPLEMENT A SCHEMA VALIDATION FOR THE INPUTS

class CalculateTemperaturesAverageGetController {
  static async handle(req: any, res: any): Promise<void> {
    console.log("[CalculateTemperaturesAverageGetController] Recived params", req.query);

    try {
      const handler = temperaturesContainer.get("CalculateTempAverageQueryHandler"),
        queryHandlers = temperaturesContainer.get("QueryHandlersInformation"),
        searchHandler = temperaturesContainer.get(
          "SearchTemperaturesQueryHandler",
        );

      queryHandlers.addQueryHandlers([searchHandler]);

      // eslint-disable-next-line one-var
      const result = await handler.handle(new CalculateTempAverageQuery(req.query));

      res.status(200).json({ success: true, data: result.toPrimitives() });
    } catch (error) {
      if (error instanceof TemperaturesNotFoundError) {
        return  res.status(404).json({ success: false, message: error.message });
      }
      if (error instanceof InvalidArgumentsError || 
          error instanceof InvalidDateFormatError || 
          error instanceof InvalidDatesError) {
        return res.status(400).json({ success: false, message: error.message });
        
      } 
        console.error("[CalculateTemperaturesAverageGetController] Unexpected error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
}

export default CalculateTemperaturesAverageGetController;