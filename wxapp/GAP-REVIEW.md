# wxapp H5原型 功能缺口 Review

> Review日期：2026-04-02
> Review依据：新房作业SOP产品设计.md
> 当前版本：V1.0

---

## 一、SOP要求的完整功能清单

### 小程序侧核心功能模块

| 模块 | 页面 | 优先级 | SOP状态 |
|------|------|--------|----------|
| **任务通知** | 日历页 + 通知面板 | P0 | ⚠️ 部分完成 |
| **探盘任务执行** | 任务详情 + 四阶段执行 | P0 | ⚠️ 部分完成 |
| **话术训练** | 训练列表 + AI对话 | P0 | ⚠️ 部分完成 |
| **个人中心** | 用户信息 + 业绩数据 | P0 | ✅ 已完成 |
| **物料库** | 探盘成果展示 | P1 | ❌ 缺失 |
| **内容发布** | 文案生成 + 发布 | P1 | ❌ 缺失 |
| **数据看板** | 业绩统计 | P1 | ⚠️ 部分完成 |

---

## 二、现有页面 vs SOP要求 对比

### 2.1 日历/通知模块

| SOP要求 | 现有页面 | 状态 | 缺口 |
|---------|----------|------|------|
| 日历视图 | calendar.html | ✅ | - |
| 任务列表 | calendar.html | ✅ | - |
| 通知入口(铃铛) | calendar.html | ✅ | - |
| 通知面板弹窗 | calendar.html | ⚠️ | 弹窗样式简陋，筛选功能弱 |
| 通知分类筛选 | calendar.html | ❌ | 缺少探盘/话术/内容分类Tab |
| 新盘上线通知 | - | ❌ | 缺少通知类型 |
| 任务提醒通知 | - | ❌ | 缺少通知类型 |
| 审核结果通知 | - | ❌ | 缺少通知类型 |

### 2.2 探盘任务执行模块

| SOP要求 | 现有页面 | 状态 | 缺口 |
|---------|----------|------|------|
| 任务详情展示 | task-detail.html | ✅ | - |
| 四阶段进度展示 | task-detail.html | ✅ | - |
| **阶段1：定位打卡页** | - | ❌ | **缺失** |
| **阶段2：点位打卡页** | - | ❌ | **缺失** |
| **阶段3：文案确认页** | - | ❌ | **缺失** |
| **阶段4：成果生成页** | - | ❌ | **缺失** |
| 话术训练入口 | task-detail.html | ✅ | - |
| 提交任务按钮 | task-detail.html | ⚠️ | 缺少提交确认流程 |

### 2.3 话术训练模块

| SOP要求 | 现有页面 | 状态 | 缺口 |
|---------|----------|------|------|
| 项目列表页 | speech-train.html | ✅ | - |
| 场景选择 | speech-train.html | ❌ | 缺少场景选择界面 |
| 模式选择(电话/文字/语音) | speech-train.html | ❌ | 缺少模式切换 |
| AI对话界面 | speech-train.html | ⚠️ | 仅有列表，缺少对话功能 |
| 训练结果展示 | speech-train.html | ❌ | 缺少评分和反馈 |
| 训练历史 | - | ❌ | 缺失 |

### 2.4 个人中心模块

| SOP要求 | 现有页面 | 状态 | 缺口 |
|---------|----------|------|------|
| 用户信息 | profile.html | ✅ | - |
| 今日业绩 | profile.html | ✅ | - |
| 数据统计 | profile.html | ✅ | - |
| 常用功能入口 | profile.html | ✅ | - |
| 我的任务入口 | profile.html | ✅ | - |
| 我的训练入口 | profile.html | ✅ | - |
| 我的内容入口 | profile.html | ✅ | - |
| 设置页 | profile.html | ✅ | - |
| **物料库入口** | - | ❌ | 缺失 |
| **数据看板入口** | - | ❌ | 缺失 |

---

## 三、功能缺口详细分析

### 3.1 严重缺口 (P0)

#### 缺口1: 探盘四阶段执行页

**现状**：task-detail.html 只有详情展示，缺少四阶段执行页面

**需要新增的页面**：

