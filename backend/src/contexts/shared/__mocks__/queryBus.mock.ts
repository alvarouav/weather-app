import type Query from "@/contexts/shared/domain/query";
import type QueryBus from "@/contexts/shared/domain/queryBus";
import type QueryResponse from "@/contexts/shared/domain/queryResponse";

class QueryBusMock implements QueryBus {
  #mockAsk = jest.fn();

  async ask<R extends QueryResponse>(query: Query): Promise<R> {
    return await this.#mockAsk(query);
  }

  assertAskCalledWith(query: Query): void {
    return expect(this.#mockAsk).toHaveBeenCalledWith(query);
  }

  async whenAskThenReturn(response: QueryResponse): Promise<void> {
    this.#mockAsk.mockReturnValue(Promise.resolve(response));
  }
}

export default QueryBusMock;
