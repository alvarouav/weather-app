import type TempCriteria from "@/contexts/temperatures/domain/tempCriteria";
import type Temperature from "./temperature";

export interface TemperatureRepository {
    search(criteria : TempCriteria): Promise<Temperature[]>;
}