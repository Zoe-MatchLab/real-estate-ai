import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

interface TrainingType {
  id: string;
  title: string;
  description: string;
  completed: number;
  total: number;
  icon: string;
  iconColor: string;
  iconBg: string;
}

interface PendingTraining {
  id: string;
  title: string;
  type: string;
  deadline: string;
  description: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  action: string;
  actionType: 'primary' | 'secondary';
}

interface TrainingRecord {
  id: string;
  title: string;
  date: string;
  score: number;
  status: 'excellent' | 'good' | 'needs补考';
  icon: string;
  iconColor: string;
  iconBg: string;
}

const Train: React.FC = () => {
  const navigate = useNavigate();

  const showToast = (message: string, duration: number = 2000) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
  };

  const goToTrain = (type: string) => {
    showToast(`跳转到${type}训练列表页`);
  };

  const startTrain = (url: string) => {
    showToast(`跳转到${url}页面`);
  };

  const trainingTypes: TrainingType[] = [
    {
      id: 'product',
      title: '产品力训练',
      description: '楼盘知识掌握',
      completed: 8,
      total: 12,
      icon: 'fa-book',
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-50',
    },
    {
      id: 'speech',
      title: '话术训练',
      description: '沟通能力提升',
      completed: 4,
      total: 8,
      icon: 'fa-comments',
      iconColor: 'text-purple-500',
      iconBg: 'bg-purple-50',
    },
    {
      id: 'negotiate',
      title: '议价谈判',
      description: '成交能力训练',
      completed: 2,
      total: 6,
      icon: 'fa-handshake-o',
      iconColor: 'text-orange-500',
      iconBg: 'bg-orange-50',
    },
    {
      id: 'law',
      title: '政策法规',
      description: '合规知识学习',
      completed: 3,
      total: 5,
      icon: 'fa-file-text-o',
      iconColor: 'text-red-500',
      iconBg: 'bg-red-50',
    },
  ];

  const pendingTrainings: PendingTraining[] = [
    {
      id: '1',
      title: '中海汇德里产品知识专项训练',
      type: '产品力训练',
      deadline: '今日截止',
      description: '20道题 · 预计15分钟完成 · 需达到80分合格',
      icon: 'fa-book',
      iconColor: 'text-orange-500',
      iconBg: 'bg-orange-50',
      action: '开始训练',
      actionType: 'primary',
    },
    {
      id: '2',
      title: '邀约话术专项训练',
      type: '话术训练',
      deadline: '明日截止',
      description: '10道情景题 · 上传1段录音 · AI智能评分',
      icon: 'fa-comments',
      iconColor: 'text-purple-500',
      iconBg: 'bg-purple-50',
      action: '明天做',
      actionType: 'secondary',
    },
  ];

  const trainingRecords: TrainingRecord[] = [
    {
      id: '1',
      title: '未来城产品知识训练',
      date: '2026-03-25 14:30',
      score: 92,
      status: 'excellent',
      icon: 'fa-check',
      iconColor: 'text-success',
      iconBg: 'bg-green-50',
    },
    {
      id: '2',
      title: '带看话术训练',
      date: '2026-03-24 16:20',
      score: 86,
      status: 'good',
      icon: 'fa-check',
      iconColor: 'text-success',
      iconBg: 'bg-green-50',
    },
    {
      id: '3',
      title: '政策法规考试',
      date: '2026-03-23 10:15',
      score: 72,
      status: 'needs补考',
      icon: 'fa-exclamation-circle',
      iconColor: 'text-warning',
      iconBg: 'bg-warning/10',
    },
    {
      id: '4',
      title: '议价谈判模拟训练',
      date: '2026-03-22 15:40',
      score: 88,
      status: 'excellent',
      icon: 'fa-check',
      iconColor: 'text-success',
      iconBg: 'bg-green-50',
    },
  ];

  const getStatusText = (status: TrainingRecord['status']) => {
    switch (status) {
      case 'excellent':
        return '优秀';
      case 'good':
        return '良好';
      case 'needs补考':
        return '需补考';
      default:
        return '';
    }
  };

  return (
    <div className="train-page">
      {/* 顶部导航 */}
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fa fa-angle-left text-xl" />
        </button>
        <h1 className="page-title">AI训练中心</h1>
        <button className="report-btn" onClick={() => showToast('跳转到训练报告页')}>
          <i className="fa fa-bar-chart mr-1" />
          <span>训练报告</span>
        </button>
      </div>

      {/* 数据概览 */}
      <div className="data-overview">
        <div className="overview-header">
          <h2>我的训练数据</h2>
          <span>更新于 2026-03-26</span>
        </div>
        <div className="overview-stats">
          <div className="stat-item">
            <p className="stat-number">85</p>
            <p className="stat-label">当前平均分</p>
          </div>
          <div className="stat-item">
            <p className="stat-number">12</p>
            <p className="stat-label">已完成训练</p>
          </div>
          <div className="stat-item">
            <p className="stat-number">3</p>
            <p className="stat-label">待完成训练</p>
          </div>
        </div>
        {/* 能力雷达图 */}
        <div className="ability-radar">
          <div className="radar-header">
            <p>能力维度得分</p>
            <span>满分100分</span>
          </div>
          <div className="radar-items">
            <div className="radar-item">
              <div className="radar-label">
                <span>产品知识</span>
                <span>92分</span>
              </div>
              <div className="radar-bar">
                <div className="radar-fill" style={{ width: '92%' }} />
              </div>
            </div>
            <div className="radar-item">
              <div className="radar-label">
                <span>销售话术</span>
                <span>78分</span>
              </div>
              <div className="radar-bar">
                <div className="radar-fill" style={{ width: '78%' }} />
              </div>
            </div>
            <div className="radar-item">
              <div className="radar-label">
                <span>议价能力</span>
                <span>81分</span>
              </div>
              <div className="radar-bar">
                <div className="radar-fill" style={{ width: '81%' }} />
              </div>
            </div>
            <div className="radar-item">
              <div className="radar-label">
                <span>政策法规</span>
                <span>88分</span>
              </div>
              <div className="radar-bar">
                <div className="radar-fill" style={{ width: '88%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 训练类型选择 */}
      <div className="training-types">
        <h3 className="section-title">训练类型</h3>
        <div className="types-grid">
          {trainingTypes.map((type) => (
            <div 
              key={type.id}
              className="type-card"
              onClick={() => goToTrain(type.title)}
            >
              <div className="type-header">
                <div className={`type-icon ${type.iconBg} ${type.iconColor}`}>
                  <i className={`fa ${type.icon} text-xl`} />
                </div>
                <div className="type-info">
                  <h4 className="type-title">{type.title}</h4>
                  <p className="type-description">{type.description}</p>
                </div>
              </div>
              <div className="type-footer">
                <span className="type-progress">已完成：{type.completed}/{type.total}</span>
                <span className="type-action">去训练 <i className="fa fa-angle-right ml-1" /></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 待完成训练 */}
      <div className="pending-trainings">
        <h3 className="section-title">待完成训练</h3>
        <div className="pending-list">
          {pendingTrainings.map((training) => (
            <div 
              key={training.id}
              className="pending-card"
              onClick={() => startTrain(training.type === '产品力训练' ? 'exam.html' : 'speech-train.html')}
            >
              <div className="pending-content">
                <div className={`pending-icon ${training.iconBg} ${training.iconColor}`}>
                  <i className={`fa ${training.icon}`} />
                </div>
                <div className="pending-info">
                  <div className="pending-header">
                    <span className={`pending-type ${training.type === '产品力训练' ? 'type-orange' : 'type-purple'}`}>
                      {training.type}
                    </span>
                    <span className={training.deadline === '今日截止' ? 'deadline-today' : 'deadline-normal'}>
                      {training.deadline}
                    </span>
                  </div>
                  <h4 className="pending-title">{training.title}</h4>
                  <p className="pending-description">{training.description}</p>
                </div>
              </div>
              <button className={`pending-action ${training.actionType === 'primary' ? 'action-primary' : 'action-secondary'}`}>
                {training.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 最近训练记录 */}
      <div className="training-records">
        <h3 className="section-title">最近训练记录</h3>
        <div className="records-list">
          {trainingRecords.map((record) => (
            <div key={record.id} className="record-item">
              <div className="record-content">
                <div className={`record-icon ${record.iconBg} ${record.iconColor}`}>
                  <i className={`fa ${record.icon}`} />
                </div>
                <div className="record-info">
                  <h4 className="record-title">{record.title}</h4>
                  <p className="record-date">{record.date}</p>
                </div>
              </div>
              <div className="record-score">
                <span className={record.score >= 85 ? 'score-excellent' : record.score >= 70 ? 'score-good' : 'score-poor'}>
                  {record.score}分
                </span>
                <p className="record-status">{getStatusText(record.status)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Train;
