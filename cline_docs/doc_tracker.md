# 文档跟踪器

## 概述

本文件跟踪项目中文档之间的依赖关系。依赖关系使用以下字符表示：

- `<`: 行依赖于列
- `>`: 列依赖于行
- `x`: 相互依赖
- `d`: 文档依赖
- `o`: 自依赖（仅对角线）
- `n`: 已验证无依赖
- `p`: 占位符（未验证）
- `s`: 语义依赖

## 依赖矩阵

| 键 | 文档 | 1Da | 1Db | 1Dc | 1Dd | 1De |
|----|------|-----|-----|-----|-----|-----|
| 1Da | cline_docs/system_manifest.md | o | p | p | p | p |
| 1Db | cline_docs/activeContext.md | p | o | p | p | p |
| 1Dc | cline_docs/module_relationship_tracker.md | p | p | o | p | p |
| 1Dd | cline_docs/changelog.md | p | p | p | o | p |
| 1De | README.md | p | p | p | p | o |

## 注意事项

- 此跟踪器是初始版本，包含占位符（p）表示未验证的依赖关系
- 需要使用依赖处理器工具进行完整分析
- 后续更新将替换占位符为实际依赖关系
- 目前包含了CRCT系统文档和项目README

## 更新历史

| 日期 | 更新者 | 更新内容 |
|------|-------|---------|
| 2025-04-10 | CRCT系统 | 创建初始版本 |
