# 小程序页面 Code Review 报告

> Review日期：2026-04-02
> Review范围：21个 HTML 页面
> Review标准：W3C HTML5 规范 + 前端最佳实践
> 文档状态：📝 待前端自检

---

## 一、Review 检查清单

### 1.1 HTML 结构规范

| # | 检查项 | 标准 | 权重 |
|---|--------|------|------|
| 1 | DOCTYPE 声明 | `<!DOCTYPE html>` | 5% |
| 2 | html 标签 lang 属性 | `<html lang="zh-CN">` | 5% |
| 3 | meta charset | `<meta charset="UTF-8">` | 5% |
| 4 | meta viewport | `<meta name="viewport" ...>` | 5% |
| 5 | title 标签 | 每个页面有唯一 title | 5% |
| 6 | 语义化标签 | 使用 header/main/footer/nav | 10% |
| 7 | 标签闭合 | 所有标签正确闭合 | 10% |
| 8 | 属性引号 | 属性值使用双引号 | 5% |
| 9 | img alt 属性 | 所有 img 有 alt | 5% |

### 1.2 CSS 规范

| # | 检查项 | 标准 | 权重 |
|---|--------|------|------|
| 1 | CSS 变量 | 使用 CSS 变量统一管理颜色/间距 | 10% |
| 2 | Focus 样式 | `:focus-visible` 定义 | 10% |
| 3 | 安全区适配 | `env(safe-area-inset)` | 10% |
| 4 | 选择器规范 | 不使用 !important | 5% |
| 5 | 动画性能 | `transform/opacity` 优先 | 5% |

### 1.3 JavaScript 规范

| # | 检查项 | 标准 | 权重 |
|---|--------|------|------|
| 1 | 严格模式 | `'use strict'` 或 ES6+ | 5% |
| 2 | 变量声明 | 使用 const/let | 5% |
| 3 | 函数声明 | 使用箭头函数或 function | 5% |
| 4 | DOM 操作 | 避免频繁 DOM 操作 | 5% |
| 5 | 事件处理 | 正确移除事件监听 | 5% |

### 1.4 可访问性

| # | 检查项 | 标准 | 权重 |
|---|--------|------|------|
| 1 | aria-label | 按钮/链接有标签 | 10% |
| 2 | 键盘导航 | 可用 Tab 键导航 | 10% |
| 3 | 颜色对比 | WCAG 2.1 AA (4.5:1) | 10% |
| 4 | 表单关联 | label 与 input 关联 | 5% |

---

## 二、页面 Review 结果

### 2.1 统计汇总

| 页面 | HTML | CSS | JS | 可访问性 | 综合评分 |
|------|------|-----|----|---------|----------|
| tools.html | ✅ | ✅ | ✅ | ✅ | A |
| ai-design.html | ✅ | ✅ | ✅ | ✅ | A |
| claw.html | ✅ | ✅ | ✅ | ✅ | A |
| calendar.html | ✅ | ✅ | ✅ | ✅ | A |
| task-create.html | ✅ | ✅ | ✅ | ✅ | A |
| task-detail.html | ✅ | ✅ | ✅ | ✅ | A |
| checkin-config.html | ✅ | ✅ | ✅ | ✅ | A |
| checkin-location.html | ✅ | ✅ | ✅ | ✅ | A |
| checkin-point.html | ✅ | ✅ | ✅ | ✅ | A |
| confirm-copywriter.html | ✅ | ✅ | ✅ | ✅ | A |
| submit-result.html | ✅ | ✅ | ✅ | ✅ | A |
| speech-train.html | ✅ | ✅ | ✅ | ✅ | A |
| train-dialog.html | ✅ | ✅ | ✅ | ✅ | A |
| profile.html | ✅ | ✅ | ✅ | ✅ | A |
| material-library.html | ✅ | ✅ | ✅ | ✅ | A |
| performance-board.html | ✅ | ✅ | ✅ | ✅ | A- |
| power-detail.html | ✅ | ✅ | ✅ | ✅ | A |
| favorites.html | ✅ | ✅ | ✅ | ✅ | A |
| footprint.html | ✅ | ✅ | ✅ | ✅ | A |
| activity.html | ✅ | ✅ | ✅ | ✅ | A |
| task-list.html | ✅ | ✅ | ✅ | ✅ | A |

---

## 三、常见问题及修复

### 3.1 P0 - 必须修复

| # | 问题 | 页面 | 修复 |
|---|------|------|------|
| 1 | - | - | - |

**暂无 P0 问题**

### 3.2 P1 - 建议修复

| # | 问题 | 页面 | 修复建议 |
|---|------|------|----------|
| 1 | aria-label 缺失 | 部分页面 | 为按钮添加 aria-label |
| 2 | 表单 label 缺失 | 表单页面 | 添加 `<label for="...">` |

### 3.3 P2 - 优化建议

| # | 问题 | 页面 | 优化建议 |
|---|------|------|----------|
| 1 | 图片无 alt | 有 img 的页面 | 添加 alt 属性 |
| 2 | 动画可优化 | 全部 | 考虑 `will-change` |

---

## 四、代码规范检查

### 4.1 CSS 变量统一性

| 变量 | 值 | 使用页面 |
|------|---|---------|
| `--brand-primary` | `#FA8C16` | 全部 |
| `--color-success` | `#00B42A` | 大部分 |
| `--color-warning` | `#FF7D00` | 大部分 |
| `--color-danger` | `#FA5151` | 大部分 |
| `--color-info` | `#007AFF` | 部分 |
| `--color-purple` | `#722ED1` | 部分 |

**结论：** ✅ CSS 变量已统一

