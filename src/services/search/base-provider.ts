import { TokenTracker } from "../../utils/token-tracker";
import { 
  BaseSearchOptions, 
  SearchOptions, 
  SearchProvider, 
  SearchProviderType, 
  SearchResult, 
  SearchSnippet, 
  UnNormalizedSearchSnippet 
} from "./types";

/**
 * 搜索提供商的基础抽象类
 * 提供通用的功能和标准化方法
 */
export abstract class BaseSearchProvider implements SearchProvider {
  protected tokenTracker?: TokenTracker;
  protected name: SearchProviderType;
  protected available: boolean = true;

  constructor(name: SearchProviderType, tokenTracker?: TokenTracker) {
    this.name = name;
    this.tokenTracker = tokenTracker;
  }

  /**
   * 执行搜索
   * @param options 搜索选项
   */
  abstract search(options: SearchOptions): Promise<SearchResult>;

  /**
   * 获取提供商名称
   */
  getName(): SearchProviderType {
    return this.name;
  }

  /**
   * 检查提供商是否可用
   */
  isAvailable(): boolean {
    return this.available;
  }

  /**
   * 设置提供商可用状态
   * @param available 可用状态
   */
  setAvailable(available: boolean): void {
    this.available = available;
  }

  /**
   * 设置令牌跟踪器
   * @param tracker 令牌跟踪器
   */
  setTokenTracker(tracker: TokenTracker): void {
    this.tokenTracker = tracker;
  }

  /**
   * 标准化搜索片段
   * @param snippet 未标准化的搜索片段
   * @returns 标准化的搜索片段
   */
  protected normalizeSnippet(snippet: UnNormalizedSearchSnippet): SearchSnippet {
    return {
      ...snippet,
      url: snippet.url || snippet.link || "",
      description: snippet.description || snippet.snippet || "",
      provider: this.name
    };
  }

  /**
   * 标准化搜索片段数组
   * @param snippets 未标准化的搜索片段数组
   * @returns 标准化的搜索片段数组
   */
  protected normalizeSnippets(snippets: UnNormalizedSearchSnippet[]): SearchSnippet[] {
    return snippets
      .map(snippet => this.normalizeSnippet(snippet))
      .filter(snippet => snippet.url && snippet.description); // 过滤掉无效的片段
  }

  /**
   * 跟踪令牌使用情况
   * @param toolName 工具名称
   * @param promptTokens 提示令牌数
   * @param completionTokens 完成令牌数
   */
  protected trackTokenUsage(toolName: string, promptTokens: number, completionTokens: number): void {
    if (this.tokenTracker) {
      this.tokenTracker.trackUsage(toolName, {
        totalTokens: promptTokens + completionTokens,
        promptTokens,
        completionTokens
      });
    }
  }

  /**
   * 处理搜索错误
   * @param error 错误对象
   * @param query 搜索查询
   * @returns 包含错误信息的搜索结果
   */
  protected handleSearchError(error: any, query: string): SearchResult {
    console.error(`[${this.name}] 搜索错误:`, error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return {
      snippets: [],
      query,
      provider: this.name,
      error: errorMessage
    };
  }
}
