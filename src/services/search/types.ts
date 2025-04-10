/**
 * 搜索服务类型定义
 */

// 搜索查询参数类型
export type SERPQuery = {
  q: string,
  hl?: string,
  gl?: string,
  location?: string,
  tbs?: string,
}

// 搜索提供商类型
export type SearchProviderType = 'brave' | 'serper' | 'jina' | 'searxng' | 'duck';

// 基础搜索选项
export interface BaseSearchOptions {
  query: string;
  maxResults?: number;
  language?: string;
  safeSearch?: boolean | 'off' | 'moderate' | 'strict';
}

// Brave搜索选项
export interface BraveSearchOptions extends BaseSearchOptions {
  count?: number;
}

// Serper搜索选项
export interface SerperSearchOptions extends BaseSearchOptions {
  hl?: string;
  gl?: string;
  location?: string;
  tbs?: string;
}

// Jina搜索选项
export interface JinaSearchOptions extends BaseSearchOptions {
  // Jina特有的选项可以在这里添加
}

// SearXNG搜索选项
export interface SearxngSearchOptions extends BaseSearchOptions {
  categories?: string[];
  engines?: string[];
  pageno?: number;
}

// 统一的搜索选项
export type SearchOptions = BaseSearchOptions & Partial<BraveSearchOptions & SerperSearchOptions & JinaSearchOptions & SearxngSearchOptions>;

// 未标准化的搜索片段
export interface UnNormalizedSearchSnippet {
  title: string;
  url?: string;
  description?: string;
  link?: string;
  snippet?: string;
  weight?: number;
  date?: string;
}

// 标准化的搜索片段
export interface SearchSnippet extends UnNormalizedSearchSnippet {
  url: string;
  description: string;
  provider: SearchProviderType;
}

// 增强的搜索片段（用于重排序）
export interface BoostedSearchSnippet extends SearchSnippet {
  freqBoost: number;
  hostnameBoost: number;
  pathBoost: number;
  jinaRerankBoost: number;
  finalScore: number;
}

// 搜索结果
export interface SearchResult {
  snippets: SearchSnippet[];
  query: string;
  provider: SearchProviderType;
  suggestions?: string[];
  totalResults?: number;
  executionTime?: number;
  error?: string;
}

// 合并搜索结果
export interface CombinedSearchResult {
  snippets: SearchSnippet[];
  query: string;
  providers: SearchProviderType[];
  suggestions?: string[];
  totalResults?: number;
  executionTime?: number;
  errors?: Record<SearchProviderType, string>;
}

// 搜索提供商接口
export interface SearchProvider {
  search(options: SearchOptions): Promise<SearchResult>;
  getName(): SearchProviderType;
  isAvailable(): boolean;
}
