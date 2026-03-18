# 理财计算器暗黑模式适配说明

## 变更概述

将理财计算器模块适配暗黑模式，通过使用 CSS 变量替代硬编码色值，使组件随 `data-theme="dark"` 自动切换主题。

## 修改内容

### 1. 硬编码色值替换为 CSS 变量

| 元素 | 原色值 | 替换变量 |
|------|--------|----------|
| 卡片边框 | `#F2F3F4` | `var(--line-border-subtle)` |
| 输入框背景 | `#F5F6F7` | `var(--cmpt-input)` |
| Calculate 按钮 | `#303236` / `#ffffff` | `var(--cmpt-button-primary)` / `var(--text-on-fill)` |
| 周期选择器背景 | `#F5F6F7` | `var(--cmpt-input)` |
| Tooltip | `rgba(31,32,35,0.92)` / `#fff` | `var(--bg-inverse-secondary)` / `var(--text-inverse-primary)` |

### 2. 周期选择器（Year Pills）状态

- **未选中**：`background: var(--cmpt-input)`，`color: var(--text-secondary)`
- **选中**：`background: var(--cmpt-component-active)`，`color: var(--text-on-fill)`

解决暗黑模式下白字白底、对比度不足的问题。

### 3. 图表 SVG 主题化

- 横轴：`stroke: var(--line-border-strong)`
- 曲线与辅助线：`stroke: var(--text-brand)`
- 数据点：`fill: var(--bg-always-white)`，`stroke: var(--text-brand)`

### 4. 收益单位

- `.earn-calc-profit .unit` 使用 `color: var(--text-primary)`，与主题文字色一致

## 依赖

- `src/styles/color-tokens.css` 中已定义 `[data-theme='dark']` 的变量覆盖
- 根元素 `data-theme` 切换时，上述变量自动更新
