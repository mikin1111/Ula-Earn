# Capsules-36 Tab 组件规格

## 文档说明

本文档从 [docs/Tabs.md](./Tabs.md) 中提取 **Capsules-36** 胶囊式 Tab 组件的完整规格，供开发与设计对齐使用。

**设计稿来源：** [Web/H5 映射 - Figma](https://www.figma.com/design/yyvB1Mer7aG8cJx9JVTVZL/%E6%B5%8B%E8%AF%95V5.1-Web-H5%E7%BB%84%E4%BB%B6%E5%BA%93?node-id=21644-18412)

**预览页：** [tabs.html](../html/tabs.html) 第 11 节「Web 与 H5 尺寸对应」

---

## 1. 组件定位

| 说明 |
|------|
| **Capsules-36** 是 Tabs 组件的**胶囊式（Capsules）**变体，高度为 **36px**。 |
| 选中态为浅灰背景的圆角胶囊形状，与「Dual Investment」「Smart Leverage」等二级导航场景一致。 |
| 属于 **Web 专属** 尺寸，**无 H5 对应**。 |

---

## 2. 尺寸与样式

| 属性 | 取值 | 说明 |
|------|------|------|
| **高度** | `36px` | Tab 项行高 |
| **水平内边距** | `0 16px` | 左右各 16px |
| **圆角** | `4px` | `border-radius: 4px`（小圆角） |
| **字号** | `14px` | 与默认档一致 |
| **字重** | `500 (Medium)` | Switzer Medium |
| **Tab 间距** | `4px` | 选项之间 `gap: 4px`（Capsules 类型，Figma 21644:18412，与 H5 Capsules 一致） |

---

## 3. 颜色与状态

| 状态 | 背景 | 字色 |
|------|------|------|
| **选中 (Active)** | `var(--color-cmpt-button-soft)` (#F5F6F7) | `var(--color-text-text-primary)` (#070808) |
| **未选中 (Inactive)** | 透明 | `var(--color-text-text-secondary)` (#84888C) |
| **未选中悬停 (Hover)** | 透明 | `var(--color-text-text-tertiary)` (#A0A3A7) |
| **禁用 (Disabled)** | 透明 | `var(--color-text-text-disable)` (#C4C7CA) |

---

## 4. 演示示例

与图片中「Dual Investment」「Smart Leverage」一致的 Capsules-36 组件，可在 [html/Tabs-Capsules-36.html](../html/Tabs-Capsules-36.html) 查看 live 效果。

---

## 5. 实现要点 · HTML 结构

```html
<div class="tabs tabs--capsules tabs--capsules-36" role="tablist">
  <div class="tabs__list">
    <button type="button" class="tabs__item tabs__item--active">
      <span class="tabs__item-inner"><span class="tabs__label">Dual Investment</span></span>
    </button>
    <button type="button" class="tabs__item">
      <span class="tabs__item-inner"><span class="tabs__label">Smart Leverage</span></span>
    </button>
  </div>
</div>
```

---

## 6. 实现要点 · 核心样式

```css
.tabs--capsules.tabs--capsules-36 .tabs__item {
  height: 36px;
  min-height: 36px;
  padding: 0 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}

.tabs--capsules .tabs__item--active {
  background: var(--color-cmpt-button-soft);
  color: var(--color-text-text-primary);
}
```

---

## 7. 实现要点 · 与其他 Capsules 尺寸对比

| 类型 | 高度 | 水平 padding | 圆角 | 字号 |
|------|------|--------------|------|------|
| Capsules-40 | 40px | 16px | 4px | 14px |
| **Capsules-36** | **36px** | **16px** | **4px** | **14px** |
| Capsules-32 | 32px | 12px | 4px | 14px |
| Capsules-28 | 28px | 12px | 4px | 12px |

---

## 8. Web 与 H5 映射

| Web 类型 | H5 对应 | 说明 |
|----------|---------|------|
| Capsules-36 | — | **无 H5 对应**，仅 Web 端使用 |

---

## 9. 设计令牌速查

| 用途 | Token | Fallback |
|------|--------|----------|
| 选中背景 | `--color-cmpt-button-soft` | #F5F6F7 |
| 主文字/选中字色 | `--color-text-text-primary` | #070808 |
| 次要文字/未选字色 | `--color-text-text-secondary` | #84888C |
| 悬停字色 | `--color-text-text-tertiary` | #A0A3A7 |
| 禁用字色 | `--color-text-text-disable` | #C4C7CA |

---

## 10. 参考

- 主规范：[docs/Tabs.md](./Tabs.md)
- Figma 节点：21644:18412
- 预览：`html/tabs.html` 第 11 节
- **组件库 CSS**：`src/styles/components/tabs.css`（Earn-web 等页面通过 `<link rel="stylesheet" href="../src/styles/components/tabs.css" />` 引用）
