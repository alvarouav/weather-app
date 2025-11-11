import type Query from "@/contexts/shared/domain/query";

export default class QueryNotRegisteredError extends Error {
  constructor(query: Query) {
    super(
      `The query <${query.constructor.name}> hasn't a query handler associated`,
    );
  }
}
