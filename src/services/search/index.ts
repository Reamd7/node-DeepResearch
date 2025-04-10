import { SearchService } from './search-service';
import { 
  BaseSearchOptions,
  BraveSearchOptions,
  BoostedSearchSnippet,
  CombinedSearchResult,
  JinaSearchOptions,
  SearchOptions,
  SearchProvider,
  SearchProviderType,
  SearchResult,
  SearchSnippet,
  SearxngSearchOptions,
  SerperSearchOptions,
  UnNormalizedSearchSnippet
} from './types';
import { BaseSearchProvider } from './base-provider';
import { 
  BraveSearchProvider,
  DuckSearchProvider,
  JinaSearchProvider,
  SearxngSearchProvider,
  SerperSearchProvider
} from './providers';

// 导出搜索服务
export { SearchService };

// 导出搜索提供商
export {
  BaseSearchProvider,
  BraveSearchProvider,
  DuckSearchProvider,
  JinaSearchProvider,
  SearxngSearchProvider,
  SerperSearchProvider
};

// 导出类型
export {
  BaseSearchOptions,
  BraveSearchOptions,
  BoostedSearchSnippet,
  CombinedSearchResult,
  JinaSearchOptions,
  SearchOptions,
  SearchProvider,
  SearchProviderType,
  SearchResult,
  SearchSnippet,
  SearxngSearchOptions,
  SerperSearchOptions,
  UnNormalizedSearchSnippet
};

// 创建默认搜索服务实例
const defaultSearchService = new SearchService();

export default defaultSearchService;
