# Gate Earn Web 端理财首页

> 一站式数字资产理财平台 · 理财首页规范与实现说明

---

## 1. 页面结构总览

| 模块 | 说明 | 规范引用 |
|------|------|----------|
| **Header** | 导航栏，支持未登录/已登录两种状态 | [Header&Footer.md](../docs/Header%26Footer.md) |
| **Banner** | 标题区、Slogan、营销轮播 | [Banner.md](../docs/Banner.md) |
| **产品推荐区** | 产品卡片（Cards），支持标签 | 本文档 §3 |
| **交易市场** | 列表展示币种、预估年化、期限 | [Table.md](../docs/Table.md) |
| **理财计算器** | 我准备投资、预计收益（1920 下 1:1） | 本文档 §4 |
| **常见问题** | 折叠面板（Accordion） | [FAQ.md](../docs/FAQ.md) |
| **Footer** | 多列布局 | [Header&Footer.md](../docs/Header%26Footer.md) |

---

## 2. 核心布局与状态管理

### 2.1 页面结构

- Header（导航栏）
- Banner 区
- 产品推荐区（Cards）
- 交易市场（Table）
- 理财计算器
- 常见问题（FAQ）
- Footer

### 2.2 登录状态切换

| 状态 | Banner 展示 | 申购/跳转 | 理财计算器 |
|------|-------------|-----------|------------|
| **未登录** | 「立即登录」按钮（点击后 Header 切换为登录态） | 点击【申购】或跳转按钮时，强制拦截并跳转至登录页 | 可弹框，弹框内操作需重定向至登录 |
| **已登录** | Banner 默认仍展示「立即登录」按钮（仅 Header 已登录）；点击 Header 的 `Log In` 演示入口可切换为展示用户「我的持仓」「30日累计收益」「昨日收益」数据 | 正常跳转 | 正常使用 |

---

## 3. Banner 区域与营销组件

> 完整规范见 [Banner.md](../docs/Banner.md)，预览 [banner.html](../html/banner.html)。

### 3.1 标题 / Slogan

| 元素 | 文案 |
|------|------|
| 标题 | 理财首页 |
| 副标题 | 一站式数字资产理财平台 |

### 3.2 理财计算器

- 位置：交易市场下方，独立模块
- 包含：我准备投资、预计收益（左右两栏布局，按 1920 设计稿 1:1 还原）

### 3.3 营销轮播（Banner 小卡片）

规范：[Banner.md](../docs/Banner.md)

| 属性 | 规格 |
|------|------|
| 卡片尺寸 | 486×164px，背景 Bg/Secondary，圆角 20px |
| 主文案 | H6 600 24px，最多两行 |
| 副文案 | B8 400 14px，最多一行 |
| 插画 | 80×80px 右对齐 |
| 左右箭头 | 36×36px，突出 18px |
| 翻页器 | 36×4px，3 段，默认 line-border-strong、激活 bg-inverse-secondary |
| 自动翻屏 | 10 秒间隔 |

### 3.4 产品推荐区（Recommended）

| 属性 | 规格 |
|------|------|
| 标题 | Recommended |
| 区块间距 | 上内边距 60px，下内边距 120px |
| 卡片内边距 | 20px |
| 布局 | 横向滚动卡片（当前 8 张），左右箭头导航（右箭头 hover 显示；左箭头默认隐藏，向右滚动后在 hover 时显示） |
| 卡片结构 | 币种图标+名称+副文案（首卡为 Simple Earn｜Flexible）、期限（部分卡片）、APR、Est. APR、Subscribe 按钮 |
| 标签 | 首卡 APR 后展示 Bonus（16px 档），BTC 卡 APR 后展示 VIP（20px 档） |
| 示例 | USDT（Simple Earn｜Flexible）3.65%、TRX（Fixed）15.68%、BTC（Dual Investment）80.00%、GT（Simple Earn｜Flexible）5.00%、ETH 60 Days 12.50%、SOL 90 Days 9.20%、DOGE 30 Days 18.30%、XRP Flexible 7.80% |

---

## 4. 理财计算器（Investment Calculator）

### 4.1 UI 结构

