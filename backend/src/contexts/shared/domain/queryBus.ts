import type Query from "@/contexts/shared/domain/query";
import type QueryResponse from "@/contexts/shared/domain/queryResponse";


interface QueryBus {
  ask<R extends QueryResponse>(query: Query): Promise<R>;
}
export default QueryBus;
