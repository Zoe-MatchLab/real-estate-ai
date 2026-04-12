# PC 端管理后台

> 房产 AI 作业平台 - PC 管理后台页面

## 目录结构

```
pc/
├── index.html                    # 首页 / 仪表盘
├── README.md                    # 本文件
├── pages/
│   ├── task/                   # 任务管理
│   │   ├── task-create.html     # 任务创建
│   │   ├── task-manage.html     # 任务管理
│   │   └── task-tracking.html   # 任务跟踪
│   ├── content/                # 内容管理
│   │   ├── content-calendar.html # 内容日历
│   │   └── content-manage.html   # 内容管理
│   ├── material/               # 物料管理
│   │   ├── material-generation.html # 物料生成
│   │   └── material-manage.html   # 物料管理
│   ├── training/               # 培训管理
│   │   └── training-manage.html  # 培训管理
│   ├── speech/                  # 话术管理
│   │   └── speech-manage.html    # 话术管理
│   ├── project/                # 项目管理
│   │   └── project-manage.html   # 项目管理
│   ├── team/                   # 团队管理
│   │   └── team-manage.html      # 团队管理
│   ├── data/                   # 数据分析
│   │   └── data-analysis.html    # 数据分析
│   └── board/                  # 数据看板
│       ├── board-chairman.html   # 董事长看板 v1
│       └── board-chairman-2.html # 董事长看板 v2
└── components/                 # 公共组件
    └── sidebar.component.html    # 侧边栏组件
```

## 页面说明

### 首页
| 文件 | 说明 |
|------|------|
| index.html | 管理后台首页 / 仪表盘 |

### 任务管理
| 文件 | 说明 |
|------|------|
| task-create.html | 创建新任务，设置任务规则、打卡点等 |
| task-manage.html | 任务列表管理，支持筛选、搜索 |
| task-tracking.html | 任务执行跟踪，查看完成进度 |

### 内容管理
| 文件 | 说明 |
|------|------|
| content-calendar.html | 内容日历，按时间展示任务 |
| content-manage.html | 内容素材管理，图片、视频、文案 |

### 物料管理
| 文件 | 说明 |
|------|------|
| material-generation.html | AI 物料生成，批量生成文案、海报 |
| material-manage.html | 物料库管理，归档、整理素材 |

### 培训管理
| 文件 | 说明 |
|------|------|
| training-manage.html | 培训课程管理，学习任务分配 |

### 话术管理
| 文件 | 说明 |
|------|------|
| speech-manage.html | 标准话术库管理，探盘说辞、销售话术 |

### 项目管理
| 文件 | 说明 |
|------|------|
| project-manage.html | 楼盘项目管理，新增、编辑楼盘信息 |

### 团队管理
| 文件 | 说明 |
|------|------|
| team-manage.html | 团队成员管理，经纪人、店长等角色 |

### 数据分析
| 文件 | 说明 |
|------|------|
| data-analysis.html | 数据统计分析，业绩、任务完成率 |

### 数据看板
| 文件 | 说明 |
|------|------|
| board-chairman.html | 董事长看板 v1，核心指标展示 |
| board-chairman-2.html | 董事长看板 v2，升级版看板 |

### 公共组件
| 文件 | 说明 |
|------|------|
| sidebar.component.html | 侧边栏导航组件 |

## 技术栈

- **前端**: HTML5 + CSS3 + Vanilla JavaScript
- **图标**: Font Awesome 4.7
- **字体**: 系统默认字体栈
- **布局**: Flexbox + CSS Grid
- **响应式**: 适配 PC 端（1920px / 1440px / 1366px）

## 设计规范

### 颜色主题
| 用途 | 色值 |
|------|------|
| 主色 | #FA8C16 (橙色) |
| 辅助色 | #722ED1 (紫色) |
| 成功色 | #00B42A (绿色) |
| 警告色 | #FF7D00 (橙色) |
| 危险色 | #FA5151 (红色) |
| 信息色 | #007AFF (蓝色) |

### 字体
- 主字体: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif

## 部署说明

1. 将 `pc` 目录部署到 Web 服务器
2. 确保服务器支持 SPA 路由或直接访问 HTML 文件
3. 入口文件: `index.html`

## 更新日志

| 日期 | 版本 | 更新内容 |
|------|------|----------|
| 2026-03-30 | v1.0 | 初始版本，包含所有页面 |
