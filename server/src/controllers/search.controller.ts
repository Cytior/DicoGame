// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {get, param} from '@loopback/rest';
import {
  Client,
  // Object that contains the type definitions of every API method
  RequestParams,
  // Interface of the generic API response
  ApiResponse,
} from '@elastic/elasticsearch'

const client = new Client({
  node: 'http://localhost:9200',
  auth: {
    username: 'admin',
    password: 'admin'
  }
})

interface DicoEntry {
  term : string;
  nature : string;
  definitions: string[];
}

interface ShardsResponse {
  total: number;
  successful: number;
  failed: number;
  skipped: number;
}

interface Explanation {
  value: number;
  description: string;
  details: Explanation[];
}

interface SearchResponse<T> {
  took: number;
  timed_out: boolean;
  _scroll_id?: string;
  _shards: ShardsResponse;
  hits: {
    total: number;
    max_score: number;
    hits: Array<{
      _index: string;
      _type: string;
      _id: string;
      _score: number;
      _source: T;
      _version?: number;
      _explanation?: Explanation;
      fields?: any;
      highlight?: any;
      inner_hits?: any;
      matched_queries?: string[];
      sort?: string[];
    }>;
  };
  aggregations?: any;
}

export class SearchController {

  
  constructor() {}

  @get('/search')
  async hello(@param.query.string('query') query: string): Promise<string> {
    var cleanQuery = query.normalize("NFD").replace(/[^a-zA-Z]/g, "")
    const result = await client.search<SearchResponse<DicoEntry>>({
      index: 'dico_data',
      body: {
        size: 500,
        sort: [
          {
            "term.raw" : {
              order: "asc"
            }
          }
        ],
        query: {
          "prefix": {
            "term.raw": {
              "value": cleanQuery
            }
          }
        }
      }
    });
    return JSON.stringify(result.body.hits);
  }
}
