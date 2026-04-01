import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Calendar: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<number>(0); // 0 表示今天
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showNotification, setShowNotification] = useState(false);

  const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const selectDate = (index: number) => {
    setSelectedDate(index);
  };

  const filterTasks = (type: string) => {
    setSelectedFilter(type);
    showToast(`筛选：${type}`);
  };

  const gotoTask = () => {
    navigate('/task-list');
  };

  const gotoSpeechTrain = () => {
    navigate('/speech-train');
  };

  const gotoHouseNotify = () => {
    navigate('/house-notify');
  };

  const handleContentClick = (status: string) => {
    if (status === 'locked') {
      showToast('内容发布需先完成探盘打卡');
      return;
    }
    showToast('内容发布功能即将上线');
  };

  const showNotificationPanel = () => {
    setShowNotification(true);
  };

  const hideNotificationPanel = () => {
    setShowNotification(false);
  };

  const clearAllNotifications = () => {
    showToast('已清空全部通知');
  };

  const filterNotifications = (type: string) => {
    showToast(`筛选通知：${type}`);
  };

  const handleNotificationClick = (type: string) => {
    hideNotificationPanel();
    if (type === 'exploration') {
      navigate('/task-list');
    } else if (type === 'speech') {
      navigate('/speech-train');
    }
  };

  const dates = [
    { day: '29', weekday: '周日', date: '3月29日' },
    { day: '30', weekday: '周一', date: '3月30日' },
    { day: '31', weekday: '周二', date: '3月31日' },
    { day: '今天', weekday: '周三', date: '今天', isToday: true },
    { day: '2', weekday: '周四', date: '4月2日' },
    { day: '3', weekday: '周五', date: '4月3日' },
    { day: '4', weekday: '周六', date: '4月4日' },
    { day: '5', weekday: '周日', date: '4月5日' },
    { day: '6', weekday: '周一', date: '4月6日' },
    { day: '7', weekday: '周二', date: '4月7日' },
  ];

  return (
    <div className="calendar-page">
      {/* 状态栏 */}
      <div className="status-bar" />

      {/* 标题栏 */}
      <div className="page-header">
        <span className="page-title">内容日历</span>
        <div className="header-actions">
          <div className="notification-bell" onClick={showNotificationPanel}>
            <i className="fa fa-bell text-gray-500 text-xl" />
            <span className="notify-badge">3</span>
          </div>
          <div className="header-icons">
            <i className="fa fa-search text-gray-400" />
            <i className="fa fa-ellipsis-h text-gray-400" />
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="main-content">
        {/* 左侧日期列表 */}
        <div className="date-sidebar">
          {dates.map((date, index) => (
            <div 
              key={index} 
              className={`date-item ${selectedDate === index ? 'active' : ''}`}
              onClick={() => selectDate(index)}
            >
              <div className={date.isToday ? 'date-day active' : 'date-day'}>{date.day}</div>
              <div className={date.isToday ? 'date-weekday active' : 'date-weekday'}>{date.weekday}</div>
            </div>
          ))}
        </div>

        {/* 右侧任务列表 */}
        <div className="task-content">
          {/* 类型筛选 */}
          <div className="filter-chips">
            <div 
              className={`filter-chip ${selectedFilter === 'all' ? 'active' : ''}`}
              onClick={() => filterTasks('all')}
            >
              全部(8)
            </div>
            <div 
              className={`filter-chip ${selectedFilter === 'house' ? 'active' : ''}`}
              onClick={() => filterTasks('house')}
            >
              🏠探盘(2)
            </div>
            <div 
              className={`filter-chip ${selectedFilter === 'speech' ? 'active' : ''}`}
              onClick={() => filterTasks('speech')}
            >
              💬话术(3)
            </div>
            <div 
              className={`filter-chip ${selectedFilter === 'content' ? 'active' : ''}`}
              onClick={() => filterTasks('content')}
            >
              📝内容(1)
            </div>
            <div 
              className={`filter-chip new-house ${selectedFilter === 'newHouse' ? 'active' : ''}`}
              onClick={() => filterTasks('newHouse')}
            >
              🏠新房(1)
            </div>
          </div>

          {/* 新房上线通知卡片 */}
          <div className="task-card new-house-card" onClick={gotoHouseNotify}>
            <div className="card-header">
              <div className="card-type">
                <span className="type-icon red">
                  <i className="fa fa-home text-red-500 text-xs" />
                </span>
                <span className="type-text red">新房上线</span>
                <span className="card-time">刚刚</span>
              </div>
            </div>
            <h3 className="card-title">中海汇德里</h3>
            <p className="card-description">新房项目已上线，请配置探盘任务</p>
            <div className="card-meta">
              <i className="fa fa-map-marker mr-1" />
              <span>浦东新区</span>
              <span className="meta-separator">·</span>
              <i className="fa fa-jpy mr-1" />
              <span>8.5万/㎡</span>
            </div>
            <div className="card-actions">
              <button className="action-btn red">立即配置</button>
            </div>
          </div>

          {/* 探盘任务卡片 */}
          <div className="task-card" onClick={gotoTask}>
            <div className="card-header">
              <div className="card-info">
                <span className="status-tag progress">进行中</span>
                <h3 className="card-title">中海汇德里新盘探盘</h3>
              </div>
              <div className="card-icon blue">
                <i className="fa fa-map-marker" />
                <span className="progress-percent">50%</span>
              </div>
            </div>
            <p className="card-description">共4个打卡点 · 已完成2个</p>
            <div className="card-meta">
              <i className="fa fa-map-marker mr-1" />
              <span>上海市浦东新区</span>
              <span className="meta-separator">·</span>
              <i className="fa fa-clock-o mr-1" />
              <span className="deadline">今日18:00截止</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '50%' }}></div>
            </div>
          </div>

          {/* 内容任务卡片 */}
          <div className="task-card" onClick={() => handleContentClick('unlocked')}>
            <div className="card-header">
              <div className="card-info">
                <span className="status-tag pending">待执行</span>
                <h3 className="card-title">朋友圈文案生成 - 中海汇德里</h3>
              </div>
              <div className="card-icon green">
                <i className="fa fa-pencil" />
              </div>
            </div>
            <p className="card-description">需生成3条文案</p>
            <div className="card-meta">
              <i className="fa fa-file-text-o mr-1" />
              <span>待发布</span>
              <span className="meta-separator">·</span>
              <i className="fa fa-clock-o mr-1" />
              <span>明天15:00截止</span>
            </div>
            <div className="card-actions">
              <button className="action-btn green">去创作</button>
            </div>
          </div>

          {/* 话术训练卡片 */}
          <div className="task-card" onClick={gotoSpeechTrain}>
            <div className="card-header">
              <div className="card-type">
                <span className="type-text purple">话术训练</span>
              </div>
              <span className="status-tag pending">待执行</span>
            </div>
            <h3 className="card-title">沙盘讲解话术练习</h3>
            <div className="card-meta">
              <span>📍 保利天汇</span>
              <span className="meta-separator">·</span>
              <span>🕐 明天 14:00</span>
            </div>
            <div className="card-actions">
              <button className="action-btn purple">开始训练</button>
            </div>
          </div>
        </div>
      </div>

      {/* 通知面板 */}
      {showNotification && (
        <>
          <div className="notification-overlay show" onClick={hideNotificationPanel}></div>
          <div className="notification-panel show">
            <div className="notification-header">
              <span className="notification-title">通知</span>
              <div className="notification-actions">
                <button className="clear-btn" onClick={clearAllNotifications}>清空全部</button>
                <i className="fa fa-times text-gray-400" onClick={hideNotificationPanel} />
              </div>
            </div>
            <div className="notification-tabs">
              <button 
                className="notification-tab active" 
                onClick={() => filterNotifications('all')}
              >
                全部
              </button>
              <button 
                className="notification-tab" 
                onClick={() => filterNotifications('exploration')}
              >
                探盘
              </button>
              <button 
                className="notification-tab" 
                onClick={() => filterNotifications('speech')}
              >
                话术
              </button>
              <button 
                className="notification-tab" 
                onClick={() => filterNotifications('content')}
              >
                内容
              </button>
            </div>
            <div className="notification-list">
              <div className="notification-item" onClick={() => handleNotificationClick('exploration')}>
                <div className="notification-info">
                  <div className="notification-header-info">
                    <span className="notification-dot"></span>
                    <span className="notification-task">中海汇德里探盘任务</span>
                    <span className="notification-type">探盘</span>
                  </div>
                  <div className="notification-message">2/4阶段进行中，请注意完成</div>
                  <div className="notification-time">刚刚</div>
                </div>
              </div>
              <div className="notification-item" onClick={() => handleNotificationClick('speech')}>
                <div className="notification-info">
                  <div className="notification-header-info">
                    <span className="notification-dot"></span>
                    <span className="notification-task">万科城市之光话术训练</span>
                    <span className="notification-type">话术</span>
                  </div>
                  <div className="notification-message">新任务已下发，请及时完成</div>
                  <div className="notification-time">10分钟前</div>
                </div>
              </div>
              <div className="notification-item read" onClick={() => handleNotificationClick('content')}>
                <div className="notification-info">
                  <div className="notification-header-info">
                    <span className="notification-dot read"></span>
                    <span className="notification-task">朋友圈文案生成</span>
                    <span className="notification-type">内容</span>
                  </div>
                  <div className="notification-message">等待探盘完成后执行</div>
                  <div className="notification-time">1天前</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Calendar;
