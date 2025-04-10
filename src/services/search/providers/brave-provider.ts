import axios from 'axios';
import { BRAVE_API_KEY } from "../../../config";
import { BaseSearchProvider } from "../base-provider";
import { BraveSearchOptions, SearchOptions, SearchResult, UnNormalizedSearchSnippet } from "../types";
import { TokenTracker } from "../../../utils/token-tracker";

/**
 * Brave搜索提供商
 */
export class BraveSearchProvider extends BaseSearchProvider {
  constructor(tokenTracker?: TokenTracker) {
    super('brave', tokenTracker);
    // 检查API密钥是否可用
    this.available = !!BRAVE_API_KEY;
  }

  /**
   * 执行Brave搜索
   * @param options 搜索选项
   * @returns 搜索结果
   */
  async search(options: SearchOptions): Promise<SearchResult> {
    const { query } = options;
    
    if (!query.trim()) {
      return this.handleSearchError(new Error('查询不能为空'), query);
    }

    if (!this.available) {
      return this.handleSearchError(new Error('Brave搜索API密钥未配置'), query);
    }

    const startTime = Date.now();
    
    try {
      // 构建搜索参数
      const params: Record<string, any> = {
        q: query,
        count: options.count || options.maxResults || 10,
        safesearch: this.getSafeSearchSetting(options.safeSearch)
      };

      // 发送请求
      const response = await axios.get('https://api.search.brave.com/res/v1/web/search', {
        params,
        headers: {
          'Accept': 'application/json',
          'X-Subscription-Token': BRAVE_API_KEY
        },
        timeout: 10000
      });

      // 处理响应
      const data = response.data;
      const snippets: UnNormalizedSearchSnippet[] = data.web?.results?.map((result: any) => ({
        title: result.title,
        url: result.url,
        description: result.description
      })) || [];

      // 跟踪令牌使用情况（Brave API不提供令牌使用信息，这里使用简单估算）
      const promptTokens = query.length;
      const completionTokens = JSON.stringify(snippets).length;
      this.trackTokenUsage('brave-search', promptTokens, completionTokens);

      // 返回标准化结果
      return {
        snippets: this.normalizeSnippets(snippets),
        query,
        provider: this.name,
        totalResults: data.web?.totalResults || snippets.length,
        executionTime: Date.now() - startTime
      };
    } catch (error) {
      return this.handleSearchError(error, query);
    }
  }

  /**
   * 获取安全搜索设置
   * @param safeSearch 安全搜索选项
   * @returns Brave安全搜索设置
   */
  private getSafeSearchSetting(safeSearch?: boolean | 'off' | 'moderate' | 'strict'): string {
    if (safeSearch === true) return 'moderate';
    if (safeSearch === false) return 'off';
    if (safeSearch === 'strict') return 'strict';
    if (safeSearch === 'moderate') return 'moderate';
    if (safeSearch === 'off') return 'off';
    return 'off'; // 默认值
  }
}
