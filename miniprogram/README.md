# 小程序 (miniprogram)

> 房产AI助手小程序 - 基于 Tailwind CSS 构建

## 📁 目录结构

```
miniprogram/
├── pages/
│   ├── home/           # 首页TabBar页面
│   ├── task/           # 任务相关页面
│   ├── train/          # 培训考试页面
│   └── manager/        # 管理端页面
└── shared/             # 共享页面组件
```

---

## 📄 页面说明

### pages/home/ — 首页TabBar页面

| 文件 | 功能说明 |
|------|---------|
| **index.html** | 小程序入口/启动页 |
| **tools.html** | AI工具首页 — 聚合各种AI能力入口 |
| **calendar.html** | 内容日历/任务中心 — 展示所有任务，按日期筛选 |
| **profile.html** | 个人中心 — 用户信息、设置、积分等 |
| **speech-train.html** | 话术训练 — AI对话练习话术 |

### pages/task/ — 任务相关

| 文件 | 功能说明 |
|------|---------|
| **task-list.html** | 任务列表 — 查看所有下发任务 |
| **task-detail.html** | 探盘任务详情 — 四阶段执行流程（定位打卡→点位打卡→文案确认→成果生成） |
| **task-distribute.html** | 任务分发 — 向下级经纪人分发任务 |

### pages/train/ — 培训考试

| 文件 | 功能说明 |
|------|---------|
| **train.html** | 培训中心 — 课程学习、知识库 |
| **exam.html** | 在线考试 — 考核练习 |

### pages/manager/ — 管理端

| 文件 | 功能说明 |
|------|---------|
| **manager-index.html** | 管理后台首页 — 数据看板、人员管理 |

### shared/ — 共享页面

| 文件 | 功能说明 |
|------|---------|
| **ai-design.html** | AI设计工具 — 生成营销物料 |
| **claw.html** | 智能助手 — AI对话问答 |
| **house-notify.html** | 房源通知 — 新盘信息推送 |

---

## 🔗 页面跳转关系

```
index.html (入口)
    ├── tools.html (TabBar)
    ├── calendar.html (TabBar)
    │       └── task-detail.html → confirm-copywriter → submit-result
    ├── speech-train.html (TabBar)
    │       └── train.html / exam.html
    ├── profile.html (TabBar)
    │       └── manager-index.html
    └── shared/
            ├── ai-design.html
            ├── claw.html
            └── house-notify.html
```

---

## 🎨 技术栈

- **UI框架**: Tailwind CSS
- **图标**: Font Awesome 4.7
- **适配**: 安全区域 (safe-area-inset)
- **动画**: CSS Transitions

---

## 📱 功能模块

| 模块 | 说明 |
|------|------|
| 🏠 探盘打卡 | 4阶段任务执行（定位→采集→文案→成果） |
| 💬 话术训练 | AI实时对话练习 |
| 📝 内容生成 | 小红书/抖音/朋友圈文案 + 视频 |
| 📚 培训考试 | 在线学习、考核 |
| 👥 团队管理 | 任务分发、进度追踪 |
