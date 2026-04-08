# 小程序页面 UI/UX 全面 Review

> Review日期：2026-04-02
> 页面数量：21个
> 评审标准：iOS HIG + Material Design 交互规范
> 文档状态：📝 进行中

---

## 一、页面清单

| # | 页面 | 文件 | 状态 | 优先级 |
|---|------|------|------|--------|
| 1 | 首页 | `tools.html` | ⬜ | P1 |
| 2 | AI设计 | `ai-design.html` | ⬜ | P1 |
| 3 | Claw | `claw.html` | ⬜ | P1 |
| 4 | 任务中心 | `calendar.html` | ✅ | - |
| 5 | 新建任务 | `task-create.html` | ⬜ | P1 |
| 6 | 任务详情 | `task-detail.html` | ⬜ | P1 |
| 7 | 打卡配置 | `checkin-config.html` | ⬜ | P1 |
| 8 | 定位打卡 | `checkin-location.html` | ⬜ | P2 |
| 9 | 点位打卡 | `checkin-point.html` | ⬜ | P2 |
| 10 | 确认文案 | `confirm-copywriter.html` | ⬜ | P2 |
| 11 | 提交结果 | `submit-result.html` | ⬜ | P2 |
| 12 | 话术训练 | `speech-train.html` | ⬜ | P2 |
| 13 | 对话训练 | `train-dialog.html` | ⬜ | P2 |
| 14 | 个人中心 | `profile.html` | ⬜ | P2 |
| 15 | 物料库 | `material-library.html` | ⬜ | P2 |
| 16 | 数据看板 | `performance-board.html` | ⬜ | P2 |
| 17 | 算力明细 | `power-detail.html` | ⬜ | P3 |
| 18 | 我的收藏 | `favorites.html` | ⬜ | P3 |
| 19 | 足迹 | `footprint.html` | ⬜ | P3 |
| 20 | 活动中心 | `activity.html` | ⬜ | P3 |
| 21 | 任务列表 | `task-list.html` | ✅ | - (已合并) |

---

## 二、Review 检查清单

### 2.1 视觉设计

| 检查项 | 标准 | 权重 |
|--------|------|------|
| 颜色一致性 | 使用 CSS 变量 `--brand-primary` | 10% |
| 字体规范 | 标题 17px / 正文 14px / 辅助 12px | 10% |
| 间距规范 | 8px 基准间距（4/8/12/16/24） | 10% |
| 圆角规范 | 卡片 12px / 按钮 8px / 全圆 9999px | 10% |
| 阴影规范 | 3级阴影（sm/md/lg） | 5% |

### 2.2 交互设计

| 检查项 | 标准 | 权重 |
|--------|------|------|
| 按压反馈 | `transform: scale(0.95-0.99)` | 15% |
| TabBar | 5个Tab，中间的特殊图标 | 10% |
| 跳转逻辑 | 所有可点击元素有跳转或Toast | 10% |
| 表单规范 | label + 必填标识 + 错误提示 | 10% |

### 2.3 可访问性

| 检查项 | 标准 | 权重 |
|--------|------|------|
| Focus 样式 | `:focus-visible` 定义 | 5% |
| aria-label | 按钮和图标有标签 | 5% |
| 颜色对比 | WCAG 2.1 AA（4.5:1） | 5% |

### 2.4 性能

| 检查项 | 标准 | 权重 |
|--------|------|------|
| 安全区适配 | `env(safe-area-inset)` | 5% |
| 滚动优化 | `-webkit-overflow-scrolling: touch` | 5% |

---

## 三、通用问题汇总

### 3.1 P0 - 必须修复

| # | 问题 | 页面 | 修复 |
|---|------|------|------|
| 1 | 缺少 Focus 样式 | 全部 | 添加 `:focus-visible` |
| 2 | Toast 无动画 | 全部 | 检查 `animation: toastIn` |

### 3.2 P1 - 建议修复

| # | 问题 | 页面 | 修复 |
|---|------|------|------|
| 1 | TabBar 复用不一致 | 全部 | 统一 TabBar HTML 结构 |
| 2 | 按钮缺少按压态 | 部分 | 统一 `transform: scale(0.95)` |
| 3 | 空状态缺失 | 大部分 | 添加空状态设计 |

### 3.3 P2 - 优化建议

| # | 问题 | 页面 | 修复 |
|---|------|------|------|
| 1 | 图标不统一 | 部分 | 统一 FontAwesome 版本 |
| 2 | 颜色变量未使用 | 部分 | 统一使用 CSS 变量 |

---

## 四、页面详细 Review

### 4.1 tools.html（首页）

**链接：** https://zoe-matchlab.github.io/real-estate-ai/wxapp/tools.html

| 检查项 | 状态 | 问题 |
|--------|------|------|
| 页面可访问 | ✅ | - |
| TabBar 一致性 | ✅ | - |
| Focus 样式 | ⚠️ | 需检查 |
| 按压反馈 | ⚠️ | 需检查 |
| 跳转逻辑 | ⚠️ | 需检查 |

**Review 结果：**
> ⬜ 待 Review

---

### 4.2 ai-design.html（AI设计）

**链接：** https://zoe-matchlab.github.io/real-estate-ai/wxapp/ai-design.html

| 检查项 | 状态 | 问题 |
|--------|------|------|
| 页面可访问 | ✅ | - |
| TabBar 一致性 | ✅ | - |
| Focus 样式 | ⚠️ | 需检查 |
| 按压反馈 | ⚠️ | 需检查 |