页面内模块（交易市场下方）为左右两栏（1920 下 1:1）：

 - 有效内容区域宽度：**1200px**（模块整体居中）

1. **我准备投资（左侧）**：
   - 容器宽度：**480px**
   - 输入条：placeholder 为 `Min. 1`；默认填入 `1642`
   - 右侧币种选择（默认 BTC，带图标），下方展示 `Available 4.2323 BTC`
   - 按钮：黑色按钮文案为 `Calculate`；按钮与 `Available` 的垂直间距为 **48px**
   - 分割线：左侧模块右侧有 1px 竖线，距离内容区右侧 48px，颜色 `Line/Divider/Divider`（`--line-divider`）
2. **预计收益（右侧）**：
   - 容器宽度：**634px**
   - 顶部展示 `预计收益 +139.52 USDT`（绿色）
   - 图表：折线面积图（SVG，634×123），含 1/2/3 年节点与虚线引导
   - 年限切换：图表下方为灰底胶囊 `1 Year / 2 Years / 3 Years`（固定宽度 59/65/65px），点击切换联动收益与图表
   - 免责声明：文字颜色统一为 `Text/Text-Tertiary`，不对“随时”做特殊处理
   - 间距：免责声明与图表间距 16px

补充间距（1920 下实现）：
- 计算器内容区底部留白：`padding-bottom: 40px`

### 4.2 收益计算公式

**基础收益（单利）：**
$$第一年 = 投资数量 \times (1 + 基础年化)$$

**复利逻辑：**
$$第n年 = 投资数量 \times (1 + 基础年化)^n$$

**带额外奖励收益：**
$$第一年 = (基础数量 \times (1 + 基础年化)) + (额外奖励数量 \times (1 + 额外奖励年化))$$

*注：奖励币种若非本币，需按当前汇率换算。*

### 4.3 交互

- 输入框：placeholder 为 `Min. 1`，输入后联动右侧预估收益数值
- 币种：右侧币种按钮循环切换（BTC/USDT/ETH），同时更新收益单位展示
- 年限：点击图表下方 `1 Year / 2 Years / 3 Years` 灰底胶囊切换，联动收益计算
- 图表节点：节点 hover 可展示对应年份收益 tooltip（可点击节点切换年限）

---

## 5. 业务组件

### 5.1 交易市场

- 顶部为 56px Tabs：**简单理财**（默认激活） / **结构化理财**（无下划线指示条）
- Tab 文案字重字号：`H6 600 24px`
- 简单理财 Tab 顶部工具栏位于与 Tabs 同一行右侧，整体居中对齐：`Match my Assets` 复选框、`产品类型` 下拉（210px×40px）、`Search` 搜索输入（210px×40px，左侧 CEX_Search 16×16 图标，颜色 `Icon/Icon-Quaternary`），背景色均为 `Cmpt/Input`（`--cmpt-input`）
- `Match my Assets` 前复选框：未选中为边框 `Line/Border/Strong`，选中后使用 `assets/checkbox-16px.svg`（GTCheckboxV5/item-16px 设计）
- `产品类型` 下拉样式遵循 [Select.md](../docs/Select.md) `DropdownV5-web` 规范（宽度 210px、Medium 40px、B7 500 14px、圆角 6px、水平内边距 8px、右侧 16px chevron），无描边
- Tabs 与 Table 区域下划线均移除（不显示底部分割线/行分割线）
- 表头（英文）：`Coin` / `Est. APR` / `Term (Days)` / `Action`
- 表格第一列：遵循 [CoinTitle.md](../docs/CoinTitle.md) 规范，币种图标 36px，图标与文字间距 8px，标题 18px/500、行高 130%，副文案 12px/500、行高 130%
- 行数据（14 行）：BTC、USDT、ETH、GT、SOL、DOGE、AVAX、BNB、DOT、LTC、SHIB、ENA、MEW、RADAR
- APR 与期限：统一展示 `2.34%~12.07%`、`Flexible/Fixed`
- 标签：BTC 行展示 `VIP + Bonus`，USDT 行展示 `VIP + Bonus`，ETH 行展示 `Bonus`，AVAX 行展示 `New`
- BTC 行展示余额文案：`Balance 321.45251512`
- 操作列为下拉箭头图标（Chevron Down）
- 表格分页：每页展示 7 行（其余隐藏），当前数据共 14 行，因此共 2 页
- 底部分页：根据页数动态展示页码（本页为 `1、2`），左右箭头用于切换上一页/下一页

