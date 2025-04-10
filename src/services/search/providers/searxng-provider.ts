import { SEARXNG_API_BASE_URL } from "../../../config";
import { BaseSearchProvider } from "../base-provider";
import { SearchOptions, SearchResult, UnNormalizedSearchSnippet } from "../types";
import { TokenTracker } from "../../../utils/token-tracker";

/**
 * SearXNG搜索提供商
 */
export class SearxngSearchProvider extends BaseSearchProvider {
  constructor(tokenTracker?: TokenTracker) {
    super('searxng', tokenTracker);
    // 检查API基础URL是否可用
    this.available = !!SEARXNG_API_BASE_URL;
  }

  /**
   * 执行SearXNG搜索
   * @param options 搜索选项
   * @returns 搜索结果
   */
  async search(options: SearchOptions): Promise<SearchResult> {
    const { query } = options;
    
    if (!query.trim()) {
      return this.handleSearchError(new Error('查询不能为空'), query);
    }

    if (!this.available) {
      return this.handleSearchError(new Error('SearXNG API基础URL未配置'), query);
    }

    const startTime = Date.now();
    
    try {
      // 动态导入SearxngClient，因为它是ESM模块
      const { SearxngClient } = await import('@agentic/searxng');
      
      // 创建SearXNG客户端
      const client = new SearxngClient({
        apiBaseUrl: SEARXNG_API_BASE_URL
      });

      // 构建搜索参数
      const searchParams: any = {
        query,
        language: options.language
      };

      // 添加可选参数
      if (options.categories) searchParams.categories = options.categories;
      if (options.engines) searchParams.engines = options.engines;
      if (options.pageno) searchParams.pageno = options.pageno;

      // 执行搜索
      const searchResponse = await client.search(searchParams);

      // 处理搜索结果
      const snippets: UnNormalizedSearchSnippet[] = searchResponse.results.map((result: any) => ({
        title: result.title,
        url: result.url,
        description: result.content || '',
        date: result.publishedDate
      }));

      // 估算令牌使用量
      const promptTokens = query.length;
      const totalTokens = snippets.reduce(
        (sum: number, snippet: UnNormalizedSearchSnippet) => 
          sum + (snippet.title?.length || 0) + (snippet.description?.length || 0),
        0
      );

      // 跟踪令牌使用情况
      this.trackTokenUsage('searxng-search', promptTokens, totalTokens - promptTokens);

      // 返回标准化结果
      return {
        snippets: this.normalizeSnippets(snippets),
        query,
        provider: this.name,
        suggestions: searchResponse.suggestions || [],
        totalResults: snippets.length,
        executionTime: Date.now() - startTime
      };
    } catch (error) {
      return this.handleSearchError(error, query);
    }
  }
}
