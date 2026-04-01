import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './index.css';

interface Executor {
  id: string;
  name: string;
  group: string;
  status: string;
  avatar: string;
  color: string;
}

interface PointType {
  id: string;
  name: string;
  icon: string;
}

const TaskDistribute: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showExecutorModal, setShowExecutorModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [requireCheckIn, setRequireCheckIn] = useState(true);
  const [selectedExecutors, setSelectedExecutors] = useState<Executor[]>([]);
  const [selectedRequiredPoints, setSelectedRequiredPoints] = useState<string[]>(['photo', 'video']);
  const [selectedOptionalPoints, setSelectedOptionalPoints] = useState<string[]>([]);
  const [taskName, setTaskName] = useState('中海汇德里新盘探盘');
  const [priority, setPriority] = useState('medium');
  const [deadlineDate, setDeadlineDate] = useState('2026-04-07');
  const [deadlineTime, setDeadlineTime] = useState('18:00');
  const [requirement, setRequirement] = useState('1. 拍摄楼盘整体外观照\n2. 录制沙盘讲解视频\n3. 拍摄样板间照片\n4. 收集周边配套信息');

  const houseName = searchParams.get('houseName') || '中海汇德里';

  const executors: Executor[] = [
    {
      id: '1',
      name: '张三',
      group: '浦东A组',
      status: '正在执行1个任务',
      avatar: '张',
      color: 'bg-blue-400',
    },
    {
      id: '2',
      name: '李四',
      group: '浦东A组',
      status: '空闲',
      avatar: '李',
      color: 'bg-green-400',
    },
    {
      id: '3',
      name: '王五',
      group: '浦东B组',
      status: '空闲',
      avatar: '王',
      color: 'bg-orange-400',
    },
    {
      id: '4',
      name: '赵六',
      group: '徐汇组',
      status: '正在执行2个任务',
      avatar: '赵',
      color: 'bg-purple-400',
    },
  ];

  const requiredPoints: PointType[] = [
    { id: 'photo', name: '拍照', icon: 'fa-camera' },
    { id: 'video', name: '视频', icon: 'fa-video-camera' },
    { id: 'audio', name: '录音', icon: 'fa-microphone' },
    { id: 'text', name: '文本', icon: 'fa-file-text' },
  ];

  const optionalPoints: PointType[] = [
    { id: 'photo', name: '拍照', icon: 'fa-camera' },
    { id: 'video', name: '视频', icon: 'fa-video-camera' },
    { id: 'audio', name: '录音', icon: 'fa-microphone' },
    { id: 'text', name: '文本', icon: 'fa-file-text' },
  ];

  const showToast = (message: string, duration: number = 2000) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
  };

  const toggleCheckIn = () => {
    setRequireCheckIn(!requireCheckIn);
  };

  const toggleRequiredPoint = (pointId: string) => {
    setSelectedRequiredPoints(prev => {
      if (prev.includes(pointId)) {
        return prev.filter(id => id !== pointId);
      } else {
        return [...prev, pointId];
      }
    });
  };

  const toggleOptionalPoint = (pointId: string) => {
    setSelectedOptionalPoints(prev => {
      if (prev.includes(pointId)) {
        return prev.filter(id => id !== pointId);
      } else {
        return [...prev, pointId];
      }
    });
  };

  const toggleExecutor = (executor: Executor) => {
    setSelectedExecutors(prev => {
      if (prev.some(e => e.id === executor.id)) {
        return prev.filter(e => e.id !== executor.id);
      } else {
        return [...prev, executor];
      }
    });
  };

  const confirmExecutors = () => {
    setShowExecutorModal(false);
  };

  const saveDraft = () => {
    showToast('草稿已保存');
  };

  const validateForm = (): boolean => {
    if (!taskName.trim()) {
      showToast('请填写任务名称');
      return false;
    }

    if (!deadlineDate) {
      showToast('请选择截止时间');
      return false;
    }

    if (!requirement.trim()) {
      showToast('请填写探盘要求');
      return false;
    }

    if (selectedRequiredPoints.length === 0) {
      showToast('请至少选择一个必填点位');
      return false;
    }

    if (selectedExecutors.length === 0) {
      showToast('请选择执行人员');
      return false;
    }

    return true;
  };

  const handleConfirmDistribute = () => {
    if (validateForm()) {
      setShowConfirmModal(true);
    }
  };

  const handleSubmitDistribute = () => {
    setShowConfirmModal(false);
    showToast('任务下发成功');

    setTimeout(() => {
      navigate('/calendar');
    }, 1500);
  };

  return (
    <div className="task-distribute-page">
      {/* 顶部导航 */}
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fa fa-chevron-left text-gray-600 text-lg" />
        </button>
        <div className="header-title">配置探盘任务</div>
        <button className="save-btn" onClick={saveDraft}>
          保存草稿
        </button>
      </header>

      {/* 内容区域 */}
      <main className="content">
        {/* 楼盘信息 */}
        <div className="house-info">
          <div className="flex items-center">
            <div className="house-icon">
              <i className="fa fa-home text-primary" />
            </div>
            <div>
              <div className="house-name">{houseName}</div>
              <div className="house-location">浦东新区</div>
            </div>
          </div>
        </div>

        {/* 任务设置 */}
        <div className="task-settings">
          <h3 className="section-title">任务设置</h3>
          
          {/* 任务名称 */}
          <div className="form-group">
            <label className="form-label">
              任务名称 <span className="required">*</span>
            </label>
            <input 
              type="text" 
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="form-input"
            />
          </div>
          
          {/* 优先级 */}
          <div className="form-group">
            <label className="form-label">
              优先级 <span className="required">*</span>
            </label>
            <div className="priority-options">
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="priority" 
                  value="high" 
                  checked={priority === 'high'}
                  onChange={() => setPriority('high')}
                />
                <span>高</span>
              </label>
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="priority" 
                  value="medium" 
                  checked={priority === 'medium'}
                  onChange={() => setPriority('medium')}
                />
                <span>中</span>
              </label>
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="priority" 
                  value="low" 
                  checked={priority === 'low'}
                  onChange={() => setPriority('low')}
                />
                <span>低</span>
              </label>
            </div>
          </div>
          
          {/* 截止时间 */}
          <div className="form-group">
            <label className="form-label">
              截止时间 <span className="required">*</span>
            </label>
            <div className="deadline-inputs">
              <input 
                type="date" 
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
                className="date-input"
              />
              <input 
                type="time" 
                value={deadlineTime}
                onChange={(e) => setDeadlineTime(e.target.value)}
                className="time-input"
              />
            </div>
          </div>
          
          {/* 探盘要求 */}
          <div className="form-group">
            <label className="form-label">
              探盘要求 <span className="required">*</span>
            </label>
            <textarea 
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              rows={4}
              placeholder="请填写探盘的具体要求..."
              className="form-textarea"
            />
          </div>
        </div>

        {/* 打卡配置 */}
        <div className="checkin-config">
          <h3 className="section-title">打卡配置</h3>
          
          {/* 需要定位打卡 */}
          <div className="switch-group">
            <div>
              <div className="switch-label">需要定位打卡</div>
              <div className="switch-description">经纪人需到达现场才能签到</div>
            </div>
            <div 
              className={`switch ${requireCheckIn ? 'active' : ''}`}
              onClick={toggleCheckIn}
            />
          </div>
          
          {/* 必填点位 */}
          <div className="form-group">
            <label className="form-label">
              必填点位 <span className="required">*</span>
            </label>
            <div className="points-grid">
              {requiredPoints.map((point) => (
                <label 
                  key={point.id}
                  className={`point-option ${selectedRequiredPoints.includes(point.id) ? 'selected' : ''}`}
                >
                  <input 
                    type="checkbox" 
                    checked={selectedRequiredPoints.includes(point.id)}
                    onChange={() => toggleRequiredPoint(point.id)}
                  />
                  <i className={`fa ${point.icon} ${selectedRequiredPoints.includes(point.id) ? 'text-primary' : 'text-gray-400'} text-xl mb-1`} />
                  <span className={selectedRequiredPoints.includes(point.id) ? 'text-gray-700' : 'text-gray-500'}>{point.name}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* 选填点位 */}
          <div className="form-group">
            <label className="form-label">选填点位</label>
            <div className="points-grid">
              {optionalPoints.map((point) => (
                <label 
                  key={point.id}
                  className={`point-option ${selectedOptionalPoints.includes(point.id) ? 'selected' : ''}`}
                >
                  <input 
                    type="checkbox" 
                    checked={selectedOptionalPoints.includes(point.id)}
                    onChange={() => toggleOptionalPoint(point.id)}
                  />
                  <i className={`fa ${point.icon} ${selectedOptionalPoints.includes(point.id) ? 'text-primary' : 'text-gray-400'} text-xl mb-1`} />
                  <span className={selectedOptionalPoints.includes(point.id) ? 'text-gray-700' : 'text-gray-500'}>{point.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* 执行人员 */}
        <div className="executors-section" onClick={() => setShowExecutorModal(true)}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="section-title">执行人员 <span className="required">*</span></h3>
              <p className="section-description">点击选择执行经纪人</p>
            </div>
            <div className="executors-preview">
              <div className="selected-executors">
                {selectedExecutors.length > 0 ? (
                  selectedExecutors.map((executor) => (
                    <div 
                      key={executor.id}
                      className={`executor-avatar ${executor.color}`}
                    >
                      {executor.avatar}
                    </div>
                  ))
                ) : (
                  <span className="no-executors">未选择</span>
                )}
              </div>
              <i className="fa fa-chevron-right text-gray-400" />
            </div>
          </div>
        </div>
      </main>

      {/* 底部按钮 */}
      <div className="bottom-action">
        <button className="action-btn" onClick={handleConfirmDistribute}>
          <i className="fa fa-send mr-2" />
          确认下发
        </button>
      </div>

      {/* 执行人员选择弹窗 */}
      {showExecutorModal && (
        <div className="modal-overlay" onClick={() => setShowExecutorModal(false)}>
          <div className="executor-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">选择执行人员</div>
              <div className="selected-count">{selectedExecutors.length}人已选</div>
            </div>
            
            <div className="modal-content">
              {/* 搜索框 */}
              <div className="search-box">
                <i className="fa fa-search text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="搜索经纪人..."
                  className="search-input"
                />
              </div>
              
              {/* 组织架构Tab */}
              <div className="org-tabs">
                <button className="tab active">全部</button>
                <button className="tab">浦东A组</button>
                <button className="tab">浦东B组</button>
                <button className="tab">徐汇组</button>
                <button className="tab">静安组</button>
              </div>
              
              {/* 人员列表 */}
              <div className="executor-list">
                {executors.map((executor) => (
                  <div 
                    key={executor.id}
                    className={`executor-item ${selectedExecutors.some(e => e.id === executor.id) ? 'selected' : ''}`}
                    onClick={() => toggleExecutor(executor)}
                  >
                    <input 
                      type="checkbox" 
                      checked={selectedExecutors.some(e => e.id === executor.id)}
                      onChange={() => toggleExecutor(executor)}
                      className="executor-checkbox"
                    />
                    <div className={`executor-avatar ${executor.color}`}>
                      {executor.avatar}
                    </div>
                    <div className="executor-info">
                      <div className="executor-name">{executor.name}</div>
                      <div className="executor-status">{executor.group} · {executor.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 底部确认按钮 */}
            <div className="modal-footer">
              <div className="selected-names">
                已选执行人员：{selectedExecutors.length > 0 ? selectedExecutors.map(e => e.name).join('、') : '未选择'}
              </div>
              <button className="confirm-btn" onClick={confirmExecutors}>
                确认选择
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 确认下发弹窗 */}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-header">
              <div className="confirm-icon">
                <i className="fa fa-send text-primary text-2xl" />
              </div>
              <h3 className="confirm-title">确认下发</h3>
              <p className="confirm-description">确认下发后，经纪人将收到任务通知</p>
            </div>
            
            {/* 任务信息摘要 */}
            <div className="task-summary">
              <div className="summary-row">
                <span className="summary-label">楼盘</span>
                <span className="summary-value">{houseName}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">任务名</span>
                <span className="summary-value">{taskName}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">优先级</span>
                <span className="summary-value">{priority === 'high' ? '高' : priority === 'medium' ? '中' : '低'}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">截止时间</span>
                <span className="summary-value">{deadlineDate} {deadlineTime}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">打卡配置</span>
                <span className="summary-value">{requireCheckIn ? '需要定位打卡' : '不需要定位打卡'}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">必填点位</span>
                <span className="summary-value">
                  {selectedRequiredPoints.map(id => requiredPoints.find(p => p.id === id)?.name).join('、')}
                </span>
              </div>
            </div>
            
            {/* 执行人员 */}
            <div className="confirm-executors">
              <div className="executors-label">执行人员（{selectedExecutors.length}人）</div>
              <div className="executors-avatars">
                {selectedExecutors.map((executor) => (
                  <div 
                    key={executor.id}
                    className={`executor-avatar ${executor.color}`}
                  >
                    {executor.avatar}
                  </div>
                ))}
              </div>
            </div>
            
            {/* 按钮 */}
            <div className="confirm-buttons">
              <button className="cancel-btn" onClick={() => setShowConfirmModal(false)}>
                取消
              </button>
              <button className="submit-btn" onClick={handleSubmitDistribute}>
                确认下发
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDistribute;