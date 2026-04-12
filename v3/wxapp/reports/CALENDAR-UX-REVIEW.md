# 内容日历页面 UI/UX Design Review

> Review日期：2026-04-02
> Review对象：calendar.html
> Review标准：frontend-design skill + penpot-uiux-design

---

## 一、视觉设计 Review

### 1.1 整体布局 ⭐⭐⭐⭐ (4/5)

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 左侧日期+右侧任务双栏布局 | ✅ | 经典日历交互模式 |
| 日期列表宽度 | ⚠️ | 80px略窄，大字号可能溢出 |
| 任务卡片间距 | ✅ | 16px 统一间距 |
| TabBar 位置 | ✅ | 底部固定，符合移动端规范 |

**优点：**
- 左右分栏布局清晰，日期导航与任务内容一目了然
- 卡片使用圆角 + 左侧彩边，视觉层次分明
- 整体留白适中，呼吸感良好

**问题：**
- 日期列表在 80px 宽度下，"今天" 等中文字符可能拥挤

### 1.2 色彩系统 ⭐⭐⭐⭐⭐ (5/5)

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 品牌色一致性 | ✅ | #FA8C16 统一使用 |
| 任务类型色彩区分 | ✅ | 4种类型用4种颜色 |
| 功能色语义 | ✅ | 成功=绿色，警告=橙色，危险=红色 |
| 状态色区分 | ✅ | 已读/未读有明显区分 |

**优秀设计：**
```css
/* 左侧彩边设计 */
.task-card.type-house::before { background: var(--brand-primary); }  /* 橙色 */
.task-card.type-speech::before { background: #722ED1; }               /* 紫色 */
.task-card.type-content::before { background: var(--color-success); }   /* 绿色 */
.task-card.type-new::before { background: var(--color-danger); }       /* 红色 */
```

### 1.3 CSS 变量系统 ⭐⭐⭐⭐ (4/5)

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 变量定义完整 | ✅ | 间距、圆角、阴影、色彩齐全 |
| CSS 语法错误 | ⚠️ | 第33行有 `);` 多余括号 |
| 变量命名规范 | ✅ | 语义化命名 |
| transition 统一 | ✅ | 0.2s ease 统一 |

**语法错误：**
```css
/* 第33行错误 */
font-family: var(--font-family);  /* 多了 ); 应该是 ) */
```

### 1.4 字体排版 ⭐⭐⭐⭐ (4/5)

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 字体族定义 | ✅ | 完整的中文字体栈 |
| 字号层级 | ✅ | 17/15/14/12/11px 清晰层级 |
| 行高设置 | ✅ | 1.5 合理 |
| 文字颜色对比 | ✅ | 标题/正文/次要色区分 |

---

## 二、交互体验 Review

### 2.1 日期选择 ⭐⭐⭐⭐ (4/5)

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 日期列表横向滚动 | ✅ | 上下滚动切换日期 |
| 今日标识 | ✅ | 红点 + "今天" 文字 |
| 选中状态 | ✅ | 橙色背景高亮 |
| 点击反馈 | ✅ | active 态缩放 |

**优秀设计：**
```css
.date-item.today::before {
    content: '';
    position: absolute;
    top: 8px;
    right: 8px;
    width: 6px;
    height: 6px;
    background: var(--color-danger);
    border-radius: 50%;
}
```

**问题：**
- 日期列表只有下边框分割，颜色与背景相同（`var(--color-bg)`），分割感较弱

### 2.2 任务筛选 ⭐⭐⭐ (3/5)

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 筛选 Chip 设计 | ⚠️ | 胶囊按钮，但激活态不统一 |
| 筛选交互 | ✅ | 点击切换，视觉反馈 |
| 分类数量 | ✅ | 显示各类型数量 |

**问题：**
```javascript
// house 类型的激活态需要特殊处理
.filter-chip.house { border: 1px solid var(--brand-primary); color: var(--brand-primary); }
.filter-chip.house.active { background: var(--brand-primary); color: white; }
// 但 filterTasks() 函数没有正确处理这个逻辑
```

### 2.3 任务卡片 ⭐⭐⭐⭐ (4/5)

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 卡片信息层次 | ✅ | 类型→标题→描述→元信息→操作 |
| 进度条展示 | ✅ | 直观显示完成度 |
| 点击反馈 | ✅ | scale(0.99) 轻微缩放 |
| 左侧彩边 | ✅ | 一眼区分任务类型 |

**优点：**
- 任务状态（进行中/待执行/已完成）用 Tag 清晰标识
- 截止时间用警告色提醒
- 进度条直观展示完成度

**问题：**
- 所有卡片点击都是 `showToast()`，没有实际跳转
- 卡片内的操作按钮（如"去创作"）也应该能点击跳转

### 2.4 通知面板 ⭐⭐⭐⭐ (4/5)

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 通知入口 | ✅ | 铃铛图标 + 红点数字 |
| 面板 Slide-up | ✅ | 底部弹起动画 |
| 分类 Tab | ✅ | 5种分类筛选 |
| 已读/未读区分 | ✅ | 圆点颜色 + 透明度 |
| 点击跳转 | ✅ | 实现跳转到对应页面 |

**优秀设计：**
```javascript
// 点击通知后更新已读状态并跳转
function clickNotify(id) {
    const notify = notifications.find(n => n.id === id);
    if (notify) {
        notify.isRead = true;
        hideNotifyPanel();
        if (notify.link) {
            window.location.href = notify.link;
        }
    }
}
```

---

## 三、可访问性 Review

### 3.1 Focus 样式 ⭐⭐ (2/5)

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 按钮 Focus | ❌ | 无 outline 样式 |
| 链接 Focus | ❌ | 无可视 Focus 指示 |
| 键盘导航 | ❌ | 未实现 |

