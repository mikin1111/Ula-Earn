# FAQ Accordion Specification

> Gate.io Design System · FAQ Component (Accordion)
>
> **Related files**:
> - Component: `src/components/FAQ/FAQ.tsx`
> - Styles: `src/components/FAQ/FAQ.css`
> - Demo: `html/faq-accordion.html`、`src/components/FAQ/demo.html`
> - Icons: `src/icons/faq.tsx`
> - 颜色：`docs/Color.md`，通过 `color-tokens.css` 引入

---

## 1. Overview

FAQ accordion displays frequently asked questions with:
- **Expand behavior**: Multiple items can be expanded at once (configurable via `allowMultiple`)
- **Light/Dark theme** support
- **RTL layout** (e.g. Arabic)
- **Font**: Switzer

**Structure** (from top to bottom):
- Module title "FAQ" (size-specific styling)
- Collapsible question items (Medium has dividers; Large/H5 have no dividers)
- Question title + chevron icon (^ expanded / v collapsed)
- Answer content (smaller font, multi-line)
- "More Details" link at bottom (centered, underlined, after all items)

---

## 2. Size Specifications

### 2.1 Large (Web)

| 属性 | 规格 |
|------|------|
| 内容宽度 | max-width 1200px |
| 模块标题 | H7 600 24px，下间距 40px |
| 问题标题 | 24px，行高 32px |
| 正文 | 16px，行高 1.6 |
| 触发器 | min-height 64px，padding-block 16px |
| 项间距 | 24px |
| 标题与正文间距 | 8px |
| 正文下间距 | 0 |
| More Details 上间距 | 40px |
| 箭头图标 | 20×20px |

### 2.2 Medium (Figma 68-19485)

| 属性 | 规格 |
|------|------|
| 内容宽度 | max-width 588px |
| 模块标题 | H4 600 32px，下间距 24px |
| 问题标题 | 16px，行高 21px |
| 正文 | 14px，行高 1.5 |
| 触发器 | padding-block 16px，展开后移除标题下 padding |
| 分割线 | 有（`--line-divider`） |
| 标题与正文间距 | 12px |
| 正文与分割线间距 | 16px |
| 正文下间距 | 0 |
| More Details 上间距 | 24px（默认） |
| 箭头图标 | 16×16px |

### 2.3 H5 (Figma 68-19490)

| 属性 | 规格 |
|------|------|
| 容器宽度 | 375px |
| 有效内容区 | 343px（padding-inline 16px） |
| 模块标题 | 28px Semibold，行高 36px，下间距 16px |
| 问题标题 | 16px，行高 21px，无上下 padding |
| 正文 | 14px，行高 1.5 |
| 标题与正文间距 | 12px |
| 正文下间距 | 0 |
| 项间距 | 16px |
| More Details | 14px |
| More Details 上间距 | 24px |
| 箭头图标 | 20×20px（继承） |

---

## 3. States

- **Collapse**: Collapsed state, chevron down (v)
- **Expand**: Expanded state, chevron up (^)

---

## 4. Animation

- **Easing**: Ease out `cubic-bezier(0, 0, 0.2, 1)`
- **Expand/Collapse**: `max-height` transition 0.35s

---

## 5. Color Tokens (Color V5.1)

| Purpose | CSS Variable | Description |
|---------|--------------|-------------|
| Title text | `--text-primary` | Question title |
| Body/Answer | `--text-secondary` | Answer content |
| Link | `--text-primary` | "More Details" link |
| Border | `--line-divider` | Dividers (Medium only) |

---

## 6. Usage

### React

```tsx
import { FAQ } from '@/components/FAQ';

<FAQ
  items={[
    {
      id: '1',
      question: 'This is a collapse title text',
      answer: 'Gate.io is a crypto exchange that supports...'
    }
  ]}
  moreDetails={{ text: 'More Details', href: '#' }}
  size="large"
  dir="ltr"
  allowMultiple={true}
/>
```

**Props**:
- `items`: FAQ 列表
- `title`: 可选，Large/Medium/H5 默认显示 "FAQ"
- `size`: `'large' | 'medium' | 'h5'`
- `allowMultiple`: 是否允许多项同时展开，默认 `true`
- `dir`: `'ltr' | 'rtl' | 'auto'`
- `moreDetails`: `{ text, href }` 底部链接

### Static HTML

See `src/components/FAQ/demo.html` for HTML structure and `initAccordion()` script.

### Demo 结构（与 HTML 一致）

| 模块 | 内容 |
|------|------|
| 控制项 | Theme（Light/Dark）、Size（Large/Medium/H5） |
| LTR · English | 模块标题 FAQ，5 个可折叠项，More Details 链接 |
| RTL · Arabic | 1 个阿拉伯语项，More Details 链接 |

---

## 7. Version History

| Version | Date | Notes |
|---------|------|-------|
| 0.1 | 2025-03-12 | Initial spec: Large/Medium, RTL, theme support |
| 0.2 | 2025-03-13 | English copy, 16px title, structure aligned with design |
| 0.3 | 2025-03-13 | More Details link at bottom (centered, underlined) |
| 0.4 | 2025-03-16 | H5 size, Medium Figma 68-19485, Large/Medium/H5 module title "FAQ", allowMultiple, Switzer font, dividers for Medium only |