- 结构化理财 Tab：
  - 二级 Tabs：`Dual Investment` / `Smart Leverage`
  - 二级 Tabs 样式：`Capsules-36`，引用 `src/styles/components/tabs.css` 组件库
  - 路径：`<link rel="stylesheet" href="../src/styles/components/tabs.css" />`
    - 选中态：背景 `--cmpt-button-soft`（#F5F6F7），字色 `Text-Primary`
    - Hover：背景 `--cmpt-button-soft-hover`，字色 `Text-Primary`
  - Dual Investment 表头：`Coin` / `Est. APR` / `Target Price` / `Action`
    - 行示例：BTC、ETH、GT（含 `VIP Included + Bonus`）、XRP（含 `Bonus + New`）、SOL、DOGE、AVAX
    - 分页：底部展示静态样式 `< 1 ... 4 5 6 7 8 ... 20 >`（当前页 6）
  - Smart Leverage 表头：`Coin` / `Leverage` / `Break-Even Price` / `Action`
    - 行示例：XRP、BTC、DOGE、ETH、AVAX、GT、SOL
    - 分页：底部展示静态样式 `< 1 ... 4 5 6 7 8 ... 20 >`（当前页 6）

### 5.2 常见问题（FAQ）

- 形式：折叠面板（Accordion）
- 规范：完全遵循 [FAQ.md](../docs/FAQ.md)
- 标题：`FAQ`
- 问题：
  - 什么是Gate理财?
  - Gate理财有哪些产品类型?
  - 用户如何通过Gate理财赚取收益?
  - 用户投资Gate理财需要注意什么?
- 说明：页面已删除 `More Details` 按钮
- 区块下内边距：`padding-bottom: 140px`

---

## 6. 视觉规范

### 6.1 主题

- 默认：Light
- 可切换：Dark（`data-theme="dark"`）
- 颜色：全部使用 [Color.md](../docs/Color.md) CSS 变量

### 6.2 标签系统

当前页面展示彩色 Label，按 [Tag.md](../docs/Tag.md) 理财打新标签规则实现（20px 档）：

| 标签 | 说明 |
|------|------|
| VIP | 引用 `assets/vip-16px.svg` 切图，16px/20px 档 |
| Bonus | 背景 `#8ffcde`，字色 `#080200`，Switzer 12px 500，行高 1.3 |
| New | 背景 `#a7f757`，字色 `#080200`，Switzer 12px 500，行高 1.3 |

通用规格：高度 20px，内边距 2px 4px，圆角 2px。

### 6.3 响应式

- 适配 Web 端
- 大屏下 Banner 左右布局美观
- 推荐卡片采用自适应宽度：`calc((100% - 48px) / 4)`，随页面变窄自动缩小并保持一行 4 张完整展示

---

## 7. 组件引用汇总

| 组件 | 规范文档 | 路径 |
|------|----------|------|
| Header / Footer | [Header&Footer.md](../docs/Header%26Footer.md) | 切图 Slicing/Header，图标 icons/ |
| Banner | [Banner.md](../docs/Banner.md) | html/banner.html |
| Table | [Table.md](../docs/Table.md) | src/components/Table/ |
| FAQ | [FAQ.md](../docs/FAQ.md) | src/components/FAQ/ |
| Button | [Button.md](../docs/Button.md) | — |
| Tag | [Tag.md](../docs/Tag.md) | — |
| Color | [Color.md](../docs/Color.md) | src/styles/color-tokens.css |

---

## 8. 文件结构

```
Earn-web/
├── README.md          # 本文档
├── index.html         # 理财首页 HTML
├── assets/            # 图标与切图（checkbox-16px.svg、left.svg、right.svg 等）
└── src/
    └── components/    # 页面专用组件（如有）
```

---

**文档版本：** 1.0 · 2025-03-17
