# Banner 组件规范（Figma 设计稿标准）

## 文档说明

本规范根据 Figma 设计稿 **AI 训练** 中的 **Banner** 组件**自上而下逐项提取**，精确描述 Banner 小卡片的尺寸、布局、营销轮播（Carousel）等规格，供开发与设计对齐使用。

**设计稿来源：**  
[Figma - AI 训练 · Banner](https://www.figma.com/design/K2bAa3NONOe35GMd6GIrrb/AI-%E8%AE%AD%E7%BB%83?node-id=79-6364)（节点 `79:6364`）

**预览页面：** [banner.html](../html/banner.html) 按规范展示 Banner 小卡片及营销轮播  
**预览插画：** [Earn-web/assets/banner-illustration.png](../Earn-web/assets/banner-illustration.png)

**字体引用：** [字阶组件规范](./Font.md)（主文案 H6 600 24px、副文案 B8 400 14px；预览 [font.html](../html/font.html)）  
**颜色引用：** [颜色 Token 规范](./Color.md)（本组件所有颜色须完全引用 Color.md 中的 CSS 变量；预览 [demo-color-tokens.html](../html/demo-color-tokens.html)）  
**间距引用：** [间距组件规范](./Spacing.md)（4px 基准，8、12、24、32px 等）

**组件名称：** Banner 小卡片（486×164px，含 SubMain、Main、插画区域、左右箭头、进度指示器）

---

## 1. 卡片尺寸与外观（Web）

| 属性 | 取值 | 说明 |
|------|------|------|
| **宽度** | `486px` | 固定宽度 |
| **高度** | `164px` | 固定高度 |
| **背景** | `var(--bg-secondary)` | Bg/Secondary，见 [Color.md](./Color.md) §2 |
| **圆角** | `20px` | 四角圆角 |
| **溢出** | `overflow: hidden` | 轮播内容裁剪 |

---

## 2. 单轮播项（Slide）内容结构（Web 尺寸）

| 元素 | 属性 | 取值 | 引用 |
|------|------|------|------|
| **图文有效区域（slide-body）** | 高度 | `96px` | 文案 + 插画区域，固定高度 |
| **文案区域** | 宽度 | `326px` | 固定宽度 |
| **副文案距卡片顶边** | `24px` | 文案区域上边距 |
| **副文案（SubMain）** | 字阶 | B8 400 14px | 见 [Font.md](./Font.md) B8 |
| **副文案** | 行高 | `130%` | `line-height: 1.3` |
| **副文案与主文案间距** | `12px` | 副文案下边距 |
| **副文案** | 颜色 | `var(--text-tertiary)` 或 `var(--text-secondary)` | 见 [Color.md](./Color.md) §1 |
| **副文案** | 行数 | 最多一行 | 超出 `...` |
| **副文案** | 截断 | `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` | 单行省略 |
| **主文案（Main）** | 字阶 | H6 600 24px | 字重 600，字号 24px |
| **主文案** | 行高 | `130%` | `line-height: 1.3` |
| **主文案** | 颜色 | `var(--text-primary)` | Color.md |
| **主文案** | 行数 | 最多两行 | 超出 `...` |
| **主文案** | 截断 | `-webkit-line-clamp: 2` + `text-overflow: ellipsis` | 两行省略 |
| **图文间距** | `32px` | 文案区域与插画区域之间的间距 |
| **插画区域** | 尺寸 | `80px × 80px` | 固定宽高，3D 图标/插图，右对齐 |
| **内边距** | `24px` | 与 [Spacing.md](./Spacing.md) 一致 |

---

## 3. 左右箭头按钮

| 属性 | 取值 | 说明 |
|------|------|------|
| **位置** | 与卡片重叠，垂直居中，突出 `18px` | 箭头伸入卡片 18px |
| **形状** | 圆形 | `border-radius: 50%` |
| **左箭头** | [arrow-left.svg](../Earn-web/assets/arrow-left.svg) | 36×36px |
| **右箭头** | [arrow-right.svg](../Earn-web/assets/arrow-right.svg) | 36×36px |
| **尺寸** | `36px × 36px` | 与 SVG 一致 |
| **显隐** | 默认隐藏，Hover 时显示 | Web 尺寸下，鼠标悬停轮播区域时出现两侧箭头 |
| **交互** | `cursor: pointer` | 点击切换上一张/下一张 |

---

## 4. 翻页器（Progress）

| 属性 | 取值 | 说明 |
|------|------|------|
| **位置** | 卡片底部居中 | 水平居中；内容区域底部到翻页指示器顶部垂直距离 `20px` |
| **容器** | 长条状浅灰背景 | `36px` 总长，`var(--line-border-strong)` |
| **分段** | 背景平均分为 3 段 | 每段 `12px` |
| **尺寸** | `36px × 4px` | 高 4px |
| **默认态** | `var(--line-border-strong)` | Line/Border/Strong |
| **激活态** | `var(--bg-inverse-secondary)` | 当前选中段落为深色 Bg/Inverse-Secondary |
| **圆角** | 首尾段外端 2px 圆角、激活段两端 2px 圆角 | 灰色背景中间段直角，仅激活段（深色块）两端大圆角 |
| **交互** | `cursor: pointer` | 点击左/中/右段落切换对应轮播项 |

---

## 5. H5 尺寸规格

| 属性 | 取值 | 说明 |
|------|------|------|
| **卡片尺寸** | `343px × 116px` | 固定宽高 |
| **圆角** | `8px` | 四角圆角 |
| **内边距** | `16px` | 上/下/左/右均为 16px |
| **图文有效区域** | 高 `72px` | 文案 + 插画区域 |
| **主文案（Main）** | H6 600 18px | 字重 600，字号 18px |
| **副文案（SubMain）** | B5 400 14px | 见 [Font.md](./Font.md) B5 |
| **主副间距** | `4px` | 主文案与副文案间距 |
| **插画区域** | `72px × 72px` | 固定宽高 |
| **图文间距** | `24px` | 文案区域与插画区域间距 |
| **内容区与翻页器间距** | `8px` | 内容区域（含标题、描述）底部到翻页指示器顶部的垂直距离 |
| **左右箭头** | 不展示 | H5 尺寸下隐藏两侧箭头 |

---

## 6. 业务数据

| 字段 | 说明 |
|------|------|
| **SubMain** | 副标题文案 |
| **Main** | 主标题文案 |
| **插画区域** | 80×80px，3D 图标/插图资源（如奖章等） |
| **跳转链接** | 整卡可点击跳转 |
| **权重排序** | 管理后台配置顺序 |
| **Light/Dark 插图** | 可选，主题切换时展示不同切图 |

---

## 7. 交互与行为

| 行为 | 规格 | 说明 |
|------|------|------|
| **自动翻屏** | 10 秒间隔 | 轮播自动切换 |
| **手动切换** | 点击左右箭头或进度指示器 | 切换至对应轮播项 |

---

## 8. 引用汇总

| 组件/资源 | 规范文档 | 路径/说明 |
|-----------|----------|-----------|
| 颜色 | [Color.md](./Color.md) | `--text-primary`、`--text-secondary`、`--text-tertiary`、`--bg-secondary`、`--bg-inverse-secondary`、`--line-border-strong`、`--icon-secondary` |
| 字体 | [Font.md](./Font.md) | 主文案 H6 24px、副文案 B8 14px |
| 间距 | [Spacing.md](./Spacing.md) | 8、12、24、32px |
| 圆角 | — | `20px` |

---

## 9. 校验清单

- [ ] **Banner 卡片 486px × 164px**、背景 Bg/Secondary、圆角 20px、无投影
- [ ] **文案区域宽度 326px**、副文案与主文案间距 12px、主文案 H6 600 24px 最多两行超出…、副文案 B8 400 14px 最多一行超出…
- [ ] 卡片内：SubMain 浅灰 + Main 粗体黑 + 图文间距 32px + 插画区域 80×80px
- [ ] 左右箭头 36×36px、arrow-left.svg / arrow-right.svg、与卡片重叠突出 18px、Web Hover 时显示
- [ ] 翻页器 36×4px、3 段各 12px、默认 line-border-strong、激活态 bg-inverse-secondary；Web 内容区与翻页器间距 20px
- [ ] 自动翻屏 10 秒、支持箭头与进度条手动切换
- [ ] **H5 卡片 343×116px**、圆角 8px、内边距 16px、主 H6 18px、副 B5 14px、插画 72×72、有效区高 72px、无左右箭头

---

**文档版本：** 1.0 · 2025-03-17  
**设计稿：** [Figma - AI 训练](https://www.figma.com/design/K2bAa3NONOe35GMd6GIrrb/AI-%E8%AE%AD%E7%BB%83?node-id=79-6364) 节点 `79:6364`
