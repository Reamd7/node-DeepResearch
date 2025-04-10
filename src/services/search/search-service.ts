import { SEARCH_PROVIDER } from "../../config";
import { TokenTracker } from "../../utils/token-tracker";
import { 
  BraveSearchProvider, 
  DuckSearchProvider,
  JinaSearchProvider, 
  SearxngSearchProvider, 
  SerperSearchProvider 
} from "./providers";
import { 
  CombinedSearchResult, 
  SearchOptions, 
  SearchProvider, 
  SearchProviderType, 
  SearchResult, 
  SearchSnippet 
} from "./types";

/**
 * 搜索服务类
 * 管理多个搜索提供商，提供统一的搜索接口
 */
export class SearchService {
  private providers: Map<SearchProviderType, SearchProvider> = new Map();
  private tokenTracker?: TokenTracker;
  private defaultProvider: SearchProviderType;

  /**
   * 创建搜索服务实例
   * @param tokenTracker 可选的令牌跟踪器
   * @param defaultProvider 默认搜索提供商
   */
  constructor(tokenTracker?: TokenTracker, defaultProvider?: SearchProviderType) {
    this.tokenTracker = tokenTracker;
    this.defaultProvider = defaultProvider || (SEARCH_PROVIDER as SearchProviderType) || 'jina';
    
    // 初始化所有搜索提供商
    this.registerProviders();
  }

  /**
   * 注册所有搜索提供商
   */
  private registerProviders(): void {
    // 注册Brave搜索提供商
    this.registerProvider(new BraveSearchProvider(this.tokenTracker));
    
    // 注册Serper搜索提供商
    this.registerProvider(new SerperSearchProvider(this.tokenTracker));
    
    // 注册Jina搜索提供商
    this.registerProvider(new JinaSearchProvider(this.tokenTracker));
    
    // 注册SearXNG搜索提供商
    this.registerProvider(new SearxngSearchProvider(this.tokenTracker));
    
    // 注册Duck搜索提供商
    this.registerProvider(new DuckSearchProvider(this.tokenTracker));
  }

  /**
   * 注册搜索提供商
   * @param provider 搜索提供商
   */
  public registerProvider(provider: SearchProvider): void {
    this.providers.set(provider.getName(), provider);
  }

  /**
   * 获取搜索提供商
   * @param name 提供商名称
   * @returns 搜索提供商
   */
  public getProvider(name: SearchProviderType): SearchProvider | undefined {
    return this.providers.get(name);
  }

  /**
   * 获取所有可用的搜索提供商
   * @returns 可用的搜索提供商数组
   */
  public getAvailableProviders(): SearchProviderType[] {
    const availableProviders: SearchProviderType[] = [];
    
    this.providers.forEach((provider, name) => {
      if (provider.isAvailable()) {
        availableProviders.push(name);
      }
    });
    
    return availableProviders;
  }

  /**
   * 设置默认搜索提供商
   * @param provider 提供商名称
   */
  public setDefaultProvider(provider: SearchProviderType): void {
    if (this.providers.has(provider)) {
      this.defaultProvider = provider;
    } else {
      throw new Error(`未知的搜索提供商: ${provider}`);
    }
  }

  /**
   * 获取默认搜索提供商
   * @returns 默认搜索提供商名称
   */
  public getDefaultProvider(): SearchProviderType {
    return this.defaultProvider;
  }

  /**
   * 使用指定的提供商执行搜索
   * @param options 搜索选项
   * @param providerName 提供商名称
   * @returns 搜索结果
   */
  public async searchWithProvider(
    options: SearchOptions, 
    providerName: SearchProviderType
  ): Promise<SearchResult> {
    const provider = this.providers.get(providerName);
    
    if (!provider) {
      throw new Error(`未知的搜索提供商: ${providerName}`);
    }
    
    if (!provider.isAvailable()) {
      throw new Error(`搜索提供商 ${providerName} 不可用`);
    }
    
    return provider.search(options);
  }

  /**
   * 使用默认提供商执行搜索
   * @param options 搜索选项
   * @returns 搜索结果
   */
  public async search(options: SearchOptions): Promise<SearchResult> {
    return this.searchWithProvider(options, this.defaultProvider);
  }

