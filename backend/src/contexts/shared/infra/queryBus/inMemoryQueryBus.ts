import type Query from "@/contexts/shared/domain/query";
import type QueryBus from "@/contexts/shared/domain/queryBus";
import type QueryHandler from "@/contexts/shared/domain/queryHandler";
import type QueryResponse from "@/contexts/shared/domain/queryResponse";
import type QueryHandlersInformation from "@/contexts/shared/infra/queryBus/queryHandlersInformation";


export default class InMemoryQueryBus implements QueryBus {
  private queryHandlersInformation: QueryHandlersInformation;

  constructor(queryHandlersInformation: QueryHandlersInformation) {
    this.queryHandlersInformation = queryHandlersInformation;
  }

  async ask<R extends QueryResponse>(query: Query): Promise<R> {
    const handler = this.queryHandlersInformation.search(query);

    return handler.handle(query) as Promise<R>;
  }

  addQueryHandlers(queryHandlers: Array<QueryHandler<Query, QueryResponse>>) {
    this.queryHandlersInformation.addQueryHandlers(queryHandlers);
  }
}
