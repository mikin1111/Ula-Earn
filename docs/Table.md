# Table 组件规范

> Gate.io Design System · Table 数据表格组件（Web 端）
>
> **设计来源**：Gate Table Guidelines Web
>
> **Figma 设计稿**：[AI 训练 · Table 组件](https://www.figma.com/design/K2bAa3NONOe35GMd6GIrrb/AI-%E8%AE%AD%E7%BB%83?node-id=59-13612&t=ToO1NLrhzmj3NaIz-4)
>
> **Related files**：
> - Component: `src/components/Table/Table.tsx`（待实现）
> - Styles: `src/components/Table/Table.css`
> - Demo: `html/demo-table.html`、`src/components/Table/demo.html`
> - Icons: 箭头（demo 内联 SVG）、币种 `icons/Currency Chain Icons/Chain_*.svg`
> - 第一列币种：`src/components/CoinTitle/`（遵循 `docs/CoinTitle.md` Table 专用 4.2 节）
> - 颜色：`docs/Color.md`，通过 `color-tokens.css` 引入

---

## 1. 组件基础信息

| 项目 | 说明 |
|------|------|
| 组件名称 | Table（数据表格组件） |
| 适用场景 | 金融场景下的列表数据展示（资产、订单、交易对、策略等） |
| 设计来源 | Gate Table Guidelines Web |
| 核心目标 | 保证数据可读性、交互一致性与视觉规范对齐 |

---

## 2. 表头规范

### 2.1 尺寸与文字

**两行表头**（主表头 + 副表头）：

| 行 | 属性 | 规格 | 说明 |
|----|------|------|------|
| 第一行 | 文字字号 | 14px（B8） | 字重 400 |
| 第一行 | 文字颜色 | `--text-secondary` | Text/Text-Secondary |
| 第二行 | 文字字号 | 12px | 字重 400 |
| 第二行 | 文字颜色 | `--text-secondary` | Text/Text-Secondary |
| 表头高度 | 32px / 40px / 56px | 按场景选择 |

**单行表头**（无副表头时）：表头文字 16px 400 `--text-primary`，与表体一致。演示见 `html/demo-table.html`。

### 2.2 样式类型

| 类型 | 说明 |
|------|------|
| Divider | 分割线样式 |
| Underline | 下划线样式 |
| Checkbox | 复选框样式 |
| Sort | 排序样式 |
| Action | 操作样式 |

### 2.3 各场景展示规则

| 场景 | 规则 |
|------|------|
| 常规展示 | 默认左对齐，数字列右对齐（未来支持） |
| 数据说明（链接） | 添加下划线链接 Text-3，hover 出现气泡进行说明 |
| 数据说明（超长） | 超出字数用 "..."，hover 气泡展示全部内容 |
| 多选与链接 | 复选框 16px |
| 特殊情况 | 垂直取中间 2px，上下无间距 |

---

## 3. 内容/场景规范

### 3.1 行高与样式

| 属性 | 规格 | 说明 |
|------|------|------|
| 内容字号 | 16px | 表体主文案，字重 400 |
| 行高 | 40px / 80px / 100px | 按场景选择，40px 紧凑 |
| 默认背景 | `--bg-primary` | 默认-bg1 |
| Hover 背景 | `--bg-secondary` | Hover-bg2 |
| 圆角 | 0px | 表格行无圆角 |

### 3.2 无分割线 vs 有分割线

| 样式 | Hover 状态 | 垂直 Padding |
|------|------------|--------------|
| 无分割线 | ✓ | 16px |
| 有分割线 | ✓ | 0px |

### 3.3 内容场景类型

| 类型 | 规格 | 说明 |
|------|------|------|
| 币种标题（第一列） | 遵循 `docs/CoinTitle.md` **Table 专用**（4.2 节），multiple-row，28px 图标无描边，图标与文字间距 8px，16px 标题字重 500，12px 副标题 |
| 头像/缩略图/图片 | 12/14/16px 多字段组合，特殊字段 18px 高清展示 |
| 文本类 | 文字、涨跌额、带单位数字段落等 |
| 链接类 | 底部下划线 `text-decoration: underline`，支持点击跳转 |
| 数据情况 | 可变高度，最多 2 行，超出 "..."，hover 气泡展示全部；支持字段排序、字段隐藏 |
| 文字+其他元素 | Tag-20px、Icon-16px，文字与标签/图标间距 8px，可组合 Checkbox |
| Mini 走势图/曲线 | 高度 40px |
| 负号/勾选类 | Medium-20px |
| 操作类 | 按钮/文字按钮/icon；文字按钮 90px，最多 3 个，超出用 80px 展开按钮 |
| **操作区（Action 列）** | 买入：Primary（`docs/Button.md` XSmall 32px）；交易：文字链接无下划线字重 500；箭头：20px `--icon-primary`；按钮间距 12px |

### 3.4 对齐规则

| 内容类型 | 对齐方式 |
|----------|----------|
| 文本类 | 左对齐（默认） |
| 数字类 | 右对齐 |
| 操作类 | 右对齐 |

---

## 4. 表单场景规范

### 4.1 展开收起

- 支持展开收起（可与多级表单组合使用）
- 强引导操作：一级 blue 按钮（`--bg-brand`）

### 4.2 固定操作区

- 支持固定操作区（最右侧一列）
- 展示部分关键字段，点击后弹出弹窗进行字段说明
- 重要操作：一级 black 按钮（`--bg-always-black`）

### 4.3 分页展示

- 支持分页展示，单页展示条数根据具体场景
- 分页与 Tabs 居中对齐
- 页数过多时：首尾页必展示，中间最多 3 个页码 + 首尾「...」

### 4.4 列操作

| 功能 | 说明 |
|------|------|
| 列首操作 | 多选/批量/批量编辑，支持添加自选 |
| 基础操作 | 二级 Gray/Line 按钮，文字 Text 按钮 |

---

## 5. 模块间距规范

标题 + Tabs + Dropdown/Checkbox 场景：

- 模块之间间距严格遵循设计稿标注
- 顶部标题与筛选区、筛选区与表格之间保持规范间距

---

## 6. 交互规范

| 交互 | 说明 |
|------|------|
| **排序** | 点击表头排序图标，触发升序/降序/默认排序 |
| **筛选** | 支持表头筛选、全局筛选，hover 显示筛选选项 |
| **多选** | 表头全选复选框，行级复选框，支持批量操作 |
| **展开/收起** | 点击行前展开图标，展示子级/详情内容 |
| **Hover 态** | 行 hover 时背景色切换为 bg2，文字/链接高亮 |
| **点击操作** | 操作按钮/链接点击后触发对应业务逻辑 |
| **分页交互** | 支持页码切换、每页条数选择、跳转到指定页 |

---

## 7. 颜色 Token

> **引用规范**：`docs/Color.md`（Color V5.1）
>
> 所有颜色均使用 Color.md 定义的 CSS 变量，通过 `color-tokens.css` 引入。

| 用途 | CSS 变量 | Color.md 对应 |
|------|----------|---------------|
| 表头文字 | `--text-secondary` | §1 Text/Text-Secondary |
| 表体文字 | `--text-primary` | §1 Text-Primary |
| 数据说明链接 | `--text-tertiary` | §1 Text-Tertiary |
| 默认行背景 | `--bg-primary` | §2 Bg-Primary |
| Hover 行背景 | `--bg-secondary` | §2 Bg-Secondary |
| 分割线 | `--line-divider` | §3 Line-Divider |
| 链接默认 | `--text-brand` / `--link-default` | §1 Text-Brand / §4 Link |
| 链接 Hover | `--link-hover` | §4 Link |
| 涨色 | `--text-success` | §1 Text-Success |
| 跌色 | `--text-error` | §1 Text-Error |
| 操作区箭头 | `--icon-primary` | §6 Icon-Primary |
| 操作按钮 | 遵循 `docs/Button.md` | §8 Cmpt Color |

---

## 8. Props 定义

```tsx
interface TableColumn<T = any> {
  key: string;
  title: ReactNode;
  dataIndex?: keyof T | string;
  align?: 'left' | 'right' | 'center';
  width?: number | string;
  fixed?: 'left' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  ellipsis?: boolean;
  tooltip?: boolean;
  render?: (value: any, record: T, index: number) => ReactNode;
}

interface TableProps<T = any> {
  columns: TableColumn<T>[];
  dataSource: T[];
  rowKey: string | ((record: T) => string);
  headerHeight?: 32 | 40 | 56;
  rowHeight?: 40 | 80 | 100;
  headerStyle?: 'divider' | 'underline' | 'checkbox' | 'sort' | 'action';
  rowStyle?: 'default' | 'divider';
  align?: 'left' | 'right' | 'center';
  expandable?: {
    expandedRowRender: (record: T, index: number) => ReactNode;
    expandIcon?: (props: { expanded: boolean; onExpand: () => void }) => ReactNode;
  };
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize?: number) => void;
  };
  selection?: {
    selectedRowKeys: (string | number)[];
    onChange: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void;
  };
  operations?: ReactNode[];
  fixedOperations?: boolean;
}
```

### 使用示例

```tsx
<Table
  columns={columns}
  dataSource={data}
  rowKey="id"
  headerHeight={40}
  rowHeight={80}
  headerStyle="divider"
  rowStyle="default"
  expandable={{ expandedRowRender: (record) => <DetailPanel record={record} /> }}
  pagination={{ current: 1, pageSize: 20, total: 100, onChange }}
  selection={{ selectedRowKeys, onChange }}
  operations={[<Button>操作1</Button>, <Button>操作2</Button>]}
/>
```

---

## 9. 尺寸对照（Web 统一）

| 尺寸 | 行高/表头 | 说明 |
|------|-----------|------|
| xl | 56px | 表头大尺寸 |
| lg | 40px | Large |
| md | 32px | Medium |
| sm | 24px | Small |
| xs | 20px | 最小 |

行高：100px（大）、80px（中）、40px（紧凑）

---

## 10. Demo 结构（与 HTML 一致）

Demo HTML 包含以下模块，须与本文档规范完全一致：

| 模块 | 内容 |
|------|------|
| 基础表格 | 表头 Divider 样式，行 Hover 切换 bg2，文本和数字左对齐，操作右对齐 |
| 表头规范 | ① 尺寸：第一行 B8 14px/400 色 --text-secondary，第二行 12px/400 色 --text-secondary；② 高度：32/40/56px；③ 样式：Divider · Underline · Checkbox · Sort · Action |
| 分页展示 | 单页/两页/三页/四页/五页/页数过多（含省略） |
| 控制项 | 主题、表头高度、行高（40/80/100px）、行样式（无分割线/有分割线） |

---

## 11. 版本记录

| 版本 | 日期 | 说明 |
|------|------|------|
| 1.0 | 2025-03-13 | 初始版本，基于 Gate Table Guidelines Web |
| 1.1 | 2025-03-13 | 表头两行：第一行 12px/400，第二行 16px/400；CoinTitle Table 专用；Related files 更新 |
| 1.2 | 2025-03-13 | 补充第二行文字颜色、操作区规格、行高 40px、rowHeight Props |
| 1.3 | 2025-03-17 | 颜色引用 docs/Color.md；补充 Demo 结构、分页规则，确保 MD 与 HTML 一致 |
| 1.4 | 2025-03-17 | 表体主文案字号 14px → 16px |
| 1.5 | 2025-03-17 | 表头第一行字号 12px → B8 14px，字重 400 |
| 1.6 | 2025-03-17 | 表头第二行 16px/--text-primary → 12px/400 --text-secondary |

---

## 12. 分页展示（Demo）

用于验证「§4.3 分页展示」的布局规则（居中、过多页码省略）。示例 HTML 结构如下（与 `Earn-web/index.html` 保持一致）：

```html
<div class="earn-market-pagination" aria-label="pagination">
  <button type="button" class="earn-market-page" aria-label="Previous">
    <img class="earn-market-page-icon" src="assets/left.svg" alt="" />
  </button>
  <button type="button" class="earn-market-page">1</button>
  <span class="earn-market-ellipsis" aria-hidden="true">...</span>
  <button type="button" class="earn-market-page">4</button>
  <button type="button" class="earn-market-page">5</button>
  <button type="button" class="earn-market-page is-active" aria-current="page">6</button>
  <button type="button" class="earn-market-page">7</button>
  <button type="button" class="earn-market-page">8</button>
  <span class="earn-market-ellipsis" aria-hidden="true">...</span>
  <button type="button" class="earn-market-page">20</button>
  <button type="button" class="earn-market-page" aria-label="Next">
    <img class="earn-market-page-icon" src="assets/right.svg" alt="" />
  </button>
</div>
```
