import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './index.css';

const HouseNotify: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [hasTask, setHasTask] = useState(false);

  const houseId = searchParams.get('houseId') || 'HOUSE001';
  const houseName = searchParams.get('houseName') || '中海汇德里';



  const goToDistribute = () => {
    navigate(`/task-distribute?houseId=${houseId}&houseName=${encodeURIComponent(houseName)}`);
  };

  const checkTaskStatus = () => {
    // 模拟：true=已有任务，false=未配置
    const hasTask = false;
    setHasTask(hasTask);
  };

  useEffect(() => {
    checkTaskStatus();
  }, []);

  return (
    <div className="house-notify-page">
      {/* 顶部导航 */}
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fa fa-chevron-left text-gray-600 text-lg" />
        </button>
        <div className="header-title">楼盘详情</div>
        <button className="more-btn">
          <i className="fa fa-ellipsis-h text-gray-400" />
        </button>
      </header>

      {/* 内容区域 */}
      <main className="content">
        {/* 封面图 */}
        <div className="cover-image">
          <div className="image-placeholder">
            <i className="fa fa-image text-4xl opacity-50" />
          </div>
          <div className="image-counter">1/5</div>
        </div>

        {/* 楼盘基本信息 */}
        <div className="basic-info">
          <div className="info-header">
            <div>
              <h1 className="house-name">{houseName}</h1>
              <p className="developer">中海地产</p>
            </div>
            <div className="status-badge">
              <span className="badge">在售</span>
            </div>
          </div>

          {/* 价格信息 */}
          <div className="price-info">
            <span className="price">8.5万/㎡</span>
            <span className="price-label">均价</span>
            <span className="price-range">600-1200万/套</span>
          </div>

          {/* 基本信息 */}
          <div className="info-grid">
            <div className="info-item">
              <i className="fa fa-map-marker text-primary mr-2" />
              <span>浦东新区张江路</span>
            </div>
            <div className="info-item">
              <i className="fa fa-calendar text-primary mr-2" />
              <span>4月开盘</span>
            </div>
          </div>

          {/* 标签 */}
          <div className="tags">
            <span className="tag">户型：80-140㎡</span>
            <span className="tag">精装</span>
            <span className="tag">容积率：2.5</span>
            <span className="tag">绿化率：35%</span>
          </div>
        </div>

        {/* 详细信息 */}
        <div className="detail-info">
          {/* 配套信息 */}
          <div className="info-section">
            <h3 className="section-title">区位配套</h3>
            <div className="section-content">
              <div className="info-row">
                <span className="info-label">交通</span>
                <span className="info-value">2号线张江站800m，公交站200m</span>
              </div>
              <div className="info-row">
                <span className="info-label">教育</span>
                <span className="info-value">张江中学、张江幼儿园</span>
              </div>
              <div className="info-row">
                <span className="info-label">医疗</span>
                <span className="info-value">曙光医院（三甲）</span>
              </div>
              <div className="info-row">
                <span className="info-label">商业</span>
                <span className="info-value">长泰广场、家乐福</span>
              </div>
            </div>
          </div>

          {/* 优惠政策 */}
          <div className="info-section">
            <h3 className="section-title">优惠政策</h3>
            <div className="section-content">
              <ul className="policy-list">
                <li className="policy-item">
                  <i className="fa fa-check-circle text-green-500 mr-2" />
                  <span>3万抵8万优惠</span>
                </li>
                <li className="policy-item">
                  <i className="fa fa-check-circle text-green-500 mr-2" />
                  <span>首付最低20%</span>
                </li>
                <li className="policy-item">
                  <i className="fa fa-check-circle text-green-500 mr-2" />
                  <span>合作银行利率4.1%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 探盘任务状态（如果已配置过） */}
        {hasTask && (
          <div className="task-status">
            <h3 className="section-title">探盘任务</h3>
            <div className="task-card">
              <div className="task-header">
                <span className="task-name">{houseName}新盘探盘</span>
                <span className="task-state">待执行</span>
              </div>
              <div className="task-executors">执行人：张三、李四</div>
            </div>
          </div>
        )}
      </main>

      {/* 底部按钮 */}
      <div className="bottom-action">
        <button className="action-btn" onClick={goToDistribute}>
          <i className="fa fa-send mr-2" />
          配置探盘任务并下发
        </button>
      </div>
    </div>
  );
};

export default HouseNotify;