/**
 * 搜索服务使用示例
 * 
 * 本示例展示了如何使用搜索服务执行各种搜索操作
 */

import { SearchService, SearchOptions, SearchProviderType } from '../services/search';
import { TokenTracker } from '../utils/token-tracker';

// 创建令牌跟踪器
const tokenTracker = new TokenTracker();

// 创建搜索服务实例
const searchService = new SearchService(tokenTracker);

/**
 * 使用默认提供商执行搜索
 */
async function searchWithDefault() {
  console.log('使用默认提供商执行搜索...');
  
  const options: SearchOptions = {
    query: 'TypeScript 教程',
    maxResults: 5
  };
  
  try {
    const result = await searchService.search(options);
    
    console.log(`搜索提供商: ${result.provider}`);
    console.log(`找到 ${result.snippets.length} 个结果`);
    console.log('前3个结果:');
    
    result.snippets.slice(0, 3).forEach((snippet, index) => {
      console.log(`${index + 1}. ${snippet.title}`);
      console.log(`   URL: ${snippet.url}`);
      console.log(`   描述: ${snippet.description.substring(0, 100)}...`);
      console.log('');
    });
    
    console.log(`执行时间: ${result.executionTime}ms`);
  } catch (error) {
    console.error('搜索失败:', error);
  }
}

/**
 * 使用指定提供商执行搜索
 */
async function searchWithProvider(provider: SearchProviderType) {
  console.log(`使用 ${provider} 提供商执行搜索...`);
  
  const options: SearchOptions = {
    query: 'Node.js 最佳实践',
    maxResults: 5
  };
  
  try {
    const result = await searchService.searchWithProvider(options, provider);
    
    console.log(`搜索提供商: ${result.provider}`);
    console.log(`找到 ${result.snippets.length} 个结果`);
    console.log('前3个结果:');
    
    result.snippets.slice(0, 3).forEach((snippet, index) => {
      console.log(`${index + 1}. ${snippet.title}`);
      console.log(`   URL: ${snippet.url}`);
      console.log(`   描述: ${snippet.description.substring(0, 100)}...`);
      console.log('');
    });
    
    if (result.suggestions && result.suggestions.length > 0) {
      console.log('相关搜索:');
      result.suggestions.slice(0, 5).forEach(suggestion => {
        console.log(`- ${suggestion}`);
      });
      console.log('');
    }
    
    console.log(`执行时间: ${result.executionTime}ms`);
  } catch (error) {
    console.error(`使用 ${provider} 搜索失败:`, error);
  }
}

/**
 * 使用多个提供商执行搜索
 */
async function searchWithMultipleProviders() {
  console.log('使用多个提供商执行搜索...');
  
  // 获取可用的提供商
  const availableProviders = searchService.getAvailableProviders();
  console.log(`可用的提供商: ${availableProviders.join(', ')}`);
  
  // 如果有多个可用提供商，使用前两个
  const providers = availableProviders.length >= 2 
    ? availableProviders.slice(0, 2) 
    : availableProviders;
  
  if (providers.length === 0) {
    console.error('没有可用的搜索提供商');
    return;
  }
  
  const options: SearchOptions = {
    query: 'AI 基础设施',
    maxResults: 5
  };
  
  try {
    const result = await searchService.searchWithMultipleProviders(options, providers);
    
    console.log(`使用的提供商: ${result.providers.join(', ')}`);
    console.log(`找到 ${result.snippets.length} 个结果`);
    console.log('前5个结果:');
    
    result.snippets.slice(0, 5).forEach((snippet, index) => {
      console.log(`${index + 1}. ${snippet.title} (来自: ${snippet.provider})`);
      console.log(`   URL: ${snippet.url}`);
      console.log(`   描述: ${snippet.description.substring(0, 100)}...`);
      console.log('');
    });
    
    if (result.suggestions && result.suggestions.length > 0) {
      console.log('相关搜索:');
      result.suggestions.slice(0, 5).forEach(suggestion => {
        console.log(`- ${suggestion}`);
      });
      console.log('');
    }
    
    if (result.errors) {
      console.log('错误:');
      Object.entries(result.errors).forEach(([provider, error]) => {
        console.log(`- ${provider}: ${error}`);
      });
      console.log('');
    }
    
    console.log(`执行时间: ${result.executionTime}ms`);
  } catch (error) {
    console.error('多提供商搜索失败:', error);
  }
}

/**
 * 运行示例
 */
async function runExamples() {
  try {
    // 使用默认提供商搜索
    await searchWithDefault();
    console.log('\n' + '-'.repeat(80) + '\n');
    
    // 获取可用的提供商
    const availableProviders = searchService.getAvailableProviders();
    
    // 如果有可用提供商，使用第一个
    if (availableProviders.length > 0) {
      await searchWithProvider(availableProviders[0]);
      console.log('\n' + '-'.repeat(80) + '\n');
    }
    
    // 使用多个提供商搜索
    await searchWithMultipleProviders();
    
    // 输出令牌使用情况
    console.log('\n令牌使用情况:');
    console.log('总计:', tokenTracker.getTotalUsage());
    console.log('详细:', tokenTracker.getUsageBreakdown());
  } catch (error) {
    console.error('运行示例时出错:', error);
  }
}

// 如果直接运行此文件，执行示例
if (require.main === module) {
  runExamples().catch(console.error);
}