| 阶段 | 页面 | 功能 |
|------|------|------|
| 阶段1 | `checkin-location.html` | 地图展示 + GPS定位 + 打卡范围 + 打卡按钮 |
| 阶段2 | `checkin-point.html` | 点位列表 + 拍照/视频/录音 + 提交点位 |
| 阶段3 | `confirm-copywriter.html` | 文案列表 + 预览 + 确认/修改 |
| 阶段4 | `submit-result.html` | 成果预览 + 照片/视频/文案 + 提交成果 |

**页面跳转流程**：
```
task-detail.html
    ├── [阶段1] → checkin-location.html → 返回task-detail
    ├── [阶段2] → checkin-point.html → 返回task-detail
    ├── [阶段3] → confirm-copywriter.html → 返回task-detail
    └── [阶段4] → submit-result.html → 提交后 → task-detail
```

#### 缺口2: 通知面板弹窗

**现状**：calendar.html 有通知铃铛，但弹窗样式简陋

**需要完善**：
- 通知分类Tab：全部/探盘/话术/内容/新盘
- 已读/未读状态区分
- 通知时间显示
- 点击跳转详情功能

### 3.2 中等缺口 (P1)

#### 缺口3: 话术训练对话功能

**现状**：speech-train.html 只有项目列表

**需要新增**：
- 场景选择界面（邀约/接待/讲解等）
- 模式切换（电话/文字/语音）
- AI对话界面
- 训练结果评分展示

#### 缺口4: 物料库页面

**现状**：完全没有物料库页面

**需要新增**：
- `material-library.html` - 物料库首页
- 分类筛选（照片/视频/文案）
- 搜索功能
- 物料详情预览

### 3.3 轻度缺口 (P2)

#### 缺口5: 内容发布页面

**现状**：完全没有内容发布功能

**需要新增**（后续阶段）：
- 文案生成页
- 平台选择页
- 发布历史页

#### 缺口6: 数据看板页面

**现状**：profile.html 有简单统计，缺少专业看板

**需要新增**：
- `performance-board.html` - 业绩数据看板
- 各平台发布统计
- 获客转化漏斗
- 产品力训练指标

---

## 四、页面清单（完整版）

### 4.1 现有页面

| # | 页面 | 文件 | 完成度 | 优先级 |
|---|------|------|--------|--------|
| 1 | AI工具首页 | `tools.html` | 100% | P0 |
| 2 | 个人中心 | `profile.html` | 95% | P0 |
| 3 | 内容日历 | `calendar.html` | 85% | P0 |
| 4 | 任务列表 | `task-list.html` | 90% | P0 |
| 5 | 任务详情 | `task-detail.html` | 80% | P0 |
| 6 | 话术训练 | `speech-train.html` | 60% | P0 |

### 4.2 缺失页面 (按优先级)

| # | 页面 | 文件 | 完成度 | 优先级 |
|---|------|------|--------|--------|
| **1** | **定位打卡页** | `checkin-location.html` | 0% | **P0** |
| **2** | **点位打卡页** | `checkin-point.html` | 0% | **P0** |
| **3** | **文案确认页** | `confirm-copywriter.html` | 0% | **P0** |
| **4** | **成果提交页** | `submit-result.html` | 0% | **P0** |
| 5 | 通知面板弹窗 | `calendar.html` (增强) | 50% | P0 |
| 6 | 物料库 | `material-library.html` | 0% | P1 |
| 7 | 话术训练-场景选择 | `speech-train.html` (增强) | 30% | P1 |
| 8 | 话术训练-AI对话 | `train-dialog.html` | 0% | P1 |
| 9 | 话术训练-结果页 | `train-result.html` | 0% | P1 |
| 10 | 数据看板 | `performance-board.html` | 0% | P2 |
| 11 | 内容发布 | `publish.html` | 0% | P2 |

---

## 五、页面跳转关系（完整版）

### 5.1 核心跳转流程

