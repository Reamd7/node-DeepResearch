import { TokenTracker } from "../utils/token-tracker";
import { SearxngSearchResponse, SearxngSearchResult } from '../types';

// 从环境变量或配置中获取 SearXNG API 基础 URL
import { SEARXNG_API_BASE_URL } from "../config";

/**
 * 使用 SearXNG 元搜索引擎执行搜索
 * 
 * @param query 搜索查询字符串
 * @param categories 可选的搜索类别数组，例如 ["general", "news"]
 * @param engines 可选的搜索引擎数组，例如 ["google", "bing", "brave"]
 * @param language 可选的语言代码，例如 "zh-CN"
 * @param tracker 可选的令牌跟踪器
 * @returns 包含搜索响应的 Promise
 */
export async function searxngSearch(
  query: string,
  categories?: string[],
  engines?: string[],
  language?: string,
  tracker?: TokenTracker
): Promise<{ response: SearxngSearchResponse }> {
  if (!query.trim()) {
    throw new Error('查询不能为空');
  }

  try {
    // 动态导入 SearxngClient，因为它是 ESM 模块
    const { SearxngClient } = await import('@agentic/searxng');
    
    // 创建 SearXNG 客户端
    const client = new SearxngClient({
      apiBaseUrl: SEARXNG_API_BASE_URL
    });

    // 执行搜索
    const searchResponse = await client.search({
      query,
      categories: categories as any[],
      engines: engines as any[],
      language
    });

    // 如果提供了令牌跟踪器，更新使用情况
    if (tracker) {
      // 估算令牌使用量（简单估计）
      const promptTokens = query.length;
      const totalTokens = searchResponse.results.reduce(
        (sum: number, result: SearxngSearchResult) => sum + (result.content?.length || 0) + (result.title?.length || 0),
        0
      );

      tracker.trackUsage('searxng-search', {
        totalTokens,
        promptTokens,
        completionTokens: totalTokens - promptTokens
      });
    }

    // 返回标准化的响应
    return {
      response: {
        results: searchResponse.results,
        suggestions: searchResponse.suggestions,
        query: searchResponse.query
      }
    };
  } catch (error: any) {
    // 处理错误
    const errorMessage = error.message || '搜索失败';
    throw new Error(`SearXNG 搜索错误: ${errorMessage}`);
  }
}
