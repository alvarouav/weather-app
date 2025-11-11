import QueryNotRegisteredError from "@/contexts/shared/domain/errors/queryNotRegisteredError";
import type Query from "@/contexts/shared/domain/query";
import type QueryHandler from "@/contexts/shared/domain/queryHandler";
import type QueryResponse from "@/contexts/shared/domain/queryResponse";


export default class QueryHandlersInformation {
  private queryHandlersMap: Map<Query, QueryHandler<Query, QueryResponse>>;

  constructor(queryHandlers: Array<QueryHandler<Query, QueryResponse>>) {
    this.queryHandlersMap = this.formatHandlers(queryHandlers);
  }

   
  private formatHandlers(
    queryHandlers: Array<QueryHandler<Query, QueryResponse>>,
  ): Map<Query, QueryHandler<Query, QueryResponse>> {
    const handlersMap = new Map();

    queryHandlers.forEach((queryHandler) => {
      handlersMap.set(queryHandler.subscribedTo(), queryHandler);
    });

    return handlersMap;
  }

  public search(query: Query): QueryHandler<Query, QueryResponse> {
    const queryHandler = this.queryHandlersMap.get(query.constructor);

    if (!queryHandler) {
      throw new QueryNotRegisteredError(query);
    }
    
    return queryHandler;
  }

  addQueryHandlers(queryHandlers: Array<QueryHandler<Query, QueryResponse>>) {
    queryHandlers.forEach((queryHandler) => {
      this.queryHandlersMap.set(queryHandler.subscribedTo(), queryHandler);
    });
  }
}
