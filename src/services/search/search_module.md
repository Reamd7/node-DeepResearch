# 搜索服务模块

## 目的与职责

搜索服务模块是DeepResearch系统的核心功能之一，提供统一的搜索接口，管理多个搜索提供商，并处理搜索结果的标准化、合并和去重。该模块采用适配器模式，为不同的搜索提供商（如Brave、Serper、Jina、SearXNG和Duck）提供统一的接口，使系统能够轻松切换或组合不同的搜索提供商，同时保持一致的使用体验。

## 接口

### 主要类

* `SearchService`: 搜索服务类，管理多个搜索提供商，提供统一的搜索接口
* `BaseSearchProvider`: 搜索提供商基类，定义搜索提供商的通用接口和功能

### 主要方法

* `search(options: SearchOptions)`: 使用默认提供商执行搜索
* `searchWithProvider(options: SearchOptions, providerName: SearchProviderType)`: 使用指定提供商执行搜索
* `searchWithMultipleProviders(options: SearchOptions, providerNames?: SearchProviderType[])`: 使用多个提供商执行搜索并合并结果
* `executeSearchQueries(queries: Array<{ q: string, [key: string]: any }>, context: { tokenTracker: TokenTracker, actionTracker: any }, allURLs: Record<string, SearchSnippet>, onlyHostnames?: string[])`: 执行搜索查询并处理结果

### 输入

* 搜索选项（查询字符串、最大结果数、语言、安全搜索设置等）
* 搜索提供商名称
* 令牌跟踪器

### 输出

* 搜索结果（包含标题、URL、描述等信息的片段数组）
* 搜索建议
* 执行时间和错误信息

## 实现细节

### 文件

* `search-service.ts`: 搜索服务类的实现，管理多个搜索提供商，提供统一的搜索接口
* `base-provider.ts`: 搜索提供商基类，定义搜索提供商的通用接口和功能
* `types.ts`: 搜索服务相关的类型定义
* `index.ts`: 导出搜索服务模块的公共接口
* `providers/`: 各种搜索提供商的实现
  * `brave-provider.ts`: Brave搜索提供商
  * `serper-provider.ts`: Serper搜索提供商
  * `jina-provider.ts`: Jina搜索提供商
  * `searxng-provider.ts`: SearXNG搜索提供商
  * `duck-provider.ts`: Duck搜索提供商
  * `index.ts`: 导出所有搜索提供商
* `__tests__/`: 搜索服务的测试
  * `search-service.test.ts`: 搜索服务的单元测试

### 重要算法

* 搜索结果标准化：将不同提供商的搜索结果转换为统一的格式
* 搜索结果合并：合并多个提供商的搜索结果
* 搜索结果去重：基于URL去除重复的搜索结果
* URL标准化：标准化URL以便于比较和去重

### 数据模型

* `SearchOptions`: 搜索选项
* `SearchProviderType`: 搜索提供商类型
* `SearchSnippet`: 搜索片段
* `SearchResult`: 搜索结果
* `CombinedSearchResult`: 合并的搜索结果
* `SearchProvider`: 搜索提供商接口

## 当前实现状态

### 已完成

* 搜索服务类的基本实现
* 多个搜索提供商的实现（Brave、Serper、Jina、SearXNG、Duck）
* 搜索结果的标准化、合并和去重
* 搜索服务的单元测试

### 进行中

* 搜索结果缓存机制
* 搜索结果重排序算法优化

### 待完成

* 添加更多搜索提供商
* 多语言搜索支持增强
* 搜索结果过滤功能
* 搜索使用分析

## 实现计划与任务

* `search_implementation_plan.md`
  * 搜索结果缓存：实现搜索结果缓存机制，减少重复API调用
  * 改进重排序算法：优化搜索结果相关性
  * 多语言搜索支持：增强多语言搜索能力
  * 搜索结果过滤：实现内容过滤功能
  * 搜索分析：添加搜索使用分析

## 依赖关系

### 外部依赖

* `axios`: HTTP客户端
* `duck-duck-scrape`: Duck搜索API客户端
* `@agentic/searxng`: SearXNG客户端
* 环境变量：各搜索提供商的API密钥和配置

### 内部依赖

* `utils/token-tracker.ts`: 令牌使用跟踪
* `utils/url-tools.ts`: URL处理工具
* `types.ts`: 全局类型定义
* `config.ts`: 配置信息

## Mini Dependency Tracker

---mini_tracker_start---

---KEY_DEFINITIONS_START---
Key Definitions:
2Ca: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search
2Ca1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/base-provider.ts
2Ca2: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/index.ts
2Ca3: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/search-service.ts
2Ca4: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/types.ts
3Aa: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/__tests__
3Aa1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/__tests__/search-service.test.ts
3Ab: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/providers
3Ab1: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/providers/brave-provider.ts
3Ab2: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/providers/duck-provider.ts
3Ab3: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/providers/index.ts
3Ab4: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/providers/jina-provider.ts
3Ab5: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/providers/searxng-provider.ts
3Ab6: /Users/gemini/Documents/ai-infra/node-DeepResearch/src/services/search/providers/serper-provider.ts
---KEY_DEFINITIONS_END---

last_KEY_edit: Manually created
last_GRID_edit: Manually created

---GRID_START---
X 2Ca 2Ca1 2Ca2 2Ca3 2Ca4 3Aa 3Aa1 3Ab 3Ab1 3Ab2 3Ab3 3Ab4 3Ab5 3Ab6
2Ca = o < < < < < < < < < < < < <
2Ca1 = > o n n > n n > > > > > > >
2Ca2 = > n o n > n n > > > > > > >
2Ca3 = > n n o > n n > > > > > > >
2Ca4 = < < < < o n n < < < < < < <
3Aa = > n n n n o < n n n n n n n
3Aa1 = > n n > n > o n n n n n n n
3Ab = > < < < > n n o < < < < < <
3Ab1 = > < < < > n n > o n > n n n
3Ab2 = > < < < > n n > n o > n n n
3Ab3 = > < < < > n n > < < o < < <
3Ab4 = > < < < > n n > n n > o n n
3Ab5 = > < < < > n n > n n > n o n
3Ab6 = > < < < > n n > n n > n n o
---GRID_END---

---mini_tracker_end---