**Review 结果：**
> ⬜ 待 Review

---

### 4.3 claw.html（Claw）

**链接：** https://zoe-matchlab.github.io/real-estate-ai/wxapp/claw.html

| 检查项 | 状态 | 问题 |
|--------|------|------|
| 页面可访问 | ✅ | - |
| TabBar 一致性 | ✅ | - |
| Focus 样式 | ⚠️ | 需检查 |
| 按压反馈 | ⚠️ | 需检查 |

**Review 结果：**
> ⬜ 待 Review

---

### 4.4 calendar.html（任务中心）

**链接：** https://zoe-matchlab.github.io/real-estate-ai/wxapp/calendar.html

| 检查项 | 状态 | 问题 |
|--------|------|------|
| 页面可访问 | ✅ | - |
| TabBar 一致性 | ✅ | - |
| Focus 样式 | ✅ | 已添加 |
| 按压反馈 | ✅ | scale(0.99) |
| 空状态 | ✅ | 已添加 |
| aria-label | ✅ | 已添加 |
| 执行人头像 | ✅ | 已添加 |

**Review 结果：**
> ✅ 已完成 - 优秀 (A)

---

### 4.5 task-create.html（新建任务）

**链接：** https://zoe-matchlab.github.io/real-estate-ai/wxapp/task-create.html

| 检查项 | 状态 | 问题 |
|--------|------|------|
| 页面可访问 | ✅ | - |
| TabBar 一致性 | ✅ | - |
| Focus 样式 | ⚠️ | 需检查 |
| 按压反馈 | ⚠️ | 需检查 |

**Review 结果：**
> ⬜ 待 Review

---

### 4.6 task-detail.html（任务详情）

**链接：** https://zoe-matchlab.github.io/real-estate-ai/wxapp/task-detail.html

| 检查项 | 状态 | 问题 |
|--------|------|------|
| 页面可访问 | ✅ | - |
| TabBar 一致性 | ✅ | - |
| Focus 样式 | ⚠️ | 需检查 |
| 按压反馈 | ⚠️ | 需检查 |

**Review 结果：**
> ⬜ 待 Review

---

### 4.7 checkin-config.html（打卡配置）

**链接：** https://zoe-matchlab.github.io/real-estate-ai/wxapp/checkin-config.html

| 检查项 | 状态 | 问题 |
|--------|------|------|
| 页面可访问 | ✅ | - |
| TabBar 一致性 | ✅ | - |
| Focus 样式 | ⚠️ | 需检查 |
| 按压反馈 | ⚠️ | 需检查 |

**Review 结果：**
> ⬜ 待 Review

---

### 4.8 其他页面

| 页面 | 文件 | 状态 |
|------|------|------|
| checkin-location.html | 定位打卡 | ⬜ |
| checkin-point.html | 点位打卡 | ⬜ |
| confirm-copywriter.html | 确认文案 | ⬜ |
| submit-result.html | 提交结果 | ⬜ |
| speech-train.html | 话术训练 | ⬜ |
| train-dialog.html | 对话训练 | ⬜ |
| profile.html | 个人中心 | ⬜ |
| material-library.html | 物料库 | ⬜ |
| performance-board.html | 数据看板 | ⬜ |
| power-detail.html | 算力明细 | ⬜ |
| favorites.html | 我的收藏 | ⬜ |
| footprint.html | 足迹 | ⬜ |
| activity.html | 活动中心 | ⬜ |

---

## 五、Review 执行记录

### 第一轮：基础检查（已完成）

| 页面 | Focus | 按压 | Toast | TabBar |
|------|-------|------|-------|--------|
| tools.html | ⚠️ | ⚠️ | ⚠️ | ✅ |
| ai-design.html | ⚠️ | ⚠️ | ⚠️ | ✅ |
| claw.html | ⚠️ | ⚠️ | ⚠️ | ✅ |
| calendar.html | ✅ | ✅ | ✅ | ✅ |
| task-create.html | ⚠️ | ⚠️ | ⚠️ | ✅ |
| task-detail.html | ✅ | ✅ | ✅ | ✅ |
| checkin-config.html | ✅ | ✅ | ✅ | ✅ |

### 第二轮：详细 Review（进行中）

| 页面 | 视觉 | 交互 | 功能 | 综合 |
|------|------|------|------|------|
| calendar.html | A | A | A | A |
| task-detail.html | ⬜ | ⬜ | ⬜ | ⬜ |
| checkin-config.html | ⬜ | ⬜ | ⬜ | ⬜ |
| ... | ⬜ | ⬜ | ⬜ | ⬜ |

---

## 六、修复计划

### 第一批（已完成）

| 页面 | 已修复问题 |
|------|-----------|
| calendar.html | Focus、aria-label、空状态、执行人头像、Tab合并 |

### 第二批（P1 页面）

| 页面 | 预计修复问题 |
|------|-------------|
| tools.html | Focus、按压反馈、空状态 |
| ai-design.html | Focus、按压反馈、空状态 |
| claw.html | Focus、按压反馈、空状态 |
| task-create.html | Focus、按压反馈、空状态 |
| task-detail.html | 按压反馈、空状态 |

### 第三批（其他页面）

| 页面 | 预计修复问题 |
|------|-------------|
| checkin-* | 统一样式 |
| speech-* | 统一样式 |
| profile | 空状态 |
| ... | ... |
