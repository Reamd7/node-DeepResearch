# 设置/维护阶段插件

本插件定义了CRCT系统的设置和维护阶段的操作流程和规则。

## I. 设置/维护阶段概述

设置/维护阶段是CRCT系统的基础阶段，负责：

1. **初始化系统**：创建和配置核心文件和目录结构
2. **识别项目结构**：确定代码根目录和文档目录
3. **依赖关系分析**：生成和维护依赖关系跟踪器
4. **系统清理**：定期维护和更新系统状态

## II. 设置/维护阶段工作流程

1. **读取`.clinerules`**：确定当前阶段和上一次操作
2. **检查核心文件**：验证所有必需的核心文件是否存在
3. **识别代码和文档目录**：如果尚未识别，确定项目的代码根目录和文档目录
4. **创建/更新依赖关系跟踪器**：使用`dependency_processor.py`分析项目结构
5. **更新系统状态**：遵循强制更新协议(MUP)更新系统状态
6. **准备下一阶段**：完成所有设置/维护任务后，准备进入策略阶段

## III. 核心文件创建和维护

### 必需的核心文件

| 文件 | 目的 | 位置 | 创建方法（如果缺失） |
|------|------|------|----------------------|
| `.clinerules` | 跟踪阶段、上一次操作、项目情报和代码根目录 | 项目根目录 | 手动创建，包含最小内容 |
| `system_manifest.md` | 顶级项目概述(HDTA) | `cline_docs/` | 使用`cline_docs/templates/system_manifest_template.md`模板创建 |
| `activeContext.md` | 跟踪当前状态、决策和优先级 | `cline_docs/` | 手动创建占位符 |
| `module_relationship_tracker.md` | 记录模块级依赖关系 | `cline_docs/` | 使用`dependency_processor.py analyze-project`创建 |
| `changelog.md` | 记录代码库的重大变更 | `cline_docs/` | 手动创建占位符 |
| `doc_tracker.md` | 记录文档依赖关系 | `{doc_dir}/` | 使用`dependency_processor.py analyze-project`创建 |

### 创建核心文件的步骤

1. **检查文件是否存在**：使用`list_files`工具检查核心文件是否存在
2. **创建缺失的文件**：按照上表中的创建方法创建缺失的文件
3. **验证文件内容**：确保所有核心文件包含必要的内容和结构

## IV. 依赖关系跟踪器管理

依赖关系跟踪器是CRCT系统的核心组件，用于管理项目中的依赖关系。

### 跟踪器类型

| 跟踪器 | 范围 | 粒度 | 位置 | 优先级（设置/维护） |
|--------|------|------|------|-------------------|
| `doc_tracker.md` | `{doc_dir}/`文件依赖 | 文档到文档 | `{memory_dir}/` | 最高 |
| `module_relationship_tracker.md` | 模块级依赖 | 模块到模块 | `{memory_dir}/` | 高 |
| 迷你跟踪器 | 模块内文件/函数/文档依赖 | 文件/函数/文档级 | `{module_name}_module.md` | 低 |

### 依赖关系字符

- `<`: 行依赖于列
- `>`: 列依赖于行
- `x`: 相互依赖
- `d`: 文档依赖
- `o`: 自依赖（仅对角线）
- `n`: 已验证无依赖
- `p`: 占位符（未验证）
- `s`: 语义依赖

### 使用`dependency_processor.py`管理跟踪器

所有跟踪器管理必须使用`dependency_processor.py`脚本完成：

```bash
python -m cline_utils.dependency_system.dependency_processor analyze-project
```

## V. 设置/维护阶段的强制更新协议(MUP)

除了核心MUP步骤外，设置/维护阶段还需要执行以下特定步骤：

1. **更新`.clinerules`**：
   - 更新`[LAST_ACTION_STATE]`部分
   - 如果已识别，确保`[CODE_ROOT_DIRECTORIES]`和`[DOC_DIRECTORIES]`部分已填充
   - 添加到`[LEARNING_JOURNAL]`部分

2. **更新`activeContext.md`**：
   - 记录当前设置/维护操作的状态
   - 记录已识别的代码根目录和文档目录
   - 记录依赖关系分析的结果

3. **更新`changelog.md`**：
   - 记录系统初始化和设置操作
   - 记录依赖关系分析和跟踪器创建

## VI. 阶段转换检查清单

在从设置/维护阶段转换到策略阶段之前，必须完成以下检查：

1. **核心文件检查**：
   - 所有核心文件都已创建并包含必要的内容
   - `doc_tracker.md`和`module_relationship_tracker.md`没有'p'占位符
   - `[CODE_ROOT_DIRECTORIES]`和`[DOC_DIRECTORIES]`在`.clinerules`中已填充

2. **依赖关系分析检查**：
   - 已使用`dependency_processor.py analyze-project`分析项目
   - 所有依赖关系跟踪器都已更新

3. **系统状态检查**：
   - 已执行强制更新协议(MUP)
   - `.clinerules`中的`next_phase`设置为"Strategy"

只有在完成所有这些检查后，才能进入策略阶段。
