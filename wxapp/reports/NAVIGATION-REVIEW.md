# wxapp 页面跳转逻辑 Review

> Review日期：2026-04-02
> Review依据：小程序个人中心产品设计.md + 新房作业SOP产品设计.md

---

## 一、当前页面清单

| # | 页面 | 文件 | 功能 |
|---|------|------|------|
| 1 | AI工具首页 | `tools.html` | 首页Tab |
| 2 | 个人中心 | `profile.html` | 我的Tab |
| 3 | 内容日历 | `calendar.html` | 日历Tab |
| 4 | 任务列表 | `task-list.html` | 任务列表 |
| 5 | 任务详情 | `task-detail.html` | 探盘任务详情+四阶段入口 |
| 6 | 阶段1定位打卡 | `checkin-location.html` | GPS定位打卡 |
| 7 | 阶段2点位打卡 | `checkin-point.html` | 点位采集 |
| 8 | 阶段3文案确认 | `confirm-copywriter.html` | 文案确认 |
| 9 | 阶段4成果提交 | `submit-result.html` | 成果提交 |
| 10 | 话术训练 | `speech-train.html` | 项目+场景+模式选择 |
| 11 | AI训练对话 | `train-dialog.html` | AI对话练习 |

---

## 二、当前导航结构

### 2.1 TabBar 导航

```
TabBar
├── tools.html (首页) ✅
├── ai-design.html (AI设计) ❌ 缺失
├── claw.html (话术助手) ❌ 缺失
├── calendar.html (日历) ✅
└── profile.html (我的) ✅
```

### 2.2 探盘任务执行流程

```
task-detail.html
├── 阶段1 → checkin-location.html → 返回 task-detail
├── 阶段2 → checkin-point.html → 返回 task-detail
├── 阶段3 → confirm-copywriter.html → 返回 task-detail
└── 阶段4 → submit-result.html → task-list.html

话术训练入口 → speech-train.html
```

### 2.3 话术训练流程

```
speech-train.html
├── 选择项目 → 选择场景 → 选择模式
└── 开始训练 → train-dialog.html
                        └── 结束 → speech-train.html
```

---

## 三、导航缺口分析

### 3.1 TabBar 缺失页面

| 页面 | 文件 | 优先级 | 状态 |
|------|------|--------|------|
| AI设计 | `ai-design.html` | P2 | ❌ 缺失 |
| 话术助手 | `claw.html` | P2 | ❌ 缺失 |

### 3.2 个人中心缺失跳转

根据产品设计文档，profile.html 缺少以下跳转：

| 入口 | 应跳转 | 优先级 | 状态 |
|------|--------|--------|------|
| 今日作业动态-探盘任务 | → task-list.html | P0 | ❌ 未实现 |
| 今日作业动态-话术训练 | → speech-train.html | P0 | ⚠️ Toast |
| 今日作业动态-数据 | → performance-board.html | P0 | ❌ 未实现 |
| 我的业绩-数字点击 | → 对应详情页 | P0 | ❌ 未实现 |
| 查看历史业绩 | → history-performance.html | P1 | ❌ 未实现 |
| 产品力成长详情 | → 弹窗/详情页 | P1 | ❌ 未实现 |
| 物料库入口 | → material-library.html | P1 | ❌ 未实现 |
| 数据看板入口 | → performance-board.html | P1 | ❌ 未实现 |
| 算力 | → power-detail.html | P2 | ❌ 未实现 |
| 收藏 | → favorites.html | P2 | ❌ 未实现 |
| 足迹 | → footprint.html | P2 | ❌ 缺失 |
| 活动中心 | → activity.html | P2 | ❌ 缺失 |

### 3.3 探盘任务流程缺口

| 缺口 | 说明 | 优先级 |
|------|------|--------|
| 话术训练入口返回 | 从task-detail进入speech-train，需能返回task-detail | P1 |
| 物料库自动关联 | 探盘完成后，成果应出现在物料库 | P1 |

---

## 四、缺失页面清单

### 4.1 高优先级 (P0-P1)

| # | 页面 | 文件 | 功能 |
|---|------|------|------|
| 1 | 物料库 | `material-library.html` | 探盘成果管理 |
| 2 | 数据看板 | `performance-board.html` | 个人数据统计 |
| 3 | 历史业绩 | `history-performance.html` | 历史业绩查询 |

### 4.2 中优先级 (P2)

| # | 页面 | 文件 | 功能 |
|---|------|------|------|
| 4 | AI设计页 | `ai-design.html` | TabBar占位 |
| 5 | 话术助手页 | `claw.html` | TabBar占位 |
| 6 | 算力明细 | `power-detail.html` | 算力流水 |
| 7 | 我的收藏 | `favorites.html` | 收藏管理 |
| 8 | 足迹 | `footprint.html` | 行为记录 |
| 9 | 活动中心 | `activity.html` | 活动列表 |

---

## 五、完整导航流程（建议）

### 5.1 TabBar导航

```
┌─────────────────────────────────────────────────┐
│                    TabBar                         │
└─────────────────────────────────────────────────┘
        │          │          │          │
        ↓          ↓          ↓          ↓
    tools.html  ai-design  claw.html  calendar   profile.html
     (首页)    (AI设计)   (话术助手)  (日历)
                            ↓
                    speech-train.html
                            ↓
                    train-dialog.html
```

### 5.2 个人中心完整导航

