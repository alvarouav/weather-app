import type Query from "./query";
import type QueryResponse from "./queryResponse";

export interface QueryConstructor<Q extends Query> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): Q;
}

interface QueryHandler<
  Q extends Query,
  R extends QueryResponse,
> {
  handle(query: Q): Promise<R>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribedTo(): new (...args: any[]) => Q;
}

export default QueryHandler;