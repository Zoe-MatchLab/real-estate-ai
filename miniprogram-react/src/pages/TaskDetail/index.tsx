import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './index.css';

interface TaskStage {
  id: number;
  name: string;
  status: 'pending' | 'in_progress' | 'completed';
  icon: string;
}

interface TaskInfo {
  id: string;
  taskName: string;
  buildingName: string;
  buildingAddress: string;
  executorName: string;
  deadline: string;
  status: string;
  requirements: string;
}

const TaskDetail: React.FC = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [currentStage, setCurrentStage] = useState(0);

  const taskInfo: TaskInfo = {
    id: taskId || 'T20260326001',
    taskName: '中海汇德里新盘探盘',
    buildingName: '中海汇德里',
    buildingAddress: '北京市海淀区中关村大街1号',
    executorName: '陈佳佳',
    deadline: '2026-04-07 18:00',
    status: '进行中',
    requirements: '1. 拍摄楼盘整体外观照\n2. 录制沙盘讲解视频\n3. 拍摄样板间照片\n4. 收集周边配套信息',
  };

  const stages: TaskStage[] = [
    { id: 1, name: '定位打卡', status: 'completed', icon: 'fa-map-marker' },
    { id: 2, name: '点位打卡', status: 'in_progress', icon: 'fa-camera' },
    { id: 3, name: '文案确认', status: 'pending', icon: 'fa-file-text' },
    { id: 4, name: '成果生成', status: 'pending', icon: 'fa-check-circle' },
  ];

  const showToast = (message: string, duration: number = 2000) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
  };

  const handleStageClick = (stageId: number) => {
    setCurrentStage(stageId);
    switch (stageId) {
      case 1:
        showToast('进入定位打卡阶段');
        break;
      case 2:
        showToast('进入点位打卡阶段');
        break;
      case 3:
        showToast('进入文案确认阶段');
        break;
      case 4:
        showToast('进入成果生成阶段');
        break;
    }
  };

  const handleSpeechTrain = () => {
    navigate('/speech-train');
  };

  const handleSubmitTask = () => {
    showToast('任务提交成功，等待审核');
    setTimeout(() => {
      navigate('/task-list');
    }, 1500);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '待执行';
      case 'in_progress':
        return '进行中';
      case 'completed':
        return '已完成';
      default:
        return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'in_progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  return (
    <div className="task-detail-page">
      {/* 顶部导航 */}
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fa fa-angle-left text-xl" />
        </button>
        <h1 className="page-title">任务详情</h1>
        <button className="more-btn">
          <i className="fa fa-ellipsis-h text-lg" />
        </button>
      </div>

      {/* 任务信息卡片 */}
      <div className="task-info-card">
        <div className="task-header">
          <h2 className="task-name">{taskInfo.taskName}</h2>
          <span className={`task-status ${getStatusClass(taskInfo.status)}`}>
            {getStatusText(taskInfo.status)}
          </span>
        </div>
        <div className="task-info-list">
          <div className="info-item">
            <i className="fa fa-building text-primary" />
            <span className="info-label">楼盘：</span>
            <span className="info-value">{taskInfo.buildingName}</span>
          </div>
          <div className="info-item">
            <i className="fa fa-map-marker text-primary" />
            <span className="info-label">地址：</span>
            <span className="info-value">{taskInfo.buildingAddress}</span>
          </div>
          <div className="info-item">
            <i className="fa fa-user text-primary" />
            <span className="info-label">执行人：</span>
            <span className="info-value">{taskInfo.executorName}</span>
          </div>
          <div className="info-item">
            <i className="fa fa-clock-o text-primary" />
            <span className="info-label">截止时间：</span>
            <span className="info-value deadline">{taskInfo.deadline}</span>
          </div>
        </div>
        <div className="task-requirements">
          <h3 className="requirements-title">任务要求</h3>
          <pre className="requirements-content">{taskInfo.requirements}</pre>
        </div>
      </div>

      {/* 四阶段进度 */}
      <div className="stages-section">
        <h3 className="section-title">执行进度</h3>
        <div className="stages-container">
          {stages.map((stage, index) => (
            <div
              key={stage.id}
              className={`stage-item ${stage.status} ${currentStage === stage.id ? 'active' : ''}`}
              onClick={() => handleStageClick(stage.id)}
            >
              <div className="stage-icon">
                <i className={`fa ${stage.icon}`} />
              </div>
              <div className="stage-info">
                <span className="stage-name">阶段{stage.id}</span>
                <span className="stage-status">{getStatusText(stage.status)}</span>
              </div>
              {index < stages.length - 1 && (
                <div className={`stage-connector ${stage.status === 'completed' ? 'completed' : ''}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 功能按钮 */}
      <div className="action-buttons">
        <button className="action-btn speech-btn" onClick={handleSpeechTrain}>
          <i className="fa fa-comments" />
          <span>话术训练</span>
        </button>
        <button className="action-btn submit-btn" onClick={handleSubmitTask}>
          <i className="fa fa-check" />
          <span>提交任务</span>
        </button>
      </div>
    </div>
  );
};

export default TaskDetail;
