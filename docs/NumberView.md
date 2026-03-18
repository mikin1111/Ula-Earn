# NumberView 组件规范

> 基于 Gate NumberView Guidelines，Web + H5 一体化数字展示组件。

**预览页：** [demo-number-view.html](../html/demo-number-view.html)

---

## 1. 组件基础信息

| 项目 | 说明 |
|------|------|
| 组件名称 | NumberView |
| 适用场景 | 金融场景下金额、余额、价格等数值展示 |
| 设计来源 | Gate NumberView Guidelines（Web + H5 双端规范） |
| 核心目标 | 统一 Web 与 H5 视觉表现，保证跨端一致性与可读性 |

---

## 2. 组件类型与尺寸

### 2.1 组件类型

| 类型 | 说明 |
|------|------|
| default | 纯数字 + 单位 |
| subtitle | 主数字下方带副标题 |
| subtitle-next | 副标题紧随主数字后（同行） |
| underline | 主数字下方带下划线 + 副标题 |
| subtitle-icon | 副标题带图标（如涨跌箭头） |

### 2.2 尺寸级别（Figma node-id=52-2429）

| 尺寸 | Web 主数字 | H5 主数字 | 说明 |
|------|-----------|----------|------|
| xl | 48px | 24px | 超大 |
| lg | 40px | 24px | Large |
| md | 32px | 24px | Medium（默认） |
| sm | 24px | 24px | Small |
| xs | 20px | 20px | 正文强调 |
| xxs-16 | 16px | 16px | 小号 |
| xxs | 14px | 14px | 最小（H5 最小 12px） |

**Figma 设计稿**：[NumberView Web-H5 对应关系](https://www.figma.com/design/K2bAa3NONOe35GMd6GIrrb/AI-%E8%AE%AD%E7%BB%83?node-id=52-2429)

### 2.3 对齐方式

- **left**：左对齐（默认）
- **middle**：居中对齐
- **right**：右对齐

---

## 3. 视觉属性

- **主数字**：大号、加粗（600），带千分位分隔符
- **小数部分**：与主数字同字号或稍小
- **单位**：与主数字同字重（600），置于主数字右侧，颜色 Text-Primary
- **Subtitle 变体**：主数字与副标题间距为 0
- **颜色模式**：浅色/深色自动适配 `data-theme`

---

## 4. Subtitle 变量

| 变量 | 语义 | CSS Token |
|------|------|-----------|
| primary | 强调 | --text-brand |
| secondary | 次要 | --text-secondary |
| success | 成功/涨 | --text-success |
| warning | 警告 | --text-warning |
| danger | 危险/跌 | --text-error |

---

## 5. 敏感态（Sensitive）

- 使用脱敏字符 `*` 替换数字
- 保留逗号、小数点符号
- 字体大小、颜色与正常态一致

---

## 6. 交互

- **点击复制**：传入 `copyable` 或 `onClickCopy` 启用，hover 显示「点击复制」tooltip，复制成功后显示 Toast

---

## 7. 阿语适配（RTL）

- 阿拉伯语环境下，副标题「نص فرعی」右对齐显示
- 数字保持西文格式（86,139.52），使用 `dir="ltr"` 保证千分位与小数点正确
- 支持带眼睛图标的副标题变体（敏感态切换）

---

## 8. Props 定义

```tsx
<NumberView
  value={number}
  unit="USDT"
  size="xl" | "lg" | "md" | "sm" | "xs" | "xxs-16" | "xxs"
  align="left" | "middle" | "right"
  variant="default" | "subtitle" | "subtitle-next" | "underline" | "subtitle-icon"
  subtitle="..."
  subtitleVariant="primary" | "secondary" | "success" | "warning" | "danger"
  subtitleIcon={ReactNode}
  sensitive={boolean}
  hideDecimalZero={boolean}
  decimalPlaces={number}
  locale="en" | "zh"
  copyable={boolean}
  onClickCopy={() => void}
/>
```

---

## 9. 使用示例

```tsx
import { NumberView, NumberViewArrowUp } from './NumberView';

// 基础用法
<NumberView value={86139.52} unit="USDT" />

// 带副标题
<NumberView
  value={86139.52}
  unit="USDT"
  variant="subtitle"
  subtitle="可用余额"
  subtitleVariant="secondary"
/>

// 带图标（涨）
<NumberView
  value={86139.52}
  unit="USDT"
  variant="subtitle"
  subtitle="+123.45%"
  subtitleVariant="success"
  subtitleIcon={<NumberViewArrowUp />}
/>

// 敏感态 + 点击复制
<NumberView
  value={86139.52}
  unit="USDT"
  sensitive
  onClickCopy={() => console.log('copied')}
/>
```

---

## 10. 版本记录

| 版本 | 日期 | 说明 |
|------|------|------|
| 1.0 | 2025-03-13 | 初始版本，基于 Gate NumberView Guidelines |
| 1.1 | 2025-03-13 | 补充 xxs-16 尺寸、copyable 属性、Subtitle 间距 0、Props 与实际实现对齐 |
| 1.2 | 2025-03-16 | 尺寸表与 demo-number-view.html 样式对齐（Web/H5 主数字字号） |
