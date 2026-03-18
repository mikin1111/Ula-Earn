# Coin Title 组件规范

> 基于 Gate Coin Title Guidelines，Web + H5 一体化币种标题组件。

---

## 1. 组件基础信息

| 项目 | 说明 |
|------|------|
| 组件名称 | Coin Title（币种标题组件） |
| 适用场景 | 金融场景下的币种名称、图标展示（如交易对、资产详情、币种列表等） |
| 设计来源 | Gate Coin Title Guidelines（Web + H5 双端规范） |
| 核心目标 | 统一 Web 与 H5 视觉表现，保证币种识别一致性与可读性 |

---

## 2. 组件类型

| 类型 | 说明 |
|------|------|
| single-row | 单行：图标 + 主标题（无副标题） |
| multiple-row | 多行：图标左侧，主标题与副标题上下排列 |
| coin-chain-single-row | 带链币种 - 单行：主币种图标 + 链图标 + 主标题（无副标题） |
| coin-chain-multiple-row | 带链币种 - 多行：主币种图标 + 链图标，主标题与副标题上下排列 |

### 2.1 变量类型（Variant）

| 变量 | 说明 |
|------|------|
| default | 默认：纯币种图标 |
| multi-chain | 多链：主币种图标旁带链图标 |

---

## 3. 组件属性

### 3.1 默认样式

- 币种图标 + 币种名称（如 BTC）
- 支持单行/多行展示
- 可选副标题（Subtitle）

### 3.2 币种图标尺寸

| 尺寸 | 像素 | 说明 |
|------|------|------|
| 40 | 40px | 最大 |
| 36 | 36px | |
| 32 | 32px | |
| 28 | 28px | |
| 24 | 24px | |
| 20 | 20px | |
| 16 | 16px | 最小 |

### 3.3 带链币种图标间距与布局

**单行多链（single-row / coin-chain-single-row + multi-chain）**：链图标叠加于主币种右下角，非并排。

| 类型 | 布局 | 链图标 |
|------|------|--------|
| single-row + multi-chain | 叠加（右下角） | 见 3.3.1 |
| coin-chain-single-row | 叠加（右下角） | 见 3.3.1 |
| multiple-row | 并排 | 间距 6px |
| coin-chain-multiple-row | 并排 | 间距 4px |

#### 3.3.1 单行多链 Web 样式与尺寸

