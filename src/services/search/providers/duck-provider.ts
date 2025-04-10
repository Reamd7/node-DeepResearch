import { SafeSearchType, search as duckSearch } from 'duck-duck-scrape';
import { BaseSearchProvider } from "../base-provider";
import { SearchOptions, SearchResult, UnNormalizedSearchSnippet } from "../types";
import { TokenTracker } from "../../../utils/token-tracker";

/**
 * Duck 搜索提供商
 */
export class DuckSearchProvider extends BaseSearchProvider {
  constructor(tokenTracker?: TokenTracker) {
    super('duck', tokenTracker);
    // Duck 搜索不需要 API 密钥，始终可用
    this.available = true;
  }

  /**
   * 执行 Duck 搜索
   * @param options 搜索选项
   * @returns 搜索结果
   */
  async search(options: SearchOptions): Promise<SearchResult> {
    const { query } = options;
    
    if (!query.trim()) {
      return this.handleSearchError(new Error('查询不能为空'), query);
    }

    const startTime = Date.now();
    
    try {
      // 构建搜索参数
      const duckOptions: any = {
        safeSearch: this.getSafeSearchSetting(options.safeSearch)
      };

      // 添加可选参数
      if (options.language) {
        duckOptions.locale = options.language;
      }

      // 执行搜索
      const searchResponse = await duckSearch(query, duckOptions);

      // 处理搜索结果
      const snippets: UnNormalizedSearchSnippet[] = searchResponse.results.map(result => ({
        title: result.title,
        url: result.url,
        description: result.description,
        hostname: result.hostname
      }));

      // 估算令牌使用量
      const promptTokens = query.length;
      const totalTokens = snippets.reduce(
        (sum: number, snippet: UnNormalizedSearchSnippet) => 
          sum + (snippet.title?.length || 0) + (snippet.description?.length || 0),
        0
      );

      // 跟踪令牌使用情况
      this.trackTokenUsage('duck-search', promptTokens, totalTokens - promptTokens);

      // 返回标准化结果
      return {
        snippets: this.normalizeSnippets(snippets),
        query,
        provider: this.name,
        suggestions: searchResponse.related?.map(r => r.text) || [],
        totalResults: snippets.length,
        executionTime: Date.now() - startTime
      };
    } catch (error) {
      return this.handleSearchError(error, query);
    }
  }

  /**
   * 获取安全搜索设置
   * @param safeSearch 安全搜索选项
   * @returns Duck 安全搜索设置
   */
  private getSafeSearchSetting(safeSearch?: boolean | 'off' | 'moderate' | 'strict'): SafeSearchType {
    if (safeSearch === true || safeSearch === 'moderate') return SafeSearchType.MODERATE;
    if (safeSearch === 'strict') return SafeSearchType.STRICT;
    return SafeSearchType.OFF; // 默认值
  }
}
