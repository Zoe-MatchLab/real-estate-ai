import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

interface Task {
  id: string;
  title: string;
  status: 'in_progress' | 'pending' | 'completed' | 'overdue';
  checkpoints: number;
  completedCheckpoints: number;
  location: string;
  deadline: string;
  progress: number;
  completedDate?: string;
  overdueDays?: number;
}

const TaskList: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [showFilter, setShowFilter] = useState(false);

  const tasks: Task[] = [
    {
      id: 'T20260326001',
      title: '中海汇德里新盘探盘',
      status: 'in_progress',
      checkpoints: 4,
      completedCheckpoints: 2,
      location: '北京市海淀区',
      deadline: '今日18:00',
      progress: 50,
    },
    {
      id: 'T20260327001',
      title: '公园壹号开盘前探盘',
      status: 'pending',
      checkpoints: 6,
      completedCheckpoints: 0,
      location: '北京市朝阳区',
      deadline: '明天18:00',
      progress: 0,
    },
    {
      id: 'T20260325001',
      title: '未来城项目周边调研',
      status: 'completed',
      checkpoints: 5,
      completedCheckpoints: 5,
      location: '北京市昌平区',
      deadline: '',
      progress: 100,
      completedDate: '2026-03-25',
    },
    {
      id: 'T20260324001',
      title: '悦府二期样板间拍摄',
      status: 'overdue',
      checkpoints: 3,
      completedCheckpoints: 1,
      location: '北京市西城区',
      deadline: '',
      progress: 33,
      overdueDays: 1,
    },
  ];

  const showToast = (message: string, duration: number = 2000) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
  };

  const goToDetail = (taskId: string) => {
    // 跳转到任务详情页
    showToast(`跳转到任务 ${taskId} 详情页`);
  };

  const switchTab = (index: number) => {
    setActiveTab(index);
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === 0) return true; // 全部
    if (activeTab === 1) return task.status === 'in_progress' || task.status === 'pending'; // 待完成
    if (activeTab === 2) return task.status === 'completed'; // 已完成
    if (activeTab === 3) return task.status === 'overdue'; // 已逾期
    return true;
  });

  const getStatusConfig = (status: Task['status']) => {
    switch (status) {
      case 'in_progress':
        return {
          text: '进行中',
          className: 'status-in-progress',
          icon: 'fa-map-marker',
          iconBg: 'bg-blue-50',
          iconColor: 'text-blue-500',
          progressColor: 'bg-warning',
          progressTextColor: 'text-warning',
        };
      case 'pending':
        return {
          text: '待开始',
          className: 'status-pending',
          icon: 'fa-map-marker',
          iconBg: 'bg-blue-50',
          iconColor: 'text-blue-500',
          progressColor: 'bg-gray-300',
          progressTextColor: 'text-gray-400',
        };
      case 'completed':
        return {
          text: '已完成',
          className: 'status-completed',
          icon: 'fa-check',
          iconBg: 'bg-green-50',
          iconColor: 'text-success',
          progressColor: 'bg-success',
          progressTextColor: 'text-success',
        };
      case 'overdue':
        return {
          text: '已逾期',
          className: 'status-overdue',
          icon: 'fa-times',
          iconBg: 'bg-red-50',
          iconColor: 'text-danger',
          progressColor: 'bg-danger',
          progressTextColor: 'text-danger',
        };
      default:
        return {
          text: '',
          className: '',
          icon: 'fa-map-marker',
          iconBg: 'bg-blue-50',
          iconColor: 'text-blue-500',
          progressColor: 'bg-gray-300',
          progressTextColor: 'text-gray-400',
        };
    }
  };

  return (
    <div className="task-list-page">
      {/* 顶部导航 */}
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fa fa-angle-left text-xl" />
        </button>
        <h1 className="page-title">我的任务</h1>
        <button 
          className="filter-btn"
          onClick={() => setShowFilter(true)}
        >
          <i className="fa fa-calendar-o mr-1" />
          <span>筛选</span>
        </button>
      </div>

      {/* 标签切换 */}
      <div className="tab-bar">
        <button 
          className={`tab-item ${activeTab === 0 ? 'active' : ''}`}
          onClick={() => switchTab(0)}
        >
          全部
        </button>
        <button 
          className={`tab-item ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => switchTab(1)}
        >
          待完成
        </button>
        <button 
          className={`tab-item ${activeTab === 2 ? 'active' : ''}`}
          onClick={() => switchTab(2)}
        >
          已完成
        </button>
        <button 
          className={`tab-item ${activeTab === 3 ? 'active' : ''}`}
          onClick={() => switchTab(3)}
        >
          已逾期
        </button>
      </div>

      {/* 任务列表 */}
      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => {
            const statusConfig = getStatusConfig(task.status);
            return (
              <div 
                key={task.id} 
                className={`task-card ${task.status === 'completed' ? 'opacity-80' : ''}`}
                onClick={() => goToDetail(task.id)}
              >
                <div className="task-header">
                  <div>
                    <div className="task-status-container">
                      <span className={`task-status ${statusConfig.className}`}>
                        {statusConfig.text}
                      </span>
                      <h3 className="task-title">{task.title}</h3>
                    </div>
                    <p className="task-checkpoints">
                      共{task.checkpoints}个打卡点 · 已完成{task.completedCheckpoints}个
                    </p>
                    <div className="task-info">
                      <i className="fa fa-map-marker mr-1" />
                      <span>{task.location}</span>
                      <span className="info-separator">·</span>
                      <i className={`fa ${task.status === 'completed' ? 'fa-check-circle text-success' : task.status === 'overdue' ? 'fa-exclamation-triangle text-danger' : 'fa-clock-o'} mr-1`} />
                      <span className={task.status === 'overdue' ? 'text-danger' : task.status === 'in_progress' ? 'text-warning' : ''}>
                        {task.status === 'completed' ? `${task.completedDate} 完成` : 
                         task.status === 'overdue' ? `逾期${task.overdueDays}天` : 
                         task.deadline}
                      </span>
                    </div>
                  </div>
                  <div className="task-icon-container">
                    <div className={`task-icon ${statusConfig.iconBg} ${statusConfig.iconColor}`}>
                      <i className={`fa ${statusConfig.icon}`} />
                    </div>
                    <div className={statusConfig.progressTextColor}>
                      {task.progress}%
                    </div>
                  </div>
                </div>
                {/* 进度条 */}
                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${statusConfig.progressColor}`}
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
                {/* 操作栏 */}
                {(task.status === 'completed' || task.status === 'overdue') && (
                  <div className="task-actions">
                    {task.status === 'completed' ? (
                      <>
                        <button className="action-btn secondary">
                          <i className="fa fa-file-video-o mr-1" />
                          <span>查看生成视频</span>
                        </button>
                        <button className="action-btn secondary">
                          <i className="fa fa-file-image-o mr-1" />
                          <span>查看宣发物料</span>
                        </button>
                        <button className="action-btn primary">
                          <i className="fa fa-repeat mr-1" />
                          <span>再次打卡</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="action-btn secondary">
                          <i className="fa fa-info-circle mr-1" />
                          <span>逾期原因</span>
                        </button>
                        <button className="action-btn secondary text-danger">
                          <i className="fa fa-refresh mr-1" />
                          <span>重新派发</span>
                        </button>
                        <button className="action-btn primary">
                          <i className="fa fa-edit mr-1" />
                          <span>继续完成</span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="fa fa-tasks text-6xl" />
            </div>
            <h3>暂无相关任务</h3>
            <p>快去领取新的探盘任务吧</p>
          </div>
        )}
      </div>

      {/* 筛选弹窗 */}
      <div 
        className={`filter-modal ${showFilter ? 'show' : ''}`}
        onClick={() => setShowFilter(false)}
      >
        <div className="filter-content" onClick={(e) => e.stopPropagation()}>
          <div className="filter-header">
            <h3>筛选条件</h3>
            <button className="close-btn" onClick={() => setShowFilter(false)}>
              <i className="fa fa-close" />
            </button>
          </div>

          <div className="filter-section">
            <h4>任务类型</h4>
            <div className="filter-options">
              <span className="filter-option active">探盘任务</span>
              <span className="filter-option">训练任务</span>
              <span className="filter-option">话术任务</span>
              <span className="filter-option">内容任务</span>
            </div>
          </div>

          <div className="filter-section">
            <h4>时间范围</h4>
            <div className="time-options">
              <button className="time-option active">全部</button>
              <button className="time-option">今日</button>
              <button className="time-option">本周</button>
              <button className="time-option">本月</button>
            </div>
            <div className="date-range">
              <div className="date-input">
                <label>开始时间</label>
                <input type="date" />
              </div>
              <div className="date-input">
                <label>结束时间</label>
                <input type="date" />
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h4>所属区域</h4>
            <div className="filter-options">
              <span className="filter-option active">全部区域</span>
              <span className="filter-option">海淀区</span>
              <span className="filter-option">朝阳区</span>
              <span className="filter-option">西城区</span>
              <span className="filter-option">东城区</span>
              <span className="filter-option">昌平区</span>
            </div>
          </div>

          <div className="filter-actions">
            <button className="reset-btn">重置</button>
            <button className="confirm-btn" onClick={() => setShowFilter(false)}>
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