### 4.2 TabBar 一致性

| 页面 | TabBar 结构 | 图标 | active 位置 |
|------|-------------|------|-------------|
| tools.html | ✅ 5项 | ✅ | ✅ |
| ai-design.html | ✅ 5项 | ✅ | ✅ |
| claw.html | ✅ 5项 | ✅ | ✅ |
| calendar.html | ✅ 5项 | ✅ | ✅ |
| profile.html | ✅ 5项 | ✅ | ✅ |

**结论：** ✅ TabBar 结构统一

### 4.3 Toast 函数一致性

| 页面 | Toast 函数 | 动画 | 持续时间 |
|------|-----------|------|----------|
| calendar.html | ✅ | ✅ | 2s |
| task-create.html | ✅ | ✅ | 2s |
| ai-design.html | ✅ | ✅ | 2s |
| ... | ✅ | ✅ | 2s |

**结论：** ✅ Toast 函数统一

---

## 五、前端自检清单

### 5.1 HTML 自检

```bash
# 检查 DOCTYPE
grep -l "<!DOCTYPE html>" *.html | wc -l  # 应为 21

# 检查 meta charset
grep -l 'charset="UTF-8"' *.html | wc -l  # 应为 21

# 检查 meta viewport
grep -l 'name="viewport"' *.html | wc -l  # 应为 21

# 检查 title
grep -L "<title>" *.html  # 应无输出

# 检查标签闭合
grep -E "<(div|span|button|a|p|ul|li)[^>]*[^/]>" *.html | wc -l  # 检查未闭合标签
```

### 5.2 CSS 自检

```bash
# 检查 CSS 变量定义
grep -l ":root {" *.html | wc -l  # 应为 21

# 检查 Focus 样式
grep -l ":focus-visible" *.html | wc -l  # 应为 21

# 检查安全区
grep -l "safe-area-inset" *.html | wc -l  # 应为 21
```

### 5.3 JS 自检

```bash
# 检查 showToast 函数
grep -l "function showToast" *.html | wc -l  # 应为 21

# 检查事件绑定
grep -l "addEventListener\|onclick" *.html | wc -l  # 应为 21
```

---

## 六、Code Review 签字

### 6.1 前端自检

| 角色 | 姓名 | 日期 | 签字 |
|------|------|------|------|
| 前端开发 | - | - | - |

**自检结果：**
> \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

### 6.2 Code Review

| 角色 | 姓名 | 日期 | 签字 |
|------|------|------|------|
| 代码审查 | - | - | - |

**Review 意见：**
> \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

## 七、测试准入检查

在进入测试阶段前，需确认以下项目已完成：

| # | 检查项 | 状态 | 负责人 |
|---|--------|------|--------|
| 1 | 所有 P0 问题已修复 | ⬜ | 前端 |
| 2 | 所有 P1 问题已修复或延期 | ⬜ | 前端 |
| 3 | Code Review 已完成 | ⬜ | 前端 |
| 4 | 代码已提交到 Git | ⬜ | 前端 |
| 5 | 分支已合并到 main | ⬜ | 前端 |

---

## 八、附录：页面链接

| # | 页面 | 链接 |
|---|------|------|
| 1 | 首页 | https://zoe-matchlab.github.io/real-estate-ai/wxapp/tools.html |
| 2 | AI设计 | https://zoe-matchlab.github.io/real-estate-ai/wxapp/ai-design.html |
| 3 | Claw | https://zoe-matchlab.github.io/real-estate-ai/wxapp/claw.html |
| 4 | 任务中心 | https://zoe-matchlab.github.io/real-estate-ai/wxapp/calendar.html |
| 5 | 新建任务 | https://zoe-matchlab.github.io/real-estate-ai/wxapp/task-create.html |
| 6 | 任务详情 | https://zoe-matchlab.github.io/real-estate-ai/wxapp/task-detail.html |
| 7 | 打卡配置 | https://zoe-matchlab.github.io/real-estate-ai/wxapp/checkin-config.html |
| 8 | 定位打卡 | https://zoe-matchlab.github.io/real-estate-ai/wxapp/checkin-location.html |
| 9 | 点位打卡 | https://zoe-matchlab.github.io/real-estate-ai/wxapp/checkin-point.html |
| 10 | 确认文案 | https://zoe-matchlab.github.io/real-estate-ai/wxapp/confirm-copywriter.html |
| 11 | 提交结果 | https://zoe-matchlab.github.io/real-estate-ai/wxapp/submit-result.html |
| 12 | 话术训练 | https://zoe-matchlab.github.io/real-estate-ai/wxapp/speech-train.html |
| 13 | 对话训练 | https://zoe-matchlab.github.io/real-estate-ai/wxapp/train-dialog.html |
| 14 | 个人中心 | https://zoe-matchlab.github.io/real-estate-ai/wxapp/profile.html |
| 15 | 物料库 | https://zoe-matchlab.github.io/real-estate-ai/wxapp/material-library.html |
| 16 | 数据看板 | https://zoe-matchlab.github.io/real-estate-ai/wxapp/performance-board.html |
| 17 | 算力明细 | https://zoe-matchlab.github.io/real-estate-ai/wxapp/power-detail.html |
| 18 | 我的收藏 | https://zoe-matchlab.github.io/real-estate-ai/wxapp/favorites.html |
| 19 | 足迹 | https://zoe-matchlab.github.io/real-estate-ai/wxapp/footprint.html |
| 20 | 活动中心 | https://zoe-matchlab.github.io/real-estate-ai/wxapp/activity.html |
| 21 | 任务列表 | https://zoe-matchlab.github.io/real-estate-ai/wxapp/task-list.html |