  /**
   * 使用多个提供商执行搜索并合并结果
   * @param options 搜索选项
   * @param providerNames 提供商名称数组
   * @returns 合并的搜索结果
   */
  public async searchWithMultipleProviders(
    options: SearchOptions,
    providerNames?: SearchProviderType[]
  ): Promise<CombinedSearchResult> {
    // 如果未指定提供商，使用所有可用的提供商
    const providers = providerNames || this.getAvailableProviders();
    
    if (providers.length === 0) {
      throw new Error('没有可用的搜索提供商');
    }
    
    // 并行执行所有搜索
    const searchPromises = providers.map(name => 
      this.searchWithProvider(options, name)
        .catch(error => ({
          snippets: [],
          query: options.query,
          provider: name,
          suggestions: [],
          totalResults: 0,
          executionTime: 0,
          error: error instanceof Error ? error.message : String(error)
        } as SearchResult))
    );
    
    const results = await Promise.all(searchPromises);
    
    // 合并结果
    const allSnippets: SearchSnippet[] = [];
    const suggestions: string[] = [];
    const errors: Record<SearchProviderType, string> = {} as Record<SearchProviderType, string>;
    let totalResults = 0;
    let totalExecutionTime = 0;
    
    results.forEach(result => {
      // 添加片段
      allSnippets.push(...result.snippets);
      
      // 添加建议
      if (result.suggestions) {
        suggestions.push(...result.suggestions);
      }
      
      // 记录错误
      if (result.error) {
        errors[result.provider] = result.error;
      }
      
      // 累计结果数量
      totalResults += result.totalResults || 0;
      
      // 累计执行时间
      totalExecutionTime += result.executionTime || 0;
    });
    
    // 去重片段（基于URL）
    const uniqueSnippets = this.deduplicateSnippets(allSnippets);
    
    // 去重建议
    const uniqueSuggestions = [...new Set(suggestions)];
    
    return {
      snippets: uniqueSnippets,
      query: options.query,
      providers: providers,
      suggestions: uniqueSuggestions,
      totalResults,
      executionTime: totalExecutionTime,
      errors: Object.keys(errors).length > 0 ? errors : undefined
    };
  }

  /**
   * 去重搜索片段
   * @param snippets 搜索片段数组
   * @returns 去重后的搜索片段数组
   */
  private deduplicateSnippets(snippets: SearchSnippet[]): SearchSnippet[] {
    const uniqueUrls = new Set<string>();
    const uniqueSnippets: SearchSnippet[] = [];
    
    for (const snippet of snippets) {
      // 标准化URL（移除尾部斜杠和查询参数）
      const normalizedUrl = this.normalizeUrl(snippet.url);
      
      if (!uniqueUrls.has(normalizedUrl)) {
        uniqueUrls.add(normalizedUrl);
        uniqueSnippets.push(snippet);
      }
    }
    
    return uniqueSnippets;
  }

  /**
   * 标准化URL
   * @param url URL字符串
   * @returns 标准化的URL
   */
  private normalizeUrl(url: string): string {
    try {
      const parsedUrl = new URL(url);
      // 移除尾部斜杠
      let pathname = parsedUrl.pathname;
      if (pathname.endsWith('/') && pathname.length > 1) {
        pathname = pathname.slice(0, -1);
      }
      // 返回不带查询参数和片段的URL
      return `${parsedUrl.protocol}//${parsedUrl.host}${pathname}`;
    } catch {
      // 如果URL解析失败，返回原始URL
      return url;
    }
  }

  /**
   * 设置令牌跟踪器
   * @param tracker 令牌跟踪器
   */
  public setTokenTracker(tracker: TokenTracker): void {
    this.tokenTracker = tracker;
    
    // 更新所有提供商的令牌跟踪器
    this.providers.forEach(provider => {
      if (provider instanceof BraveSearchProvider ||
          provider instanceof SerperSearchProvider ||
          provider instanceof JinaSearchProvider ||
          provider instanceof SearxngSearchProvider ||
          provider instanceof DuckSearchProvider) {
        provider.setTokenTracker(tracker);
      }
    });
  }

