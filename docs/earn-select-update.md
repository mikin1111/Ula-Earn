# 产品类型选择器组件更新说明

## 变更概述

将 Earn 页面的「产品类型」选择器由原生 `<select>` 替换为符合 `docs/Select.md` 中 **DropdownV5-web** 规范的自定义选择器组件。

## 规范对照

| 属性 | 规范要求 | 实现 |
|------|----------|------|
| 背景 | `--color-cmpt-input` (#f5f6f7) | `var(--cmpt-input, #f5f6f7)` |
| 圆角 | 6px | `border-radius: 6px` |
| 水平内边距 | 8px | `padding: 0 8px` |
| 字体 | Switzer Medium 14px (B7 500) | `font-size: 14px; font-weight: 500` |
| 字色 | `--color-text-text-primary` | `var(--text-primary)` |
| 占位符 | `--color-text-text-secondary` | `.select-text.placeholder { color: var(--text-secondary) }` |
| 箭头图标 | CEX_chevron_down 16×16px | 引用 `CEX_chevron_down.svg` / `CEX_chevron_up.svg` |
| 默认态 | 无描边 | `border: none` |
| Hover/Open | 边框 `--color-cmpt-component-active` | `border: 1px solid var(--cmpt-component-active)`，`padding: 0 7px` |
| 尺寸 | 210px × 40px | `width: 210px; height: 40px` |

## 修改内容

1. **HTML**：用 `select-wrap` + `select-trigger` + `select-suffix` + `select-menu` 结构替换原生 `<select>`，选项包括：产品类型、Simple Earn、Staking、Dual Investment、Smart Leverage。
2. **CSS**：按 DropdownV5-web 规范重写样式，使用 `CEX_chevron_down.svg` / `CEX_chevron_up.svg`，占位符使用 `--text-secondary`，Hover/Open 使用 `--cmpt-component-active` 边框。
3. **JS**：为 `.earn-market-filters .select-trigger[data-select-earn]` 增加点击展开/收起、选项选择、占位符状态切换及点击外部关闭逻辑。

## 相关文件

- `Earn-web/index.html`：选择器结构、样式与交互逻辑
- `docs/Select.md`：组件规范
- `icons/Basic Product Icons/CEX_chevron_down.svg`、`CEX_chevron_up.svg`：箭头图标
