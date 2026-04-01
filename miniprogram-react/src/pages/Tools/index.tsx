import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

interface Tool {
  id: number;
  title: string;
  desc: string;
  color: string;
  height: 'tall' | 'medium' | 'short';
  image: string;
  path?: string;
  collected: boolean;
}

interface Notification {
  id: number;
  taskName: string;
  taskType: 'exploration' | 'speech' | 'content';
  message: string;
  isRead: boolean;
  createTime: Date;
}

const tools: Tool[] = [
  {
    id: 1,
    title: '好房榜AI助手',
    desc: '好房榜单，一键精准推荐',
    color: 'linear-gradient(135deg, rgba(255,183,77,0.6) 0%, rgba(255,107,53,0.85) 100%)',
    height: 'medium',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=336&h=326&fit=crop',
    collected: false,
  },
  {
    id: 2,
    title: '房屋营销方案',
    desc: '为您的房一键生成营销方案',
    color: 'linear-gradient(135deg, rgba(102,126,234,0.6) 0%, rgba(118,75,162,0.85) 100%)',
    height: 'tall',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=336&h=448&fit=crop',
    collected: false,
  },
  {
    id: 3,
    title: '房源笔记生成器',
    desc: '好房榜单，一键精准推荐',
    color: 'linear-gradient(135deg, rgba(236,72,153,0.6) 0%, rgba(190,24,93,0.85) 100%)',
    height: 'medium',
    image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=336&h=326&fit=crop',
    collected: false,
  },
  {
    id: 4,
    title: '麦田推荐',
    desc: '为您的房一键生成营销方案',
    color: 'linear-gradient(135deg, rgba(239,68,68,0.6) 0%, rgba(185,28,28,0.85) 100%)',
    height: 'short',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=336&h=204&fit=crop',
    collected: false,
  },
  {
    id: 5,
    title: 'AI话术训练',
    desc: '智能对话，仿真场景练习',
    color: 'linear-gradient(135deg, rgba(0,200,200,0.6) 0%, rgba(0,150,150,0.85) 100%)',
    height: 'medium',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=336&h=326&fit=crop',
    path: '/speech-train',
    collected: false,
  },
];