**问题：**
```css
/* 缺少 Focus-visible 样式 */
button:focus-visible,
a:focus-visible {
    outline: 2px solid var(--brand-primary);
    outline-offset: 2px;
}
```

### 3.2 ARIA 属性 ⭐⭐ (2/5)

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 角色标签 | ❌ | 缺少 role 属性 |
| ARIA-label | ❌ | 关键元素缺少标签 |
| 通知数量 | ✅ | aria-label="通知" |
| 动态内容 | ❌ | 缺少 aria-live |

**建议补充：**
```html
<!-- 日期项 -->
<div class="date-item" role="button" aria-label="选择3月28日，周五">

<!-- 任务卡片 -->
<div class="task-card" role="article" aria-label="探盘任务：中海汇德里新盘探盘，进行中">

<!-- 通知入口 -->
<div class="header-action" onclick="showNotifyPanel()" aria-label="通知" role="button">
```

---

## 四、性能优化 Review

### 4.1 动画性能 ⭐⭐⭐⭐ (4/5)

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 动画使用 transform/opacity | ✅ | 符合 GPU 加速原则 |
| 动画时长统一 | ✅ | 0.2s/0.3s 合理 |
| 避免 layout thrashing | ✅ | 未触发重排 |
| will-change 使用 | ❌ | 可添加优化 |

**建议：**
```css
.notify-panel {
    will-change: transform;
    transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}
```

### 4.2 滚动性能 ⭐⭐⭐⭐ (4/5)

| 检查项 | 状态 | 说明 |
|--------|------|------|
| overflow-y: auto | ✅ | 按需显示滚动条 |
| -webkit-overflow-scrolling | ✅ | iOS 惯性滚动 |
| 固定头部/底部 | ✅ | 不随滚动重绘 |

---

## 五、问题汇总

### 5.1 P0 严重问题

| # | 问题 | 说明 | 建议 |
|---|------|------|------|
| 1 | **CSS 语法错误** | 第33行 `font-family: var(--font-family);` 有多余 `)` | 修复为 `font-family: var(--font-family);` |
| 2 | **任务卡片无跳转** | 点击卡片只显示 Toast，未跳转到详情页 | 修改为 `onclick="location.href='task-detail.html'"` |
| 3 | **缺少 Focus 样式** | 无键盘导航支持 | 添加 `:focus-visible` 样式 |

### 5.2 P1 重要问题

| # | 问题 | 说明 | 建议 |
|---|------|------|------|
| 4 | 筛选逻辑不统一 | house 类型需要特殊处理但未处理 | 统一所有 Chip 的激活态逻辑 |
| 5 | 缺少 ARIA 属性 | 可访问性不足 | 添加 role、aria-label |
| 6 | 日期列表分割线弱 | 颜色与背景相同 | 改用 `var(--color-border)` |

### 5.3 P2 优化建议

| # | 问题 | 说明 | 建议 |
|---|------|------|------|
| 7 | 日期宽度略窄 | 80px 对中文不友好 | 考虑增加到 90px |
| 8 | 缺少空状态 | 无任务时的展示 | 添加空状态提示 |
| 9 | Toast 位置固定 | 可能遮挡内容 | 改为顶部弹出 |

---

## 六、优化建议

### 6.1 立即修复 (P0)

```css
/* 1. 修复 CSS 语法错误 */
html, body {
    font-family: var(--font-family);  /* 移除多余的 ) */
}

/* 2. 添加 Focus 样式 */
button:focus-visible,
a:focus-visible {
    outline: 2px solid var(--brand-primary);
    outline-offset: 2px;
}
```

```html
<!-- 3. 任务卡片添加实际跳转 -->
<div class="task-card type-house" onclick="location.href='task-detail.html'">
```

### 6.2 短期优化 (P1)

```javascript
// 4. 修复筛选逻辑
function filterTasks(type, el) {
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.remove('active');
        chip.style.background = '';
        chip.style.color = '';
    });
    el.classList.add('active');
    if (el.classList.contains('house')) {
        el.style.background = 'var(--brand-primary)';
        el.style.color = 'white';
    }
    showToast(`筛选：${type}`);
}
```

### 6.3 长期改进 (P2)

```javascript
// 5. 添加空状态
function renderEmptyState() {
    return `
        <div class="empty-state">
            <div class="empty-icon">📅</div>
            <div class="empty-title">暂无任务</div>
            <div class="empty-desc">这一天没有安排任务</div>
        </div>
    `;
}
```

---

## 七、Review 评分总结

| 维度 | 评分 | 说明 |
|------|------|------|
| 视觉设计 | ⭐⭐⭐⭐ (4/5) | 布局清晰，色彩系统完整 |
| 交互体验 | ⭐⭐⭐⭐ (4/5) | 动画流畅，反馈及时 |
| 可访问性 | ⭐⭐ (2/5) | 缺少 Focus 和 ARIA |
| 性能优化 | ⭐⭐⭐⭐ (4/5) | 动画符合规范 |
| 代码质量 | ⭐⭐⭐ (3/5) | 有 CSS 语法错误 |

**总体评价：良好 (B+)**

---

## 八、验收标准

| 功能 | 状态 | 优先级 |
|------|------|--------|
| 日期选择切换 | ✅ 正常 | P0 |
| 任务筛选 | ⚠️ 逻辑需修复 | P1 |
| 通知面板 | ✅ 功能完整 | P0 |
| 页面跳转 | ❌ 需修复 | P0 |
| Focus 样式 | ❌ 需添加 | P0 |
| ARIA 属性 | ❌ 需补充 | P1 |
