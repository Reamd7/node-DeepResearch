import https from 'https';
import { JINA_API_KEY } from "../../../config";
import { BaseSearchProvider } from "../base-provider";
import { SearchOptions, SearchResult, UnNormalizedSearchSnippet } from "../types";
import { TokenTracker } from "../../../utils/token-tracker";

/**
 * Jina搜索提供商
 */
export class JinaSearchProvider extends BaseSearchProvider {
  constructor(tokenTracker?: TokenTracker) {
    super('jina', tokenTracker);
    // 检查API密钥是否可用
    this.available = !!JINA_API_KEY;
  }

  /**
   * 执行Jina搜索
   * @param options 搜索选项
   * @returns 搜索结果
   */
  async search(options: SearchOptions): Promise<SearchResult> {
    const { query } = options;
    
    if (!query.trim()) {
      return this.handleSearchError(new Error('查询不能为空'), query);
    }

    if (!this.available) {
      return this.handleSearchError(new Error('Jina搜索API密钥未配置'), query);
    }

    const startTime = Date.now();
    
    return new Promise((resolve) => {
      const requestOptions = {
        hostname: 's.jina.ai',
        port: 443,
        path: `/?q=${encodeURIComponent(query)}`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${JINA_API_KEY}`,
          'X-Respond-With': 'no-content',
        },
        timeout: 30000
      };

      const req = https.request(requestOptions, (res) => {
        let responseData = '';

        res.on('data', (chunk) => responseData += chunk);

        res.on('end', () => {
          // 检查HTTP状态码
          if (res.statusCode && res.statusCode >= 400) {
            try {
              // 尝试从响应中解析错误信息
              const errorResponse = JSON.parse(responseData);
              if (res.statusCode === 402) {
                resolve(this.handleSearchError(
                  new Error(errorResponse.readableMessage || '余额不足'),
                  query
                ));
                return;
              }
              resolve(this.handleSearchError(
                new Error(errorResponse.readableMessage || `HTTP错误 ${res.statusCode}`),
                query
              ));
            } catch {
              // 如果解析失败，只返回状态码
              resolve(this.handleSearchError(
                new Error(`HTTP错误 ${res.statusCode}`),
                query
              ));
            }
            return;
          }

          // 解析成功响应
          try {
            const response = JSON.parse(responseData);
            
            if (!response.data || !Array.isArray(response.data)) {
              resolve(this.handleSearchError(
                new Error('无效的响应格式'),
                query
              ));
              return;
            }

            // 处理搜索结果
            const snippets: UnNormalizedSearchSnippet[] = response.data.map((item: any) => ({
              title: item.title,
              url: item.url,
              description: item.description || item.content,
              content: item.content
            }));

            // 计算令牌使用情况
            const totalTokens = response.data.reduce((sum: number, item: any) => sum + (item.usage?.tokens || 0), 0);
            
            // 跟踪令牌使用情况
            this.trackTokenUsage('jina-search', query.length, totalTokens);

            // 返回标准化结果
            resolve({
              snippets: this.normalizeSnippets(snippets),
              query,
              provider: this.name,
              totalResults: snippets.length,
              executionTime: Date.now() - startTime
            });
          } catch (error) {
            resolve(this.handleSearchError(
              new Error(`解析响应失败: ${error instanceof Error ? error.message : '未知错误'}`),
              query
            ));
          }
        });
      });

      // 添加超时处理
      req.setTimeout(30000, () => {
        req.destroy();
        resolve(this.handleSearchError(new Error('请求超时'), query));
      });

      req.on('error', (error) => {
        resolve(this.handleSearchError(new Error(`请求失败: ${error.message}`), query));
      });

      req.end();
    });
  }
}