```
profile.html
│
├── 今日作业动态
│   ├── 探盘任务 → task-list.html (筛选进行中)
│   ├── 话术训练 → speech-train.html
│   └── 数据 → performance-board.html
│
├── 我的业绩
│   ├── 数字点击 → 对应详情页
│   └── 历史业绩 → history-performance.html
│
├── 产品力成长 → 弹窗详情 → speech-train.html
│
├── 功能入口
│   ├── 探盘任务 → task-list.html
│   ├── 算力 → power-detail.html
│   ├── 收藏 → favorites.html
│   ├── 物料库 → material-library.html
│   └── 数据看板 → performance-board.html
│
├── 其他入口
│   ├── 足迹 → footprint.html
│   ├── 活动中心 → activity.html
│   └── 设置 → settings.html
│
└── TabBar → 各Tab页
```

### 5.3 探盘任务完整导航

```
task-list.html
    │
    └── 点击任务 → task-detail.html
                        │
                        ├── 阶段1 → checkin-location.html
                        │           └── 完成 → 返回 task-detail
                        │
                        ├── 阶段2 → checkin-point.html
                        │           └── 完成 → 返回 task-detail
                        │
                        ├── 阶段3 → confirm-copywriter.html
                        │           └── 完成 → 返回 task-detail
                        │
                        ├── 阶段4 → submit-result.html
                        │           └── 提交 → task-list.html
                        │
                        └── 话术训练 → speech-train.html
                                        └── 完成 → 返回 task-detail
```

---

## 六、需要创建的页面

### 6.1 物料库 (material-library.html)

**功能**：
- 分类Tab: 全部/照片/视频/录音/文案
- 物料列表: 按楼盘分组展示
- 点击进入详情

**布局**：
```
┌─────────────────────────────────────┐
│ ← 我的物料库                    [筛选] │
├─────────────────────────────────────┤
│ [全部] [照片] [视频] [录音] [文案]      │
├─────────────────────────────────────┤
│ 🏠 中海汇德里                          │
│ 📅 2026-03-28  照片4张·视频2个·文案1篇│
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐       │
│ │ 📷 │ │ 📷 │ │ 🎬 │ │ 📝 │       │
│ └────┘ └────┘ └────┘ └────┘       │
└─────────────────────────────────────┘
```

### 6.2 数据看板 (performance-board.html)

**功能**：
- 时间筛选: 日/周/月
- 内容发布数据
- 获客转化数据
- 老客激活数据

**布局**：
```
┌─────────────────────────────────────┐
│ ← 数据看板              [日/周/月]   │
├─────────────────────────────────────┤
│ ┌─ 内容发布 ──────────────────────┐  │
│ │ 发布量  浏览量     投流量          │  │
│ │  28     1.2万    ¥3,200        │  │
│ └─────────────────────────────────┘  │
│ ┌─ 获客转化 ──────────────────────┐  │
│ │ 咨询   线索    报备   带看        │  │
│ │ 156    45     23     5          │  │
│ └─────────────────────────────────┘  │
└─────────────────────────────────────┘
```

### 6.3 历史业绩 (history-performance.html)

**功能**：
- 月份选择器
- 历史数据展示
- 趋势对比

**布局**：
```
┌─────────────────────────────────────┐
│ ← 历史业绩                    [筛选] │
├─────────────────────────────────────┤
│        < 2026年3月 >                 │
├─────────────────────────────────────┤
│ 探盘    发布     咨询     线索     │
│  15     86条    423      128      │
│ 报备    带看     成交              │
│  23      18      5                │
├─────────────────────────────────────┤
│ 较上月  ↑+20%  ↑+15%  ↑+8%  ↑+25%│
└─────────────────────────────────────┘
```

### 6.4 其他缺失页面

| 页面 | 功能 |
|------|------|
| `ai-design.html` | TabBar占位，显示"即将上线" |
| `claw.html` | TabBar占位，显示"即将上线" |
| `power-detail.html` | 算力余额+明细流水 |
| `favorites.html` | 收藏列表(楼盘/模板/学习) |
| `footprint.html` | 足迹列表 |
| `activity.html` | 活动列表 |
| `settings.html` | 设置页(完善) |

---

## 七、立即行动项

### P0 (核心流程)

1. **创建物料库页面** `material-library.html`
   - 分类展示探盘成果
   - 点击进入详情

2. **创建数据看板页面** `performance-board.html`
   - 内容发布统计
   - 获客转化数据

3. **完善 profile.html 跳转逻辑**
   - 今日作业动态 → 对应页面
   - 我的业绩 → 历史业绩页
   - 物料库入口 → material-library.html

### P1 (重要功能)

4. **创建历史业绩页面** `history-performance.html`
5. **完善TabBar占位页面** `ai-design.html` + `claw.html`
6. **完善设置页面** `settings.html`

### P2 (增强体验)

7. 创建 `power-detail.html`
8. 创建 `favorites.html`
9. 创建 `footprint.html`
10. 创建 `activity.html`

---

## 八、结论

**当前完成度：约 60%**

**核心问题**：
1. 个人中心缺少多个功能入口的跳转
2. 物料库、数据看板等核心页面缺失
3. TabBar有两个占位页未创建

**建议行动计划**：

| 优先级 | 行动项 | 页面 |
|--------|--------|------|
| P0 | 创建物料库 | material-library.html |
| P0 | 创建数据看板 | performance-board.html |
| P0 | 完善profile跳转 | profile.html |
| P1 | 创建历史业绩 | history-performance.html |
| P1 | TabBar占位页 | ai-design.html, claw.html |