```
┌─────────────────────────────────────────────────────────────────┐
│                        TabBar 导航                               │
└─────────────────────────────────────────────────────────────────┘
        │               │               │               │
        ↓               ↓               ↓               ↓
    tools.html     ai-design.html   claw.html    calendar.html
        │                               │               │
        │                               │               ├── [铃铛] → 通知面板弹窗
        │                               │               │
        │                               │               ↓
        │                               │         task-detail.html
        │                               │               │
        │                               │               ├── [阶段1] → checkin-location.html
        │                               │               ├── [阶段2] → checkin-point.html
        │                               │               ├── [阶段3] → confirm-copywriter.html
        │                               │               └── [阶段4] → submit-result.html
        │                               │
        │                               ↓
        │                         speech-train.html
        │                               │
        │                               ├── [选择场景] → 场景选择弹窗
        │                               ├── [选择模式] → 模式选择
        │                               └── [开始训练] → train-dialog.html
        │
        └── [话术训练入口] → speech-train.html
        └── [物料库入口] → material-library.html
        └── [数据看板入口] → performance-board.html

┌─────────────────────────────────────────────────────────────────┐
│                       通知面板 → 跳转                            │
└─────────────────────────────────────────────────────────────────┘
通知面板
    ├── [探盘任务] → task-detail.html
    ├── [话术训练] → speech-train.html
    ├── [内容发布] → publish.html
    └── [新盘上线] → tools.html (新盘推荐)
```

### 5.2 探盘任务完整流程

```
task-list.html (任务列表)
    │
    ├── 选择任务 → task-detail.html (任务详情)
    │                   │
    │                   ├── 阶段1：定位打卡
    │                   │       ↓
    │                   │   checkin-location.html
    │                   │       ↓
    │                   │   打卡成功 → 返回 task-detail
    │                   │
    │                   ├── 阶段2：点位打卡
    │                   │       ↓
    │                   │   checkin-point.html
    │                   │       ├── 点位1：拍照/视频/录音
    │                   │       ├── 点位2：拍照/视频/录音
    │                   │       └── 全部完成 → 返回 task-detail
    │                   │
    │                   ├── 阶段3：文案确认
    │                   │       ↓
    │                   │   confirm-copywriter.html
    │                   │       ├── 预览文案
    │                   │       ├── 确认文案
    │                   │       └── 确认成功 → 返回 task-detail
    │                   │
    │                   └── 阶段4：成果生成
    │                           ↓
    │                       submit-result.html
    │                           ├── 预览照片/视频/文案
    │                           ├── 提交成果
    │                           └── 提交成功 → 返回 task-detail
    │
    └── 话术训练入口 → speech-train.html
```

---

## 六、优先级建议

### 第一批 (P0 - 核心流程必须)

1. **checkin-location.html** - 定位打卡页
   - 地图组件 + GPS定位
   - 打卡范围判断
   - 打卡按钮 + 结果反馈

2. **checkin-point.html** - 点位打卡页
   - 点位列表展示
   - 拍照/视频/录音功能
   - 点位提交

3. **confirm-copywriter.html** - 文案确认页
   - AI生成文案列表
   - 文案预览
   - 确认/修改功能

4. **submit-result.html** - 成果提交页
   - 成果预览（照片/视频/文案）
   - 提交确认
   - 提交结果反馈

5. **通知面板增强** - calendar.html
   - 分类Tab
   - 已读/未读状态
   - 点击跳转

### 第二批 (P1 - 重要功能)

6. **speech-train.html 增强**
   - 场景选择
   - 模式切换

7. **train-dialog.html** - AI对话页
   - 模拟对话界面
   - AI回复展示

8. **material-library.html** - 物料库
   - 物料列表
   - 分类筛选
   - 预览功能

### 第三批 (P2 - 增强体验)

9. **train-result.html** - 训练结果页
10. **performance-board.html** - 数据看板
11. **publish.html** - 内容发布

---

## 七、结论

### 当前完成度评估

| 模块 | 完成度 | 说明 |
|------|--------|------|
| 基础框架 | 100% | TabBar、页面结构 |
| 个人中心 | 95% | 用户信息、业绩、入口 |
| 日历/通知 | 70% | 缺少通知面板增强 |
| 任务列表 | 90% | 筛选、状态展示 |
| 任务详情 | 60% | 缺少四阶段执行页 |
| 话术训练 | 40% | 缺少对话功能 |
| 物料库 | 0% | 完全缺失 |
| 内容发布 | 0% | 完全缺失 |

**总体完成度：约 50%**

### 建议行动计划

**立即行动 (本周)**：
1. 创建 checkin-location.html
2. 创建 checkin-point.html  
3. 创建 confirm-copywriter.html
4. 创建 submit-result.html
5. 完善 calendar.html 通知面板

**后续行动 (下周)**：
6. 增强 speech-train.html
7. 创建 train-dialog.html
8. 创建 material-library.html