const Tools: React.FC = () => {
  const navigate = useNavigate();
  const [toolList, setToolList] = useState<Tool[]>(tools);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      taskName: '中海汇德里探盘任务',
      taskType: 'exploration',
      message: '2/4阶段进行中，请注意完成',
      isRead: false,
      createTime: new Date(),
    },
    {
      id: 2,
      taskName: '万科城市之光话术训练',
      taskType: 'speech',
      message: '新任务已下发，请及时完成',
      isRead: false,
      createTime: new Date(Date.now() - 10 * 60 * 1000),
    },
    {
      id: 3,
      taskName: '朋友圈文案生成',
      taskType: 'content',
      message: '等待探盘完成后执行',
      isRead: true,
      createTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  ]);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'exploration' | 'speech' | 'content'>('all');

  const showToast = (message: string, duration: number = 2000) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
  };

  const showAutoToast = (message: string) => {
    const toast = document.createElement('div');
    toast.className = 'auto-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  useEffect(() => {
    // 自动弹出通知提示（演示用）
    setTimeout(() => {
      showAutoToast('您有新的任务通知');
    }, 1500);
  }, []);

  const handleToolClick = (tool: Tool) => {
    if (tool.path) {
      navigate(tool.path);
    } else {
      showToast(tool.title);
    }
  };

  const handleCollect = (e: React.MouseEvent, toolId: number) => {
    e.stopPropagation();
    setToolList(prev => prev.map(tool => {
      if (tool.id === toolId) {
        const newCollected = !tool.collected;
        showToast(newCollected ? '已添加' : '已移除');
        return { ...tool, collected: newCollected };
      }
      return tool;
    }));
  };

  const handleNotificationClick = (id: number, type: string) => {
    // 标记已读
    setNotifications(prev => prev.map(note => 
      note.id === id ? { ...note, isRead: true } : note
    ));
    setShowNotificationPanel(false);
    
    // 跳转对应页面
    if (type === 'exploration') {
      // 假设任务详情页面路径
      showToast('跳转到任务详情页面');
    } else if (type === 'speech') {
      navigate('/speech-train');
    } else if (type === 'content') {
      navigate('/calendar');
    }
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    showAutoToast('已清空全部通知');
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString();
  };

  const filteredNotifications = activeFilter === 'all' 
    ? notifications 
    : notifications.filter(note => note.taskType === activeFilter);

  const unreadCount = notifications.filter(note => !note.isRead).length;

  return (
    <div className="tools-page">
      {/* 状态栏 */}
      <div className="status-bar" />
      
      {/* 标题栏 */}
      <div className="title-bar">
        <div className="logo-section">
          <div className="logo-icon">
            <span>AI</span>
          </div>
          <span className="title-text">服务工具</span>
        </div>
        <button 
          className="notification-btn"
          onClick={() => setShowNotificationPanel(true)}
        >
          <i className="fa fa-bell-o" />
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </button>
      </div>

      {/* 搜索栏 */}
      <div className="search-section">
        <div className="search-bar">
          <i className="fa fa-search search-icon" />
          <input 
            type="text" 
            className="search-input" 
            placeholder="输入工具名称"
          />
          <button className="search-btn">搜索</button>
        </div>
      </div>

      {/* 筛选区域 */}
      <div className="filter-bar">
        <div className="filter-left">
          <i className="fa fa-sliders" />
          <span>管理排序</span>
        </div>
        <div className="filter-right">
        </div>
      </div>

      {/* 横幅 */}
      <img 
        className="banner-img" 
        src="https://images.unsplash.com/photo-1557821552-17105176677c?w=690&h=288&fit=crop" 
        alt="Banner"
      />

      {/* 工具网格 */}
      <div className="tools-grid">
        {toolList.map((tool) => (
          <div
            key={tool.id}
            className={`tool-card tool-card-${tool.height}`}
            onClick={() => handleToolClick(tool)}
          >
            <img className="tool-card-img" src={tool.image} alt={tool.title} />
            <div 
              className="tool-card-overlay"
              style={{ background: tool.color }}
            />
            <div className="tool-card-content">
              <button 
                className="tool-card-collect"
                onClick={(e) => handleCollect(e, tool.id)}
                style={{ background: tool.collected ? 'rgba(255,255,255,0.5)' : '' }}
              >
                <i className={tool.collected ? 'fa fa-check' : 'fa fa-plus'} />
              </button>
              <h4 className="tool-card-title">{tool.title}</h4>
              <p className="tool-card-desc">{tool.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 更多工具按钮 */}
      <div className="more-tools">
        <button className="more-tools-btn" onClick={() => showToast('查看更多工具')}>
          查看更多工具 <i className="fa fa-chevron-down" />
        </button>
      </div>

      {/* 通知面板 */}
      <div 
        className={`notification-overlay ${showNotificationPanel ? 'show' : ''}`}
        onClick={() => setShowNotificationPanel(false)}
      />
      <div 
        className={`notification-panel ${showNotificationPanel ? 'show' : ''}`}
      >
        {/* 面板头部 */}
        <div className="notification-header">
          <span className="notification-title">通知</span>
          <div className="notification-actions">
            <button 
              className="clear-all-btn"
              onClick={() => clearAllNotifications()}
            >
              清空全部
            </button>
            <i 
              className="fa fa-times close-btn"
              onClick={() => setShowNotificationPanel(false)}
            />
          </div>
        </div>
        
        {/* 分类Tab */}
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            全部
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'exploration' ? 'active' : ''}`}
            onClick={() => setActiveFilter('exploration')}
          >
            探盘
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'speech' ? 'active' : ''}`}
            onClick={() => setActiveFilter('speech')}
          >
            话术
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'content' ? 'active' : ''}`}
            onClick={() => setActiveFilter('content')}
          >
            内容
          </button>
        </div>
        
        {/* 消息列表 */}
        <div className="notification-list">
          {filteredNotifications.length === 0 ? (
            <div className="empty-notification">
              暂无通知
            </div>
          ) : (
            filteredNotifications.map((note) => (
              <div 
                key={note.id}
                className={`notification-item ${note.isRead ? 'read' : ''}`}
                onClick={() => handleNotificationClick(note.id, note.taskType)}
              >
                <div className="notification-item-header">
                  <span className={`read-indicator ${note.isRead ? 'read' : ''}`} />
                  <span className="notification-task-name">{note.taskName}</span>
                  <span className="notification-task-type">
                    {note.taskType === 'exploration' ? '探盘' : 
                     note.taskType === 'speech' ? '话术' : '内容'}
                  </span>
                </div>
                <div className="notification-message">{note.message}</div>
                <div className="notification-time">{formatTime(note.createTime)}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Tools;