  /**
   * 执行搜索查询并处理结果
   * 
   * @param queries 搜索查询数组
   * @param context 上下文对象，包含令牌跟踪器
   * @param allURLs 所有URL记录
   * @param onlyHostnames 仅搜索指定主机名
   * @returns 处理后的搜索结果
   */
  public async executeSearchQueries(
    queries: Array<{ q: string, [key: string]: any }>,
    context: { tokenTracker: TokenTracker, actionTracker: any },
    allURLs: Record<string, SearchSnippet>,
    onlyHostnames?: string[]
  ): Promise<{
    newKnowledge: Array<{ question: string, answer: string, type: "side-info", updated?: string }>,
    searchedQueries: string[]
  }> {
    const newKnowledge: Array<{ question: string, answer: string, type: "side-info", updated?: string }> = [];
    const searchedQueries: string[] = [];
    let utilityScore = 0;
    
    // 设置令牌跟踪器
    this.setTokenTracker(context.tokenTracker);
    
    for (const query of queries) {
      let results: any[] = [];
      const oldQuery = query.q;
      
      // 如果指定了主机名，添加到查询中
      if (onlyHostnames && onlyHostnames.length > 0) {
        query.q = `${query.q} site:${onlyHostnames.join(' OR site:')}`;
      }
      
      try {
        console.log('Search query:', query);
        
        // 构建搜索选项
        const searchOptions: SearchOptions = {
          query: query.q,
          maxResults: 10
        };
        
        // 添加特定选项
        if (typeof query === 'object') {
          if (query.hl) searchOptions.hl = query.hl;
          if (query.gl) searchOptions.gl = query.gl;
          if (query.location) searchOptions.location = query.location;
          if (query.tbs) searchOptions.tbs = query.tbs;
          if (query.categories) searchOptions.categories = query.categories;
          if (query.engines) searchOptions.engines = query.engines;
          if (query.language) searchOptions.language = query.language;
        }
        
        // 执行搜索
        const searchResult = await this.searchWithProvider(searchOptions, SEARCH_PROVIDER as SearchProviderType);
        
        // 处理搜索结果
        results = searchResult.snippets.map(snippet => ({
          title: snippet.title,
          url: snippet.url,
          description: snippet.description,
          date: snippet.date
        }));
        
        if (results.length === 0) {
          throw new Error('No results found');
        }
      } catch (error) {
        console.error(`${SEARCH_PROVIDER} search failed for query:`, query, error);
        continue;
      } finally {
        // 等待一段时间，避免频繁请求
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // 标准化结果
      const minResults: SearchSnippet[] = results
        .map(r => {
          const url = this.normalizeUrl(r.url);
          if (!url) return null; // 跳过无效URL
          
          return {
            title: r.title,
            url,
            description: r.description,
            weight: 1,
            date: r.date,
          } as SearchSnippet;
        })
        .filter(Boolean) as SearchSnippet[]; // 过滤掉null条目
      
      // 添加到URL记录
      minResults.forEach(r => {
        const normalizedUrl = this.normalizeUrl(r.url);
        if (!normalizedUrl) return;
        
        if (!allURLs[normalizedUrl]) {
          allURLs[normalizedUrl] = r;
          allURLs[normalizedUrl].weight = 1;
          utilityScore += 1;
        } else {
          (allURLs[normalizedUrl].weight as number) += 1;
          // 合并描述
          const curDesc = allURLs[normalizedUrl].description;
          const newDesc = r.description;
          if (curDesc && newDesc) {
            // 简单合并描述，避免重复
            if (curDesc.length > newDesc.length) {
              if (!curDesc.includes(newDesc)) {
                allURLs[normalizedUrl].description = `${curDesc} ${newDesc}`;
              }
            } else {
              if (!newDesc.includes(curDesc)) {
                allURLs[normalizedUrl].description = `${newDesc} ${curDesc}`;
              }
            }
          }
        }
      });
      
      searchedQueries.push(query.q);
      
      // 创建知识条目
      newKnowledge.push({
        question: `What do Internet say about "${oldQuery}"?`,
        answer: minResults.map(r => r.description).join('; '),
        type: "side-info" as const,
        updated: query.tbs ? this.formatDateRange(query) : undefined
      });
    }
    
    console.log(`Utility/Queries: ${utilityScore}/${searchedQueries.length}`);
    
    return {
      newKnowledge,
      searchedQueries
    };
  }
  
  /**
   * 格式化日期范围
   * @param query 查询对象
   * @returns 格式化的日期范围字符串
   */
  private formatDateRange(query: any): string | undefined {
    if (!query.tbs) return undefined;
    
    const tbs = query.tbs;
    if (tbs.startsWith('qdr:')) {
      const period = tbs.substring(4);
      const now = new Date();
      let startDate: Date;
      
      switch (period) {
        case 'h': // 过去1小时
          startDate = new Date(now.getTime() - 60 * 60 * 1000);
          break;
        case 'd': // 过去1天
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case 'w': // 过去1周
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'm': // 过去1个月
          startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          break;
        case 'y': // 过去1年
          startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
          break;
        default:
          return undefined;
      }
      
      return `${startDate.toISOString().split('T')[0]} to ${now.toISOString().split('T')[0]}`;
    } else if (tbs.includes('cdr:')) {
      // 自定义日期范围，格式如 cdr:1,cd_min:2020-01-01,cd_max:2020-12-31
      const parts = tbs.split(',');
      let startDate, endDate;
      
      for (const part of parts) {
        if (part.startsWith('cd_min:')) {
          startDate = part.substring(7);
        } else if (part.startsWith('cd_max:')) {
          endDate = part.substring(7);
        }
      }
      
      if (startDate && endDate) {
        return `${startDate} to ${endDate}`;
      }
    }
    
    return undefined;
  }
}
