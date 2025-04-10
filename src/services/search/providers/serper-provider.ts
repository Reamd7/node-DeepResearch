import axios from 'axios';
import { SERPER_API_KEY } from "../../../config";
import { BaseSearchProvider } from "../base-provider";
import { SearchOptions, SearchResult, UnNormalizedSearchSnippet } from "../types";
import { TokenTracker } from "../../../utils/token-tracker";

/**
 * Serper搜索提供商
 */
export class SerperSearchProvider extends BaseSearchProvider {
  constructor(tokenTracker?: TokenTracker) {
    super('serper', tokenTracker);
    // 检查API密钥是否可用
    this.available = !!SERPER_API_KEY;
  }

  /**
   * 执行Serper搜索
   * @param options 搜索选项
   * @returns 搜索结果
   */
  async search(options: SearchOptions): Promise<SearchResult> {
    const { query } = options;
    
    if (!query.trim()) {
      return this.handleSearchError(new Error('查询不能为空'), query);
    }

    if (!this.available) {
      return this.handleSearchError(new Error('Serper搜索API密钥未配置'), query);
    }

    const startTime = Date.now();
    
    try {
      // 构建请求体
      const requestBody: Record<string, any> = {
        q: query,
        autocorrect: false
      };

      // 添加可选参数
      if (options.hl) requestBody.hl = options.hl;
      if (options.gl) requestBody.gl = options.gl;
      if (options.location) requestBody.location = options.location;
      if (options.tbs) requestBody.tbs = options.tbs;

      // 发送请求
      const response = await axios.post('https://google.serper.dev/search', requestBody, {
        headers: {
          'X-API-KEY': SERPER_API_KEY,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      // 处理响应
      const data = response.data;
      const snippets: UnNormalizedSearchSnippet[] = [];

      // 处理知识图谱结果
      if (data.knowledgeGraph) {
        snippets.push({
          title: data.knowledgeGraph.title,
          description: data.knowledgeGraph.description,
          url: data.knowledgeGraph.website || '',
          weight: 1.2 // 给知识图谱结果更高的权重
        });
      }

      // 处理有机搜索结果
      if (data.organic && Array.isArray(data.organic)) {
        data.organic.forEach((item: any, index: number) => {
          snippets.push({
            title: item.title,
            description: item.snippet,
            url: item.link,
            date: item.date,
            weight: 1.0 - (index * 0.05) // 根据位置降低权重
          });

          // 处理站点链接
          if (item.siteLinks && Array.isArray(item.siteLinks)) {
            item.siteLinks.forEach((siteLink: any) => {
              snippets.push({
                title: siteLink.title,
                url: siteLink.link,
                description: `${item.title} - ${siteLink.title}`,
                weight: 0.8 // 站点链接权重较低
              });
            });
          }
        });
      }

      // 处理热门故事
      if (data.topStories && Array.isArray(data.topStories)) {
        data.topStories.forEach((story: any) => {
          snippets.push({
            title: story.title,
            url: story.link,
            description: `${story.source} - ${story.title}`,
            date: story.date,
            weight: 1.1 // 热门故事权重较高
          });
        });
      }

      // 限制结果数量
      const maxResults = options.maxResults || 10;
      const limitedSnippets = snippets.slice(0, maxResults);

      // 跟踪令牌使用情况（Serper API不提供令牌使用信息，这里使用简单估算）
      const promptTokens = query.length;
      const completionTokens = JSON.stringify(limitedSnippets).length;
      this.trackTokenUsage('serper-search', promptTokens, completionTokens);

      // 返回标准化结果
      return {
        snippets: this.normalizeSnippets(limitedSnippets),
        query,
        provider: this.name,
        suggestions: data.relatedSearches || [],
        totalResults: snippets.length,
        executionTime: Date.now() - startTime
      };
    } catch (error) {
      return this.handleSearchError(error, query);
    }
  }
}