> Figma：[单行多链 Web](https://www.figma.com/design/K2bAa3NONOe35GMd6GIrrb/AI-%E8%AE%AD%E7%BB%83?node-id=75-8731&t=WrFEIns94M6foGfs-4)

链图标叠加于主币种右下角，带 1px 白边（`var(--bg-primary)`），尺寸如下：

| 主图标 | 链图标 |
|--------|--------|
| 40px | 14px |
| 36px | 14px |
| 32px | 14px |
| 28px | 13px |
| 24px | 11px |
| 20px | 10px |
| 16px | 7px |

#### 3.3.2 单行多链 H5 样式与尺寸

> Figma：[单行多链 H5](https://www.figma.com/design/K2bAa3NONOe35GMd6GIrrb/AI-%E8%AE%AD%E7%BB%83?node-id=75-8732&t=WrFEIns94M6foGfs-4)

与 Web 相同：叠加布局、链图标尺寸与白边一致。

### 3.4 币种图标来源

- **图标目录**：`icons/Currency Chain Icons/`
- **主币种图标**：`Chain_BTC.svg`、`Chain_ETH.svg`、`Chain_USDT.svg` 等
- **链图标**：同上，多链时使用 `Chain_默认链图标.svg` 作为默认

### 3.5 币种占位图标

| 原则 | 说明 |
|------|------|
| 第一原则 | 币种名称首字母占位（如 BTC → B） |
| 第二原则 | 获取不到币种名称时展示通用占位图 |
| 带链占位 | 币种带链时，主图标 + 链图标均可用占位 |

### 3.6 可配置描边

- **Web 端常用**：币种图标 `line-border-subtle`（1px 浅色描边）
- **可选**：`none` 无描边
- **实现**：使用伪元素 `::before` 绘制描边，`img` 填满整个图标区域，保证币种图标在描边内部完整填充

### 3.7 Web-H5 对应关系

| 尺寸 | Web 表现 | H5 表现 |
|------|----------|---------|
| 40px | 完整样式（图标+标题+副标题） | 完整样式（图标+标题+副标题） |
| 28px | 完整样式（图标+标题+副标题） | 完整样式（图标+标题+副标题） |
| 24px | 完整样式（图标+标题+副标题） | 完整样式（图标+标题+副标题） |
| 20px | 完整样式（图标+标题+副标题） | 完整样式（图标+标题+副标题） |

---

## 4. 排版规范

| 属性 | 取值 | 说明 |
|------|------|------|
| 字体 | Switzer | 遵循 Gate 设计系统，fallback `sans-serif` |
| 币种标题（Title） | Medium (500) | 主标题字重 |
| 副标题（Subtitle） | Regular (400) / Light (300) | 副标题字重 |
| 行高 | 与字号匹配；16px 标题时 21px | 保证图标与文字垂直居中 |
| 对齐方式 | 左对齐 | 图标与文字左对齐，文字垂直居中 |

### 4.1 字号与图标对应

| 图标尺寸 | 标题字号 | 标题行高 | 副标题字号 |
|----------|----------|----------|------------|
| 40px | 18px | — | 14px |
| 36px | 16px | 21px | 13px |
| 32px | 16px | 21px | 12px |
| 28px | 14px | — | 12px |
| 24px | 14px | — | 11px |
| 20px | 12px | — | 10px |
| 16px | 12px | — | 10px |

---

## 4.2 Table 专用（表格第一列）

Table 场景下 CoinTitle 的专用规格，与通用规格略有差异：

| 属性 | Table 专用 | 通用规格 |
|------|------------|----------|
| 图标尺寸 | 28px | 28px |
| 图标描边 | 无（`border="none"`） | Web 常用 subtle |
| 图标与文字间距 | 8px | 12px |
| 标题字号 | 16px | 14px |
| 标题字重 | Medium (500) | Medium (500) |
| 副标题字号 | 12px | 12px |
| 副标题字重 | Regular (400) | Regular (400) |

**多链场景**：链图标（小币种）与右侧文案间距 8px，通过 `coin-title--table` + `coin-title--chain-overlay` 时 `gap: 8px` 实现。

**实现**：Table 内通过 `.gate-table .coin-title` 覆盖样式，或使用 `className="coin-title--table"` 变体。

---

## 5. 特殊适配

### 5.1 阿语适配（RTL）

- 支持 RTL 布局，图标与文字顺序反转
- 文字方向从右到左，保持视觉对齐
- 使用 `dir="rtl"` 或 `direction: rtl`

### 5.2 颜色模式

| 模式 | 背景 | 图标与文字 |
|------|------|------------|
| 浅色 | 白底 | 品牌色/中性色 |
| 深色 | 黑底 | 自动反色适配，保持对比度 |

- 通过 `data-theme="light" | "dark"` 或 `colorMode` prop 控制

---

## 6. Props 定义

```tsx
<CoinTitle
  coin="BTC"
  chain="Bitcoin"           // 可选，多链场景使用
  size={40 | 36 | 32 | 28 | 24 | 20 | 16}
  type="single-row" | "multiple-row" | "coin-chain-single-row" | "coin-chain-multiple-row"
  variant="default" | "multi-chain"
  placeholder={boolean}     // 使用占位图标
  border="subtle" | "none"  // web 端常用 subtle
  direction="ltr" | "rtl"   // 阿语适配
  colorMode="light" | "dark" // 可选，默认跟随 data-theme
  subtitle="Subtitle text"  // 可选
  coinIcon={ReactNode}      // 可选，自定义币种图标
  chainIcon={ReactNode}     // 可选，自定义链图标（多链时）
  className={string}
/>
```

---

## 7. 使用示例

```tsx
import { CoinTitle } from './CoinTitle';

// 基础用法 - 单行
<CoinTitle coin="BTC" size={32} />

// 带副标题 - 多行
<CoinTitle
  coin="BTC"
  subtitle="Bitcoin"
  size={40}
  type="multiple-row"
/>

// 多链 - 带链图标
<CoinTitle
  coin="BTC"
  chain="Bitcoin"
  size={28}
  type="coin-chain-single-row"
  variant="multi-chain"
/>

// 占位图标（无真实图标时）
<CoinTitle coin="BTC" size={24} placeholder />

// Web 端描边
<CoinTitle coin="ETH" size={32} border="subtle" />

// 阿语 RTL
<CoinTitle coin="BTC" size={28} direction="rtl" />
```

---

## 8. 版本记录

| 版本 | 日期 | 说明 |
|------|------|------|
| 1.0 | 2025-03-15 | 初始版本，基于 Gate Coin Title Guidelines |
| 1.1 | 2025-03-15 | 主标题字重统一为 Medium (500)；描边实现：伪元素绘制、img 填满；Table 专用多链间距 8px |
