# H5页面 (wxapp)

> 房产AI助手H5页面 - 纯CSS构建，无框架依赖

## 📁 目录结构

```
wxapp/
├── pages/
│   ├── home/           # 首页TabBar页面
│   ├── task/           # 任务相关页面
│   ├── result/         # 成果确认页面
│   ├── profile/        # 个人中心页面
│   └── other/          # 其他功能页面
├── reports/            # UI/UX Review 报告
├── tests/              # 测试文件
└── static/            # 配置文件
```

---

## 📄 页面说明

### pages/home/ — 首页TabBar页面（4个）

| 文件 | 功能说明 |
|------|---------|
| **tools.html** | AI工具首页 — 聚合各种AI能力入口（探盘任务、话术训练、算力充值等） |
| **calendar.html** | 内容日历/任务中心 — 任务列表+日期筛选+通知面板弹窗 |
| **speech-train.html** | 话术训练 — AI对话练习多种场景（邀约、接待、谈判等） |
| **profile.html** | 个人中心 — 用户信息、我的足迹、收藏、算力明细等 |

### pages/task/ — 任务相关页面

| 文件 | 功能说明 |
|------|---------|
| **task-list.html** | 任务列表 — 所有任务卡片展示 |
| **task-detail.html** | 探盘任务详情 — 四阶段执行（定位打卡→点位打卡→文案确认→成果生成），含点位采集交互 |
| **task-create.html** | 新建任务 — 创建探盘/话术任务（占位页面） |
| **checkin-config.html** | 打卡配置 — 配置打卡点位数和类型 |
| **checkin-location.html** | 打卡定位 — GPS定位签到 |
| **checkin-point.html** | 打卡点详情 — 各点位资料采集 |

### pages/result/ — 成果确认页面

| 文件 | 功能说明 |
|------|---------|
| **confirm-copywriter.html** | 阶段3文案确认 — 查看/确认AI生成的多平台文案和短视频脚本 |
| **submit-result.html** | 阶段4成果生成 — 封面图+短视频生成进度，可后台执行 |

### pages/profile/ — 个人中心页面

| 文件 | 功能说明 |
|------|---------|
| **favorites.html** | 我的收藏 — 收藏的楼盘和内容 |
| **footprint.html** | 我的足迹 — 操作记录时间线 |
| **material-library.html** | 我的物料库 — 探盘成果和生成内容 |
| **power-detail.html** | 算力明细 — AI算力使用记录和充值 |
| **performance-board.html** | 数据看板 — 业绩和探盘统计（占位页面） |

### pages/other/ — 其他功能页面

| 文件 | 功能说明 |
|------|---------|
| **activity.html** | 活动中心 — 精彩活动（占位页面） |
| **ai-design.html** | AI设计工具 — 生成营销物料（占位页面） |
| **claw.html** | 智能助手 — AI对话问答 |
| **train-dialog.html** | 训练对话 — 话术训练对话界面 |

---

## 🔗 页面跳转关系

```
tools.html (TabBar首页)
    ├── calendar.html (TabBar)
    │       ├── 通知面板弹窗 → 各类型详情
    │       ├── 探盘卡片 → task-detail.html
    │       └── 话术卡片 → speech-train.html
    │
    ├── speech-train.html (TabBar)
    │       └── train-dialog.html
    │
    ├── profile.html (TabBar)
    │       ├── footprint.html
    │       ├── favorites.html
    │       ├── material-library.html
    │       ├── power-detail.html
    │       └── performance-board.html
    │
    └── task-detail.html
            ├── checkin-location.html
            ├── checkin-point.html
            ├── confirm-copywriter.html (阶段3)
            └── submit-result.html (阶段4)
```

---

## 🎨 技术栈

- **CSS**: 纯CSS + CSS变量（无框架依赖）
- **图标**: Font Awesome 4.7
- **适配**: 安全区域 (safe-area-inset-bottom)
- **动画**: CSS @keyframes
- **无障碍**: prefers-reduced-motion, focus-visible

---

## 📱 核心功能模块

| 模块 | 说明 |
|------|------|
| 🏠 探盘打卡 | 4阶段任务执行，含GPS定位和点位采集 |
| 💬 话术训练 | AI实时对话，多场景支持 |
| 📝 内容生成 | 小红书/抖音/朋友圈文案 + 封面图 + 短视频 |
| 🔔 通知系统 | 底部面板弹窗，分类筛选 |
| 👤 个人中心 | 足迹、收藏、物料库、算力管理 |

---

## 📊 文件统计

| 目录 | 文件数 |
|------|--------|
| pages/home/ | 4 |
| pages/task/ | 6 |
| pages/result/ | 2 |
| pages/profile/ | 5 |
| pages/other/ | 4 |
| **总计** | **21** |

---

## 🚀 部署说明

页面为纯静态HTML，可直接部署到任意静态服务器或CDN。

**示例地址**: `https://zoe-matchlab.github.io/real-estate-ai/wxapp/pages/home/calendar.html`
