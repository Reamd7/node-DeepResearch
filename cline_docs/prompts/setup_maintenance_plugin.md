# Set-up/Maintenance 阶段插件

本插件提供了Set-up/Maintenance阶段的详细指导，包括初始化、依赖跟踪和系统维护。

## I. Set-up/Maintenance阶段概述

Set-up/Maintenance阶段负责：
1. 系统初始化
2. 代码根目录和文档目录识别
3. 依赖跟踪器的创建和维护
4. 核心文件的创建和更新
5. 项目结构分析

## II. 初始化流程

1. 读取`.clinerules`文件确定当前阶段
2. 加载相应的插件（本插件）
3. 创建必要的核心文件
4. 识别代码根目录和文档目录
5. 创建和更新依赖跟踪器

## III. 核心文件创建指南

创建以下核心文件（如果不存在）：

1. **system_manifest.md**：项目顶层概述
2. **activeContext.md**：跟踪当前状态、决策和优先级
3. **module_relationship_tracker.md**：记录模块级依赖关系
4. **changelog.md**：记录代码库的重要变更
5. **doc_tracker.md**：记录文档依赖关系

## IV. 依赖跟踪器管理

使用`dependency_processor.py`脚本管理依赖跟踪器：

```bash
python -m cline_utils.dependency_system.dependency_processor analyze-project
```

## V. 强制更新协议（MUP）

每次状态变更操作后立即执行：
1. 更新`activeContext.md`
2. 更新`changelog.md`
3. 更新`.clinerules`
4. 验证更新的一致性
5. 更新相关的HDTA文件

## VI. 阶段转换检查清单

在从Set-up/Maintenance阶段转换到Strategy阶段之前，确认：
1. `doc_tracker.md`和`module_relationship_tracker.md`没有'p'占位符
2. `.clinerules`中的`[CODE_ROOT_DIRECTORIES]`和`[DOC_DIRECTORIES]`已填充
