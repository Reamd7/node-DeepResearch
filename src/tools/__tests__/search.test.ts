import { SearchService } from '../../services/search';
import { TokenTracker } from '../../utils/token-tracker';

describe('SearchService', () => {
  let searchService: SearchService;
  let tokenTracker: TokenTracker;

  beforeEach(() => {
    jest.setTimeout(15000);
    tokenTracker = new TokenTracker();
    searchService = new SearchService(tokenTracker);
  });

  it.skip('should perform search with Jina provider (skipped due to insufficient balance)', async () => {
    const result = await searchService.searchWithProvider(
      { query: 'TypeScript programming' },
      'jina'
    );
    
    expect(result).toBeDefined();
    expect(result.snippets).toBeDefined();
    expect(Array.isArray(result.snippets)).toBe(true);
    expect(result.snippets.length).toBeGreaterThan(0);
    
    // 验证结果格式
    const firstSnippet = result.snippets[0];
    expect(firstSnippet.title).toBeDefined();
    expect(firstSnippet.url).toBeDefined();
    expect(firstSnippet.description).toBeDefined();
  }, 15000);

  it('should handle empty query', async () => {
    await expect(searchService.search({ query: '' })).rejects.toThrow();
  }, 15000);

  it('should get available providers', () => {
    const providers = searchService.getAvailableProviders();
    expect(Array.isArray(providers)).toBe(true);
  });

  it('should set and get default provider', () => {
    const initialProvider = searchService.getDefaultProvider();
    expect(initialProvider).toBeDefined();
    
    // 设置新的默认提供商（使用已知可用的提供商）
    const availableProviders = searchService.getAvailableProviders();
    if (availableProviders.length > 0) {
      const newProvider = availableProviders[0];
      searchService.setDefaultProvider(newProvider);
      expect(searchService.getDefaultProvider()).toBe(newProvider);
    }
  });
});
