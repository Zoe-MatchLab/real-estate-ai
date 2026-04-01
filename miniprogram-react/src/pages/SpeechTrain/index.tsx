import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

interface Project {
  id: string;
  name: string;
  scenes: string;
  completedTimes: number;
  score: number;
  icon: string;
  iconColor: string;
}

const SpeechTrain: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<string>('选择项目');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'official' | 'mine'>('official');

  const projects: Project[] = [
    {
      id: '1',
      name: '中海汇德里',
      scenes: '邀约/接待/沙盘讲解',
      completedTimes: 12,
      score: 85,
      icon: 'fa-home',
      iconColor: 'primary',
    },
    {
      id: '2',
      name: '万科城市之光',
      scenes: '邀约/接待',
      completedTimes: 8,
      score: 78,
      icon: 'fa-building',
      iconColor: 'blue',
    },
    {
      id: '3',
      name: '保利天汇',
      scenes: '沙盘讲解/样板间',
      completedTimes: 5,
      score: 92,
      icon: 'fa-star',
      iconColor: 'purple',
    },
    {
      id: '4',
      name: '龙湖天街',
      scenes: '成交逼定',
      completedTimes: 3,
      score: 65,
      icon: 'fa-handshake-o',
      iconColor: 'red',
    },
  ];

  const showToast = (message: string, duration: number = 2000) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
  };

  const selectMode = (mode: string) => {
    showToast(`已选择：${mode}模式`);
  };

  const createProject = () => {
    showToast('新建项目功能开发中');
  };

  const selectProject = (project: Project) => {
    setSelectedProject(project.name);
    setShowProjectModal(false);
    showToast(`已选择：${project.name}`);
  };

  const startTraining = () => {
    if (selectedProject === '选择项目') {
      showToast('请先选择训练项目');
      return;
    }
    showToast('即将开始训练...');
  };

  return (
    <div className="speech-train-page">
      {/* 状态栏 */}
      <div className="status-bar" />

      {/* 标题栏 */}
      <div className="title-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fa fa-chevron-left" />
        </button>
        <h1 className="page-title">话术训练助手</h1>
        <button className="more-btn">
          <i className="fa fa-ellipsis-h" />
        </button>
      </div>

      {/* 主内容区 */}
      <div className="main-content">
        {/* 顶部功能栏 */}
        <div className="top-bar">
          {/* 左侧模式按钮 */}
          <div className="mode-buttons">
            {/* 语音按钮 */}
            <button 
              className="mode-btn"
              onClick={() => selectMode('电话')}
            >
              <i className="fa fa-phone" />
            </button>
            {/* 添加按钮 */}
            <button 
              className="mode-btn"
              onClick={() => setShowProjectModal(true)}
            >
              <i className="fa fa-plus" />
            </button>
          </div>
          
          {/* 右侧选择项目按钮 */}
          <button 
            className="project-select-btn"
            onClick={() => setShowProjectModal(true)}
          >
            <i className="fa fa-th-large" />
            <span>{selectedProject}</span>
            <i className="fa fa-chevron-down" />
          </button>
        </div>
        
        {/* AI形象 */}
        <div className="ai-avatar">
          <i className="fa fa-comments" />
        </div>
        
        {/* 欢迎语 */}
        <div className="welcome-section">
          <h2 className="welcome-title">Hi，欢迎来到话术训练智能体</h2>
          <p className="welcome-subtitle">你可以在这里训练不同类型的项目</p>
        </div>
        
        {/* 开始训练按钮 */}
        <div className="action-section">
          <button 
            className="start-btn"
            onClick={startTraining}
          >
            开始训练
          </button>
        </div>
      </div>

      {/* 项目选择弹窗 */}
      <div 
        className={`modal-overlay ${showProjectModal ? 'show' : ''}`}
        onClick={() => setShowProjectModal(false)}
      >
        <div 
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-handle"></div>
          
          {/* 弹窗标题 */}
          <div className="modal-header">
            <h3>选择项目</h3>
            <div className="modal-actions">
              <button 
                className="create-btn"
                onClick={createProject}
              >
                <i className="fa fa-plus" />
                新建
              </button>
              <button 
                className="close-btn"
                onClick={() => setShowProjectModal(false)}
              >
                <i className="fa fa-times" />
              </button>
            </div>
          </div>
          
          {/* Tab切换 */}
          <div className="modal-tabs">
            <button 
              className={`tab-btn ${activeTab === 'official' ? 'active' : ''}`}
              onClick={() => setActiveTab('official')}
            >
              官方推荐
            </button>
            <button 
              className={`tab-btn ${activeTab === 'mine' ? 'active' : ''}`}
              onClick={() => setActiveTab('mine')}
            >
              我创建的
            </button>
          </div>
          
          {/* 项目列表 */}
          <div className="modal-body">
            {activeTab === 'official' ? (
              <div className="project-list">
                {projects.map((project) => (
                  <div 
                    key={project.id}
                    className="project-item"
                    onClick={() => selectProject(project)}
                  >
                    <div className="project-icon-container">
                      <div className={`project-icon ${project.iconColor}`}>
                        <i className={`fa ${project.icon}`} />
                      </div>
                    </div>
                    <div className="project-info">
                      <h4 className="project-name">{project.name}</h4>
                      <p className="project-scenes">场景：{project.scenes}</p>
                      <div className="project-stats">
                        <span>已完成：{project.completedTimes}次</span>
                        <span className="stat-separator">|</span>
                        <span className={project.score >= 80 ? 'score-high' : project.score >= 60 ? 'score-medium' : 'score-low'}>
                          评分：{project.score}分
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-projects">
                <i className="fa fa-folder-open" />
                <p>暂无创建的训练项目</p>
                <button className="create-project-btn">去创建</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechTrain;
