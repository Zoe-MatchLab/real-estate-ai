import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [showSetting, setShowSetting] = useState(false);
  const [showProductPowerDetail, setShowProductPowerDetail] = useState(false);

  const goToPage = (url: string) => {
    navigate(url);
  };

  const showToast = (message: string, duration: number = 2000) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, duration);
  };

  const clearCache = () => {
    if (confirm('确定要清理缓存吗？')) {
      showToast('缓存清理成功');
    }
  };

  const about = () => {
    alert('房产AI助手 v1.0.0\n© 2026 MatchLab');
  };

  const handleEditProfile = () => {
    showToast('编辑资料功能开发中');
  };



  const handleMemberCardClick = () => {
    showToast('会员功能即将上线');
  };

  const handleActivityClick = () => {
    showToast('活动中心即将上线');
  };

  const handleInviteClick = () => {
    showToast('邀请功能即将上线');
  };

  const handleFootprintClick = () => {
    showToast('足迹功能即将上线');
  };

  return (
    <div className="profile-page">
      {/* 顶部导航 */}
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fa fa-angle-left text-xl" />
        </button>
        <h1 className="page-title">我的</h1>
        <div className="header-actions">
          <button className="more-btn">
            <i className="fa fa-ellipsis-h text-lg" />
          </button>
          <button className="close-btn">
            <i className="fa fa-times text-lg" />
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="profile-content">
        {/* 个人信息区域 */}
        <div className="profile-info-section">
          <div className="profile-info">
            <div className="profile-avatar">
              陈
            </div>
            <div className="profile-details">
              <div className="profile-name-section">
                <h2 className="profile-name">陈佳佳</h2>
                <span className="profile-badge">🏅经纪人</span>
              </div>
            </div>
            <button className="edit-btn" onClick={handleEditProfile}>
              <i className="fa fa-pencil text-sm" />
            </button>
          </div>
          {/* <button className="business-card-btn" onClick={() => showToast('查看名片功能开发中')}>
            查看名片
          </button> */}
        </div>

        {/* 会员卡片 */}
        <div className="member-card" onClick={handleMemberCardClick}>
          <div className="member-icon">💎</div>
          <div className="member-info">
            <h3 className="member-title">会员</h3>
            <p className="member-desc">开通会员即可享受 8 项特权</p>
          </div>
          <div className="member-badge">即将上线</div>
        </div>

        {/* 今日作业动态 */}
        <div className="today-activity">
          <h3 className="section-title">今日作业动态</h3>
          <div className="activity-grid">
            <div className="activity-item" onClick={() => goToPage('/task-list')}>
              <div className="activity-icon">📋</div>
              <div className="activity-content">
                <h4 className="activity-title">探盘任务</h4>
                <p className="activity-status">进行中 1</p>
              </div>
            </div>
            <div className="activity-item" onClick={() => goToPage('/speech-train')}>
              <div className="activity-icon">⚡</div>
              <div className="activity-content">
                <h4 className="activity-title">话术训练</h4>
                <p className="activity-status">已完成 2</p>
              </div>
            </div>
            <div className="activity-item" onClick={() => goToPage('/data-board')}>
              <div className="activity-icon">📊</div>
              <div className="activity-content">
                <h4 className="activity-title">数据</h4>
                <p className="activity-status">暂无异常</p>
              </div>
            </div>
          </div>
        </div>

        {/* 我的业绩 */}
        <div className="performance-section">
          <h3 className="section-title">我的业绩（本月经办）</h3>
          <div className="performance-grid">
            <div className="performance-item">
              <p className="performance-value">12</p>
              <p className="performance-label">探盘</p>
            </div>
            <div className="performance-item">
              <p className="performance-value">28条</p>
              <p className="performance-label">发布</p>
            </div>
            <div className="performance-item">
              <p className="performance-value">156</p>
              <p className="performance-label">咨询</p>
            </div>
            <div className="performance-item">
              <p className="performance-value">45</p>
              <p className="performance-label">线索</p>
            </div>
            <div className="performance-item">
              <p className="performance-value">8</p>
              <p className="performance-label">报备</p>
            </div>
          </div>
          <div className="performance-grid">
            <div className="performance-item">
              <p className="performance-value">5</p>
              <p className="performance-label">带看</p>
            </div>
            <div className="performance-item">
              <p className="performance-value">2</p>
              <p className="performance-label">成交</p>
            </div>
          </div>
          <button className="history-btn">查看历史业绩</button>
        </div>

        {/* 产品力成长 */}
        <div className="product-power-section">
          <div className="product-power-header">
            <h3 className="section-title">产品力成长</h3>
            <button 
              className="detail-btn" 
              onClick={() => setShowProductPowerDetail(true)}
            >
              点击查看详情
            </button>
          </div>
          <div className="product-power-content">
            <div className="power-info">
              <span className="power-level">🏅 商圈专家</span>
              <span className="power-score">📈 85分 <span className="score-change">↑+5</span></span>
            </div>
          </div>
        </div>

        {/* 功能入口 */}
        <div className="functions-section">
          <h3 className="section-title">功能入口</h3>
          <div className="functions-grid">
            <div className="function-item" onClick={() => goToPage('/task-list')}>
              <div className="function-icon">
                <i className="fa fa-tasks" />
              </div>
              <span className="function-label">探盘任务列表</span>
              <i className="fa fa-angle-right" />
            </div>
            <div className="function-item" onClick={() => goToPage('/power')}>
              <div className="function-icon">
                <i className="fa fa-bolt" />
              </div>
              <span className="function-label">算力</span>
              <i className="fa fa-angle-right" />
            </div>
            <div className="function-item" onClick={() => goToPage('/favorites')}>
              <div className="function-icon">
                <i className="fa fa-star" />
              </div>
              <span className="function-label">收藏（0个）</span>
              <i className="fa fa-angle-right" />
            </div>
            <div className="function-item" onClick={() => goToPage('/materials')}>
              <div className="function-icon">
                <i className="fa fa-folder" />
              </div>
              <span className="function-label">我的物料库</span>
              <i className="fa fa-angle-right" />
            </div>
            <div className="function-item" onClick={() => goToPage('/data-board')}>
              <div className="function-icon">
                <i className="fa fa-bar-chart" />
              </div>
              <span className="function-label">数据看板</span>
              <i className="fa fa-angle-right" />
            </div>
          </div>
        </div>

        {/* 其他 */}
        <div className="other-section">
          <div className="other-grid">
            <div className="other-item" onClick={handleActivityClick}>
              <div className="other-icon">
                <i className="fa fa-calendar" />
              </div>
              <span className="other-label">活动</span>
            </div>
            <div className="other-item" onClick={handleInviteClick}>
              <div className="other-icon">
                <i className="fa fa-user-plus" />
              </div>
              <span className="other-label">邀请</span>
            </div>
            <div className="other-item" onClick={handleFootprintClick}>
              <div className="other-icon">
                <i className="fa fa-map-marker" />
              </div>
              <span className="other-label">足迹</span>
            </div>
            <div className="other-item" onClick={() => setShowSetting(true)}>
              <div className="other-icon">
                <i className="fa fa-cog" />
              </div>
              <span className="other-label">设置</span>
            </div>
          </div>
        </div>
      </div>

      {/* 产品力详情弹窗 */}
      {showProductPowerDetail && (
        <div className="modal-overlay" onClick={() => setShowProductPowerDetail(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">产品力详情</h3>
              <button className="modal-close" onClick={() => setShowProductPowerDetail(false)}>
                <i className="fa fa-times" />
              </button>
            </div>
            <div className="modal-body">
              <div className="power-detail-item">
                <span className="power-detail-label">当前等级：</span>
                <span className="power-detail-value">🏅 商圈专家</span>
              </div>
              <div className="power-detail-item">
                <span className="power-detail-label">能力评分：</span>
                <span className="power-detail-value">📈 85分</span>
              </div>
              <div className="power-detail-item">
                <span className="power-detail-label">较上月：</span>
                <span className="power-detail-value">↑+5分</span>
              </div>
              <div className="power-levels">
                <h4 className="power-levels-title">我的等级进度：</h4>
                <div className="power-level-item">
                  <span className="level-name">🥉 单盘专家</span>
                  <div className="level-progress">
                    <div className="level-bar" style={{ width: '100%' }}></div>
                  </div>
                  <span className="level-status">100% ✅ 已达成</span>
                </div>
                <div className="power-level-item">
                  <span className="level-name">🥈 商圈专家</span>
                  <div className="level-progress">
                    <div className="level-bar" style={{ width: '80%' }}></div>
                  </div>
                  <span className="level-status">80% ✅ 已达成</span>
                </div>
                <div className="power-level-item">
                  <span className="level-name">🥇 行政区</span>
                  <div className="level-progress">
                    <div className="level-bar" style={{ width: '60%' }}></div>
                  </div>
                  <span className="level-status">60% 还差2盘</span>
                </div>
                <div className="power-level-item">
                  <span className="level-name">🏆 城池</span>
                  <div className="level-progress">
                    <div className="level-bar" style={{ width: '30%' }}></div>
                  </div>
                  <span className="level-status">30% 还差15盘</span>
                </div>
              </div>
              <div className="next-level-info">
                <h4 className="next-level-title">距离下一等级（行政区专家）还需提升：</h4>
                <ul className="next-level-list">
                  <li>能力分：85 → 90（还差5分）</li>
                  <li>达标楼盘：80% → 80%（已达成）</li>
                </ul>
              </div>
              <button className="practice-btn" onClick={() => goToPage('/speech-train')}>
                去练习话术
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 设置弹窗 */}
      {showSetting && (
        <div className="setting-modal" onClick={() => setShowSetting(false)}>
          <div className="setting-content" onClick={(e) => e.stopPropagation()}>
            <div className="setting-header">
              <h3 className="setting-title">设置</h3>
              <button className="close-btn" onClick={() => setShowSetting(false)}>
                <i className="fa fa-times" />
              </button>
            </div>
            <div className="setting-items">
              <div className="setting-item">
                <div className="setting-left">
                  <i className="fa fa-bell-o text-gray-500 mr-3" />
                  <span className="setting-label">消息通知</span>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" checked />
                  <div className="toggle-slider" />
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-left">
                  <i className="fa fa-volume-up text-gray-500 mr-3" />
                  <span className="setting-label">声音提醒</span>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" checked />
                  <div className="toggle-slider" />
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-left">
                  <i className="fa fa-mobile text-gray-500 mr-3" />
                  <span className="setting-label">自动更新</span>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" />
                  <div className="toggle-slider" />
                </label>
              </div>
              <div className="setting-item" onClick={clearCache}>
                <div className="setting-left">
                  <i className="fa fa-trash-o text-gray-500 mr-3" />
                  <span className="setting-label">清理缓存</span>
                </div>
                <span className="setting-value">128MB</span>
              </div>
              <div className="setting-item" onClick={about}>
                <div className="setting-left">
                  <i className="fa fa-info-circle text-gray-500 mr-3" />
                  <span className="setting-label">关于我们</span>
                </div>
                <span className="setting-value">v1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
