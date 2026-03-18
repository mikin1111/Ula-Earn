# 表头排序图标更新说明

## 变更概述

将 Earn 页面表格表头的排序图标替换为图标组件库 `CEX_sort`，并确保图标颜色与表头文字保持一致。

## 修改内容

1. **图标引用**：使用 `icons/Basic Product Icons/CEX_sort.svg`（符合 `docs/Icon.md` 规范）。
2. **实现方式**：使用 `<span>` + CSS `mask` 引用 CEX_sort，`background-color: currentColor` 使图标继承表头文字色 `var(--text-tertiary)`。
3. **涉及表头**：
   - 简单理财：Est. APR
   - 结构化理财 - Dual Investment：Est. APR、Target Price
   - 结构化理财 - Smart Leverage：Leverage、Break-Even Price

## 技术细节

- 尺寸：12×12px
- 颜色：继承 `th` 的 `color: var(--text-tertiary)`
- 路径：`../icons/Basic%20Product%20Icons/CEX_sort.svg`
