import type QueryHandler from "@/contexts/shared/domain/queryHandler";
import SearchTemperaturesQuery from "@/contexts/temperatures/application/search/searchTemperaturesQuery";
import SearchTemperaturesResponse from "@/contexts/temperatures/application/search/searchTemperaturesResponse";
import type { TemperatureSearcher } from "@/contexts/temperatures/application/search/temperaturesSearcher";

class SearchTemperaturesQueryHandler implements QueryHandler<SearchTemperaturesQuery, SearchTemperaturesResponse> {
  searcher : TemperatureSearcher;

  constructor(searcher: TemperatureSearcher) {
    this.searcher = searcher;
  }

  subscribedTo(): typeof SearchTemperaturesQuery {
    return SearchTemperaturesQuery;
  }

  async handle(query: SearchTemperaturesQuery): Promise<SearchTemperaturesResponse> {
    const temperatures =  await this.searcher.run(query);

    return new SearchTemperaturesResponse({temperatures});
  }
}

export default SearchTemperaturesQueryHandler;