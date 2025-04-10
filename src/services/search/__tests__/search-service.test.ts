import { SearchService } from '../search-service';
import { TokenTracker } from '../../../utils/token-tracker';
import { SearchOptions } from '../types';

describe('SearchService', () => {
  let searchService: SearchService;
  let tokenTracker: TokenTracker;

  beforeEach(() => {
    tokenTracker = new TokenTracker();
    searchService = new SearchService(tokenTracker);
  });

  it('should be initialized with default provider', () => {
    expect(searchService).toBeDefined();
    expect(searchService.getDefaultProvider()).toBeDefined();
  });

  it('should return available providers', () => {
    const availableProviders = searchService.getAvailableProviders();
    expect(Array.isArray(availableProviders)).toBe(true);
  });

  it('should set default provider', () => {
    const availableProviders = searchService.getAvailableProviders();
    if (availableProviders.length > 0) {
      const provider = availableProviders[0];
      searchService.setDefaultProvider(provider);
      expect(searchService.getDefaultProvider()).toBe(provider);
    }
  });

  it('should throw error for unknown provider', () => {
    // @ts-ignore - Testing invalid provider
    expect(() => searchService.setDefaultProvider('unknown')).toThrow();
  });

  it('should set token tracker', () => {
    const newTracker = new TokenTracker();
    searchService.setTokenTracker(newTracker);
    // 无法直接测试私有属性，但可以通过行为测试
  });

  describe('search', () => {
    it.skip('should perform search with default provider (skipped due to API dependencies)', async () => {
      const options: SearchOptions = {
        query: 'TypeScript programming'
      };
      
      const result = await searchService.search(options);
      expect(result).toBeDefined();
      expect(result.snippets).toBeDefined();
      expect(Array.isArray(result.snippets)).toBe(true);
    });
  });

  describe('searchWithProvider', () => {
    it.skip('should perform search with specified provider (skipped due to API dependencies)', async () => {
      const availableProviders = searchService.getAvailableProviders();
      if (availableProviders.length > 0) {
        const provider = availableProviders[0];
        const options: SearchOptions = {
          query: 'TypeScript programming'
        };
        
        const result = await searchService.searchWithProvider(options, provider);
        expect(result).toBeDefined();
        expect(result.snippets).toBeDefined();
        expect(Array.isArray(result.snippets)).toBe(true);
      }
    });

    it('should throw error for unknown provider', async () => {
      const options: SearchOptions = {
        query: 'TypeScript programming'
      };
      
      // @ts-ignore - Testing invalid provider
      await expect(searchService.searchWithProvider(options, 'unknown')).rejects.toThrow();
    });
  });

  describe('searchWithMultipleProviders', () => {
    it.skip('should perform search with multiple providers (skipped due to API dependencies)', async () => {
      const availableProviders = searchService.getAvailableProviders();
      if (availableProviders.length > 0) {
        const options: SearchOptions = {
          query: 'TypeScript programming'
        };
        
        const result = await searchService.searchWithMultipleProviders(options, availableProviders.slice(0, 1));
        expect(result).toBeDefined();
        expect(result.snippets).toBeDefined();
        expect(Array.isArray(result.snippets)).toBe(true);
        expect(result.providers).toEqual(availableProviders.slice(0, 1));
      }
    });

    it.skip('should perform search with all available providers (skipped due to API dependencies)', async () => {
      const options: SearchOptions = {
        query: 'TypeScript programming'
      };
      
      const result = await searchService.searchWithMultipleProviders(options);
      expect(result).toBeDefined();
      expect(result.snippets).toBeDefined();
      expect(Array.isArray(result.snippets)).toBe(true);
      expect(result.providers).toEqual(searchService.getAvailableProviders());
    });

    it('should throw error if no providers available', async () => {
      // 创建一个没有可用提供商的搜索服务
      const emptySearchService = new SearchService();
      
      // 模拟没有可用提供商
      jest.spyOn(emptySearchService, 'getAvailableProviders').mockReturnValue([]);
      
      const options: SearchOptions = {
        query: 'TypeScript programming'
      };
      
      await expect(emptySearchService.searchWithMultipleProviders(options)).rejects.toThrow();
    });
  });

  describe('URL normalization', () => {
    it('should normalize URLs correctly', () => {
      // 使用私有方法进行测试，需要通过类型断言访问
      const normalizeUrl = (searchService as any).normalizeUrl.bind(searchService);
      
      expect(normalizeUrl('https://example.com/')).toBe('https://example.com');
      expect(normalizeUrl('https://example.com/path/')).toBe('https://example.com/path');
      expect(normalizeUrl('https://example.com/path?query=value')).toBe('https://example.com/path');
      expect(normalizeUrl('https://example.com/path#fragment')).toBe('https://example.com/path');
      expect(normalizeUrl('invalid-url')).toBe('invalid-url');
    });
  });
});
